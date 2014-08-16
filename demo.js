(function () {
	"use strict";
	var main = require('./main.js'),
		ecs = require('./ecs'),
		systems = require('./systems'),
		canvas = require('./canvas'),
		entities = [];

	var player = new ecs.Entity('player'),
		tilemap = new ecs.Entity('tilemap'),
		spritesheet = new Image();

	spritesheet.src = 'russpuppy.com-rpg.png';

	player.components = {
		position: {
			x: canvas.h / 2, y: canvas.w / 2
		},
		input: true,
		size: {
			h: 10, w: 10
		},
		sprite: {
			sheet: spritesheet,
			offset: {
				x: 2 * 16, y: 7 * 16
			},
			h: 16, w: 16
		}
	}

	entities.push(player);

	tilemap.components = {
		tilemap: {
			sprites: [{
				sheet: spritesheet,
				offset: {
					x: 0, y: 0
				},
				h: 16, w: 16,
				name: 'grass'
			}],
			map: [
				0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0
			],
			stride: 16
		}
	}

	entities.push(tilemap);

	var sync_fns = [
		function (done) {
			Object.keys(systems).forEach(function (key) {
				systems[key].call(this, entities);
			});
			done();
		}
	];

	spritesheet.addEventListener('load', function () {
		main(sync_fns, [function () {
			//console.log('tick');
			//console.log('dt', this.dt);
		}]);
	}, false);
})();
