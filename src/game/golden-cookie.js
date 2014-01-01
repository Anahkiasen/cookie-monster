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
			this.titleModifier = '';
		},
		function() {
			this.$goldenOverlay.show();

			this.Emphasizers.updateTitle('G');
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
 * Get the lucky reward for a particular situation
 *
 * @param {String}  context   [regular,max]
 * @param {Boolean} formatted Return in text form or formatted
 *
 * @return {String}
 */
CookieMonster.luckyReward = function(context, formatted) {
	var reward = Math.round(this.getFrenzyRate(context) / 0.1);

	if (formatted) {
		if (reward <= Game.cookies) {
			reward = '<strong class="text-green">' + this.formatNumber(reward) + '</strong>';
		} else {
			reward = this.formatNumber(reward);
		}
	}

	return reward;
};

/**
 * Get the (MAX) lucky reward for a particular situation
 *
 * @param {String} context [current,max,max_frenzy]
 *
 * @return {String}
 */
CookieMonster.maxLuckyReward = function(context) {
	var reward = this.getFrenzyRate(context);
	var number = [Math.round(reward), Math.round(Game.cookies * 0.1 + 13)];

	if (context === 'max' || context === 'frenzy') {
		if (Math.round(reward / 0.1) > Game.cookies) {
			return this.formatNumber(number[0]);
		}
	}

	return this.formatNumber(Math.min.apply(Math, number));
};

/**
 * Get the frenzy Cookie/s for a context
 *
 * @param {String} context
 *
 * @return {Integer}
 */
CookieMonster.getFrenzyRate = function(context) {
	var reward = Game.cookiesPs;

	if (Game.frenzy > 0 && context !== 'current') {
		reward = reward / Game.frenzyPower;
	}
	if (context === 'frenzy') {
		reward = reward * 7;
	}

	return reward * 1200 + 13;
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