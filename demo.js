(function () {
	"use strict";
	var main = require('./main.js'),
		ecs = require('./ecs'),
		systems = require('./systems'),
		canvas = require('./canvas'),
		entities = [];

	var player = new ecs.Entity('player');

	player.components = {
		position: {
			x: canvas.h / 2, y: canvas.w / 2
		},
		input: true,
		size: {
			h: 10, w: 10
		}
	}

	entities.push(player);

	var x = 0, y = 0,
		forward = true;

	var sync_fns = [
		function (done) {
			Object.keys(systems).forEach(function (key) {
				systems[key].call(this, entities);
			});
			done();
		}
	];

	main(sync_fns, [function () {
		//console.log('tick');
		//console.log('dt', this.dt);
	}]);
})();
