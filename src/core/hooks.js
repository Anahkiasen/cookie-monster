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
	this.replaceNative('Logic', {
		'.title=': '.title=CookieMonster.titleModifier+',
	});

	// Add additional settings and statistics to main menu
	this.replaceNative('UpdateMenu', {
		"Statistics</div>'+": "Statistics</div>'+"+ CookieMonster.getStatistics(),
		"OFF')+'</div>'+"   : "OFF')+'</div>'+"   + CookieMonster.getSettingsText(),
		"startDate=Game.sayTime(date.getTime()/1000*Game.fps,2);": "startDate = CookieMonster.formatTime((+new Date - Game.startDate) / 1000);",
	});

	// Rebuild Cookie Monster on game changing events
	Game.Reset    = this.appendToNative(Game.Reset, CookieMonster.tearDown);
	Game.LoadSave = this.appendToNative(Game.LoadSave, CookieMonster.tearDown);

	// Refresh tooltips on store rebuild
	Game.tooltip.draw = this.appendToNative(Game.tooltip.draw, CookieMonster.updateTooltips);
	Game.RebuildStore = this.appendToNative(Game.RebuildStore, CookieMonster.updateTooltips);

	// Swap out the original Beautify for ours
	Beautify = this.formatNumber;
	this.replaceNative('Draw', {
		'Beautify(Math.round(Game.cookiesd))': 'CookieMonster.formatNumberRounded(Game.cookiesd)',
	});
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
			'Cookies sucked'      : 'CookieMonster.getWrinklersSucked(true)',
			'Rewards of popping'  : 'CookieMonster.getWrinklersReward()',
			'Benefits of popping' : "CookieMonster.getWrinklersReward('reward')",
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
			'ReturnInvestment',
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
 * Append a piece of code to native code
 *
 * @param {String}  native
 * @param {Closure} append
 *
 * @return {Void}
 */
CookieMonster.appendToNative = function(native, append) {
	return function() {
		native();
		append.apply(CookieMonster);
	};
};

/**
 * Execute replacements on a method's code
 *
 * @param {String}  code
 * @param {Closure} replaces
 *
 * @return {String}
 */
CookieMonster.replaceCode = function(code, replaces) {
	code = code.toString();

	// Apply the various replaces
	for (var replace in replaces) {
		code = code.replace(replace, replaces[replace]);
	}

	return code
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