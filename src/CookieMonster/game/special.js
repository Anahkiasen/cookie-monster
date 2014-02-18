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

	return Math.max(25, Game.cookiesPs * 60) * multiplier;
};

//////////////////////////////////////////////////////////////////////
////////////////////////////// ELDER WRATH ///////////////////////////
//////////////////////////////////////////////////////////////////////

// Wrinklers
//////////////////////////////////////////////////////////////////////

/**
 * Get the amount of cookies withered by wrinklers
 *
 * @return {Integer}
 */
CookieMonster.getWrinklersWithered = function(onlyNumber) {
	var withered = 0;
	var isCorrect = true;
	onlyNumber = onlyNumber || false;
	
	// Here we loop over the wrinklers and
	// compute how muck cookies they withered
	Game.wrinklers.forEach(function(wrinkler) {
		withered += wrinkler.withered;
		if (wrinkler.sucked > 0 && !wrinkler.witheredIsCorrect) {
			isCorrect = false;
		}
	});

	if (onlyNumber ) {
		return withered;
	}
	else if (!isCorrect) {
		return CookieMonster.formatNumber(withered) + " (WARNING!!! This value is incorrect. Pop all wrinklers, that already present in game on Cookie Monster load!)";
	}
	else {
		return CookieMonster.formatNumber(withered);
	}
};

/**
 * Get the amount of cookies sucked by wrinklers
 *
 * @param {Integer} modifier
 *
 * @return {Integer}
 */
CookieMonster.getWrinklersSucked = function(modifier) {
	var sucked = 0;
	modifier = modifier || 1;

	// Here we loop over the wrinklers and
	// compute how muck cookies they sucked * the modifier
	Game.wrinklers.forEach(function(wrinkler) {
		sucked += wrinkler.sucked * modifier;
	});

	return sucked;
};

/**
 * Get the reward for popping all wrinklers
 *
 * @param {String} context
 *
 * @return {String}
 */
CookieMonster.getWrinklersReward = function(context) {
	var sucked = this.getWrinklersSucked(1.1);

	// If we only want the actual benefit from the wrinklers
	// We substract how much they sucked without the modifier
	if (context === 'benefits') {
		sucked -= this.getWrinklersSucked();
	}

	return CookieMonster.formatNumber(sucked) + " (" + this.formatNumber(sucked/this.getWrinklersWithered(true)) + "x of withered)";
};