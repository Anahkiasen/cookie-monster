//////////////////////////////////////////////////////////////////////
///////////////////////////// INFORMATIONS ///////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get an array with the min/max CPI/timeLeft
 *
 * @param {String} minOrMax
 *
 * @return {Array}
 */
CookieMonster.getBestValue = function(minOrMax) {
	return [
		Math[minOrMax].apply(Math, this.informations.bci),
		Math[minOrMax].apply(Math, this.informations.timeLeft),
		Math[minOrMax].apply(Math, this.informations.roi)
	];
};

/**
 * Update the stored informations about a building
 *
 * @param {Integer} building
 * @param {Array}   informations
 */
CookieMonster.setBuildingInformations = function (building, informations) {
	var colors = this.computeColorCoding([informations.bci, informations.timeLeft, informations.roi]);

	this.informations.names[building]    = informations.names;
	this.informations.bonus[building]    = informations.bonus;
	this.informations.bci[building]      = informations.bci;
	this.informations.roi[building]      = informations.roi;
	this.informations.timeLeft[building] = informations.timeLeft;

	// Compute formatted informations
	this.bottomBar.names[building]    = informations.names;
	this.bottomBar.bonus[building]    = this.formatNumber(informations.bonus);
	this.bottomBar.bci[building]      = '<span class="text-' +colors[0]+ '">' +this.formatNumber(informations.bci)+ '</span>';
	this.bottomBar.roi[building]      = '<span class="text-' +colors[2]+ '">' +this.formatNumber(informations.roi)+ '</span>';
	this.bottomBar.timeLeft[building] = '<span class="text-' +colors[1]+ '">' +this.formatCompressedTime(informations.timeLeft)+ '</span>';
};

/**
 * Update all of the building's informations in memory
 *
 * @return {void}
 */
CookieMonster.updateBuildingsInformations = function() {
	Game.ObjectsById.forEach(function (building, key) {
		var count = '(<span class="text-blue">' +building.amount+ '</span>)';

		// Save building informations
		CookieMonster.setBuildingInformations(key, {
			names    : building.name.split(' ')[0] + ' ' + count,
			bonus    : building.getWorth(true),
			bci      : building.getBaseCostPerIncome(true),
			roi      : building.getReturnInvestment(),
			timeLeft : building.getTimeLeft(),
		});
	});
};

//////////////////////////////////////////////////////////////////////
/////////////////////////////// TRUE WORTH ///////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get how much buying one of a building would earn
 *
 * @param {Object} building
 *
 * @return {Integer}
 */
CookieMonster.getBuildingWorth = function(building) {
	return this.simulateBuy(building, 'cookiesPs');
};