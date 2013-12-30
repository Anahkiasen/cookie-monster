/*jshint -W054 */

/**
 * Setup CookieMonster
 *
 * @return {void}
 */
CookieMonster.start = function() {
	if (!this.shouldRun()) {
		return;
	}

	// Add Cookie Monster elements
	this.createBottomBar();
	this.createGoldenOverlay();
	this.createFlashOverlay();
	this.createBarsContainer();
	this.createStoreCounters();

	// Load stylesheet
	this.loadSettings();
	this.loadStyles();

	// Add ID to favicon
	$('link[href="favicon.ico"]').attr('id', 'cm_favicon');

	// Setup Cookie Monster
	this.saveTooltips();
	this.update();
	this.setupTooltips();

	// Start the loop
	this.mainLoop();

	Game.Popup('<span style="color:#' +this.color('yellow')+ '; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black !important;">Cookie Monster ' + this.version + " Loaded!</span>");
};

/**
 * Load some styles
 *
 * @return {void}
 */
CookieMonster.loadStyles = function() {
	var stylesheet = this.runningInLocal() ? 'http://localhost/_github/cookie-monster/dist/cookie-monster' : 'https://rawgithub.com/Anahkiasen/cookie-monster/master/dist/cookie-monster';
	var $styles    = $('#cookie-monster__styles');

	// Create link if undefined
	if ($styles.length === 0) {
		$('head').append('<link id="cookie-monster__styles" rel="stylesheet" href="">');
		$styles = $('#cookie-monster__styles');
	}

	// Add colorblind modifier if necessary
	if (this.getBooleanSetting('Colorblind')) {
		stylesheet += '-colorblind';
	}

	$styles.attr('href', stylesheet+'.min.css');
};

/**
 * Executes the main updating loop to refrsh CookieMonster
 *
 * @return {void}
 */
CookieMonster.mainLoop = function() {
	CookieMonster.updateTable();
	CookieMonster.updateTooltips('all');
	CookieMonster.manageBuffs();

	CookieMonster.emphasizeGolden();
	CookieMonster.emphasizeSeason();

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
		return native.replace('.title=', '.title=CookieMonster.titleModifier+');
	});
	this.replaceNative('UpdateMenu', function (native) {
		return native.replace("Statistics</div>'+", "Statistics</div>'+\n\n"+
			"'<div class=\"subsection\">" +
				"<div class=\"title\"><span class=\"text-blue\">Cookie Monster Goodies</span></div>"+
				"<div class=\"listing\"><b>\"Lucky!\" Cookies Required:</b> '          + CookieMonster.luckyReward('regular', true) + '</div>"+
				"<div class=\"listing\"><b>\"Lucky!\" Cookies Required (Frenzy):</b> ' + CookieMonster.luckyReward('frenzy', true) + '</div>"+
				"<div class=\"listing\"><b>\"Lucky!\" Reward (MAX):</b> '              + CookieMonster.maxLuckyReward('max') + '</div>"+
				"<div class=\"listing\"><b>\"Lucky!\" Reward (MAX) (Frenzy):</b> '     + CookieMonster.maxLuckyReward('frenzy') + '</div>"+
				"<div class=\"listing\"><b>\"Lucky!\" Reward (CUR):</b> '              + CookieMonster.maxLuckyReward('current') + '</div><br>"+
				"<div class=\"listing\"><b>Heavenly Chips (MAX):</b> '                 + CookieMonster.getHeavenlyChip('max') + '</div>"+
				"<div class=\"listing\"><b>Heavenly Chips (CUR):</b> '                 + CookieMonster.getHeavenlyChip('cur') + '</div>"+
				"<div class=\"listing\"><b>Cookies To Next Chip:</b> '                 + CookieMonster.getHeavenlyChip('next') + '</div>"+
				"<div class=\"listing\"><b>Time To Next Chip:</b> '                    + CookieMonster.getHeavenlyChip('time') + '</div>"+
			"</div>'+");
	});

	var cookieMonsterSettings = "\n'<div class=\"subsection\"><div class=\"title\"><span class=\"text-blue\">Cookie Monster Settings</span></div>";
	for (var setting in this.settings) {
		cookieMonsterSettings +=
			'<div class="listing">'+
				"<a class=\"option\" data-option=\"" +setting+ "\" onclick=\"CookieMonster.toggleOption(this);\">' + CookieMonster.getLabel('" +setting+ "') + '</a>"+
				"<label>' + CookieMonster.getDescription('" +setting+ "') + '</label>"+
			'</div>';
	}
	cookieMonsterSettings += "</div>'+";

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
		return native.replace("Beautify(Math.round(Game.cookiesd))", "CookieMonster.formatNumberRounded(Game.cookiesd)");
	});

	Beautify = new Function('what,floats', this.replaceCode(Beautify, function (native) {
		return native.replace("var str='';", "return CookieMonster.formatNumber(what);" + "\nvar str='';");
	}));
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Checks if we're running in local or not
 *
 * @return {Boolean}
 */
CookieMonster.runningInLocal = function() {
	var $script = $('script[src]').last();
	if (!$script.length) {
		return true;
	}

	return $script.attr('src').indexOf('localhost') !== -1;
};

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
	if (typeof alert !== 'undefined') {
		alert('Cookie Monster ' +this.version+ "\n\n" + error);
	}

	return false;
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// RUNTIME /////////////////////////////
//////////////////////////////////////////////////////////////////////

CookieMonster.start();