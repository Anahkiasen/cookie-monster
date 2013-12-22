CookieMonster.loadSettings = function() {
	settings = [1, 1, 1, 1e3, 1, 1, 1, 1, 0, 1, 1, 1, 1];
	if (typeof Storage !== "undefined") {
		if (localStorage.FlashScreen !== undefined) {
			CookieMonster.settings[0] = localStorage.FlashScreen;
		} else {
			localStorage.FlashScreen = 1;
			CookieMonster.settings[0] = 1
		} if (localStorage.CookieTimer !== undefined) {
			CookieMonster.settings[1] = localStorage.CookieTimer;
		} else {
			localStorage.CookieTimer = 1;
			CookieMonster.settings[1] = 1
		} if (localStorage.BuffBars !== undefined) {
			CookieMonster.settings[2] = localStorage.BuffBars;
		} else {
			localStorage.BuffBars = 1;
			CookieMonster.settings[2] = 1
		} if (localStorage.Refresh !== undefined) {
			CookieMonster.settings[3] = localStorage.Refresh;
		} else {
			localStorage.Refresh = 1e3;
			CookieMonster.settings[3] = 1e3
		} if (localStorage.CookieCD !== undefined) {
			CookieMonster.settings[4] = localStorage.CookieCD;
		} else {
			localStorage.CookieCD = 1;
			CookieMonster.settings[4] = 1
		} if (localStorage.CMBar !== undefined) {
			CookieMonster.settings[5] = localStorage.CMBar;
		} else {
			localStorage.CMBar = 1;
			CookieMonster.settings[5] = 1
		} if (localStorage.ColoredPrices !== undefined) {
			CookieMonster.settings[6] = localStorage.ColoredPrices;
		} else {
			localStorage.ColoredPrices = 1;
			CookieMonster.settings[6] = 1
		} if (localStorage.ShortNumbers !== undefined) {
			CookieMonster.settings[7] = localStorage.ShortNumbers;
		} else {
			localStorage.ShortNumbers = 1;
			CookieMonster.settings[7] = 1
		} if (localStorage.CookieSound !== undefined) {
			CookieMonster.settings[8] = localStorage.CookieSound;
		} else {
			localStorage.CookieSound = 0;
			CookieMonster.settings[8] = 0
		} if (localStorage.UpdateTitle !== undefined) {
			CookieMonster.settings[9] = localStorage.UpdateTitle;
		} else {
			localStorage.UpdateTitle = 1;
			CookieMonster.settings[9] = 1
		} if (localStorage.LuckyAlert !== undefined) {
			CookieMonster.settings[10] = localStorage.LuckyAlert;
		} else {
			localStorage.LuckyAlert = 1;
			CookieMonster.settings[10] = 1
		} if (localStorage.UpgradeIcons !== undefined) {
			CookieMonster.settings[11] = localStorage.UpgradeIcons;
		} else {
			localStorage.UpgradeIcons = 1;
			CookieMonster.settings[11] = 1
		} if (localStorage.UpgradeDisplay !== undefined) {
			CookieMonster.settings[12] = localStorage.UpgradeDisplay;
		} else {
			localStorage.UpgradeDisplay = 1;
			CookieMonster.settings[12] = 1;
		}
	}
	CookieMonster.toggleBar()
}

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

	CookieMonster.toggleBar()
}

CookieMonster.getOptionState = function(e) {
	return (CookieMonster.settings[e] === 0) ? 'Off' : 'On';
}

CookieMonster.toggleOption = function(e) {
	e = $(e);
	var t = e.text();

	switch (t) {
	case "Flash Screen ON":
		CookieMonster.settings[0] = 0;
		e.text("Flash Screen OFF");
		break;
	case "Flash Screen OFF":
		CookieMonster.settings[0] = 1;
		e.text("Flash Screen ON");
		break;
	case "Cookie Sound ON":
		CookieMonster.settings[8] = 0;
		e.text("Cookie Sound OFF");
		break;
	case "Cookie Sound OFF":
		CookieMonster.settings[8] = 1;
		e.text("Cookie Sound ON");
		break;
	case "Cookie Timer ON":
		CookieMonster.settings[1] = 0;
		e.text("Cookie Timer OFF");
		break;
	case "Cookie Timer OFF":
		CookieMonster.settings[1] = 1;
		e.text("Cookie Timer ON");
		break;
	case "Next Cookie Timer ON":
		CookieMonster.settings[4] = 0;
		e.text("Next Cookie Timer OFF");
		break;
	case "Next Cookie Timer OFF":
		CookieMonster.settings[4] = 1;
		e.text("Next Cookie Timer ON");
		break;
	case "Update Title ON":
		CookieMonster.settings[9] = 0;
		e.text("Update Title OFF");
		break;
	case "Update Title OFF":
		CookieMonster.settings[9] = 1;
		e.text("Update Title ON");
		break;
	case "Buff Bars ON":
		CookieMonster.settings[2] = 0;
		e.text("Buff Bars OFF");
		break;
	case "Buff Bars OFF":
		CookieMonster.settings[2] = 1;
		e.text("Buff Bars ON");
		break;
	case "Bottom Bar ON":
		CookieMonster.settings[5] = 0;
		e.text("Bottom Bar OFF");
		break;
	case "Bottom Bar OFF":
		CookieMonster.settings[5] = 1;
		e.text("Bottom Bar ON");
		break;
	case "Colored Prices ON":
		CookieMonster.settings[6] = 0;
		e.text("Colored Prices OFF");
		CookieMonster.updateTooltips("ob");
		break;
	case "Colored Prices OFF":
		CookieMonster.settings[6] = 1;
		e.text("Colored Prices ON");
		CookieMonster.updateTooltips("ob");
		break;
	case "Upgrade Icons ON":
		CookieMonster.settings[11] = 0;
		e.text("Upgrade Icons OFF");
		Game.RebuildUpgrades();
		break;
	case "Upgrade Icons OFF":
		CookieMonster.settings[11] = 1;
		e.text("Upgrade Icons ON");
		Game.RebuildUpgrades();
		break;
	case "Upgrade Display (All)":
		CookieMonster.settings[12] = 0;
		e.text("Upgrade Display (None)");
		CookieMonster.updateUpgradeDisplay();
		break;
	case "Upgrade Display (None)":
		CookieMonster.settings[12] = 1;
		e.text("Upgrade Display (Normal)");
		CookieMonster.updateUpgradeDisplay();
		break;
	case "Upgrade Display (Normal)":
		CookieMonster.settings[12] = 2;
		e.text("Upgrade Display (All)");
		CookieMonster.updateUpgradeDisplay();
		break;
	case "Short Numbers ON (B)":
		CookieMonster.settings[7] = 0;
		e.text("Short Numbers OFF");
		Game.RebuildStore();
		Game.RebuildUpgrades();
		CookieMonster.updateTable();
		break;
	case "Short Numbers OFF":
		CookieMonster.settings[7] = 1;
		e.text("Short Numbers ON (A)");
		Game.RebuildStore();
		Game.RebuildUpgrades();
		CookieMonster.updateTable();
		break;
	case "Short Numbers ON (A)":
		CookieMonster.settings[7] = 2;
		e.text("Short Numbers ON (B)");
		Game.RebuildStore();
		Game.RebuildUpgrades();
		CookieMonster.updateTable();
		break;
	case "Lucky Alert (Both)":
		CookieMonster.settings[10] = 2;
		e.text("Lucky Alert (Icons)");
		break;
	case "Lucky Alert (Icons)":
		CookieMonster.settings[10] = 3;
		e.text("Lucky Alert (Notes)");
		break;
	case "Lucky Alert (Notes)":
		CookieMonster.settings[10] = 0;
		e.text("Lucky Alert (Off)");
		break;
	case "Lucky Alert (Off)":
		CookieMonster.settings[10] = 1;
		e.text("Lucky Alert (Both)");
		break;
	case "Refresh Rate (1 fps)":
		CookieMonster.settings[3] = 500;
		e.text("Refresh Rate (2 fps)");
		break;
	case "Refresh Rate (2 fps)":
		CookieMonster.settings[3] = 250;
		e.text("Refresh Rate (4 fps)");
		break;
	case "Refresh Rate (4 fps)":
		CookieMonster.settings[3] = 100;
		e.text("Refresh Rate (10 fps)");
		break;
	case "Refresh Rate (10 fps)":
		CookieMonster.settings[3] = 33;
		e.text("Refresh Rate (30 fps)");
		break;
	case "Refresh Rate (30 fps)":
		CookieMonster.settings[3] = 1e3;
		e.text("Refresh Rate (1 fps)");
		break;
	}

	CookieMonster.saveSettings()
}