(function () {
	"use strict";
	
	var instances = {},
		async = require('async');

	// For now, using the JSON output format from Tiled.
	var Tilemap = function (def, name, prefix) {
		this.def = def;
		this.tilesets = [];

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
		async.series(this.def.tilesets.map(function (o) {
			return function (done) {
				var image = new Image();
				image.src = o.image;
				image.addEventListener('load', function () {
					o.el = image;
					done();
				});
			};
		}));
	};

	module.exports = {
		load: function (def) {
			var T = new Tilemap(def);
			T.load();
			return T;
		}
	};
})();
