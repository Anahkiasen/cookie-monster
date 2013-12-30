/**
 * Updates the various buff bars
 *
 * @return {void}
 */
CookieMonster.manageBuffs = function() {
	this.manageFrenzyBars();
	this.manageClickingFrenzy();
	this.manageNextCookie();
	this.manageNextReindeer();

	// Offset version number
	$('#versionNumber').css('bottom', this.$timerBars.css('height'));
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
	$('#sectionLeft').append('<div id="cookie-monster__buff-bars"></div>');

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
	var frenzyName = '';
	var color      = '';
	var multiplier = 0;

	// Detect what kind of frenzy we're in
	switch (Game.frenzyPower) {
		case 7:
			multiplier = 77 + 77 * Game.Has('Get lucky');
			frenzyName = 'Frenzy';
			color      = this.color('yellow');
			break;

		case 666:
			multiplier = 6 + 6 * Game.Has('Get lucky');
			frenzyName = 'Blood Frenzy';
			color      = this.color('green');
			break;

		case 0.5:
			multiplier = 66 + 66 * Game.Has('Get lucky');
			frenzyName = 'Clot';
			color      = this.color('red');
			break;
	}

	// Remove bars if the frenzy has ended or we disabled them
	if (Game.frenzy <= 0 || !this.getBooleanSetting('BuffBars')) {
		return this.fadeOutBar(color);
	}

	this.updateBar(frenzyName, color, Game.frenzy);

	// No idea what that does
	var buffColors = [this.color('yellow'), this.color('green'), this.color('red')];
	for (var thisColor in buffColors) {
		this.fadeOutBar(buffColors[thisColor], color);
	}
};

/**
 * Manage clicking frenzies bars
 *
 * @return {void}
 */
CookieMonster.manageClickingFrenzy = function() {
	if (Game.clickFrenzy <= 0 || !this.getBooleanSetting('BuffBars')) {
		return this.fadeOutBar('blue');
	}

	this.updateBar('Click frenzy', 'blue', Game.clickFrenzy);
};

/**
 * Manage the "Next Reindeer" bar
 *
 * @return {void}
 */
CookieMonster.manageNextReindeer = function() {
	var timers = [Game.seasonPopup.time, Game.seasonPopup.minTime, Game.seasonPopup.maxTime];
	var width  = timers[2] - timers[0];

	// Hide if Reindeer on screen
	if (timers[0] <= 0 || this.$reindeer.is(':visible') || !this.getBooleanSetting('CookieBar')) {
		return this.fadeOutBar('orange');
	}

	this.updateBar('Next Reindeer', 'orange', width, width / timers[2] * 100);
};

/**
 * Manage the "Next cookie" bar
 *
 * @return {void}
 */
CookieMonster.manageNextCookie = function() {
	var barsWidth = parseInt(this.$timerBars.css('width'));
	var timers    = [Game.goldenCookie.time, Game.goldenCookie.minTime, Game.goldenCookie.maxTime];
	var width     = timers[2] - timers[0];
	var countdown = Math.round(width / Game.fps);

	// Update title
	if (countdown > 0 && this.$goldenCookie.is(':hidden')) {
		this.titleModifier = this.getBooleanSetting('CookieBar') ? '(' + countdown + ') ' : '';
	}

	// Cancel if disabled
	if (timers[0] <= 0 || this.$goldenCookie.is(':visible') || !this.getBooleanSetting('CookieBar')) {
		return this.fadeOutBar('purple');
	}

	this.updateBar('Next Cookie', 'purple', width, width / timers[2] * 100);
	$('#cmt2_'+this.color('purple')).css('max-width', (barsWidth - 189) * 0.67 + "px");
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
	var $bar = $('#cookie-monster__timer-'+color);

	// Create bar if it doesn't exist
	if ($bar.length !== 1) {
		this.createBar(name, color);
	}

	// Define text count and CSS width
	var count = timer / Game.fps;
	if (typeof width === 'undefined') {
		width = timer / Game.goldenCookie.maxTime * 100;
	}

	$('#cmt_'+color).css('width', width);
	$('#cmt_time_'+color).text(Math.round(count));
	$bar.fadeIn(250);
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
	var secondBar  = '';

	// Add second bar for golden cookies
	if (name === 'Next Cookie') {
		secondBar = '<div class="cm-buff-bar__bar background-purple" id="cmt2_'+this.color('purple')+'"></div>';
	}

	this.$timerBars.append(
		'<div class="cm-buff-bar" id="cookie-monster__timer-' + color + '">'+
			'<table cellpadding="0" cellspacing="0">'+
				'<tr>' +
					'<td>' + name + "<td>" +
					'<td>'+
						'<div class="cm-buff-bar__container background-' +color+ '" id="cmt_' + color + '">'+
							secondBar +
							'<div class="cm-buff-bar__timer" id="cmt_time_' + color + '">0</div>'+
						'</div>'+
					'</td>'+
					'<td style="width:55px;"></td>'+
				'</tr>' +
			'</table>'+
		'</div>');
};

/**
 * Fade out a bar of a certain color
 *
 * @param {string} color
 *
 * @return {void}
 */
CookieMonster.fadeOutBar = function(color, match) {
	var $bar = $("#cookie-monster__timer-" + color);

	if ($bar.length === 1 && $bar.css("opacity") === "1" && color !== match) {
		$bar.stop(true, true).fadeOut(250);
	}
};