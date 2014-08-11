// main module
// game loop, asset loading, etc
var main = function (pipeline, async_pipeline) {
	"use strict";
	var now, dt, last, context,
		async = require('async'),

		// raf cb
		frame = function () {

			now = timestamp();
			dt = (now - last) / 1000,

			context = {
				dt: dt
			};

			async.series(pipeline.map(function (fn) {
				return fn.bind(context);
			}));

			// async pipeline
			// calls in this queue do not need a next(), but will not block eachother.
			async_pipeline.forEach(function (fn) {
				fn.call(context);
			}, this);

			last = now;

			// next frame
			requestAnimationFrame(frame);
		},

		// wrapper for clock
		timestamp = function () {
			return window.performance.now();
		};

	last = timestamp();

	// starts the raf loop
	requestAnimationFrame(frame);
};

module.exports = main;
