// systems
(function () {
	"use strict";
	var canvas = require('./canvas'),
		keys = require('./keys'),
		keypoller = require('./key_poller'),
		sprite_util = require('./sprite'),

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
					var stride = entity.components.tilemap.stride,
						sprites = entity.components.tilemap.sprites,
						map = entity.components.tilemap.map,

						sprite,
						offset_x = 0,
						offset_y = 0,
						strip = 1;

					map.forEach(function (v, i) {
						sprite = sprite_util.get(canvas.ctx, sprites[map[i]].sheet,
							sprites[map[i]].offset.x, sprites[map[i]].offset.y,
							sprites[map[i]].h, sprites[map[i]].w);
						sprite.draw(offset_x, offset_y);

						if (i + 1 >= stride * strip) {
							strip += 1;
							offset_x = 0;
							offset_y += sprites[map[i]].h;
						}
						else {
							offset_x += sprites[map[i]].w;
						}
					});
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
