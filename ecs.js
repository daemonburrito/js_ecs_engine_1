// entity-component-system
(function () {
	"use strict";

	var Entity = function (name) {
		// "name" is for debugging, remove for performance.
		if (name) {
			this.name = name;
		}

		this.components = {};

		return this;
	};

	module.exports = {
		Entity: Entity
	};
})();
