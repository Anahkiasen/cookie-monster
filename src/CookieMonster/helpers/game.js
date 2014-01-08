/**
 * Simulate buying an object and return change in a statistic
 *
 * @param {Object} object
 * @param {String} statistic The statistic to watch
 *
 * @return {Integer}
 */
CookieMonster.simulateBuy = function(object, statistic) {
	// Disable some native methods
	var swaped = {
		setResearch : Game.SetResearch,
		Popup       : Game.Popup,
	};
	Game.SetResearch = function() {};
	Game.Popup = function() {};

	// Simulate buy and store statistic
	object.toggle(true);
	Game.CalculateGains();
	var income = Game[statistic];

	// Reverse buy
	object.toggle(false);
	Game.CalculateGains();

	// Restore native methods
	Game.SetResearch = swaped.SetResearch;
	Game.Popup       = swaped.Popup;

	return income - Game[statistic];
};