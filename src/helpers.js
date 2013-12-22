/**
 * Get the number of Heavenly Chips from a number of cookies (all time)
 *
 * @param {integer} cookiesNumber
 *
 * @return {integer}
 */
CookieMonster.cookiesToHeavenly = function(cookiesNumber) {
	return Math.floor(Math.sqrt(2.5 * Math.pow(10, 11) + 2 * cookiesNumber) / Math.pow(10, 6) - 0.5);
};

/**
 * Get the number of cookies required to have X chips
 *
 * @param {integer} chipsNumber
 *
 * @return {integer}
 */
CookieMonster.heavenlyToCookies = function(chipsNumber) {
	return 5 * Math.pow(10, 11) * chipsNumber * (chipsNumber + 1);
};

CookieMonster.dhc = function(e, t, n) {
	var r = Game.UpgradesById[t];
	var i = r.desc.indexOf("<b>") + 3;
	var s = r.desc.indexOf("%");
	var o = r.desc.substr(i, s - i) * 1;
	var u = CookieMonster.getAchievementWorth(e, t, n, Game.prestige["Heavenly chips"] * 2 * (o / 100));
	return u - Game.cookiesPs;
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

CookieMonster.lgt = function(e) {
	if (CookieMonster.hasAchievement("Elder") === 1 && Game.UpgradesById[e].name.indexOf(" grandmas") !== -1) {
		var t = [];
		var n = [];
		Game.UpgradesById.forEach(function (e, r) {
			if (e.bought && e.name.indexOf(" grandmas") !== -1) {
				t.push(r);
			} else if (!e.bought && e.name.indexOf(" grandmas") !== -1) {
				n.push(r);
			}
		});
		if (n.length === 1 && n[0] === e) {
			return true;
		}
	}
	return false;
};

/**
 * Check if the user has won an achievement
 *
 * @param {string} checkedAchievement
 *
 * @return {integer} Boolean in integer form
 */
CookieMonster.hasAchievement = function(checkedAchievement) {
	var found = 0;

	Game.AchievementsById.forEach(function (achievement) {
		if (!achievement.won && achievement.name === checkedAchievement) {
			found = 1;
		}
	});

	return found;
};

CookieMonster.gpp = function() {
	var e = 1;

	Game.UpgradesById.forEach(function (t) {
		if (t.bought && t.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			e = e * 2;
		}

		if (t.bought && t.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			e = e * 4;
		}
	});

	return Game.ObjectsById[7].amount * 0.05 * e * Game.ObjectsById[1].amount * Game.globalCpsMult;
};

CookieMonster.gpg = function() {
	var e = 1;

	Game.UpgradesById.forEach(function (t) {
		if (t.bought && t.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			e = e * 2;
		}
		if (t.bought && t.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			e = e * 4;
		}
	});

	return Game.ObjectsById[1].amount * 0.02 * e * Game.ObjectsById[1].amount * Game.globalCpsMult;
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

CookieMonster.bam = function(e, t, n) {
	var r = 1;

	Game.UpgradesById.forEach(function (t) {
		if (t.bought && t.desc.indexOf(e + " are <b>twice</b> as efficient.") !== -1) {
			r = r * 2;
		}
		if (t.bought && t.desc.indexOf(e + " are <b>4 times</b> as efficient.") !== -1) {
			r = r * 4;
		}
	});

	return t * r * Game.ObjectsById[n].amount * Game.globalCpsMult;
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