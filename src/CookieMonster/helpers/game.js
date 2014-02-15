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
		GrandmaDraw : Game.Objects['Grandma'].drawFunction,
		Lock        : Game.Lock,
		Unlock      : Game.Unlock,
		CollectWrinklers : Game.CollectWrinklers,
		computeSeasonPrices : Game.computeSeasonPrices,
	};
	var stored = {
		cpsSucked        : Game.cpsSucked,
		globalCpsMult    : Game.globalCpsMult,
		cookiesPs        : Game.cookiesPs,
		computedMouseCps : Game.computedMouseCps,
		pledges          : Game.pledges,
		pledgeT          : Game.pledgeT,
		elderWrath       : Game.elderWrath,
		season           : Game.season,
		seasonT          : Game.seasonT,
		seasonUses       : Game.seasonUses,
		achievements     : Game.Achievements,
		achievementsOwned : Game.AchievementsOwned,
	};

	Game.SetResearch = function() {};
	Game.Popup       = function() {};
	Game.Lock        = function() {};
	Game.Unlock      = function() {};
	Game.CollectWrinklers = function() {};
	Game.computeSeasonPrices = function() {};
	Game.Objects['Grandma'].drawFunction = function() {};

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
	Game.pledges          = stored.pledges;
	Game.pledgeT          = stored.pledgeT;
	Game.elderWrath       = stored.elderWrath;
	Game.season           = stored.season;
	Game.seasonT          = stored.seasonT;
	Game.seasonUses       = stored.seasonUses;
	Game.Achievements     = stored.achievements;
	Game.AchievementsOwned = stored.achievementsOwned;
	
	// Restore native methods
	Game.SetResearch = swaped.SetResearch;
	Game.Popup       = swaped.Popup;
	Game.Lock        = swaped.Lock;
	Game.Unlock      = swaped.Unlock;
	Game.CollectWrinklers = swaped.CollectWrinklers;
	Game.computeSeasonPrices = swaped.computeSeasonPrices;
	Game.Objects['Grandma'].drawFunction = swaped.GrandmaDraw;
	
	// Restore correct prices
	Game.RefreshBuildings();
	Game.upgradesToRebuild=1
	
	return income - Game[statistic];
};