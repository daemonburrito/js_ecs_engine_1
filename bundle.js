(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
	"use strict";
	var main = require('./main.js');

	main([function () {
		console.log('tick');
		console.log(this.dt);
	}]);
})();

},{"./main.js":2}],2:[function(require,module,exports){
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

module.exports = main;

/*
main([function () {
	console.log('tick');
	console.log(this.dt);
}, function () {
	console.log('tock');
	console.log(this.dt);
}]);
*/

},{}]},{},[1]);
