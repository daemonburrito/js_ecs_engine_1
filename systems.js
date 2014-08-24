// systems
(function () {
	"use strict";
	var canvas = require('./canvas'),
		keys = require('./keys'),
		keypoller = require('./key_poller'),
		sprite_util = require('./sprite'),
		tilemap_util = require('./tilemap'),

	systems = {
		render: function (entities) {
			canvas.ctx.clearRect(0, 0, canvas.h, canvas.w);

			entities.forEach(function (entity) {
				if (entity.components.size && entity.components.position 
					&& !entity.components.sprite) {
					canvas.ctx.fillRect(
						entity.components.position.x,
						entity.components.position.y,
						entity.components.size.h,
						entity.components.size.w);
				}
			}), this;
		},

		tileMap: function (entities) {
			entities.forEach(function (entity) {
				if (entity.components.tilemap) {
					//console.log(entity.components.tilemap);
					var TM = tilemap_util.load(entity.components.tilemap);
					TM.draw_all(canvas.ctx);
					//debugger;
					//entity.components.tilemap.layers.forEach(function (v, i) {
					//	
					//});
				}
			});
		},

		sprite: function (entities) {
			entities.forEach(function (entity) {
				if (entity.components.sprite) {
					var sprite = sprite_util.get(canvas.ctx, entity.components.sprite.sheet,
						entity.components.sprite.offset.x, entity.components.sprite.offset.y,
						entity.components.sprite.h, entity.components.sprite.w);

					if (entity.components.position) {
						sprite.draw(entity.components.position.x,
							entity.components.position.y);
					}
				}
			});
		},

		input: function (entities) {
			entities.forEach(function (entity) {
				if (entity.components.input && entity.components.position) {
					var up = keypoller.pressed(keys.UP),
						down = keypoller.pressed(keys.DOWN),
						left = keypoller.pressed(keys.LEFT),
						right = keypoller.pressed(keys.RIGHT);

					if (up) {
						entity.components.position.y += -1;
					}

					if (down) {
						entity.components.position.y += 1;
					}

					if (left) {
						entity.components.position.x += -1;
					}

					if (right) {
						entity.components.position.x += 1;
					}
				}
			}, this);
		},

		position: function (entities) {
			entities.forEach(function (entity) {

			}, this);
		},


	};

	module.exports = systems;
})();
