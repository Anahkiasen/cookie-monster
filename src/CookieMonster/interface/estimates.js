/**
 * Get the time to compute estimates from
 *
 * @param {Integer} time
 *
 * @return {Integer}
 */
CookieMonster.getEstimateTime = function(time) {
	if (typeof time === 'undefined') {
		return this.getSetting('EstimatesTime');
	}

	return time;
};

// Pledges
//////////////////////////////////////////////////////////////////////

/**
 * Compute the cost of pledges for a given time
 *
 * @param {Integer} lapse (mn)
 *
 * @return {Integer}
 */
CookieMonster.estimatePledgeCost = function(lapse) {
	var pledge   = Game.Upgrades['Elder Pledge'];
	var duration = Game.Has('Sacrificial rolling pins') ? 60 : 30;
	var required = this.getEstimateTime(lapse) / duration;
	var price    = pledge.getPrice();

	var cost = 0;
	for (var i = 0; i < required; i++) {
		cost += price;

		// Recompute pledge price
		price = Math.pow(8, Math.min(Game.pledges + 2, 14));
		price *= Game.Has('Toy workshop') ? 0.95 : 1;
		price *= Game.Has('Santa\'s dominion') ? 1 : 0.98;
	}

	return cost;
};

/**
 * Compute the cost of the covenant for a given time
 *
 * @param {Integer} lapse (mn)
 *
 * @return {Integer}
 */
CookieMonster.estimateCovenantCost = function(lapse) {
	var income = Game.cookiesPs * (this.getEstimateTime(lapse) * 60);

	return income - (income * 0.95);
};

/**
 * Estimate the wrinklers rewards
 *
 * @param {Integer} lapse
 *
 * @return {Integer}
 */
CookieMonster.estimateWrinklersRewards = function(lapse) {
	var production = Game.cookiesPs * 60 * this.getEstimateTime(lapse);

	return (production * 1.1) - production;
};

// Golden cookies
//////////////////////////////////////////////////////////////////////

/**
 * Get the average amount of cookies earned by manually clicking
 * on all lucky cookies for 60mn
 *
 * @param {Integer} lapse
 *
 * @return {Integer}
 */
CookieMonster.estimateLuckyRewards = function(lapse) {
	lapse         = this.getEstimateTime(lapse) * 60;
	var reward    = this.luckyReward();
	var minReward = reward * (lapse / (Game.goldenCookie.maxTime + this.getLuckyDuration()));
	var maxReward = reward * (lapse / (Game.goldenCookie.minTime + this.getLuckyDuration()));

	return minReward + maxReward / 2;
};