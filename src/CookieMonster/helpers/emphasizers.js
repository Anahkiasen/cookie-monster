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
CookieMonster.whileOnScreen = function(identifier, offScreen, onScreen) {

	// Set key in array if it doesn't exist
	if (typeof this.onScreen[identifier] === 'undefined') {
		this.onScreen[identifier] = false;
	}

	// Execute the two callbacks
	if (Game[identifier].life <= 0 && this.onScreen[identifier]) {
		this.onScreen[identifier] = false;
		this.removeTitleModifier(identifier);

		offScreen.call(this);
	} else if (Game[identifier].life && !this.onScreen[identifier]) {
		this.onScreen[identifier] = true;
		this.Emphasizers.updateTitle(identifier);

		onScreen.call(this);
	}

	return this.onScreen[identifier];
};

//////////////////////////////////////////////////////////////////////
///////////////////////////////// TITLE //////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get all the title modifiers
 *
 * @return {String}
 */
CookieMonster.getTitleModifiers = function() {
	var modifiers = [];

	// Get all modifiers
	for (var modifier in this.titleModifiers) {
		modifier = this.titleModifiers[modifier];
		if (modifier) {
			modifiers.push(modifier);
		}
	}

	return '[' +modifiers.join('][')+ '] ';
};

/**
 * Set a title modifier
 *
 * @param {String} index
 * @param {String} value
 */
CookieMonster.setTitleModifier = function(index, value) {
	this.titleModifiers[index] = value;
};

/**
 * Remove a title modifier
 *
 * @param {String} index
 *
 * @return {Void}
 */
CookieMonster.removeTitleModifier = function(index) {
	this.titleModifiers[index] = '';
};

//////////////////////////////////////////////////////////////////////
////////////////////////////// EMPHASIZERS ///////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Display a timer in an overlay above the golden cookie
 *
 * @return {Void}
 */
CookieMonster.Emphasizers.displayGoldenTimer = function() {
	if (!CookieMonster.getSetting('CookieTimer')) {
		return false;
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
CookieMonster.Emphasizers.updateTitle = function(identifier) {
	if (!CookieMonster.getSetting('UpdateTitle')) {
		return false;
	}

	// Get the letter to respond to
	var letters = {
		goldenCookie : 'G',
		seasonPopup  : 'R'
	};

	CookieMonster.setTitleModifier(identifier, letters[identifier]);
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
CookieMonster.Emphasizers.playSound = function(sound) {
	if (!CookieMonster.getSetting('Sounds')) {
		return false;
	}

	return sound ? CookieMonster.playSound(sound) : CookieMonster.playBell();
};

/**
 * Flash the screen
 *
 * @return {void}
 */
CookieMonster.Emphasizers.flashScreen = function() {
	if (!CookieMonster.getSetting('FlashScreen')) {
		return;
	}

	CookieMonster.$flashOverlay.fadeIn(100);
	CookieMonster.$flashOverlay.fadeOut(500);
};