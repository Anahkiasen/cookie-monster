/**
 * Updates the various buff bars
 *
 * @return {void}
 */
CookieMonster.manageBuffs = function() {
	this.manageFrenzyBars();
	this.manageClickingFrenzy();
	this.manageNextCookie();

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
	$("#sectionLeft").append('<div id="cookie_monster_timer_bars_div"></div>');

	this.$timerBars = $('#cookie_monster_timer_bars_div').css({
		'background'     : 'rgba(0, 0, 0, 0.6)',
		'border-top'     : '1px solid black',
		'bottom'         : '-1px',
		'font-family'    : 'Kavoon, Georgia, serif',
		'font-size'      : '16px',
		'left'           : '0px',
		'pointer-events' : 'none',
		'position'       : 'absolute',
		'text-align'     : 'center',
		'width'          : '100%',
		'z-index'        : '1000',
	});
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
			multiplier = 77 + 77 * Game.Has("Get lucky");
			frenzyName = "Frenzy";
			color      = this.color('yellow');
			break;

		case 666:
			multiplier = 6 + 6 * Game.Has("Get lucky");
			frenzyName = "Blood Frenzy";
			color      = this.color('green');
			break;

		case 0.5:
			multiplier = 66 + 66 * Game.Has("Get lucky");
			frenzyName = "Clot";
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
		return this.fadeOutBar(this.color('blue'));
	}

	this.updateBar('Click frenzy', this.color('blue'), Game.clickFrenzy);
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
		return this.fadeOutBar(this.color('purple'));
	}

	this.updateBar('Next Cookie', this.color('purple'), width, width / timers[2] * 100);
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
	var secondBar = '';
	if (name === 'Next Cookie') {
		secondBar = '<div id="cmt2_'+this.color('purple')+'" style="position:relative; background:#' +this.color('purple')+'; height:10px; width:100%; margin-left:0px; max-width:0px; float:right;"></div>';
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