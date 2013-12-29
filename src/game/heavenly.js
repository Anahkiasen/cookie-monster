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

CookieMonster.getAchievementWorth = function(e, t, n, r) {
	var i = 0;
	var s = this.getHeavenlyMultiplier();
	if (r !== 0) {
		s = r;
	}
	var o = 0;
	var u = new Array(0, 0, 0, 0);
	var a = Game.milkProgress;
	var f = this.getFrenzyMultiplier();

	Game.UpgradesById.forEach(function (upgrade) {
		var r = upgrade.desc.replace("[Research]<br>", "");
		if (upgrade.bought && r.indexOf("Cookie production multiplier <b>+") !== -1) {
			s += r.substr(33, r.indexOf("%", 33) - 33) * 1;
		}
		if (!upgrade.bought && r.indexOf("Cookie production multiplier <b>+") !== -1 && upgrade.id === t) {
			o += r.substr(33, r.indexOf("%", 33) - 33) * 1;
		}
		if (upgrade.bought && upgrade.name === "Kitten helpers") {
			u[0] = 0.05;
		}
		if (upgrade.bought && upgrade.name === "Kitten workers") {
			u[1] = 0.1;
		}
		if (upgrade.bought && upgrade.name === "Kitten engineers") {
			u[2] = 0.2;
		}
		if (upgrade.bought && upgrade.name === "Kitten overseers") {
			u[3] = 0.2;
		}
	});
	var l = 100 + s;
	l = l * (1 + u[0] * a);
	l = l * (1 + u[1] * a);
	l = l * (1 + u[2] * a);
	l = l * (1 + u[3] * a);
	var c = n;
	var h = (Game.cookiesPs + c) / Game.globalCpsMult * (l / 100) * f;
	a += e * 0.04;
	l = 100 + s + o;
	l = l * (1 + u[0] * a);
	l = l * (1 + u[1] * a);
	l = l * (1 + u[2] * a);
	l = l * (1 + u[3] * a);
	var p = 0;
	switch (Game.UpgradesById[t].name) {
		case "Kitten helpers":
			p = 0.05;
			break;
		case "Kitten workers":
			p = 0.1;
			break;
		case "Kitten engineers":
			p = 0.2;
			break;
		case "Kitten overseers":
			p = 0.2;
			break;
	}
	l = l * (1 + p * a);
	i = (Game.cookiesPs + c) / Game.globalCpsMult * (l / 100) * f - h;
	var d = this.inc(i + h);
	if (d > 0) {
		a += d * 0.04;
		l = 100 + s + o;
		l = l * (1 + u[0] * a);
		l = l * (1 + u[1] * a);
		l = l * (1 + u[2] * a);
		l = l * (1 + u[3] * a);
		l = l * (1 + p * a);
		i = (Game.cookiesPs + c) / Game.globalCpsMult * (l / 100) * f - h;
	}
	if (r !== 0) {
		i = (Game.cookiesPs + c) / Game.globalCpsMult * (l / 100) * f;
	}
	if (Game.Has("Elder Covenant")) {
		i *= 0.95;
	}
	return i;
};