/**
 * Estimate production for a given period
 *
 * @return {Integer}
 */
CookieMonster.estimateProduction = function() {
	return Game.cookiesPs * 60 * this.getSetting('EstimatesTime');
};

// Pledges
//////////////////////////////////////////////////////////////////////

/**
 * Compute the cost of pledges for a given time
 *
 * @return {Integer}
 */
CookieMonster.estimatePledgeCost = function() {
	var pledge   = Game.Upgrades['Elder Pledge'];
	var duration = Game.Has('Sacrificial rolling pins') ? 60 : 30;
	var required = this.getSetting('EstimatesTime') / duration;
	var price    = pledge.getPrice();

	var cost = 0;
	for (var i = 0; i < required; i++) {
		cost += price;

		// Recompute pledge price
		price = Math.pow(8, Math.min(Game.pledges + 2, 14));
		price *= Game.Has('Toy workshop') ? 0.95 : 1;
		price *= Game.Has('Santa\'s dominion') ? 0.98 : 1;
	}

	return cost;
};

/**
 * Compute the cost of the covenant for a given time
 *
 * @return {Integer}
 */
CookieMonster.estimateCovenantCost = function() {
	var production = this.estimateProduction();

	return production - (production * 0.95);
};

/**
 * Estimate the wrinklers rewards
 *
 * @return {Integer}
 */
CookieMonster.estimateWrinklersRewards = function() {
	var production = this.estimateProduction();

	return (production * 1.1) - production;
};

// Golden cookies
//////////////////////////////////////////////////////////////////////

/**
 * Get the average amount of cookies earned by manually clicking
 * on all lucky cookies
 *
 * @return {Integer}
 */
CookieMonster.estimateLuckyRewards = function() {
	var lapse     = this.getSetting('EstimatesTime') * 60;
	var minReward = this.getLuckyReward() * (lapse / (Game.goldenCookie.maxTime + this.getLuckyDuration()));
	var maxReward = this.getLuckyReward() * (lapse / (Game.goldenCookie.minTime + this.getLuckyDuration()));

	return Math.average(minReward, maxReward);
};