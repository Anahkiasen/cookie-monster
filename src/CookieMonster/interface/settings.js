/**
 * Load a setting from localStorage
 *
 * @param {integer} key
 * @param {string}  name
 * @param {mixed}   defaultValue
 *
 * @return {void}
 */
CookieMonster.loadSetting = function(name) {
	// If we have a value in memory, load it
	if (localStorage[name] !== undefined) {
		this.setSetting(name, parseInt(localStorage[name], 10));
	}

	// Else save default
	else {
		localStorage[name] = this.getSetting(name, true);
	}
};

/**
 * Load the various settings from localStorage
 *
 * @return {void}
 */
CookieMonster.loadSettings = function() {
	for (var setting in this.settings) {
		this.loadSetting(setting);
	}

	this.toggleBar();
};

/**
 * Update the settings in localStorage
 *
 * @return {void}
 */
CookieMonster.saveSettings = function() {
	if (typeof Storage !== 'undefined' || typeof localStorage !== 'undefined') {
		for (var setting in this.settings) {
			localStorage[setting] = this.getSetting(setting, true);
		}
	}

	this.toggleBar();
};

//////////////////////////////////////////////////////////////////////
////////////////////////// GETTERS AND SETTERS ///////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Toggle a setting to its next possible value
 *
 * @param {String} setting
 *
 * @return {Void}
 */
CookieMonster.toggleSetting = function(setting) {
	var option  = this.settings[setting];
	var current = option.value;

	// Look for available states
	var states = [];
	switch (setting) {
		case 'ShortNumbers':
		case 'UpgradeDisplay':
			states = [0, 1, 2];
			break;

		case 'Refresh':
			states = [1e3, 500, 250, 100, 33];
			break;

		case 'LuckyAlert':
			states = [0, 1, 2, 3];
			break;

		default:
			states = [0, 1];
			break;
	}

	// Look for next state, or go back to start
	var next = states.indexOf(current) + 1;
	next = typeof states[next] !== 'undefined' ? states[next] : states[0];

	this.setSetting(setting, next);

	return next;
};

/**
 * Set a setting by name
 *
 * @param {String} setting
 * @param {Mixed}  value
 */
CookieMonster.setSetting = function(setting, value) {
	this.settings[setting].value = value;
};

/**
 * Get an option's value by name
 *
 * @param {String}  setting
 * @param {Boolean} asBoolean
 *
 * @return {Mixed}
 */
CookieMonster.getSetting = function(setting, raw) {
	var value = this.settings[setting].value;
	if (this.settings[setting].type === 'boolean' && !raw) {
		return value ? true : false;
	}

	return value;
};

/**
 * Get the text version state of an option
 *
 * @param {integer} name
 *
 * @return {string}
 */
CookieMonster.getOptionState = function(name) {
	var method = 'get'+name+'State';
	if (typeof this[method] !== 'undefined') {
		return this[method]();
	}

	return this.getSetting(name) ? 'ON' : 'OFF';
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// OPTIONS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Toggle an option's status
 *
 * @param {DOMElement} option
 *
 * @return {void}
 */
CookieMonster.toggleOption = function(option) {
	var $option   = $(option);
	var optionKey = $option.data('option');

	// Update option
	this.toggleSetting(optionKey);
	$option.text(this.getLabel(optionKey));

	switch (optionKey) {
		case 'Colorblind':
			this.loadStyles();
			break;
		case 'ColoredPrices':
			this.updateTooltips('objects');
			$('.product .price').attr('class', 'price');
			break;
		case 'UpgradeIcons':
			Game.RebuildUpgrades();
			break;
		case 'UpgradeDisplay':
			this.updateUpgradeDisplay();
			break;
		case 'ShortNumbers':
			Game.RebuildStore();
			Game.RebuildUpgrades();
			this.updateTable();
			break;
	}

	this.saveSettings();

	return $option;
};

//////////////////////////////////////////////////////////////////////
///////////////////////////// OPTION LABELS //////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the label for an option
 *
 * @param {String} option
 *
 * @return {String}
 */
CookieMonster.getLabel = function(option) {
	return this.settings[option].label+ ' (' +this.getOptionState(option)+ ')';
};

/**
 * Get the description of an option
 *
 * @param {String} option
 *
 * @return {String}
 */
CookieMonster.getDescription = function(option) {
	return this.settings[option].desc;
};

//////////////////////////////////////////////////////////////////////
///////////////////////////// OPTION VALUES //////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get a text version of the current short numbers option
 *
 * @return {string}
 */
CookieMonster.getShortNumbersState = function() {
	switch (this.getSetting('ShortNumbers') * 1) {
		case 1:
			return 'ON [A]';
		case 2:
			return 'ON [B]';
		case 0:
			return 'OFF';
		default:
			return 'OFF';
	}
};

/**
 * Get a text version of the current refresh rate
 *
 * @return {string}
 */
CookieMonster.getRefreshState = function() {
	return Math.round(1000 / this.getSetting('Refresh') * 1)+ ' fps';
};

/**
 * Get a text version of the "Upgrade display" option
 *
 * @return {string}
 */
CookieMonster.getUpgradeDisplayState = function() {
	switch (this.getSetting('UpgradeDisplay') * 1) {
		case 1:
			return 'Normal';
		case 2:
			return 'All';
		case 0:
			return 'None';
		default:
			return 'Normal';
	}
};

/**
 * Get a text version of the "Luck alerts" option
 *
 * @return {string}
 */
CookieMonster.getLuckyAlertState = function () {
	switch (this.getSetting('LuckyAlert') * 1) {
		case 1:
			return 'Both';
		case 2:
			return 'Icons';
		case 3:
			return 'Notes';
		case 0:
			return 'Off';
		default:
			return 'Both';
	}
};