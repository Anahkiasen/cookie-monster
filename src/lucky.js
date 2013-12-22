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

CookieMonster.luckyReward = function(e) {
	var t = Game.cookiesPs;
	if (Game.frenzy > 0 && e !== "cur") {
		t = t / Game.frenzyPower;
	}
	if (e === "max_frenzy") {
		t = t * 7;
	}
	var n = new Array(Math.round(t * 1200 + 13), Math.round(Game.cookies * 0.1 + 13));
	if (e === "max" || e === "max_frenzy") {
		if (Math.round((t * 1200 + 13) / 0.1) > Game.cookies) {
			return CookieMonster.formatNumber(n[0]);
		}
	}
	return CookieMonster.formatNumber(Math.min.apply(Math, n));
};