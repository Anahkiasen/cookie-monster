/**
 * Get a color for regular or colorblind people
 *
 * @param {String} color
 *
 * @return {String}
 */
CookieMonster.color = function(color, hex) {
	var colors = this.getSetting('Colorblind') ? this.colorsBlind : this.colors;
	var color = colors[color];

	return hex ? '#'+color : color;
};

/**
 * Check if the upgrade ID is the one for Heavenly Key
 *
 * @param {integer} upgrade
 *
 * @return {Boolean}
 */
CookieMonster.isHeavenlyKey = function(upgrade) {
	return (Game.UpgradesById[upgrade].name === "Heavenly key");
};

/**
 * Check if an upgrade is in store
 *
 * @param {Array} upgrade
 *
 * @return {Boolean}
 */
CookieMonster.isInStore = function(upgrade) {
	return Game.UpgradesInStore.indexOf(upgrade) !== -1;
};

CookieMonster.dhc = function(e, t, n) {
	var r = Game.UpgradesById[t];
	var i = r.desc.indexOf("<b>") + 3;
	var s = r.desc.indexOf("%");
	var o = r.desc.substr(i, s - i) * 1;
	var u = CookieMonster.getAchievementWorth(e, t, n, Game.prestige["Heavenly chips"] * 2 * (o / 100));
	return u - Game.cookiesPs;
};

CookieMonster.lgt = function(e) {
	if (CookieMonster.hasntAchievement("Elder") && Game.UpgradesById[e].name.indexOf(" grandmas") !== -1) {
		var t = [];
		var n = [];
		Game.UpgradesById.forEach(function (upgrade, key) {
			if (upgrade.bought && upgrade.name.indexOf(" grandmas") !== -1) {
				t.push(key);
			} else if (!upgrade.bought && upgrade.name.indexOf(" grandmas") !== -1) {
				n.push(key);
			}
		});
		if (n.length === 1 && n[0] === e) {
			return true;
		}
	}
	return false;
};


CookieMonster.gpp = function() {
	var multiplier = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			multiplier = multiplier * 2;
		}

		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			multiplier = multiplier * 4;
		}
	});

	return Game.ObjectsById[7].amount * 0.05 * multiplier * Game.ObjectsById[1].amount * Game.globalCpsMult;
};

CookieMonster.gpg = function() {
	var multiplier = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			multiplier = multiplier * 2;
		}
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			multiplier = multiplier * 4;
		}
	});

	return Game.ObjectsById[1].amount * 0.02 * multiplier * Game.ObjectsById[1].amount * Game.globalCpsMult;
};

CookieMonster.mcg = function(e) {
	var t = Game.UpgradesById[e].desc;
	var n = 31;
	if (t.indexOf(" another ") !== -1) {
		n += 8;
	}
	var r = t.substr(n, t.indexOf("<", n) - n) * 1;
	return r * (Game.BuildingsOwned - Game.ObjectsById[0].amount) * Game.ObjectsById[0].amount * Game.globalCpsMult;
};

CookieMonster.bte = function(e) {
	return Game.ObjectsById[e].storedTotalCps * Game.globalCpsMult;
};

CookieMonster.fte = function(e) {
	return Game.ObjectsById[e].storedTotalCps * 3 * Game.globalCpsMult;
};

CookieMonster.bam = function(building, cookiesPerSecond, buildingKey) {
	var multiplier = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf(building + " are <b>twice</b> as efficient.") !== -1) {
			multiplier = multiplier * 2;
		}
		if (upgrade.bought && upgrade.desc.indexOf(building + " are <b>4 times</b> as efficient.") !== -1) {
			multiplier = multiplier * 4;
		}
	});

	return cookiesPerSecond * multiplier * Game.ObjectsById[buildingKey].amount * Game.globalCpsMult;
};

CookieMonster.inc = function(e) {
	var t = 0;

	Game.AchievementsById.forEach(function (achievement) {
		var i = achievement.desc.replace(/,/g, "");
		if (!achievement.won && i.indexOf(" per second.") !== -1) {
			if (e >= i.substr(8, i.indexOf("</b>", 8) - 8) * 1) {
				t++;
			}
		}
	});

	return t;
};

CookieMonster.checkUpgrade = function(e, t, n) {
	var upgrade = Game.UpgradesById[t];
	if (upgrade.desc.indexOf("cm_up_div_") === -1 && !n) {
		return false;
	}

	var upgrades = [
		"Reinforced index finger",
		"The mouse and cursors are <b>twice</b> as efficient.",
		"The mouse and cursors gain",
		"Forwards from grandma",
		"Grandmas are <b>twice</b> as efficient.",
		"Cheap hoes",
		"Farms are <b>twice</b> as efficient.",
		"Sturdier conveyor belts",
		"Factories are <b>twice</b> as efficient.",
		"Sugar gas",
		"Mines are <b>twice</b> as efficient.",
		"Vanilla nebulae",
		"Shipments are <b>twice</b> as efficient.",
		"Antimony",
		"Alchemy labs are <b>twice</b> as efficient.",
		"Ancient tablet",
		"Portals are <b>twice</b> as efficient.",
		"Flux capacitors",
		"Time machines are <b>twice</b> as efficient.",
		"the more milk you have",
		"Cookie production multiplier <b>+",
		"for every 50 grandmas",
		"for every 20 portals",
		"Elder Pledge",
		"Elder Covenant",
		"Sacrificial rolling pins",
		"Golden cookie",
		"Clicking gains <b>+1% of your CpS</b>.",
		"Grandmas are <b>4 times</b> as efficient.",
		"Antimatter condensers are <b>twice</b> as efficient.",
		"Sugar bosons",
		"Revoke Elder Covenant",
		"heavenly chips",
	];

	// Get description and check it against current upgrade
	var description = upgrades[e];
	if (!upgrade.bought && (upgrade.name === description || upgrade.desc.indexOf(description) !== -1)) {
		return true;
	}

	return false;
};