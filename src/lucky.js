CookieMonster.lucky = function(e, t) {
	var n = Game.cookiesPs;
	if (Game.frenzy > 0) {
		n = n / Game.frenzyPower;
	}
	if (e === "frenzy") {
		n = n * 7;
	}
	var r = Math.round((n * 1200 + 13) / 0.1);

	if (!t) {
		if (r <= Game.cookies) {
			r = '<span style="color:#00FF00; font-weight:bold;">' + CookieMonster.formatNumber(r) + "</span>";
		}
		else {
			r = CookieMonster.formatNumber(r);
		}
	}

	return r;
};

/**
 * Get the lucky reward for a particular situation
 *
 * @param {string} context [cur,max,max_frenzy]
 *
 * @return {string}
 */
CookieMonster.luckyReward = function(context) {
	var reward = Game.cookiesPs;

	if (Game.frenzy > 0 && context !== "cur") {
		reward = reward / Game.frenzyPower;
	}
	if (context === "max_frenzy") {
		reward = reward * 7;
	}

	var number = [Math.round(reward * 1200 + 13), Math.round(Game.cookies * 0.1 + 13)];
	if (context === "max" || context === "max_frenzy") {
		if (Math.round((reward * 1200 + 13) / 0.1) > Game.cookies) {
			return this.formatNumber(number[0]);
		}
	}

	return this.formatNumber(Math.min.apply(Math, number));
};