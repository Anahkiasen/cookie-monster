/**
 * Get a color for regular or colorblind people
 *
 * @param {String} color
 *
 * @return {String}
 */
CookieMonster.color = function(color) {
	var colors = this.getSetting('Colorblind') ? this.colorsBlind : this.colors;

	return colors[color];
};

/**
 * Check if the upgrade ID is the one for Heavenly Key
 *
 * @param {integer} upgrade
 *
 * @return {Boolean}
 */
CookieMonster.isHeavenlyKey = function(upgrade) {
	return Game.UpgradesById[upgrade].name === 'Heavenly key';
};

//////////////////////////////////////////////////////////////////////
//////////// THE "I HAVE NO FUCKING IDEA WHAT THESE DO" LAND /////////
//////////////////////////////////////////////////////////////////////

CookieMonster.lgt = function(e) {
	if (this.hasntAchievement('Elder') && Game.UpgradesById[e].name.indexOf(" grandmas") !== -1) {
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
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>twice</b>.") !== -1) {
			multiplier = multiplier * 2;
		}
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			multiplier = multiplier * 4;
		}
	});

	return Game.ObjectsById[7].amount * 0.05 * multiplier * Game.ObjectsById[1].amount * Game.globalCpsMult;
};

/**
 * Computes the production of Grandmas
 *
 * @return {Integer}
 */
CookieMonster.getGrandmasProduction = function() {
	var multiplier = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf('Grandmas are <b>twice</b>') !== -1) {
			multiplier = multiplier * 2;
		}
		if (upgrade.bought && upgrade.desc.indexOf('Grandmas are <b>4 times</b> as efficient.') !== -1) {
			multiplier = multiplier * 4;
		}
	});

	return Game.ObjectsById[1].amount * 0.02 * multiplier * Game.globalCpsMult;
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

CookieMonster.fte = function(e) {
	return Game.ObjectsById[e].storedTotalCps * 3 * Game.globalCpsMult;
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