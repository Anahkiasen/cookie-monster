/**
 * Updates the various buff bars
 *
 * @return {void}
 */
CookieMonster.manageBuffs = function() {
	this.manageFrenzyBars();
	this.manageClickingFrenzy();
	this.manageTimersBar('seasonPopup', 'Next Reindeer');
	this.manageTimersBar('goldenCookie', 'Next Cookie');
};

/**
 * Destroy all bars in the game
 *
 * @return {void}
 */
CookieMonster.destroyBars = function() {
	var bars = ['Frenzy', 'BloodFrenzy', 'Clot', 'Clickfrenzy', 'goldenCookie', 'seasonPopup'];
	for (var bar in bars) {
		this.fadeOutBar(bar);
	}
};

/**
 * Get the width of the timers container
 *
 * @return {Integer}
 */
CookieMonster.getBarsWidth = function() {
	var windowWidth = window.innerWidth || document.documentElement;

	return 0.3 * windowWidth;
};

//////////////////////////////////////////////////////////////////////
///////////////////////////// DOM ELEMENTS ///////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Create the bars container
 *
 * @return {void}
 */
CookieMonster.createBarsContainer = function() {
	var $version = $('#versionNumber');

	// Create container and move version inside it
	$('#sectionLeft').append('<div id="cookie-monster__buff-bars"><div id="versionNumber">' +$version.text()+ '</div></div>');
	$version.remove();

	this.$timerBars = $('#cookie-monster__buff-bars');
};

//////////////////////////////////////////////////////////////////////
////////////////////////////////// BARS //////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Manage regular frenzies bars
 *
 * @return {void}
 */
CookieMonster.manageFrenzyBars = function() {
	var frenzy = this.frenzies[Game.frenzyPower];
	if (typeof frenzy === 'undefined') {
		return;
	}

	// Remove bars if the frenzy has ended or we disabled them
	if (Game.frenzy <= 0 || !this.getSetting('BuffBars')) {
		return this.fadeOutBar(frenzy.identifier);
	}

	// Update current bar
	this.updateBar(frenzy.name, frenzy.color, Game.frenzy);

	// As only one effect can be active at a time, we'll fade out
	// the other effect bars
	for (var frenzyPower in this.frenzies) {
		if (this.frenzies[frenzyPower].identifier !== frenzy.identifier) {
			this.fadeOutBar(this.frenzies[frenzyPower].identifier);
		}
	}
};

/**
 * Manage clicking frenzies bars
 *
 * @return {void}
 */
CookieMonster.manageClickingFrenzy = function() {
	if (Game.clickFrenzy <= 0 || !this.getSetting('BuffBars')) {
		return this.fadeOutBar('Clickfrenzy');
	}

	this.updateBar('Click frenzy', 'blue', Game.clickFrenzy);
};

/**
 * Manage a bar with multiple timers (min, max, etc.)
 *
 * @param {String} name
 * @param {String} label
 *
 * @return {Void}
 */
CookieMonster.manageTimersBar = function(name, label) {
	var timers   = [Game[name].time, Game[name].minTime, Game[name].maxTime];
	var width    = timers[2] - timers[0];
	var barWidth = width / timers[2] * 100;

	// Hide if popup on screen
	if (timers[0] <= 0 || this.onScreen[name] || !this.getSetting('CookieBar')) {
		return this.fadeOutBar(label);
	}

	// Update title
	var countdown = Math.round(width / Game.fps);
	if (name === 'goldenCookie' && countdown > 0 && !this.onScreen.goldenCookie) {
		this.setTitleModifier('goldenCookie', this.getSetting('CookieBar') ? countdown : '');
	}

	// Compute the max size of a single bar, and the size of grey bar
	var greyedOut   = (Game[name].maxTime - Game[name].minTime) / Game[name].maxTime;
	var maxBarWidth = this.getBarsWidth() * 0.75;

	var $container = this.updateBar(label, 'greyLight', width, barWidth);
	$('.cm-buff-bar__inner', $container).css('max-width', (maxBarWidth * greyedOut) + 'px');
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Update a buff bar's informations
 *
 * @param {String}  name
 * @param {String}  color
 * @param {Integer} timer
 * @param {Integer} width
 *
 * @return {void}
 */
CookieMonster.updateBar = function (name, color, timer, width) {
	var identifier = name.replace(' ', '');
	var $bar  = $('#cookie-monster__timer-'+identifier);
	var count = Math.round(timer / Game.fps);
	width = width || timer / Game.goldenCookie.maxTime * 100;

	// Autocleanup
	if (count <= 0) {
		this.fadeOutBar(identifier);
	}

	// Check existence
	if ($bar.length === 0) {
		$bar = this.createBar(name, color);
	}

	// Update timer
	$('#cmt_time_'+identifier).text(count);

	// Old-school if transitions are unsupported
	var $container = $('#cmt_'+identifier);
	if (typeof document.body.style.transition === 'undefined') {
		return $container.css('width', width+'%');
	}

	// Check if we applied transitions
	if ($container.hasClass('active')) {
		return;
	}

	// Add transition
	$container.addClass('active').css('width', width+'%');
	setTimeout(function() {
		$container.css({
			width      : 0,
			transition : 'width linear ' +count+ 's'
		});
	}, 100);
};

/**
 * Append a timer bar
 *
 * @param {String}  color
 * @param {Integer} count
 *
 * @return {void}
 */
CookieMonster.createBar = function (name, color) {
	var secondBars = {'Next Cookie': 'purple', 'Next Reindeer': 'orange'};
	var secondBar  = secondBars[name] || '';
	var identifier = name.replace(' ', '');

	// Add second bar for golden cookies
	if (secondBar) {
		secondBar = '<div class="cm-buff-bar__inner background-' +secondBar+ '" id="cmt2_'+secondBar+'"></div>';
	}

	this.$timerBars.append(
		'<div class="cm-buff-bar" id="cookie-monster__timer-' + identifier + '" style="display: none">'+
			'<p class="cm-buff-bar__name">'+name+'</p>'+
			'<div class="cm-buff-bar__container">'+
				'<div class="cm-buff-bar__bar background-' +color+ '" id="cmt_' + identifier + '">'+
					secondBar +
					'<div class="cm-buff-bar__timer" id="cmt_time_' + identifier + '">0</div>'+
				'</div>'+
			'</div>'+
		'</div>'
	);

	return $('#cookie-monster__timer-'+identifier).fadeIn(500);
};

/**
 * Fade out a bar of a certain effect
 *
 * @param {string} identifier
 *
 * @return {void}
 */
CookieMonster.fadeOutBar = function(identifier) {
	identifier = identifier.replace(' ', '');
	var $bar = $('#cookie-monster__timer-' + identifier);

	if ($bar.length === 1 && $bar.css('opacity') === '1') {
		$bar.fadeOut(500, function() {
			$(this).remove();
		});
	}
};