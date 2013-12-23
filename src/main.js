/**
 * Setup CookieMonster
 *
 * @return {void}
 */
CookieMonster.start = function() {
	if (!this.shouldRun) {
		return;
	}

	$('#topBar').css('display', 'none');
	$('#tooltip').css({
		'margin-top'     : '32px',
		'pointer-events' : 'none',
	});
	$("#cookies").css({
		'background'    : 'rgba(0, 0, 0, 0.75)',
		'border-top'    : '1px solid black',
		'border-bottom' : '1px solid black',
	});

	this.$goldenCookie.css("cssText", "z-index: 1000001 !important;");

	// Style main game window
	$("#game").css({
		'-webkit-user-select'   : 'none',
		'-moz-user-select'      : 'none',
		'-ms-user-select'       : 'none',
		'user-select'           : 'none',
		'top'                   : '0px',
		'bottom'                : '57px',
	});

	// Style store
	$("#storeTitle").css({
		'font-size'     : '18px',
		'padding'       : '4px 8px 2px 8px',
		'border-bottom' : '1px solid black',
	})
	.after(
	'<table cellpadding=0 cellspacing=0 style="width:300px; table-layout:fixed; padding:4px; font-weight:bold; background:rgba(0, 0, 0, 0.6); border-bottom: 1px solid black; cursor:default;">'+
		'<tr>'+
			'<td align=center style="color:#' +this.colors.blue+   '; padding:2px;" id="cm_up_q0">0</td>' +
			'<td align=center style="color:#' +this.colors.green+  '; padding:2px;" id="cm_up_q1">0</td>' +
			'<td align=center style="color:#' +this.colors.yellow+ '; padding:2px;" id="cm_up_q2">0</td>' +
			'<td align=center style="color:#' +this.colors.orange+ '; padding:2px;" id="cm_up_q3">0</td>' +
			'<td align=center style="color:#' +this.colors.red+    '; padding:2px;" id="cm_up_q4">0</td>' +
			'<td align=center style="color:#' +this.colors.purple+ '; padding:2px;" id="cm_up_q5">0</td>' +
		'</tr>'+
	'</table>');

	// Add Cookie Monster elements
	$('body').append('<div id="cookie_monster_bar"></div><div id="cookie_monster_overlay"></div><div id="cookie_monster_golden_overlay" onclick="Game.goldenCookie.click();"></div>');
	$("#sectionLeft").append('<div id="cookie_monster_timer_bars_div"></div>');

	// Style Cookie Monster elements
	$('#cookie_monster_bar').css({
		'background-color' : '#4D4548',
		'background-image' : 'linear-gradient(to bottom, #4d4548, #000000)',
		'border-top'       : '1px solid black',
		'bottom'           : '0px',
		'cursor'           : 'default',
		'height'           : '56px',
		'left'             : '0px',
		'position'         : 'absolute',
		'text-shadow'      : '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
		'width'            : '100%',
		'z-index'          : '1000',
	});
	$('#cookie_monster_overlay').css({
		'background'     : 'white',
		'display'        : 'none',
		'height'         : '100%',
		'pointer-events' : 'none',
		'position'       : 'fixed',
		'width'          : '100%',
		'z-index'        : '1000000',
	});
	$('#cookie_monster_golden_overlay').css({
		'cursor'         : 'pointer',
		'display'        : 'none',
		'font-family'    : 'Kavoon, Georgia, serif',
		'font-size'      : '32px',
		'height'         : '96px',
		'opacity'        : '0',
		'pointer-events' : 'none',
		'position'       : 'fixed',
		'text-align'     : 'center',
		'text-shadow'    : '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black',
		'width'          : '96px',
		'z-index'        : '1000002',
	});
	$('#cookie_monster_timer_bars_div').css({
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

	// Add ID to favicon
	$('link[href="favicon.ico"]').attr('id', 'cm_favicon');

	// Refrehs selector
	this.$monsterBar = $('#cookie_monster_bar');

	this.makeTable();
	this.saveTooltips();
	this.update();
	this.loadSettings();
	this.setupTooltips();
	this.mainLoop();

	Game.Popup('<span style="color:#' +this.colors.yellow+ '; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black !important;">Cookie Monster ' + this.version + " Loaded!</span>");
};

/**
 * Executes the main updating loop to refrsh CookieMonster
 *
 * @return {void}
 */
CookieMonster.mainLoop = function() {
	this.updateTable();
	this.updateTooltips('all');
	this.doEmphasize();
	this.manageBuffs();
	this.loops++;

	if (this.loops === 1) {
		Game.RebuildStore();
	}

	setTimeout(function () {
		CookieMonster.mainLoop();
	}, this.getSetting('Refresh'));
};

//////////////////////////////////////////////////////////////////////
/////////////////////// THE SEVENTH LAYER OF HELL ////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Hook CookieMonster onto various parts of the Cookie Clicker code
 *
 * @return {void}
 */
CookieMonster.update = function() {
	Game.Logic = new Function("", Game.Logic.toString().replace(".title=", ".title=CookieMonster.goldenCookieAvailable+").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	var e = "\n\n'<div class=\"subsection\">'+" + '\'<div class="title"><span style="color:#4bb8f0;">Cookie Monster Goodies</span></div>\'+' + "'<div class=\"listing\"><b>\"Lucky!\" Cookies Required:</b> ' + CookieMonster.lucky('regular', false) + '</div>'+" + "'<div class=\"listing\"><b>\"Lucky!\" Cookies Required (Frenzy):</b> ' + CookieMonster.lucky('frenzy', false) + '</div>'+" + "'<div class=\"listing\"><b>\"Lucky!\" Reward (MAX):</b> ' + CookieMonster.luckyReward('max') + '</div>'+" + "'<div class=\"listing\"><b>\"Lucky!\" Reward (MAX) (Frenzy):</b> ' + CookieMonster.luckyReward('frenzy') + '</div>'+" + "'<div class=\"listing\"><b>\"Lucky!\" Reward (CUR):</b> ' + CookieMonster.luckyReward('current') + '</div>'+" + "'</br><div class=\"listing\"><b>Heavenly Chips (MAX):</b> ' + CookieMonster.getHeavenlyChip('max') + '</div>'+" + "'<div class=\"listing\"><b>Heavenly Chips (CUR):</b> ' + CookieMonster.getHeavenlyChip('cur') + '</div>'+" + "'<div class=\"listing\"><b>Cookies To Next Chip:</b> ' + CookieMonster.getHeavenlyChip('next') + '</div>'+" + "'<div class=\"listing\"><b>Time To Next Chip:</b> ' + CookieMonster.getHeavenlyChip('time') + '</div>'+" + "'</div>'+";
	Game.UpdateMenu = new Function("", Game.UpdateMenu.toString().replace("Statistics</div>'+", "Statistics</div>'+" + e).replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	var t = "\n'<div class=\"subsection\">'+" + '\'<div class="title"><span style="color:#4bb8f0;">Cookie Monster Settings</span></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Flash Screen \' + CookieMonster.getOptionState(0) + \'</a><label>Flashes the screen when a Golden Cookie or Red Cookie appears</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Cookie Timer \' + CookieMonster.getOptionState(1) + \'</a><label>Displays a timer on Golden Cookies and Red Cookies</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Cookie Sound \' + CookieMonster.getOptionState(8) + \'</a><label>Plays a sound when a Golden Cookie or Red Cookie appears</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Next Cookie Timer \' + CookieMonster.getOptionState(4) + \'</a><label>Displays a countdown bar and updates the Title for when the next Cookie will appear</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Update Title \' + CookieMonster.getOptionState(9) + \'</a><label>Updates the Title to display if a Cookie is waiting to be clicked</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Buff Bars \' + CookieMonster.getOptionState(2) + \'</a><label>Displays a countdown bar for each effect currently active</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Bottom Bar \' + CookieMonster.getOptionState(5) + \'</a><label>Displays a bar at the bottom of the screen that shows all Building information</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Colored Prices \' + CookieMonster.getOptionState(6) + \'</a><label>Changes the colors of all Building prices to correspond with their Cost Per Income</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Upgrade Icons \' + CookieMonster.getOptionState(11) + \'</a><label>Displays a small square icon on the Upgrade to better display the Cost Per Income color value</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Short Numbers \' + CookieMonster.getShortNumbers() + \'</a><label>Formats all numbers to be shorter when displayed</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Upgrade Display (\' + CookieMonster.getUpgradeDisplay() + \')</a><label>Changes how the store displays Upgrades</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Lucky Alert (\' + CookieMonster.getLuckyAlert() + \')</a><label>Changes the tooltip to display if you would be under the number of cookies required for "Lucky!"</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Refresh Rate (\' + CookieMonster.getRefreshRate() + \' fps)</a><label>The rate at which Cookie Monster updates data (higher rates may slow the game)</label></div>\'+' + "'</div>'+";
	Game.UpdateMenu = new Function("", Game.UpdateMenu.toString().replace("OFF')+'</div>'+", "OFF')+'</div>'+" + t).replace("startDate=Game.sayTime(date.getTime()/1000*Game.fps,2);", "startDate = CookieMonster.formatTime(((new Date).getTime() - Game.startDate) / 1000, '');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	var n = "\n" + "var cm_id = from.id;" + '\nif(cm_id === "") { cm_id = $(from).parents(".product").prop("id"); }' + '\nif(cm_id === "product5" || cm_id === "product6" || cm_id === "product7" || cm_id === "product8" || cm_id === "product9") { y -= 100; }' + '\nif(cm_id === "product8" || cm_id === "product9") { y -= 13; }' + '\nif(cm_id === "product9" && !CookieMonster.getBooleanSetting("ShortNumbers")) { y -= 13; }' + "\n";
	Game.tooltip.draw = new Function("from,text,x,y,origin", Game.tooltip.draw.toString().replace("implemented');}", "implemented');}" + n).replace("this.on=1;", "this.on=1;\nCookieMonster.updateTooltips('all');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	Game.Reset = new Function("bypass", Game.Reset.toString().replace("Game.researchT=0;", "Game.researchT=0;\n$('#cookie_monster_timer_bars_div').text('');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	Game.LoadSave = new Function("data", Game.LoadSave.toString().replace("Game.Popup('Game loaded');", "Game.Popup('Game loaded');\n$('#cookie_monster_timer_bars_div').text('');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	Game.RebuildStore = new Function("", Game.RebuildStore.toString().replace("l('products').innerHTML=str;", "l('products').innerHTML=str;\nCookieMonster.updateTooltips('objects');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	Game.Draw = new Function("", Game.Draw.toString().replace("Beautify(Math.round(Game.cookiesd))", "CookieMonster.formatNumberB(Game.cookiesd)").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	var r = "return CookieMonster.formatNumber(what);";
	Beautify = new Function("what,floats", Beautify.toString().replace("var str='';", r + "\nvar str='';").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Checks if CookieMonster should run
 *
 * @return {Boolean}
 */
CookieMonster.shouldRun = function() {
	// Check if we're in Cookie Clicker
	if (document.title.indexOf('Cookie Clicker') === -1 || $('#game').length === 0) {
		return this.displayError("These aren't the droids you're looking for.");
	}

	// Cancel if already loaded
	if (this.$monsterBar.length !== 0) {
		return this.displayError('Cookie Monster is already loaded, silly!');
	}

	return true;
};

/**
 * Display an error as an alert
 *
 * @param {String} error
 *
 * @return {Void}
 */
CookieMonster.displayError = function(error) {
	alert('Cookie Monster ' +this.version+ "\n\n" + error);

	return false;
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// RUNTIME /////////////////////////////
//////////////////////////////////////////////////////////////////////

CookieMonster.start();