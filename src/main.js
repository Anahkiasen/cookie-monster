/*jshint -W054 */

/**
 * Setup CookieMonster
 *
 * @return {void}
 */
CookieMonster.start = function() {
	if (!this.shouldRun) {
		return;
	}

	// Remove top bar
	$('#topBar').css('display', 'none');

	// Style some elements
	$('#tooltip').css({
		'margin-top'     : '32px',
		'pointer-events' : 'none',
	});
	$("#cookies").css({
		'background'    : 'rgba(0, 0, 0, 0.75)',
		'border-top'    : '1px solid black',
		'border-bottom' : '1px solid black',
	});
	this.$game.css({
		'-webkit-user-select'   : 'none',
		'-moz-user-select'      : 'none',
		'-ms-user-select'       : 'none',
		'user-select'           : 'none',
		'top'                   : '0px',
		'bottom'                : '57px',
	});

	// Move golden cookie one depth behind
	this.$goldenCookie.css("cssText", "z-index: 1000001 !important;");

	// Add Cookie Monster elements
	this.createBottomBar();
	this.createOverlay();
	this.createGoldenOverlay();
	this.createBarsContainer();
	this.createStoreCounters();

	// Add ID to favicon
	$('link[href="favicon.ico"]').attr('id', 'cm_favicon');

	// Setup Cookie Monster
	this.makeTable();
	this.saveTooltips();
	this.update();
	this.loadSettings();
	this.setupTooltips();

	// Start the loop
	this.mainLoop();

	Game.Popup('<span style="color:#' +this.colors.yellow+ '; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black !important;">Cookie Monster ' + this.version + " Loaded!</span>");
};

/**
 * Executes the main updating loop to refrsh CookieMonster
 *
 * @return {void}
 */
CookieMonster.mainLoop = function() {
	CookieMonster.updateTable();
	CookieMonster.updateTooltips('all');
	CookieMonster.emphasizeGolden();
	CookieMonster.manageBuffs();
	CookieMonster.loops++;

	if (CookieMonster.loops === 1) {
		Game.RebuildStore();
	}

	// Use animationFrame if available
	setTimeout(function() {
		CookieMonster.mainLoop();
	}, CookieMonster.getSetting('Refresh'));
};

//////////////////////////////////////////////////////////////////////
/////////////////////// THE SEVENTH LAYER OF HELL ////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Execute replacements on a method's code
 *
 * @param {String}  code
 * @param {Closure} replaces
 *
 * @return {String}
 */
CookieMonster.replaceCode = function(code, replaces) {
	return replaces(code.toString())
		.replace(/^function[^{]+{/i, "")
		.replace(/}[^}]*$/i, "");
};

/**
 * Replace a native CookieClicker function with another
 *
 * @param {String}  native
 * @param {Closure} replaces
 *
 * @return {void}
 */
CookieMonster.replaceNative = function(native, replaces, args) {
	var newCode = Game[native];
	if (typeof args === 'undefined') {
		args = '';
	}

	Game[native] = new Function(args, this.replaceCode(newCode, replaces));
};

/**
 * Hook CookieMonster onto various parts of the Cookie Clicker code
 *
 * It's not the prettiest code in the world but I can't think
 * of a better way
 *
 * @return {void}
 */
CookieMonster.update = function() {
	this.replaceNative('Logic', function (native) {
		return native.replace('.title=', '.title=CookieMonster.goldenCookieAvailable+');
	});
	this.replaceNative('UpdateMenu', function (native) {
		return native.replace("Statistics</div>'+", "Statistics</div>'+\n\n"+
			"'<div class=\"subsection\">" +
				"<div class=\"title\"><span style=\"color:#' +CookieMonster.colors.blue+ ';\">Cookie Monster Goodies</span></div>"+
				"<div class=\"listing\"><b>\"Lucky!\" Cookies Required:</b> '          + CookieMonster.lucky('regular', false) + '</div>"+
				"<div class=\"listing\"><b>\"Lucky!\" Cookies Required (Frenzy):</b> ' + CookieMonster.lucky('frenzy', false) + '</div>"+
				"<div class=\"listing\"><b>\"Lucky!\" Reward (MAX):</b> '              + CookieMonster.luckyReward('max') + '</div>"+
				"<div class=\"listing\"><b>\"Lucky!\" Reward (MAX) (Frenzy):</b> '     + CookieMonster.luckyReward('frenzy') + '</div>"+
				"<div class=\"listing\"><b>\"Lucky!\" Reward (CUR):</b> '              + CookieMonster.luckyReward('current') + '</div><br>"+
				"<div class=\"listing\"><b>Heavenly Chips (MAX):</b> '                 + CookieMonster.getHeavenlyChip('max') + '</div>"+
				"<div class=\"listing\"><b>Heavenly Chips (CUR):</b> '                 + CookieMonster.getHeavenlyChip('cur') + '</div>"+
				"<div class=\"listing\"><b>Cookies To Next Chip:</b> '                 + CookieMonster.getHeavenlyChip('next') + '</div>"+
				"<div class=\"listing\"><b>Time To Next Chip:</b> '                    + CookieMonster.getHeavenlyChip('time') + '</div>"+
			"</div>'+");
	});

	var cookieMonsterSettings = "\n'<div class=\"subsection\">" +
		"<div class=\"title\"><span style=\"color:#4bb8f0;\">Cookie Monster Settings</span></div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Flash Screen ' + CookieMonster.getOptionState(0) + '</a>"+
			"<label>Flashes the screen when a Golden Cookie or Red Cookie appears</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Cookie Timer ' + CookieMonster.getOptionState(1) + '</a>"+
			"<label>Displays a timer on Golden Cookies and Red Cookies</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Cookie Sound ' + CookieMonster.getOptionState(8) + '</a>"+
			"<label>Plays a sound when a Golden Cookie or Red Cookie appears</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Next Cookie Timer ' + CookieMonster.getOptionState(4) + '</a>"+
			"<label>Displays a countdown bar and updates the Title for when the next Cookie will appear</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Update Title ' + CookieMonster.getOptionState(9) + '</a>"+
			"<label>Updates the Title to display if a Cookie is waiting to be clicked</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Buff Bars ' + CookieMonster.getOptionState(2) + '</a>"+
			"<label>Displays a countdown bar for each effect currently active</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Bottom Bar ' + CookieMonster.getOptionState(5) + '</a>"+
			"<label>Displays a bar at the bottom of the screen that shows all Building information</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Colored Prices ' + CookieMonster.getOptionState(6) + '</a>"+
			"<label>Changes the colors of all Building prices to correspond with their Cost Per Income</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Upgrade Icons ' + CookieMonster.getOptionState(11) + '</a>"+
			"<label>Displays a small square icon on the Upgrade to better display the Cost Per Income color value</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Short Numbers ' + CookieMonster.getShortNumbers() + '</a>"+
			"<label>Formats all numbers to be shorter when displayed</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Upgrade Display (' + CookieMonster.getUpgradeDisplay() + ')</a>"+
			"<label>Changes how the store displays Upgrades</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Lucky Alert (' + CookieMonster.getLuckyAlert() + ')</a>"+
			"<label>Changes the tooltip to display if you would be under the number of cookies required for \"Lucky!\"</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Refresh Rate (' + CookieMonster.getRefreshRate() + ' fps)</a>"+
			"<label>The rate at which Cookie Monster updates data (higher rates may slow the game)</label>"+
		"</div>"+
	"</div>'+";

	this.replaceNative('UpdateMenu', function (native) {
		return native
			.replace("OFF')+'</div>'+", "OFF')+'</div>'+" + cookieMonsterSettings)
			.replace("startDate=Game.sayTime(date.getTime()/1000*Game.fps,2);", "startDate = CookieMonster.formatTime(((new Date).getTime() - Game.startDate) / 1000, '');");
	});

	var n = "\n" +
		"var cm_id = from.id;" +
		'\nif(cm_id === "") { cm_id = $(from).parents(".product").prop("id"); }' +
		'\nif(cm_id === "product5" || cm_id === "product6" || cm_id === "product7" || cm_id === "product8" || cm_id === "product9") { y -= 100; }' +
		'\nif(cm_id === "product8" || cm_id === "product9") { y -= 13; }' +
		'\nif(cm_id === "product9" && !CookieMonster.getBooleanSetting("ShortNumbers")) { y -= 13; }' + "\n";

	Game.tooltip.draw = new Function('from,text,x,y,origin', this.replaceCode(Game.tooltip.draw, function (native) {
		return native
			.replace("implemented');}", "implemented');}" + n)
			.replace("this.on=1;", "this.on=1;\nCookieMonster.updateTooltips('all');");
	}));

	this.replaceNative('Reset', function (native) {
		return native.replace("Game.researchT=0;", "Game.researchT=0;\nCookieMonster.$monsterBar.text('');");
	}, 'bypass');

	this.replaceNative('LoadSave', function (native) {
		return native.replace("Game.Popup('Game loaded');", "Game.Popup('Game loaded');\nCookieMonster.$timerBars.text('');");
	}, 'data');

	this.replaceNative('RebuildStore', function (native) {
		return native.replace("l('products').innerHTML=str;", "l('products').innerHTML=str;\nCookieMonster.updateTooltips('objects');");
	});

	this.replaceNative('Draw', function (native) {
		return native.replace("Beautify(Math.round(Game.cookiesd))", "CookieMonster.formatNumberB(Game.cookiesd)");
	});

	Beautify = new Function('what,floats', this.replaceCode(Beautify, function (native) {
		return native.replace("var str='';", "return CookieMonster.formatNumber(what);" + "\nvar str='';");
	}));
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
	if (document.title.indexOf('Cookie Clicker') === -1 || this.$game.length === 0) {
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