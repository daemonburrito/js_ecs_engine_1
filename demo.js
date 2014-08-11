(function () {
	"use strict";
	var main = require('./main.js');

	main([function () {
		console.log('tick');
		console.log(this.dt);
	}]);
})();
