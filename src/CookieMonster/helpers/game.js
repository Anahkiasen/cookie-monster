/**
 * Simulate buying an object and return change in a statistic
 *
 * @param {Object} object
 * @param {String} statistic The statistic to watch
 *
 * @return {Integer}
 */
CookieMonster.simulateBuy = function(object, statistic) {

	// Store initial state
	////////////////////////////////////////////////////////////////////

	// Disable some native methods
	var swaped = {
		SetResearch : Game.SetResearch,
		Popup       : Game.Popup,
	};
	var stored = {
		cpsSucked        : Game.cpsSucked,
		globalCpsMult    : Game.globalCpsMult,
		cookiesPs        : Game.cookiesPs,
		computedMouseCps : Game.computedMouseCps,
	};

	Game.SetResearch = function() {};
	Game.Popup       = function() {};

	// Simulate buy and store result
	////////////////////////////////////////////////////////////////////

	// Simulate buy and store statistic
	object.simulateToggle(true);
	Game.CalculateGains();
	var income = Game[statistic];

	// Restore initial state
	////////////////////////////////////////////////////////////////////

	// Reverse buy
	object.simulateToggle(false);
	Game.cpsSucked        = stored.cpsSucked;
	Game.globalCpsMult    = stored.globalCpsMult;
	Game.cookiesPs        = stored.cookiesPs;
	Game.computedMouseCps = stored.computedMouseCps;

	// Restore native methods
	Game.SetResearch = swaped.SetResearch;
	Game.Popup       = swaped.Popup;

	return income - Game[statistic];
};