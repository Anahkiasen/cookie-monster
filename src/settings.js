CookieMonster.loadSettings = function() {
	CookieMonster.settings = [1, 1, 1, 1e3, 1, 1, 1, 1, 0, 1, 1, 1, 1];

	if (typeof Storage !== "undefined") {
		if (localStorage.FlashScreen !== undefined) {
			CookieMonster.settings[0] = localStorage.FlashScreen;
		} else {
			localStorage.FlashScreen = 1;
			CookieMonster.settings[0] = 1;
		}

		if (localStorage.CookieTimer !== undefined) {
			CookieMonster.settings[1] = localStorage.CookieTimer;
		} else {
			localStorage.CookieTimer = 1;
			CookieMonster.settings[1] = 1;
		}

		if (localStorage.BuffBars !== undefined) {
			CookieMonster.settings[2] = localStorage.BuffBars;
		} else {
			localStorage.BuffBars = 1;
			CookieMonster.settings[2] = 1;
		}

		if (localStorage.Refresh !== undefined) {
			CookieMonster.settings[3] = localStorage.Refresh;
		} else {
			localStorage.Refresh = 1e3;
			CookieMonster.settings[3] = 1e3;
		}

		if (localStorage.CookieCD !== undefined) {
			CookieMonster.settings[4] = localStorage.CookieCD;
		} else {
			localStorage.CookieCD = 1;
			CookieMonster.settings[4] = 1;
		}

		if (localStorage.CMBar !== undefined) {
			CookieMonster.settings[5] = localStorage.CMBar;
		} else {
			localStorage.CMBar = 1;
			CookieMonster.settings[5] = 1;
		}

		if (localStorage.ColoredPrices !== undefined) {
			CookieMonster.settings[6] = parseInt(localStorage.ColoredPrices, 10);
		} else {
			localStorage.ColoredPrices = 1;
			CookieMonster.settings[6] = 1;
		}

		if (localStorage.ShortNumbers !== undefined) {
			CookieMonster.settings[7] = localStorage.ShortNumbers;
		} else {
			localStorage.ShortNumbers = 1;
			CookieMonster.settings[7] = 1;
		}

		if (localStorage.CookieSound !== undefined) {
			CookieMonster.settings[8] = localStorage.CookieSound;
		} else {
			localStorage.CookieSound = 0;
			CookieMonster.settings[8] = 0;
		}

		if (localStorage.UpdateTitle !== undefined) {
			CookieMonster.settings[9] = localStorage.UpdateTitle;
		} else {
			localStorage.UpdateTitle = 1;
			CookieMonster.settings[9] = 1;
		}

		if (localStorage.LuckyAlert !== undefined) {
			CookieMonster.settings[10] = localStorage.LuckyAlert;
		} else {
			localStorage.LuckyAlert = 1;
			CookieMonster.settings[10] = 1;
		}

		if (localStorage.UpgradeIcons !== undefined) {
			CookieMonster.settings[11] = localStorage.UpgradeIcons;
		} else {
			localStorage.UpgradeIcons = 1;
			CookieMonster.settings[11] = 1;
		}

		if (localStorage.UpgradeDisplay !== undefined) {
			CookieMonster.settings[12] = localStorage.UpgradeDisplay;
		} else {
			localStorage.UpgradeDisplay = 1;
			CookieMonster.settings[12] = 1;
		}
	}
	CookieMonster.toggleBar();
};

CookieMonster.saveSettings = function() {
	if (typeof Storage !== "undefined") {
		localStorage.FlashScreen    = CookieMonster.settings[0];
		localStorage.CookieTimer    = CookieMonster.settings[1];
		localStorage.BuffBars       = CookieMonster.settings[2];
		localStorage.Refresh        = CookieMonster.settings[3];
		localStorage.CookieCD       = CookieMonster.settings[4];
		localStorage.CMBar          = CookieMonster.settings[5];
		localStorage.ColoredPrices  = CookieMonster.settings[6];
		localStorage.ShortNumbers   = CookieMonster.settings[7];
		localStorage.CookieSound    = CookieMonster.settings[8];
		localStorage.UpdateTitle    = CookieMonster.settings[9];
		localStorage.LuckyAlert     = CookieMonster.settings[10];
		localStorage.UpgradeIcons   = CookieMonster.settings[11];
		localStorage.UpgradeDisplay = CookieMonster.settings[12];
	}

	CookieMonster.toggleBar();
};

CookieMonster.getOptionState = function(e) {
	return (CookieMonster.settings[e] === 0) ? 'OFF' : 'ON';
};

CookieMonster.toggleOption = function(option) {
	var $option = $(option);

	switch ($option.text()) {
	case "Flash Screen ON":
		CookieMonster.settings[0] = 0;
		$option.text("Flash Screen OFF");
		break;
	case "Flash Screen OFF":
		CookieMonster.settings[0] = 1;
		$option.text("Flash Screen ON");
		break;
	case "Cookie Sound ON":
		CookieMonster.settings[8] = 0;
		$option.text("Cookie Sound OFF");
		break;
	case "Cookie Sound OFF":
		CookieMonster.settings[8] = 1;
		$option.text("Cookie Sound ON");
		break;
	case "Cookie Timer ON":
		CookieMonster.settings[1] = 0;
		$option.text("Cookie Timer OFF");
		break;
	case "Cookie Timer OFF":
		CookieMonster.settings[1] = 1;
		$option.text("Cookie Timer ON");
		break;
	case "Next Cookie Timer ON":
		CookieMonster.settings[4] = 0;
		$option.text("Next Cookie Timer OFF");
		break;
	case "Next Cookie Timer OFF":
		CookieMonster.settings[4] = 1;
		$option.text("Next Cookie Timer ON");
		break;
	case "Update Title ON":
		CookieMonster.settings[9] = 0;
		$option.text("Update Title OFF");
		break;
	case "Update Title OFF":
		CookieMonster.settings[9] = 1;
		$option.text("Update Title ON");
		break;
	case "Buff Bars ON":
		CookieMonster.settings[2] = 0;
		$option.text("Buff Bars OFF");
		break;
	case "Buff Bars OFF":
		CookieMonster.settings[2] = 1;
		$option.text("Buff Bars ON");
		break;
	case "Bottom Bar ON":
		CookieMonster.settings[5] = 0;
		$option.text("Bottom Bar OFF");
		break;
	case "Bottom Bar OFF":
		CookieMonster.settings[5] = 1;
		$option.text("Bottom Bar ON");
		break;
	case "Colored Prices ON":
		CookieMonster.settings[6] = 0;
		$option.text("Colored Prices OFF");
		CookieMonster.updateTooltips("ob");
		break;
	case "Colored Prices OFF":
		CookieMonster.settings[6] = 1;
		$option.text("Colored Prices ON");
		CookieMonster.updateTooltips("ob");
		break;
	case "Upgrade Icons ON":
		CookieMonster.settings[11] = 0;
		$option.text("Upgrade Icons OFF");
		Game.RebuildUpgrades();
		break;
	case "Upgrade Icons OFF":
		CookieMonster.settings[11] = 1;
		$option.text("Upgrade Icons ON");
		Game.RebuildUpgrades();
		break;
	case "Upgrade Display (All)":
		CookieMonster.settings[12] = 0;
		$option.text("Upgrade Display (None)");
		CookieMonster.updateUpgradeDisplay();
		break;
	case "Upgrade Display (None)":
		CookieMonster.settings[12] = 1;
		$option.text("Upgrade Display (Normal)");
		CookieMonster.updateUpgradeDisplay();
		break;
	case "Upgrade Display (Normal)":
		CookieMonster.settings[12] = 2;
		$option.text("Upgrade Display (All)");
		CookieMonster.updateUpgradeDisplay();
		break;
	case "Short Numbers ON (B)":
		CookieMonster.settings[7] = 0;
		$option.text("Short Numbers OFF");
		Game.RebuildStore();
		Game.RebuildUpgrades();
		CookieMonster.updateTable();
		break;
	case "Short Numbers OFF":
		CookieMonster.settings[7] = 1;
		$option.text("Short Numbers ON (A)");
		Game.RebuildStore();
		Game.RebuildUpgrades();
		CookieMonster.updateTable();
		break;
	case "Short Numbers ON (A)":
		CookieMonster.settings[7] = 2;
		$option.text("Short Numbers ON (B)");
		Game.RebuildStore();
		Game.RebuildUpgrades();
		CookieMonster.updateTable();
		break;
	case "Lucky Alert (Both)":
		CookieMonster.settings[10] = 2;
		$option.text("Lucky Alert (Icons)");
		break;
	case "Lucky Alert (Icons)":
		CookieMonster.settings[10] = 3;
		$option.text("Lucky Alert (Notes)");
		break;
	case "Lucky Alert (Notes)":
		CookieMonster.settings[10] = 0;
		$option.text("Lucky Alert (Off)");
		break;
	case "Lucky Alert (Off)":
		CookieMonster.settings[10] = 1;
		$option.text("Lucky Alert (Both)");
		break;
	case "Refresh Rate (1 fps)":
		CookieMonster.settings[3] = 500;
		$option.text("Refresh Rate (2 fps)");
		break;
	case "Refresh Rate (2 fps)":
		CookieMonster.settings[3] = 250;
		$option.text("Refresh Rate (4 fps)");
		break;
	case "Refresh Rate (4 fps)":
		CookieMonster.settings[3] = 100;
		$option.text("Refresh Rate (10 fps)");
		break;
	case "Refresh Rate (10 fps)":
		CookieMonster.settings[3] = 33;
		$option.text("Refresh Rate (30 fps)");
		break;
	case "Refresh Rate (30 fps)":
		CookieMonster.settings[3] = 1e3;
		$option.text("Refresh Rate (1 fps)");
		break;
	}

	CookieMonster.saveSettings();
};

/**
 * Get a text version of the current short numbers option
 *
 * @return {string}
 */
CookieMonster.getShortNumbers = function() {
	switch (CookieMonster.settings[7] * 1) {
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
	switch (CookieMonster.settings[3] * 1) {
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
	switch (CookieMonster.settings[12] * 1) {
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