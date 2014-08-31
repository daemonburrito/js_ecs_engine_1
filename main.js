// main module
// game loop, asset loading, etc
module.exports = function (pipeline, async_pipeline) {
	"use strict";
	var now, dt, last, context,
		async = require('async'),
		keys = require('./keys'),
		FPSMeter = require('./fpsmeter'),
		fpsmeter = new FPSMeter(),

		// raf cb
		frame = function () {
			fpsmeter.tickStart();
			now = timestamp();
			dt = (now - last) / 1000,

			context = {
				dt: dt,
				now: now,
				last: last
			};

			// sync pipeline
			// calls in this queue are in a series, and a done() callback must be fired.
			async.series(pipeline.map(function (fn) {
				return fn.bind(context);
			}));

			// async pipeline
			// calls in this queue do not need a done(), but will not block eachother.
			async_pipeline.forEach(function (fn) {
				fn.call(context);
			}, this);

			last = now;
			fpsmeter.tick();

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

