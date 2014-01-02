//////////////////////////////////////////////////////////////////////
//////////////////////////////// SEASONS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Emphasize the apparition of a Reindeer
 *
 * @return {void}
 */
CookieMonster.emphasizeSeason = function() {
	this.whileOnScreen('seasonPopup',
		function() {
			this.$flashOverlay.hide();
		},
		function() {
			this.Emphasizers.playSound('http://www.freesound.org/data/previews/121/121099_2193266-lq.mp3');
			this.Emphasizers.flashScreen();
		});
};

/**
 * Get the reward for clicking on a Reindeer
 *
 * 1mn of production or 25 cookies
 *
 * @return {Integer}
 */
CookieMonster.getReindeerReward = function() {
	var multiplier = Game.Has('Ho ho ho-flavored frosting') ? 2 : 1;

	return this.formatNumber(Math.max(25, Game.cookiesPs * 60) * multiplier);
};

//////////////////////////////////////////////////////////////////////
////////////////////////////// ELDER WRATH ///////////////////////////
//////////////////////////////////////////////////////////////////////

// Wrinklers
//////////////////////////////////////////////////////////////////////

/**
 * Get the amount of cookies sucked by wrinklers
 *
 * @param {Integer} modifier
 * @param {Boolean} formatted
 *
 * @return {Integer}
 */
CookieMonster.getWrinklersSucked = function(formatted, modifier) {
	var sucked = 0;
	modifier = modifier || 1;

	// Here we loop over the wrinklers and
	// compute how muck cookies they sucked * the modifier
	Game.wrinklers.forEach(function(wrinkler) {
		sucked += wrinkler.sucked * modifier;
	});

	return formatted ? this.formatNumber(sucked) : sucked;
};

/**
 * Get the reward for popping all wrinklers
 *
 * @param {String} context
 *
 * @return {String}
 */
CookieMonster.getWrinklersReward = function(context) {
	var sucked = this.getWrinklersSucked(false, 1.1);

	// If we only want the actual benefit from the wrinklers
	// We substract how much they sucked without the modifier
	if (context === 'reward') {
		sucked -= this.getWrinklersSucked();
	}

	return this.formatNumber(sucked);
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
	var required = lapse / duration;
	var price    = pledge.getPrice();

	var cost = 0;
	for (var i = 0; i < required; i++) {
		cost += price;

		// Recompute pledge price
		price = Math.pow(8, Math.min(Game.pledges + 2, 14));
		price *= Game.Has('Toy workshop') ? 0.95 : 1;
		price *= Game.Has('Santa\'s dominion') ? 1 : 0.98;
	}

	return this.formatNumber(cost);
};

/**
 * Compute the cost of the covenant for a given time
 *
 * @param {Integer} lapse (mn)
 *
 * @return {Integer}
 */
CookieMonster.estimateCovenantCost = function(lapse) {
	var income = Game.cookiesPs * (lapse * 60);

	return this.formatNumber(income - (income * 0.95));
};