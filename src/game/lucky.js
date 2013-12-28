/**
 * Get the lucky reward for a particular situation
 *
 * @param {string} context [regular,max]
 * @param {[type]} raw     Return in text form or formatted
 *
 * @return {String}
 */
CookieMonster.lucky = function(context, raw) {
	var reward =  Math.round((this.getFrenzyRate(context) * 1200 + 13) / 0.1);

	if (!raw) {
		if (reward <= Game.cookies) {
			reward = '<span style="color:#' +this.color('green')+ '; font-weight:bold;">' + this.formatNumber(reward) + "</span>";
		}
		else {
			reward = this.formatNumber(reward);
		}
	}

	return reward;
};

/**
 * Get the (MAX) lucky reward for a particular situation
 *
 * @param {string} context [current,max,max_frenzy]
 *
 * @return {string}
 */
CookieMonster.luckyReward = function(context) {
	var reward = this.getFrenzyRate(context);

	var number = [Math.round(reward * 1200 + 13), Math.round(Game.cookies * 0.1 + 13)];
	if (context === 'max' || context === 'frenzy') {
		if (Math.round((reward * 1200 + 13) / 0.1) > Game.cookies) {
			return this.formatNumber(number[0]);
		}
	}

	return this.formatNumber(Math.min.apply(Math, number));
};

/**
 * Get the frenzy Cookie/s for a context
 *
 * @param {String} context
 *
 * @return {Integer}
 */
CookieMonster.getFrenzyRate = function(context) {
	var reward = Game.cookiesPs;

	if (Game.frenzy > 0 && context !== 'current') {
		reward = reward / Game.frenzyPower;
	}
	if (context === 'frenzy') {
		reward = reward * 7;
	}

	return reward;
};