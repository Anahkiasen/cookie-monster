/*jshint -W054 */

/**
 * Hook CookieMonster onto various parts of the Cookie Clicker code
 *
 * It's not the prettiest code in the world but I can't think
 * of a better way
 *
 * @return {void}
 */
CookieMonster.hookIntoNative = function() {

	// Add Cookie Monster modifiers in title
	this.replaceNative('Logic', function (native) {
		return native.replace('.title=', '.title=CookieMonster.titleModifier+');
	});

	// Add additional settings and statistics to main menu
	this.replaceNative('UpdateMenu', function (native) {
		return native
			.replace("Statistics</div>'+", "Statistics</div>'+"+CookieMonster.getStatistics())
			.replace("OFF')+'</div>'+", "OFF')+'</div>'+" + CookieMonster.getSettingsText())
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
			.replace("this.on=1;", "this.on=1;\nCookieMonster.updateTooltips();");
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
/////////////////////////////// CORE DATA ////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the HTML for the additional statistics
 *
 * @return {String}
 */
CookieMonster.getStatistics = function() {
	return this.buildList('Goodies', {
		'Lucky Cookies': {
			'"Lucky!" Cookies Required'          : "CookieMonster.luckyReward('regular', true)",
			'"Lucky!" Cookies Required (Frenzy)' : "CookieMonster.luckyReward('frenzy', true)",
			'"Lucky!" Reward (MAX)'              : "CookieMonster.maxLuckyReward('max')",
			'"Lucky!" Reward (MAX) (Frenzy)'     : "CookieMonster.maxLuckyReward('frenzy')",
			'"Lucky!" Reward (CUR)'              : "CookieMonster.maxLuckyReward('current')",
		},
		'Heavenly Chips': {
			'Heavenly Chips (MAX)' : "CookieMonster.getHeavenlyChip('max')",
			'Heavenly Chips (CUR)' : "CookieMonster.getHeavenlyChip('cur')",
			'Cookies To Next Chip' : "CookieMonster.getHeavenlyChip('next')",
			'Time To Next Chip'    : "CookieMonster.getHeavenlyChip('time')",
		},
		'Wrinklers': {
			'Cookies sucked'       : 'CookieMonster.getWrinklersSucked()',
			'Reward after popping' : 'CookieMonster.getWrinklersReward()',
		},
	}, function(statistic, method) {
		return "<b>" +statistic+ " :</b> ' +" +method+ "+ '";
	});
};

/**
 * Get the HTML for the additional settings
 *
 * @return {String}
 */
CookieMonster.getSettingsText = function() {
	return this.buildList('Settings', {
		'Additional sections': [
			'BottomBar',
			'UpgradeDisplay',
		],
		'Color coding': [
			'Colorblind',
			'ColoredPrices',
			'UpgradeIcons',
		],
		'Emphasizers': [
			'BuffBars',
			'CookieBar',
			'CookieTimer',
			'FlashScreen',
			'Sounds',
			'UpdateTitle',
		],
		'Display': [
			'LuckyAlert',
			'Refresh',
			'ShortNumbers',
		],
	}, function(key, setting) {
		return "<a class=\"option\" data-option=\"" +setting+ "\" onclick=\"CookieMonster.toggleOption(this);\">' + CookieMonster.getLabel('" +setting+ "') + '</a><label>' + CookieMonster.getDescription('" +setting+ "') + '</label>";
	});
};

/**
 * Build a list
 *
 * @param {String}   title
 * @param {Object}   list
 * @param {Function} callback
 *
 * @return {String}
 */
CookieMonster.buildList = function(title, list, callback) {
	var output = "\n'<div class=\"subsection\"><div class=\"title\"><span class=\"text-blue\">Cookie Monster " +title+ "</span></div>";

	// Loop over the settings and add they one by one
	for (var section in list) {
		output += "<div class=\"subtitle\">"+section+"</div>";
		for (var item in list[section]) {
			output += "<div class=\"listing\">" +callback(item, list[section][item])+ "</div>";
		}
	}

	return output + "</div>'+";
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
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