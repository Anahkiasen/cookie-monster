/**
 * Emphasize the apparition of a Reindeer
 *
 * @return {void}
 */
CookieMonster.emphasizeSeason = function() {
	this.whileOnScreen(this.$reindeer,
		function() {
			this.$flashOverlay.hide();
		},
		function() {
			this.Emphasizers.playSound();
			this.Emphasizers.flashScreen();
		});
};