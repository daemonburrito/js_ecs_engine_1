// systems
(function () {
	"use strict";
	var canvas = require('./canvas'),
		keys = require('./keys'),
		keypoller = require('./key_poller'),

	systems = {
		sprite: function (entities) {
			entities.forEach(function (entity) {
				if (entity.components.sprite) {
					// entity.components.sprite.sheet
					// entity.components.sprite.offset.x
					// entity.components.sprite.offset.y
				}
			});
		},

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
