/**
 * Emphasize the apparition of a Reindeer
 *
 * @return {void}
 */
CookieMonster.emphasizeSeason = function() {
	var $reindeer = this.$reindeer;

	if ($reindeer.is(':hidden') && this.onScreen.season) {
		this.onScreen.season = false;
		this.$flashOverlay.hide();
	} else if ($reindeer.is(':visible') && !this.onScreen.season) {
		this.onScreen.season = true;
		this.Emphasizers.playSound();
		this.Emphasizers.flashScreen();
	}

	if ($reindeer.is(':visible')) {
		this.Emphasizers.displayGoldenTimer();
	}
};