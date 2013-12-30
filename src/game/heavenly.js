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

/**
 * Get the current heavenly multiplier
 *
 * @return {integer}
 */
CookieMonster.getHeavenlyMultiplier = function() {
	var chips     = Game.prestige['Heavenly chips'] * 2;
	var potential = 0;

	if (Game.Has('Heavenly chip secret')) {
		potential += 0.05;
	}
	if (Game.Has('Heavenly cookie stand')) {
		potential += 0.2;
	}
	if (Game.Has('Heavenly bakery')) {
		potential += 0.25;
	}
	if (Game.Has('Heavenly confectionery')) {
		potential += 0.25;
	}
	if (Game.Has('Heavenly key')) {
		potential += 0.25;
	}

	return chips * potential;
};

/**
 * Get the number of heavenly chips for a particular context
 *
 * @param {string} context [max,cur,next,time]
 *
 * @return {string}
 */
CookieMonster.getHeavenlyChip = function(context) {
	var nextReset     = this.cookiesToHeavenly(Game.cookiesReset + Game.cookiesEarned);
	var currentAmount = this.cookiesToHeavenly(Game.cookiesReset);
	var nextChip      = this.heavenlyToCookies(nextReset + 1) - (Game.cookiesReset + Game.cookiesEarned);

	switch (context) {
		case 'max':
			return this.formatNumber(nextReset) + " <small>(" + this.formatNumber(nextReset * 2) + "%)</small>";

		case 'cur':
			return this.formatNumber(currentAmount) + " <small>(" + this.formatNumber(currentAmount * 2) + "%)</small>";

		case 'next':
			return this.formatNumber(Math.round(nextChip));

		case 'time':
			return this.formatTime(Math.round(nextChip / Game.cookiesPs));
	}
};

CookieMonster.getAchievementWorth = function(unlocked, upgradeKey, originalIncome, r) {
	var income             = 0;
	var heavenlyMultiplier = this.getHeavenlyMultiplier();
	var futureMultiplier   = 0;
	var milkModifiers      = [];
	var milkProgress       = Game.milkProgress;
	var frenzyMultiplier   = this.getFrenzyMultiplier();
	var l;
	if (r !== 0) {
		heavenlyMultiplier = r;
	}

	var milkPotentials = {
		'Kitten helpers'            : 0.05,
		'Kitten workers'            : 0.1,
		'Kitten engineers'          : 0.2,
		'Kitten overseers'          : 0.2,
		'Santa\'s milk and cookies' : 0.05,
	};

	Game.UpgradesById.forEach(function (upgrade) {
		var description = upgrade.desc.replace("[Research]<br>", "");
		if (upgrade.bought && description.indexOf("Cookie production multiplier <b>+") !== -1) {
			heavenlyMultiplier += description.substr(33, description.indexOf("%", 33) - 33) * 1;
		}
		if (!upgrade.bought && description.indexOf("Cookie production multiplier <b>+") !== -1 && upgrade.id === upgradeKey) {
			futureMultiplier += description.substr(33, description.indexOf("%", 33) - 33) * 1;
		}

		var milkUpgrade = milkPotentials[upgrade.name];
		if (upgrade.bought && typeof milkUpgrade !== 'undefined') {
			milkModifiers.push(milkUpgrade);
		}
	});

	l = 100 + heavenlyMultiplier;
	milkModifiers.forEach(function(modifier) {
		l = l * (1 + modifier * milkProgress);
	});
	var h = (Game.cookiesPs + originalIncome) / Game.globalCpsMult * (l / 100) * frenzyMultiplier;

	milkProgress += unlocked * 0.04;
	l = 100 + heavenlyMultiplier + futureMultiplier;
	milkModifiers.forEach(function(modifier) {
		l = l * (1 + modifier * milkProgress);
	});
	var p = milkPotentials[Game.UpgradesById[upgradeKey].name] || 0;
	l = l * (1 + p * milkProgress);

	income = (Game.cookiesPs + originalIncome) / Game.globalCpsMult * (l / 100) * frenzyMultiplier - h;
	var d = this.inc(income + h);
	if (d > 0) {

		milkProgress += d * 0.04;
		l = 100 + heavenlyMultiplier + futureMultiplier;
		milkModifiers.forEach(function(modifier) {
			l = l * (1 + modifier * milkProgress);
		});
		l = l * (1 + p * milkProgress);

		income = (Game.cookiesPs + originalIncome) / Game.globalCpsMult * (l / 100) * frenzyMultiplier - h;
	}
	if (r !== 0) {
		income = (Game.cookiesPs + originalIncome) / Game.globalCpsMult * (l / 100) * frenzyMultiplier;
	}
	if (Game.Has("Elder Covenant")) {
		income *= 0.95;
	}
	return income;
};