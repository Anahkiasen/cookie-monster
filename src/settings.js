/**
 * Load a setting from localStorage
 *
 * @param {integer} key
 * @param {string}  name
 * @param {mixed}   defaultValue
 *
 * @return {void}
 */
CookieMonster.loadSetting = function(key, name, defaultValue) {
	if (localStorage[name] !== undefined) {
		this.settings[key] = parseInt(localStorage[name], 10);
	} else {
		localStorage[name] = defaultValue;
		this.settings[key] = defaultValue;
	}
};

CookieMonster.loadSettings = function() {
	CookieMonster.settings = [1, 1, 1, 1e3, 1, 1, 1, 1, 0, 1, 1, 1, 1];

	if (typeof Storage !== "undefined") {
		this.loadSetting(0, 'FlashScreen', 1);
		this.loadSetting(1, 'CookieTimer', 1);
		this.loadSetting(2, 'BuffBars', 1);
		this.loadSetting(3, 'Refresh', 1e3);
		this.loadSetting(4, 'CookieCD', 1);
		this.loadSetting(5, 'CMBar', 1);
		this.loadSetting(6, 'ColoredPrices', 1);
		this.loadSetting(7, 'ShortNumbers', 1);
		this.loadSetting(8, 'CookieSound', 0);
		this.loadSetting(9, 'UpdateTitle', 1);
		this.loadSetting(10, 'LuckyAlert', 1);
		this.loadSetting(11, 'UpgradeIcons', 1);
		this.loadSetting(12, 'UpgradeDisplay', 1);
	}

	CookieMonster.toggleBar();
};

CookieMonster.saveSettings = function() {
	if (typeof Storage !== "undefined") {
		localStorage.FlashScreen    = this.settings[0];
		localStorage.CookieTimer    = this.settings[1];
		localStorage.BuffBars       = this.settings[2];
		localStorage.Refresh        = this.settings[3];
		localStorage.CookieCD       = this.settings[4];
		localStorage.CMBar          = this.settings[5];
		localStorage.ColoredPrices  = this.settings[6];
		localStorage.ShortNumbers   = this.settings[7];
		localStorage.CookieSound    = this.settings[8];
		localStorage.UpdateTitle    = this.settings[9];
		localStorage.LuckyAlert     = this.settings[10];
		localStorage.UpgradeIcons   = this.settings[11];
		localStorage.UpgradeDisplay = this.settings[12];
	}

	this.toggleBar();
};

CookieMonster.getOptionState = function(e) {
	return (this.settings[e] === 0) ? 'OFF' : 'ON';
};

CookieMonster.toggleOption = function(option) {
	var $option = $(option);

	switch ($option.text()) {
	case "Flash Screen ON":
		this.settings[0] = 0;
		$option.text("Flash Screen OFF");
		break;
	case "Flash Screen OFF":
		this.settings[0] = 1;
		$option.text("Flash Screen ON");
		break;
	case "Cookie Sound ON":
		this.settings[8] = 0;
		$option.text("Cookie Sound OFF");
		break;
	case "Cookie Sound OFF":
		this.settings[8] = 1;
		$option.text("Cookie Sound ON");
		break;
	case "Cookie Timer ON":
		this.settings[1] = 0;
		$option.text("Cookie Timer OFF");
		break;
	case "Cookie Timer OFF":
		this.settings[1] = 1;
		$option.text("Cookie Timer ON");
		break;
	case "Next Cookie Timer ON":
		this.settings[4] = 0;
		$option.text("Next Cookie Timer OFF");
		break;
	case "Next Cookie Timer OFF":
		this.settings[4] = 1;
		$option.text("Next Cookie Timer ON");
		break;
	case "Update Title ON":
		this.settings[9] = 0;
		$option.text("Update Title OFF");
		break;
	case "Update Title OFF":
		this.settings[9] = 1;
		$option.text("Update Title ON");
		break;
	case "Buff Bars ON":
		this.settings[2] = 0;
		$option.text("Buff Bars OFF");
		break;
	case "Buff Bars OFF":
		this.settings[2] = 1;
		$option.text("Buff Bars ON");
		break;
	case "Bottom Bar ON":
		this.settings[5] = 0;
		$option.text("Bottom Bar OFF");
		break;
	case "Bottom Bar OFF":
		this.settings[5] = 1;
		$option.text("Bottom Bar ON");
		break;
	case "Colored Prices ON":
		this.settings[6] = 0;
		$option.text("Colored Prices OFF");
		CookieMonster.updateTooltips("ob");
		break;
	case "Colored Prices OFF":
		this.settings[6] = 1;
		$option.text("Colored Prices ON");
		CookieMonster.updateTooltips("ob");
		break;
	case "Upgrade Icons ON":
		this.settings[11] = 0;
		$option.text("Upgrade Icons OFF");
		Game.RebuildUpgrades();
		break;
	case "Upgrade Icons OFF":
		this.settings[11] = 1;
		$option.text("Upgrade Icons ON");
		Game.RebuildUpgrades();
		break;
	case "Upgrade Display (All)":
		this.settings[12] = 0;
		$option.text("Upgrade Display (None)");
		CookieMonster.updateUpgradeDisplay();
		break;
	case "Upgrade Display (None)":
		this.settings[12] = 1;
		$option.text("Upgrade Display (Normal)");
		CookieMonster.updateUpgradeDisplay();
		break;
	case "Upgrade Display (Normal)":
		this.settings[12] = 2;
		$option.text("Upgrade Display (All)");
		CookieMonster.updateUpgradeDisplay();
		break;
	case "Short Numbers ON (B)":
		this.settings[7] = 0;
		$option.text("Short Numbers OFF");
		Game.RebuildStore();
		Game.RebuildUpgrades();
		CookieMonster.updateTable();
		break;
	case "Short Numbers OFF":
		this.settings[7] = 1;
		$option.text("Short Numbers ON (A)");
		Game.RebuildStore();
		Game.RebuildUpgrades();
		CookieMonster.updateTable();
		break;
	case "Short Numbers ON (A)":
		this.settings[7] = 2;
		$option.text("Short Numbers ON (B)");
		Game.RebuildStore();
		Game.RebuildUpgrades();
		CookieMonster.updateTable();
		break;
	case "Lucky Alert (Both)":
		this.settings[10] = 2;
		$option.text("Lucky Alert (Icons)");
		break;
	case "Lucky Alert (Icons)":
		this.settings[10] = 3;
		$option.text("Lucky Alert (Notes)");
		break;
	case "Lucky Alert (Notes)":
		this.settings[10] = 0;
		$option.text("Lucky Alert (Off)");
		break;
	case "Lucky Alert (Off)":
		this.settings[10] = 1;
		$option.text("Lucky Alert (Both)");
		break;
	case "Refresh Rate (1 fps)":
		this.settings[3] = 500;
		$option.text("Refresh Rate (2 fps)");
		break;
	case "Refresh Rate (2 fps)":
		this.settings[3] = 250;
		$option.text("Refresh Rate (4 fps)");
		break;
	case "Refresh Rate (4 fps)":
		this.settings[3] = 100;
		$option.text("Refresh Rate (10 fps)");
		break;
	case "Refresh Rate (10 fps)":
		this.settings[3] = 33;
		$option.text("Refresh Rate (30 fps)");
		break;
	case "Refresh Rate (30 fps)":
		this.settings[3] = 1e3;
		$option.text("Refresh Rate (1 fps)");
		break;
	}

	this.saveSettings();
};

/**
 * Get a text version of the current short numbers option
 *
 * @return {string}
 */
CookieMonster.getShortNumbers = function() {
	switch (this.settings[7] * 1) {
		case 1:
			return "ON (A)";
		case 2:
			return "ON (B)";
		case 0:
			return "OFF";
		default:
			return "OFF";
	}
};

/**
 * Get a text version of the current refresh rate
 *
 * @return {string}
 */
CookieMonster.getRefreshRate = function() {
	switch (this.settings[3] * 1) {
		case 1e3:
			return "1";
		case 500:
			return "2";
		case 250:
			return "4";
		case 100:
			return "10";
		case 33:
			return "30";
		default:
			return "1";
	}
};

/**
 * Get a text version of the "Upgrade display" option
 *
 * @return {string}
 */
CookieMonster.getUpgradeDisplay = function() {
	switch (this.settings[12] * 1) {
		case 1:
			return "Normal";
		case 2:
			return "All";
		case 0:
			return "None";
		default:
			return "Normal";
	}
};

/**
 * Get a text version of the "Luck alerts" option
 *
 * @return {string}
 */
CookieMonster.getLuckyAlert = function () {
	switch (this.settings[10] * 1) {
		case 1:
			return "Both";
		case 2:
			return "Icons";
		case 3:
			return "Notes";
		case 0:
			return "Off";
		default:
			return "Both";
	}
};