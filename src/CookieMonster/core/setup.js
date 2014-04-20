/**
 * Setup CookieMonster
 *
 * @return {void}
 */
CookieMonster.start = function() {
	if (!this.shouldRun()) {
		return;
	}

	// Setup Cookie Monster
	this.hookIntoNative();

	// Add Cookie Monster elements
	this.setupElements();

	// Load stylesheet
	this.loadSettings();
	this.loadStyles();

	// Add ID to favicon
	$('link[href="favicon.ico"]').attr('id', 'cm_favicon');

	// Events
	this.Events.onGoldenClick();

	// Start the loop
	this.mainLoop();
	Game.RefreshStore();

	Game.Popup('<span class="cm-popup">Cookie Monster ' + this.version + ' Loaded!</span>');
};

/**
 * Set up the DOM elements of Cookie Monster
 *
 * @return {void}
 */
CookieMonster.setupElements = function() {
	this.createBottomBar();
	this.createGoldenOverlay();
	this.createFlashOverlay();
	this.createBarsContainer();
	this.createStoreCounters();
	this.setupTooltips();
};

/**
 * Load some styles
 *
 * @return {void}
 */
CookieMonster.loadStyles = function() {
	var stylesheet = this.runningInLocal() ? 'http://localhost/_github/cookie-monster/dist/cookie-monster' : this.domain+'/cookie-monster';
	var $styles    = $('#cookie-monster__styles');

	// Create link if undefined
	if ($styles.length === 0) {
		$('head').append('<link id="cookie-monster__styles" rel="stylesheet" href="">');
		$styles = $('#cookie-monster__styles');
	}

	// Add colorblind modifier if necessary
	if (this.getSetting('Colorblind')) {
		stylesheet += '-colorblind';
	}

	$styles.attr('href', stylesheet+'.min.css?'+new Date().getTime());
};

/**
 * Executes the main updating loop to refrsh CookieMonster
 *
 * @return {void}
 */
CookieMonster.mainLoop = function() {
	CookieMonster.updateTable();
	CookieMonster.updateTooltips();
	CookieMonster.manageBars();

	CookieMonster.emphasizeGolden();
	CookieMonster.emphasizeSeason();

	setTimeout(function() {
		CookieMonster.mainLoop();
	}, CookieMonster.getSetting('Refresh'));
};

/**
 * Tear down Cookie Monster completely and rebuild it
 *
 * @return {void}
 */
CookieMonster.tearDown = function() {
	// Destroy current elements
	this.destroyBars();
	this.$goldenOverlay.remove();
	this.monsterBar.remove();
	this.$flashOverlay.remove();
	this.$timerBars.remove();
	$('#cookie-monster__store').remove();

	// Redo a setup
	this.setupElements();
};
