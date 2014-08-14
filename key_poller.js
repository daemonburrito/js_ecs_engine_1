// Key polling module.
// Ask for keycode to get state.
(function () {
	"use strict";

	var el = document,
		keys_down = {}; // for now, just listen to the root

	el.addEventListener('keydown', function (ev) {
		//console.log(ev.keyCode);
		keys_down[ev.keyCode] = true;
	});

	el.addEventListener('keyup', function (ev) {
		try {
			delete keys_down[ev.keyCode];
		}
		catch (e) {} // it's okay if the key wasn't in keys_down
	});

	var poller = {
		pressed: function (keycode) {
			if (keys_down[keycode] === true) {
				return true;
			}
			else {
				return false;
			}
		}
	};

	module.exports = poller;
})();
