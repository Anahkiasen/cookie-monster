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
	var onScreen = this.whileOnScreen('goldenCookie',
		function() {
			this.$goldenOverlay.hide();
		},
		function() {
			this.$goldenOverlay.show();

			this.Emphasizers.faviconSpinner(1);
			this.Emphasizers.playSound();
			this.Emphasizers.flashScreen();
		});

	if (onScreen) {
		this.Emphasizers.displayGoldenTimer();
	}
};

//////////////////////////////////////////////////////////////////////
///////////////////////////// LUCKY COOKIES //////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the lifespan of a Lucky Cookie
 *
 * @return {Integer}
 */
CookieMonster.getLuckyDuration = function() {
	var duration = Game.goldenCookie.dur;

	// Add multiplier
	duration *= Game.Has('Lucky day') ? 2 : 1;
	duration *= Game.Has('Serendipity') ? 2 : 1;

	return duration;
};

/**
 * Get the amount of cookies required for Lucky Cookies, formatted
 *
 * @param {String} context [current,frenzy]
 *
 * @return {String}
 */
CookieMonster.luckyRequiredFormatted = function(context) {
	var treshold = this.getLuckyTreshold(context);
	var unmet    = Game.cookies < treshold;
	var color    = unmet ? 'red' : 'green';
	var timeLeft = unmet ? ' (' +this.formatCompressedTime(this.getTimeToCookies(treshold))+ ')' : '';

	return '<strong class="text-' +color+ '">' + this.formatNumber(treshold) + '</strong>' +timeLeft;
};

/**
 * Get the reward for Lucky Cookies
 *
 * Lowest of 10% of cookies in bank, or 20mn of production
 *
 * @param {String} context [current,frenzy,max]
 *
 * @return {String}
 */
CookieMonster.getLuckyReward = function(context, income) {
	var twentyMinutes = this.getLuckyTreshold(context, income) / 10;
	var tenPercent    = Math.round(Game.cookies * 0.1 + 13);

	// If we want to know how much would 20mn earn, return
	// the simulated frenzy
	if (context === 'max' || context === 'frenzy') {
		if ((twentyMinutes * 10) > Game.cookies) {
			return twentyMinutes;
		}
	}

	return Math.min(twentyMinutes, tenPercent);
};

/**
 * Get how much a Lucky cookie would yield for a particular context
 * Doesn't take into account current cookies, just the "max" you
 * could get
 *
 * Formula is cookiesPs * 60 * 20 + 13 (for some reason)
 *
 * @param {String} context
 *
 * @return {Integer}
 */
CookieMonster.getLuckyTreshold = function(context, income) {
	var reward = (income || Game.cookiesPs);

	// Here we remove the effects of the current multiplier
	// to get the real Cookies/s
	if (context !== 'current') {
		reward /= this.getFrenzyMultiplier();
	}

	// If we want we simulate a frenzy
	if (context === 'frenzy') {
		reward *= 7;
	}

	return Math.round((reward * 60 * 20 + 13) * 10);
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
	$('body').append('<div id="cookie-monster__golden-overlay" onclick="Game.goldenCookie.click();"></div>');

	this.$goldenOverlay = $('#cookie-monster__golden-overlay');
};

/**
 * Create the flashing overlay
 *
 * @return {void}
 */
CookieMonster.createFlashOverlay = function() {
	$('body').append('<div id="cookie-monster__overlay"></div>');

	this.$flashOverlay = $('#cookie-monster__overlay');
};