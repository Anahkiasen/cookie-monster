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
	var frenzyName = '';
	var color      = '';
	var multiplier = 0;

	// Detect what kind of frenzy we're in
	switch (Game.frenzyPower) {
		case 7:
			multiplier = 77 + 77 * Game.Has('Get lucky');
			frenzyName = 'Frenzy';
			color      = 'yellow';
			break;

		case 666:
			multiplier = 6 + 6 * Game.Has('Get lucky');
			frenzyName = 'Blood Frenzy';
			color      = 'green';
			break;

		case 0.5:
			multiplier = 66 + 66 * Game.Has('Get lucky');
			frenzyName = 'Clot';
			color      = 'red';
			break;
	}

	// Remove bars if the frenzy has ended or we disabled them
	var identifier = frenzyName.replace(' ', '');
	if (Game.frenzy <= 0 || !this.getBooleanSetting('BuffBars')) {
		return this.fadeOutBar(identifier);
	}

	// Update current bar
	this.updateBar(frenzyName, color, Game.frenzy);

	// As only one effect can be active at a time, we'll fade out
	// the other effect bars
	var buffs = ['Frenzy', 'BloodFrenzy', 'Clot'];
	for (var i = 0; i < 2; i++) {
		if (buffs[i] !== identifier) {
			this.fadeOutBar(buffs[i]);
		}
	}
};

/**
 * Manage clicking frenzies bars
 *
 * @return {void}
 */
CookieMonster.manageClickingFrenzy = function() {
	if (Game.clickFrenzy <= 0 || !this.getBooleanSetting('BuffBars')) {
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
	if (timers[0] <= 0 || this.onScreen[name] || !this.getBooleanSetting('CookieBar')) {
		return this.fadeOutBar(label);
	}

	// Update title
	var countdown = Math.round(width / Game.fps);
	if (name === 'goldenCookie' && countdown > 0 && !this.onScreen.goldenCookie) {
		this.titleModifier = this.getBooleanSetting('CookieBar') ? '(' + countdown + ') ' : '';
	}

	var $container = this.updateBar(label, 'greyLight', width, barWidth);
	$('.cm-buff-bar__bar--second', $container).css('max-width', (this.getBarsWidth() - 189) * 0.67 + 'px');
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
		secondBar = '<div class="cm-buff-bar__bar cm-buff-bar__bar--second background-' +secondBar+ '" id="cmt2_'+secondBar+'"></div>';
	}

	this.$timerBars.append(
		'<div class="cm-buff-bar" id="cookie-monster__timer-' + identifier + '" style="display: none">'+
			'<table cellpadding="0" cellspacing="0">'+
				'<tr>' +
					'<td>' + name + "</td>" +
					'<td>'+
						'<div class="cm-buff-bar__container background-' +color+ '" id="cmt_' + identifier + '">'+
							secondBar +
							'<div class="cm-buff-bar__timer" id="cmt_time_' + identifier + '">0</div>'+
						'</div>'+
					'</td>'+
					'<td style="width:55px;"></td>'+
				'</tr>' +
			'</table>'+
		'</div>');

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
	var $bar = $("#cookie-monster__timer-" + identifier);

	if ($bar.length === 1 && $bar.css('opacity') === '1') {
		$bar.fadeOut(500, function() {
			$(this).remove();
		});
	}
};