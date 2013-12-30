//////////////////////////////////////////////////////////////////////
////////////////////////////// EMPHASIZERS ///////////////////////////
//////////////////////////////////////////////////////////////////////

CookieMonster.Emphasizers = {};

/**
 * Executes actions while something goes in and out of focus
 *
 * @param {DOMElement} $selector
 * @param {Closure}    offScreen
 * @param {Closure}    onScreen
 *
 * @return {DOMElement}
 */
CookieMonster.whileOnScreen = function($selector, offScreen, onScreen) {
	var identifier = $selector.attr('id');

	// Set key in array if it doesn't exist
	if (typeof this.onScreen[identifier] === 'undefined') {
		this.onScreen[identifier] = false;
	}

	// Execute the two callbacks
	if ($selector.is(':hidden') && this.onScreen[identifier]) {
		this.onScreen[identifier] = false;
		offScreen.call(this, $selector);
	} else if ($selector.is(':visible') && !this.onScreen[identifier]) {
		this.onScreen[identifier] = true;
		onScreen.call(this, $selector);
	}

	return $selector;
};

/**
 * Display a timer in an overlay above the golden cookie
 *
 * @return {Void}
 */
CookieMonster.Emphasizers.displayGoldenTimer = function() {
	if (!CookieMonster.getBooleanSetting('CookieTimer')) {
		return;
	}

	CookieMonster.$goldenOverlay
		.css(CookieMonster.$goldenCookie.css(['opacity', 'top', 'left', 'top']))
		.text(Math.round(Game.goldenCookie.life / Game.fps));
};

/**
 * Update the title of the page to notify about something
 *
 * @return {String}
 */
CookieMonster.Emphasizers.updateTitle = function(type) {
	if (!CookieMonster.getBooleanSetting('UpdateTitle')) {
		return;
	}

	CookieMonster.titleModifier = '(' +type+ ') ';
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

	if (CookieMonster.onScreen.goldenCookie) {
		CookieMonster.updateFavicon('cm_gc_' +frame);
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
	if (!CookieMonster.getBooleanSetting('Sounds')) {
		return;
	}

	CookieMonster.playBell();
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

	CookieMonster.$flashOverlay.fadeIn(100);
	CookieMonster.$flashOverlay.fadeOut(500);
};