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
		this.settings[name] = parseInt(localStorage[name], 10);
	}

	// Else save default
	else {
		localStorage[name] = this.settings[name];
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
			localStorage[setting] = this.settings[setting];
		}
	}

	this.toggleBar();
};

//////////////////////////////////////////////////////////////////////
////////////////////////// GETTERS AND SETTERS ///////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Set a setting by name
 *
 * @param {String} setting
 * @param {Mixed}  value
 */
CookieMonster.setSetting = function(setting, value) {
	this.settings[setting] = value;
};

/**
 * Get an option's value by name
 *
 * @param {String}  setting
 * @param {Boolean} asBoolean
 *
 * @return {Mixed}
 */
CookieMonster.getSetting = function(setting) {
	return this.settings[setting];
};

/**
 * Alias for getSetting(setting, true)
 *
 * @param {String} setting
 *
 * @return {Mixed}
 */
CookieMonster.getBooleanSetting = function (setting) {
	return this.getSetting(setting) ? true : false;
};

/**
 * Get the text version state of an option
 *
 * @param {integer} name
 *
 * @return {string}
 */
CookieMonster.getOptionState = function(name) {
	return (this.settings[name] === 0) ? 'OFF' : 'ON';
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
	var $option = $(option);

	switch ($option.text()) {
		case "Colorblind ON":
			this.setSetting('Colorblind', 0);
			$option.text("Colorblind OFF");
			break;
		case "Colorblind OFF":
			this.setSetting('Colorblind', 1);
			$option.text("Colorblind ON");
			break;
		case "Flash Screen ON":
			this.setSetting('FlashScreen', 0);
			$option.text("Flash Screen OFF");
			break;
		case "Flash Screen OFF":
			this.setSetting('FlashScreen', 1);
			$option.text("Flash Screen ON");
			break;
		case "Cookie Sound ON":
			this.setSetting('CookieSound', 0);
			$option.text("Cookie Sound OFF");
			break;
		case "Cookie Sound OFF":
			this.setSetting('CookieSound', 1);
			$option.text("Cookie Sound ON");
			break;
		case "Cookie Timer ON":
			this.setSetting('CookieTimer', 0);
			$option.text("Cookie Timer OFF");
			break;
		case "Cookie Timer OFF":
			this.setSetting('CookieTimer', 1);
			$option.text("Cookie Timer ON");
			break;
		case "Next Cookie Timer ON":
			this.setSetting('CookieCD', 0);
			$option.text("Next Cookie Timer OFF");
			break;
		case "Next Cookie Timer OFF":
			this.setSetting('CookieCD', 1);
			$option.text("Next Cookie Timer ON");
			break;
		case "Update Title ON":
			this.setSetting('UpdateTitle', 0);
			$option.text("Update Title OFF");
			break;
		case "Update Title OFF":
			this.setSetting('UpdateTitle', 1);
			$option.text("Update Title ON");
			break;
		case "Buff Bars ON":
			this.setSetting('BuffBars', 0);
			$option.text("Buff Bars OFF");
			break;
		case "Buff Bars OFF":
			this.setSetting('BuffBars', 1);
			$option.text("Buff Bars ON");
			break;
		case "Bottom Bar ON":
			this.setSetting('CMBar', 0);
			$option.text("Bottom Bar OFF");
			break;
		case "Bottom Bar OFF":
			this.setSetting('CMBar', 1);
			$option.text("Bottom Bar ON");
			break;
		case "Colored Prices ON":
			this.setSetting('ColoredPrices', 0);
			$option.text("Colored Prices OFF");
			this.updateTooltips("objects");
			break;
		case "Colored Prices OFF":
			this.setSetting('ColoredPrices', 1);
			$option.text("Colored Prices ON");
			this.updateTooltips("objects");
			break;
		case "Upgrade Icons ON":
			this.setSetting('UpgradeIcons', 0);
			$option.text("Upgrade Icons OFF");
			Game.RebuildUpgrades();
			break;
		case "Upgrade Icons OFF":
			this.setSetting('UpgradeIcons', 1);
			$option.text("Upgrade Icons ON");
			Game.RebuildUpgrades();
			break;
		case "Upgrade Display (All)":
			this.setSetting('UpgradeDisplay', 0);
			$option.text("Upgrade Display (None)");
			this.updateUpgradeDisplay();
			break;
		case "Upgrade Display (None)":
			this.setSetting('UpgradeDisplay', 1);
			$option.text("Upgrade Display (Normal)");
			this.updateUpgradeDisplay();
			break;
		case "Upgrade Display (Normal)":
			this.setSetting('UpgradeDisplay', 2);
			$option.text("Upgrade Display (All)");
			this.updateUpgradeDisplay();
			break;
		case "Short Numbers ON (B)":
			this.setSetting('ShortNumbers', 0);
			$option.text("Short Numbers OFF");
			Game.RebuildStore();
			Game.RebuildUpgrades();
			this.updateTable();
			break;
		case "Short Numbers OFF":
			this.setSetting('ShortNumbers', 1);
			$option.text("Short Numbers ON (A)");
			Game.RebuildStore();
			Game.RebuildUpgrades();
			this.updateTable();
			break;
		case "Short Numbers ON (A)":
			this.setSetting('ShortNumbers', 2);
			$option.text("Short Numbers ON (B)");
			Game.RebuildStore();
			Game.RebuildUpgrades();
			this.updateTable();
			break;
		case "Lucky Alert (Both)":
			this.setSetting('LuckyAlert', 2);
			$option.text("Lucky Alert (Icons)");
			break;
		case "Lucky Alert (Icons)":
			this.setSetting('LuckyAlert', 3);
			$option.text("Lucky Alert (Notes)");
			break;
		case "Lucky Alert (Notes)":
			this.setSetting('LuckyAlert', 0);
			$option.text("Lucky Alert (Off)");
			break;
		case "Lucky Alert (Off)":
			this.setSetting('LuckyAlert', 1);
			$option.text("Lucky Alert (Both)");
			break;
		case "Refresh Rate (1 fps)":
			this.setSetting('Refresh', 500);
			$option.text("Refresh Rate (2 fps)");
			break;
		case "Refresh Rate (2 fps)":
			this.setSetting('Refresh', 250);
			$option.text("Refresh Rate (4 fps)");
			break;
		case "Refresh Rate (4 fps)":
			this.setSetting('Refresh', 100);
			$option.text("Refresh Rate (10 fps)");
			break;
		case "Refresh Rate (10 fps)":
			this.setSetting('Refresh', 33);
			$option.text("Refresh Rate (30 fps)");
			break;
		case "Refresh Rate (30 fps)":
			this.setSetting('Refresh', 1e3);
			$option.text("Refresh Rate (1 fps)");
			break;
	}

	this.saveSettings();
};

//////////////////////////////////////////////////////////////////////
///////////////////////////// OPTION VALUES //////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get a text version of the current short numbers option
 *
 * @return {string}
 */
CookieMonster.getShortNumbers = function() {
	switch (this.getSetting('ShortNumbers') * 1) {
		case 1:
			return 'ON (A)';
		case 2:
			return 'ON (B)';
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
CookieMonster.getRefreshRate = function() {
	switch (this.getSetting('Refresh') * 1) {
		case 1e3:
			return '1';
		case 500:
			return '2';
		case 250:
			return '4';
		case 100:
			return '10';
		case 33:
			return '30';
		default:
			return '1';
	}
};

/**
 * Get a text version of the "Upgrade display" option
 *
 * @return {string}
 */
CookieMonster.getUpgradeDisplay = function() {
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
CookieMonster.getLuckyAlert = function () {
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