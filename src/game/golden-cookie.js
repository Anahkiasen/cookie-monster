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

//////////////////////////////////////////////////////////////////////
////////////////////////////// EMPHASIZERS ///////////////////////////
//////////////////////////////////////////////////////////////////////

CookieMonster.Emphasizers = {};

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

//////////////////////////////////////////////////////////////////////
/////////////////////////////// BUFF BARS ////////////////////////////
//////////////////////////////////////////////////////////////////////

CookieMonster.manageBuffs = function() {
	this.manageFrenzyBars();
	this.manageClickingFrenzy();
	this.manageNextCookie();

	// Offset version number
	$('#versionNumber').css('bottom', this.$timerBars.css('height'));
};

// Bars
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
			multiplier = 77 + 77 * Game.Has("Get lucky");
			frenzyName = "Frenzy";
			color      = this.colors.yellow;
			break;

		case 666:
			multiplier = 6 + 6 * Game.Has("Get lucky");
			frenzyName = "Blood Frenzy";
			color      = this.colors.green;
			break;

		case 0.5:
			multiplier = 66 + 66 * Game.Has("Get lucky");
			frenzyName = "Clot";
			color      = this.colors.red;
			break;
	}

	// Remove bars if the frenzy has ended or we disabled them
	if (Game.frenzy <= 0 || !this.getBooleanSetting('BuffBars')) {
		return this.fadeOutBar(color);
	}

	this.updateBar(frenzyName, color, Game.frenzy);

	var buffColors = [this.colors.yellow, this.colors.green, this.colors.red];
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
		return this.fadeOutBar(this.colors.blue);
	}

	this.updateBar('Click frenzy', this.colors.blue, Game.clickFrenzy);
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
	if (countdown > 0 && CookieMonster.$goldenCookie.is(':hidden')) {
		this.goldenCookieAvailable = this.getBooleanSetting('CookieCD') ? "(" + countdown + ") " : '';
	}

	// Cancel if disabled
	if (timers[0] <= 0 || CookieMonster.$goldenCookie.is(':visible') || !this.getBooleanSetting('CookieCD')) {
		return this.fadeOutBar(this.colors.purple);
	}

	this.updateBar('Next Cookie', this.colors.purple, width, width / timers[2] * 100);
	$('#cmt2_'+this.colors.purple).css('max-width', (barsWidth - 189) * 0.67 + "px");
};

// Helpers
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
	var $bar = $('#cookie_monster_timer_'+color);
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
	$('#cookie_monster_timer_'+color).fadeIn(250);
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
	var secondBar = '';
	if (name === 'Next Cookie') {
		secondBar = '<div id="cmt2_'+this.colors.purple+'" style="position:relative; background:#' +this.colors.purple+'; height:10px; width:100%; margin-left:0px; max-width:0px; float:right;"></div>';
	}

	this.$timerBars.append(
		'<div id="cookie_monster_timer_' + color + '" style="padding:4px 0px 5px 0px;">'+
		'<table cellpadding=0 cellspacing=0 style="font-style:inherit; color:inherit; width:100%;">'+
			'<tr>' +
				'<td style="width:130px; text-align:right;">' + name + "<td>" +
				'<td>'+
					'<div id="cmt_' + color + '" style="position:relative; background:#' + color + '; height:10px; width:100%; margin-left:4px; border:1px solid black;">'+
						secondBar +
						'<div id="cmt_time_' + color + '" style="text-align:left; position:absolute; right:-50px; top:-5px; width:45px;">0</div>'+
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
	var $bar = $("#cookie_monster_timer_" + color);

	if ($bar.length === 1 && $bar.css("opacity") === "1" && color !== match) {
		$bar.stop(true, true).fadeOut(250);
	}
};