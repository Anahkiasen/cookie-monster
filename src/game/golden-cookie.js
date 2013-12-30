/**
 * Get the current frenzy multiplier
 *
 * @return {integer}
 */
CookieMonster.getFrenzyMultiplier = function() {
	return (Game.frenzy > 0) ? Game.frenzyPower : 1;
};

/**
 * Emphasize the apparition of a Golden Cookie
 *
 * @return {void}
 */
CookieMonster.emphasizeGolden = function() {
	$golden = this.whileOnScreen(this.$goldenCookie,
		function() {
			this.$goldenOverlay.hide();
			this.titleModifier = '';
		},
		function() {
			this.$goldenOverlay.show();

			this.Emphasizers.updateTitle('G');
			this.Emphasizers.playSound();
			this.Emphasizers.flashScreen();
		});

	if ($golden.is(':visible')) {
		this.Emphasizers.displayGoldenTimer();
	}
};

//////////////////////////////////////////////////////////////////////
////////////////////////////// DOM ELEMENTS //////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Create the overlay for the Golden Cookie
 *
 * @return {void}
 */
CookieMonster.createFlashOverlay = function() {
	$('body').append('<div id="cookie-monster__golden-overlay" onclick="Game.goldenCookie.click();"></div>');

	this.$goldenOverlay = $('#cookie-monster__golden-overlay');
};

/**
 * Create the flashing overlay
 *
 * @return {void}
 */
CookieMonster.createOverlay = function() {
	$('body').append('<div id="cookie-monster__overlay"></div>');

	this.$overlay = $('#cookie-monster__overlay');
};