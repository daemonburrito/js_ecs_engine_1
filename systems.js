// systems
(function () {
	"use strict";
	var canvas = require('./canvas'),

	systems = {
		render: function (entities) {
			var aspects = ['appearance'];

			entities.forEach(function (entity) {
				if (entity.components.size && entity.components.position) {
					canvas.ctx.fillRect(
						entity.components.position.x,
						entity.components.position.y,
						entity.components.size.h,
						entity.components.size.w);
				}
			}), this;
		},

		input: function (entities) {
			var aspects = ['controlled'];

			entities.forEach(function (entity) {

			}, this);
		},

		position: function (entities) {
			var aspects = ['moves'];

			entities.forEach(function (entity) {

			}, this);
		},


	};

	module.exports = systems;
})();
