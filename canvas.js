(function () {
	"use strict";
	const CANVAS_H = 16 * 16,
		CANVAS_W = 16 * 16;

	var el = document.getElementById('demo'),
		ctx = el.getContext('2d');

	el.height = CANVAS_H;
	el.width = CANVAS_W;
	ctx.fillStyle = '#FF0000';
	ctx.strokeStyle = '#000000';

	module.exports = {
		el: el,
		ctx: ctx,
		h: CANVAS_H,
		w: CANVAS_W
	};
})();
