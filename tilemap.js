(function () {
	"use strict";
	
	var instances = {},
		async = require('async'),
		adler32 = require('adler-32'),

		hash_key = function (def) {
			return adler32.str(JSON.stringify(def));
			return hash
		};

	// For now, using the JSON output format from Tiled.
	var Tilemap = function (def, name, prefix) {
		this.def = def;
		this.tilesets = [];
		this.layers = [];
		this.meta = {};

		if (!name) {
			// Use the name of the first tileset.
			this.name = this.def.tilesets[0].name;
		}

		if (prefix) {
			this.prefix = prefix;
			this.def.tilesets.forEach(function (v, i) {
				this.def.tilesets[i].image = prefix + v.image;
			}, this);
		}
	};

	Tilemap.prototype.load = function (cb) {
		this.load_meta();
		this.load_tilesets();
		this.load_layers();

		if (typeof cb === 'function') {
			cb.apply(this);
		}

		delete this.def;
	};

	Tilemap.prototype.load_meta = function () {
		this.meta = {
			height: this.def.height,
			width: this.def.width,
			orientation: this.def.orientation,
			props: this.def.properties,
			tileheight: this.def.tileheight,
			tilewidth: this.def.tilewidth,
			version: this.def.version
		};
	};

	Tilemap.prototype.load_tilesets = function () {
		var that = this;
		async.series(this.def.tilesets.map(function (o) {
			return function (done) {
				var image = new Image();
				image.src = o.image;
				image.addEventListener('load', function () {
					o.el = image;
					that.tilesets.push(o);
					done();
				});
			};
		}));
	};

	Tilemap.prototype.load_layers = function () {
		this.def.layers.forEach(function (layer) {
			var buffer = new ArrayBuffer(layer.data.length * 2),
				uint16view = new Uint16Array(buffer);

			for (var i=0; i<layer.data.length; i++) {
				uint16view[i] = layer.data[i];
			}

			this.layers.push({
				data: uint16view,
				height: layer.height,
				width: layer.width,
				name: layer.name,
				opacity: layer.opacity,
				type: layer.type,
				visible: layer.visible,
				x: layer.x,
				y: layer.y
			});
		}, this);
	};

	Tilemap.prototype.get_tile = function (gid) {
		var width = this.tilesets[0].imagewidth,
			row = Math.ceil((gid * this.meta.tilewidth) / width)

		return {
			x: (gid * this.meta.tilewidth) - ((row - 1) * width) - this.meta.tilewidth ,
			y: (row * this.meta.tileheight) - this.meta.tileheight ,
			h: this.meta.tileheight,
			w: this.meta.tilewidth
		}
	};

	Tilemap.prototype.draw_all = function (ctx) {
		if (!this.tilesets[0]) {
			return;
		}
		this.layers.forEach(function (v) {

			for (var i=0; i<v.data.length; i++) {

				var tile = this.get_tile(v.data[i]),
					row = Math.ceil((i + 1) / this.meta.width),
					x = (i + 1) * tile.w - ((row - 1) * (this.meta.width * tile.w)) - tile.w,
					y = (row * tile.h) - tile.h + 1;
				//debugger
				ctx.drawImage(this.tilesets[0].el,
					tile.x, tile.y,
					tile.w, tile.h,

					x, y,
					tile.w, tile.h);
			}
		}, this);
	},

	module.exports = {
		load: function (def) {
			var key = hash_key(def);

			if (instances[key]) {
				return instances[key];
			}

			var T = new Tilemap(def);
			T.load();
			instances[key] = T;
			return T;
		}
	};
})();
