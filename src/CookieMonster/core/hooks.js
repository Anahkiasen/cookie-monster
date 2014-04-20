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
		'.title=': '.title=CookieMonster.getTitleModifiers()+',
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
	Game.RefreshStore = this.appendToNative(Game.RefreshStore, CookieMonster.updateTooltips);

	// Make tooltip stay on screen, if possible
	Game.tooltip.update = this.appendToNative(Game.tooltip.update, CookieMonster.controlTooltipPosition);

	// Loop through buildings, append code to each of their tooltip functions
	// While we're at it, explicitly give building a cmType of "building" for easier tooltip filtering later
	for (var i in Game.Objects)
	{
		Game.Objects[i].tooltip = this.appendToNativeBuildingTooltip(Game.Objects[i].tooltip, CookieMonster.modifyDynamicTooltip);
		Game.Objects[i].cmType = "building";
	}

	// Swap out the original Beautify for ours
	Beautify = this.formatNumber;
	this.replaceNative('Draw', {
		'Beautify(Math.round(Game.cookiesd))': 'CookieMonster.formatNumberRounded(Game.cookiesd)',
	});

	// Modify Santa drawing function
	var replaceWith = "y = (CookieMonster.$timersBars ? CookieMonster.$timersBars.offset().top : $('#versionNumber').offset().top) - 48";

	this.replaceNative('DrawSanta', {
		'y=Game.LeftBackground.canvas.height-48-24' : replaceWith,
	});
	this.replaceNative('UpdateSanta', {
		'y=Game.LeftBackground.canvas.height-48-24' : replaceWith,
	});
	
	// Allow wrinklers to track withered stat
	this.replaceNative('Init', {
		'close:0,sucked:0,phase:0,x:0,y:0,r:0,hurt:0,hp:3' : 'close:0,sucked:0,withered:0,witheredIsCorrect:0,phase:0,x:0,y:0,r:0,hurt:0,hp:3',
	});
	this.replaceNative('UpdateWrinklers', { // a dirty hack :(
		'inRect' : 'CookieMonster.inRect',
	});
	this.replaceNative('UpdateWrinklers', {
		'me.sucked+=' : 'if (!me.sucked) me.witheredIsCorrect = 1; if (!me.withered) me.withered = 0; me.withered += (((Game.cookiesPs/Game.fps)/20)); me.sucked+=',
	});
	this.replaceNative('UpdateWrinklers', {
		'Game.Earn(me.sucked);' : 'Game.Earn(me.sucked); me.withered = 0; me.witheredIsCorrect = 0;',
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
	return this.buildList('Goodies', this.menus.statistics, function(statistic, method) {
		// If we provided a formatted, apply it
		if (typeof method === 'object') {
			method = "CookieMonster." +method[0]+ "(" +method[1]+ ")";
		}

		return "<b>" +statistic+ " :</b> ' +" +method+ "+ '";
	}, {
		'Wrinklers': 'CookieMonster.getWrinklersSucked()',
	});
};

/**
 * Get the HTML for the additional settings
 *
 * @return {String}
 */
CookieMonster.getSettingsText = function() {
	return this.buildList('Settings', this.menus.settings, function(key, setting) {
		return "<a class=\"option\" data-option=\"" +setting+ "\" onclick=\"CookieMonster.toggleOption(this);\">' + CookieMonster.getLabel('" +setting+ "') + '</a><label>' + CookieMonster.getDescription('" +setting+ "') + '</label>";
	});
};

/**
 * Build a list
 *
 * @param {String}   title
 * @param {Object}   list
 * @param {Function} callback
 * @param {Object}   visibilities
 *
 * @return {String}
 */
CookieMonster.buildList = function(title, list, callback, visibilities) {
	var output = "\n'" + '<div class="subsection"><div class="title"><span class="text-blue">Cookie Monster ' +title+ '</span></div>';
	visibilities = visibilities || {};

	// Loop over the settings and add they one by one
	for (var section in list) {
		var visibility = visibilities[section] || true;

		// Build the section
		output += "<div style=\"display: ' +(" +visibility+ " ? 'block' : 'none')+ '\">";
		output += '<h2 class="subtitle">' +section+ '</h2>';
		for (var item in list[section]) {
			output += '<div class="listing">' +callback(item, list[section][item])+ '</div>';
		}
		output += '</div>';
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
		native.apply(this, arguments);
		append.apply(CookieMonster);
	};
};

/**
 * Append a piece of code to native building tooltip function "Game.Object.tooltip".
 * Grabs the dynamic tooltip string, passes this and tooltip string to CM function, and returns modified tooltip string.
 *
 * @param {String}  native
 * @param {Closure} append
 *
 * @return {String}
 */
CookieMonster.appendToNativeBuildingTooltip = function(native, append) {
	return function() {
		var nativeReturn = native.apply(this, arguments);
		return append.apply(CookieMonster, [this, nativeReturn]);

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
