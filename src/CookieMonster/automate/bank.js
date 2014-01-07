/**
 * Whether Automate should buy stuff or wait to
 * get a more correct bank
 *
 * @param {Object} object
 *
 * @return {Boolean}
 */
CookieMonster.Automate.waitOrBuy = function(object) {
	if (!object || !object.buy) {
		return;
	}

	// Bank delaying
	var doesntRuinBank = this.hasEnoughInBank(object.getPrice());

	// Buy objet if all conditions are met
	if (doesntRuinBank || this.hasEnoughInBank()) {
		object.buy();
	}
};

/**
 * Check if the Automate has enough in bank for
 * Lucky cookies
 *
 * @return {Boolean}
 */
CookieMonster.Automate.hasEnoughInBank = function(purchase) {
	puchase = purchase || 0;

	return (Game.cookies - purchase) >= this.getTargetBank();
};

/**
 * Get the current amount of targeted bank
 *
 * @return {Integer}
 */
CookieMonster.Automate.getTargetBank = function() {
	var banks = [0, CookieMonster.getLuckyTreshold(), CookieMonster.getLuckyTreshold('frenzy')];

	// Compute bank values and keep the best one
	banks = banks.map(function(bank) {
		return CookieMonster.Automate.getBankValue(bank);
	});

	return Math.max.apply(Math, banks);
};

/**
 * Get the value of a bank
 *
 * @todo
 *
 * @param {Integer} bank
 *
 * @return {Integer}
 */
CookieMonster.Automate.getBankValue = function(bank) {
	var value = 0;

	// @todo
	// Actually compute the value of a bank here
	// Not sure how

	return value;
};