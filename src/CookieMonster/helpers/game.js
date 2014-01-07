/**
 * Simulate buying an object and return change in a statistic
 *
 * @param {Object} object
 * @param {String} statistic The statistic to watch
 *
 * @return {Integer}
 */
CookieMonster.simulateBuy = function(object, statistic) {
	// Simulate buy and store statistic
	object.toggle(true);
	Game.CalculateGains();
	var income = Game[statistic];

	// Reverse buy
	object.toggle(false);
	Game.CalculateGains();

	return income - Game[statistic];
};