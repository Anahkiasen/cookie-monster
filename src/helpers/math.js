CookieMonster.formatNumber = function(e) {
	return this.toHumanNumber(e, false).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

CookieMonster.formatNumberB = function(e) {
	return this.toHumanNumber(e, true).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

CookieMonster.toHumanNumber = function(e, t) {
	var n = this.settings[7];
	if (n > 0) {
		var r = 1e33;
		for (var i = this.stsType[n - 1].length - 1; i >= 0; i--) {
			var s = (e / r % 999).toFixed(3);
			if (s >= 1) {
				return s + this.stsType[n - 1][i];
			}
			r /= 1e3;
		}
	}
	if (t) {
		return Math.round(e);
	}
	return Math.round(e * 100) / 100;
};