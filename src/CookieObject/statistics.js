/*jshint -W014*/

//////////////////////////////////////////////////////////////////////
///////////////////////////// INFORMATIONS ///////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the true worth of an object
 *
 * @param {Boolean} rounded
 *
 * @return {Integer}
 */
CookieObject.getWorthOf = function(rounded) {
	var worth = this.getType() === 'upgrade'
		? CookieMonster.callCached('getUpgradeWorth', [this])
		: CookieMonster.callCached('getBuildingWorth', [this]);

	return rounded ? worth.roundDecimal() : worth;
};

/**
 * Get the Best Cost per Income
 *
 * @param {Boolean} rounded
 *
 * @return {Integer}
 */
CookieObject.getBaseCostPerIncome = function(rounded) {
	var worth = this.getWorth();
	var bci   = Math.roundDecimal(this.getPrice() / worth);
	if (worth < 0) {
		return Infinity;
	}

	return rounded ? bci.roundDecimal() : bci;
};

/**
 * Get the Return On Investment
 *
 * @return {Integer}
 */
CookieObject.getReturnInvestment = function() {
	var worth = this.getWorth();

	return this.price * (worth + Game.cookiesPs) / worth;
};

/**
 * Get the time left for this Object
 *
 * @return {String}
 */
CookieObject.getTimeLeft = function() {
	return CookieMonster.secondsLeft(this);
};

/**
 * Get the core statistics for comparaisons
 *
 * @return {Array}
 */
CookieObject.getComparativeInfos = function() {
	return [
		this.getBaseCostPerIncome(),
		this.getTimeLeft(),
		this.getReturnInvestment(),
	];
};

/**
 * Get the colors assigned to this object
 *
 * @return {Array}
 */
CookieObject.getColors = function() {
	return CookieMonster.computeColorCoding(this.getComparativeInfos());
};