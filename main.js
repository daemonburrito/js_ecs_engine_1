// main module
// game loop, asset loading, etc
var main = function (pipeline) {
	"use strict";
	var now, dt, last, ctx,
		frame = function () {
			now = timestamp();
			dt = (now - last) / 1000,

			ctx = {
				dt: dt
			};

			pipeline.forEach(function (fn) {
				fn.call(ctx);
			}, this);

			last = now;
			requestAnimationFrame(frame);
		},

		timestamp = function () {
			return window.performance.now();
		};

	last = timestamp();

	requestAnimationFrame(frame);
};

/*
main([function () {
	console.log('tick');
	console.log(this.dt);
}, function () {
	console.log('tock');
	console.log(this.dt);
}]);
*/
