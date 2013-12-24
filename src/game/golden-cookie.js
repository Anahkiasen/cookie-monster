/**
 * Get the current frenzy multiplier
 *
 * @return {integer}
 */
CookieMonster.getFrenzyMultiplier = function() {
	return (Game.frenzy > 0) ? Game.frenzyPower : 1;
};

//////////////////////////////////////////////////////////////////////
////////////////////////////// DOM ELEMENTS //////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Create the overlay for the Golden Cookie
 *
 * @return {void}
 */
CookieMonster.createGoldenOverlay = function() {
	$('body').append('<div id="cookie_monster_golden_overlay" onclick="Game.goldenCookie.click();"></div>');

	this.$goldenOverlay = $('#cookie_monster_golden_overlay').css({
		'cursor'         : 'pointer',
		'display'        : 'none',
		'font-family'    : 'Kavoon, Georgia, serif',
		'font-size'      : '32px',
		'height'         : '96px',
		'opacity'        : '0',
		'pointer-events' : 'none',
		'position'       : 'fixed',
		'text-align'     : 'center',
		'text-shadow'    : '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
		'width'          : '96px',
		'z-index'        : '1000002',
		'padding-top'    : '30px',
	});
};

/**
 * Create the flashing overlay
 *
 * @return {void}
 */
CookieMonster.createOverlay = function() {
	$('body').append('<div id="cookie_monster_overlay"></div>');

	this.$overlay = $('#cookie_monster_overlay').css({
		'background'     : 'white',
		'display'        : 'none',
		'height'         : '100%',
		'pointer-events' : 'none',
		'position'       : 'fixed',
		'width'          : '100%',
		'z-index'        : '1000000',
	});
};

//////////////////////////////////////////////////////////////////////
////////////////////////////// EMPHASIZERS ///////////////////////////
//////////////////////////////////////////////////////////////////////

CookieMonster.Emphasizers = {};

/**
 * Emphasize the apparition of a Golden Cookie
 *
 * @return {void}
 */
CookieMonster.emphasizeGolden = function() {
	var $golden = this.$goldenCookie;

	if ($golden.is(':hidden') && !this.emphasize) {
		this.emphasize = true;
		this.$goldenOverlay.hide();

		this.goldenCookieAvailable = '';
	} else if ($golden.is(':visible') && this.emphasize) {
		this.emphasize = false;
		this.$goldenOverlay.show();

		this.Emphasizers.updateTitle();
		this.Emphasizers.playSound();
		this.Emphasizers.flashScreen();
	}

	if ($golden.is(':visible')) {
		this.Emphasizers.displayTimer();
	}
};

CookieMonster.Emphasizers.displayTimer = function() {
	if (!CookieMonster.getBooleanSetting('CookieTimer')) {
		return;
	}

	CookieMonster.$goldenOverlay
		.css(CookieMonster.$goldenCookie.css(['opacity', 'top', 'left', 'top']))
		.text(Math.round(Game.goldenCookie.life / Game.fps));
};

CookieMonster.Emphasizers.updateTitle = function() {
	if (!CookieMonster.getBooleanSetting('UpdateTitle')) {
		return;
	}

	CookieMonster.goldenCookieAvailable = "(G) ";
	this.faviconSpinner(1);
};

/**
 * Changes the favicon according to current state
 *
 * @param {integer} frame The current sprite of the favicon
 *
 * @return {void}
 */
CookieMonster.Emphasizers.faviconSpinner = function(frame) {
	if (frame > 6) {
		frame = 1;
	}

	if (CookieMonster.goldenCookieAvailable === "(G) ") {
		CookieMonster.updateFavicon('http://frozenelm.com/cookiemonster/images/cm_gc_' +frame+ '.png');
		frame++;
		setTimeout(function () {
			CookieMonster.Emphasizers.faviconSpinner(frame);
		}, 250);
	} else {
		CookieMonster.updateFavicon('http://orteil.dashnet.org/cookieclicker/img/favicon.ico');
	}
};

/**
 * Play the Golden Cookie sound
 *
 * @return {void}
 */
CookieMonster.Emphasizers.playSound = function() {
	if (!CookieMonster.getBooleanSetting('CookieSound')) {
		return;
	}

	CookieMonster.playSound('http://frozenelm.com/cookiemonster/sounds/ba%20dink.mp3');
};

/**
 * Flash the screen
 *
 * @return {void}
 */
CookieMonster.Emphasizers.flashScreen = function() {
	if (!CookieMonster.getBooleanSetting('FlashScreen')) {
		return;
	}

	CookieMonster.$overlay.fadeIn(100);
	CookieMonster.$overlay.fadeOut(500);
};