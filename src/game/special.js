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