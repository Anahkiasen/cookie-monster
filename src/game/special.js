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
 * @return {Integer}
 */
CookieMonster.getWrinklersSucked = function(raw) {
	var sucked = 0;

	Game.wrinklers.forEach(function(wrinkler) {
		sucked += wrinkler.sucked;
	});

	return raw ? sucked : this.formatNumber(sucked);
};

/**
 * Get the reward for popping all wrinklers
 *
 * @param {String} context
 *
 * @return {String}
 */
CookieMonster.getWrinklersReward = function(context) {
	var sucked   = this.getWrinklersSucked(true);
	var modifier = 1.1;
	var result   = 0;

	switch (context) {
		case 'reward':
			result = (sucked * modifier) - sucked;
			break;

		default:
			result = sucked * modifier;
			break;
	}

	return this.formatNumber(result);
};