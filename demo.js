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
			defaults: {
				h: 16, w: 16
			},
			sprites: [{
				sheet: spritesheet,
				offset: {
					x: 0, y: 0
				},
				h: 16, w: 16,
				name: 'grass'
			}, {
				sheet: spritesheet,
				offset: {
					x: 5 * 16,
					y: 3 * 16
				},
				h: 16, w: 16,
				name: 'rock'
			}, {
				sheet: spritesheet,
				offset: {
					x: 7 * 16,
					y: 3 * 16
				},
				h: 16, w: 16,
				name: 'ns_road'
			}, {
				sheet: spritesheet,
				offset: {
					x: 7 * 16,
					y: 4 * 16
				},
				h: 16, w: 16,
				name: 'cross_road'
			}, {
				sheet: spritesheet,
				offset: {
					x: 7 * 16,
					y: 5 * 16
				},
				h: 16, w: 16,
				name: 'ew_road'
			},
			],
			map: [
				0,[0,1],0,0, [0,2],0,0,0, 0,0,0,0, 0,0,0,0,
				0,[0,1],0,0, [0,2],0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, [0,2],0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, [0,2],0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, [0,2],0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, [0,2],0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, [0,2],0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, [0,2],0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, [0,2],0,0,0, 0,0,0,0, 0,0,0,0,
				[0,4],[0,4],[0,4],[0,4], [0,3],0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, [0,2],0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, [0,2],0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, [0,2],0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, [0,2],0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, [0,2],0,0,0, 0,0,0,0, 0,0,0,0,
				0,0,0,0, [0,2],0,0,0, 0,0,0,0, 0,0,0,0
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
