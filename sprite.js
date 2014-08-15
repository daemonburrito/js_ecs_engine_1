// sprite util
(function () {
	"use strict";
	var Sprite = function (ctx, sheet, offset_x, offset_y, h, w) {
		this.ctx = ctx;
		this.sheet = sheet;
		this.offset = {};
		this.offset.x = offset_x;
		this.offset.y = offset_y;
		this.h = h;
		this.w = w;

		return this;
	};

	Sprite.prototype.draw = function (x, y) {
		this.ctx.drawImage(this.sheet,
			this.offset.x, this.offset.y,
			this.w, this.h,
			x, y,
			this.w, this.h)
	};

	module.exports = {
		cache: {},
		get: function (ctx, sheet, offset_x, offset_y, h, w) {
			var key = sheet + offset_x + offset_y,
				cached = this.cache[key];

			if (cached) {
				return cached;
			}
			else {
				this.cache[key] = new Sprite(ctx, sheet, offset_x, offset_y, h, w);
				return this.cache[key];
			}
		}
	};
})();
