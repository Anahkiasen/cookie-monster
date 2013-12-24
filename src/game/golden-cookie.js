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
	var buff       = "";
	var color      = "";
	var multiplier = 0;
	var i          = 13 + 13 * Game.Has("Get lucky");
	var s          = new Array(Game.goldenCookie.time, Game.goldenCookie.minTime, Game.goldenCookie.maxTime);
	var o          = parseInt($("#cookie_monster_timer_bars_div").css("width"));

	switch (Game.frenzyPower) {
		case 7:
			multiplier = 77 + 77 * Game.Has("Get lucky");
			buff       = "Frenzy";
			color      = this.colors.yellow;
			break;

		case 666:
			multiplier = 6 + 6 * Game.Has("Get lucky");
			buff       = "Blood Frenzy";
			color      = this.colors.green;
			break;

		// This is wrong but I'm not sure what to change it to
		case 666:
			multiplier = 66 + 66 * Game.Has("Get lucky");
			buff       = "Clot";
			color      = this.colors.red;
			break;
	}

	if (Game.frenzy > 0 && this.getSetting('BuffBars', true)) {
		if ($("#cookie_monster_timer_" + color).length !== 1) {
			$("#cookie_monster_timer_bars_div").append(
				'<div id="cookie_monster_timer_' + color + '" style="padding:4px 0px 5px 0px;">'+
				'<table cellpadding=0 cellspacing=0 style="font-style:inherit; color:inherit;  width:100%;">'+
					'<tr>' +
						'<td style="width:130px; text-align:right;">' + buff + "<td>" +
						'<td>'+
							'<div id="cmt_' + color + '" style="position:relative; background:#' + color + "; height:10px; width:" + Game.frenzy / s[2] * 100 + '%; margin-left:4px; border:1px solid black;">'+
								'<div id="cmt_time_' + color + '" style="text-align:left; position:absolute; right:-50px; top:-5px; width:45px;">' +
								multiplier +
								'</div>'+
							'</div>'+
						'</td>'+
						'<td style="width:55px;"></td>'+
					'</tr>' +
				'</table>'+
			'</div>');

		} else {
			$("#cmt_" + color).css("width", Game.frenzy / s[2] * 100 + "%");
			$("#cmt_time_" + color).text(Math.round(Game.frenzy / Game.fps));
		}

		$("#cookie_monster_timer_" + color).fadeIn(250);
		var buffColors = ['FFFF00', '00FF00', 'FF0000'];
		for (var thisColor in buffColors) {
			this.fadeOutBar(buffColors[thisColor], color);
		}
	} else {
		this.fadeOutBar(color);
	}

	var countdown = Math.round((s[2] - s[0]) / Game.fps);

	if (Game.clickFrenzy > 0 && this.getBooleanSetting('BuffBars')) {
		if ($("#cookie_monster_timer_"+this.colors.blue).length !== 1) {
			$("#cookie_monster_timer_bars_div").append('<div id="cookie_monster_timer_4BB8F0" style="padding:4px 0px 5px 0px;"><table cellpadding=0 cellspacing=0 style="font-style:inherit; color:inherit;  width:100%;"><tr>' + '<td style="width:130px; text-align:right;">Click Frenzy<td>' + '<td><div id="cmt_4BB8F0" style="position:relative; background:#4BB8F0; height:10px; width:' + Game.clickFrenzy / s[2] * 100 + '%; margin-left:4px; border:1px solid black;"><div id="cmt_time_4BB8F0" style="text-align:left; position:absolute; right:-50px; top:-5px; width:45px;">' + i + "</div></div></td>" + '<td style="width:55px;"></td>' + "</table></div>");
		} else {
			$("#cmt_"+this.colors.blue).css("width", Game.clickFrenzy / s[2] * 100 + "%");
			$("#cmt_time_"+this.colors.blue).text(Math.round(Game.clickFrenzy / Game.fps));
		}
		$("#cookie_monster_timer_"+this.colors.blue).fadeIn(250);
	} else {
		this.fadeOutBar(this.colors.blue);
	}

	if (s[0] > 0 && CookieMonster.$goldenCookie.css("display") === "none" && this.getBooleanSetting('CookieCD')) {
		if ($("#cookie_monster_timer_"+this.colors.purple).length !== 1) {
			$("#cookie_monster_timer_bars_div").append('<div id="cookie_monster_timer_FF00FF" style="padding:4px 0px 5px 0px;"><table cellpadding=0 cellspacing=0 style="font-style:inherit; color:inherit;  width:100%;"><tr>' + '<td style="width:130px; text-align:right;">Next Cookie<td>' + '<td><div id="cmt_FF00FF" style="position:relative; background:#aaaaaa; height:10px; width:100%; margin-left:4px; border:1px solid black;"><div id="cmt2_FF00FF" style="position:relative; background:#FF00FF; height:10px; width:100%; margin-left:0px; max-width:' + (o - 189) * 0.67 + 'px; float:right;"></div><div id="cmt_time_FF00FF" style="text-align:left; position:absolute; right:-50px; top:-5px; width:45px;">' + countdown + "</div></div></td>" + '<td style="width:55px;"></td>' + "</table></div>");
		} else {
			$("#cmt2_"+this.colors.purple).css("max-width", (o - 189) * 0.67 + "px");
			$("#cmt_"+this.colors.purple).css("width", (s[2] - s[0]) / s[2] * 100 + "%");
			$("#cmt_time_"+this.colors.purple).text(countdown);
		}
		$("#cookie_monster_timer_"+this.colors.purple).fadeIn(250);
	} else {
		this.fadeOutBar(this.colors.purple);
	}

	if (countdown > 0 && CookieMonster.$goldenCookie.is(':hidden')) {
		this.goldenCookieAvailable = this.getBooleanSetting('CookieCD') ? "(" + countdown + ") " : '';
	}

	$("#versionNumber").css("bottom", $("#cookie_monster_timer_bars_div").css("height"));
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