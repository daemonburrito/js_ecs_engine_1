(function () {
	"use strict";
	var main = require('./main.js'),
		canvas = document.getElementById('demo'),
		ctx = canvas.getContext('2d');

	ctx.fillStyle = '#FF0000';
	ctx.strokeStyle = '#000000';

	var x = 0, y = 0,
		forward = true;

	ctx.fillRect(x, y, 10, 10);

	var sync_fns = [
		function (cb) {
			ctx.clearRect(0, 0, 300, 300);
			cb();
		},
		function (cb) {
			if (x === 0) {
				forward = true;
			}

			if (x < 290 && forward === true) {
				x += 1;
				y += 1;
			}
			else {
				forward = false;
				x -= 1;
				y -= 1;
			}

			ctx.fillRect(x, y, 10, 10);

			cb();
		}
	];

	main(sync_fns, [function () {
		//console.log('tick');
		//console.log('dt', this.dt);
	}]);
})();
