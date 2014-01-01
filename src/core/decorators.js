/*jshint -W014*/

var CookieObject = {};

//////////////////////////////////////////////////////////////////////
////////////////////////////// REFLECTIONS ///////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the price of an object
 *
 * @return {Integer}
 */
CookieObject.getPriceOf = function() {
	return this instanceof Game.Upgrade ? this.basePrice : this.price;
};

/**
 * Get the type of an object
 *
 * @return {String}
 */
CookieObject.getTypeOf = function() {
	return this instanceof Game.Upgrade ? 'upgrade' : 'object';
};

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

	return rounded ? CookieMonster.roundDecimal(worth) : worth;
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
	var bci   = CookieMonster.roundDecimal(this.getPrice() / worth);
	if (worth < 0) {
		return Infinity;
	}

	return rounded ? CookieMonster.roundDecimal(bci) : bci;
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

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the identifier of an object
 *
 * @return {Integer}
 */
CookieObject.identifier = function() {
	return 'cookie-monster__'+this.getType()+'--'+this.id;
};

/**
 * Check if an object matches against a piece of text
 *
 * @param {String} matcher
 *
 * @return {Boolean}
 */
CookieObject.matches = function(matcher) {
	if (!this.desc) {
		return false;
	}

	return this.desc.toLowerCase().indexOf(matcher.toLowerCase()) !== -1;
};

// Hook into the game
//////////////////////////////////////////////////////////////////////

Game.Object.prototype.getBaseCostPerIncome  = CookieObject.getBaseCostPerIncome;
Game.Object.prototype.getPrice              = CookieObject.getPriceOf;
Game.Object.prototype.getReturnInvestment   = CookieObject.getReturnInvestment;
Game.Object.prototype.getTimeLeft           = CookieObject.getTimeLeft;
Game.Object.prototype.getType               = CookieObject.getTypeOf;
Game.Object.prototype.getWorth              = CookieObject.getWorthOf;
Game.Object.prototype.identifier            = CookieObject.identifier;
Game.Object.prototype.matches               = CookieObject.matches;

Game.Upgrade.prototype.getBaseCostPerIncome = CookieObject.getBaseCostPerIncome;
Game.Upgrade.prototype.getPrice             = CookieObject.getPriceOf;
Game.Upgrade.prototype.getReturnInvestment  = CookieObject.getReturnInvestment;
Game.Upgrade.prototype.getTimeLeft          = CookieObject.getTimeLeft;
Game.Upgrade.prototype.getType              = CookieObject.getTypeOf;
Game.Upgrade.prototype.getWorth             = CookieObject.getWorthOf;
Game.Upgrade.prototype.identifier           = CookieObject.identifier;
Game.Upgrade.prototype.matches              = CookieObject.matches;