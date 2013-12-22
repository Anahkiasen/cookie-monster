CookieMonster.factorTime = function(e) {
	var t = Game.cookies - e;
	var n = Game.cookiesPs;
	if (n === 0) {
		return 1
	}
	if (t < 0) {
		var r = e / n;
		return 1 - t * -1 / n / r
	}
	return 1
}

CookieMonster.secondsLeft = function(e, t) {
	var n = 0;
	if (t === "ob") {
		n = Game.ObjectsById[e].price
	}
	if (t === "up") {
		n = Game.UpgradesById[e].basePrice
	}
	var r = Game.cookies - n;
	var i = Game.cookiesPs;
	if (i === 0) {
		return 0
	}
	if (r < 0) {
		var s = n / i;
		var o = r * -1 / i;
		return o
	}
	return 0
}

CookieMonster.sts = function(e, t) {
	var n = settings[7];
	if (n > 0) {
		var r = 1e33;
		for (var i = sts_type[n - 1].length - 1; i >= 0; i--) {
			var s = (e / r % 999).toFixed(3);
			if (s >= 1) return s + sts_type[n - 1][i];
			r /= 1e3
		}
	}
	if (t) {
		return Math.round(e)
	}
	return Math.round(e * 100) / 100
}

CookieMonster.formatNumber = function(e) {
	return CookieMonster.sts(e, false).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

CookieMonster.formatNumberB = function(e) {
	return CookieMonster.sts(e, true).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

CookieMonster.formatTime = function(e, t) {
	e = Math.round(e);
	if (e === Infinity) {
		return "Never"
	}
	if (e === 0) {
		return "Done!"
	}
	if (e / 86400 > 1e3) {
		return "> 1,000 days"
	}
	var n = parseInt(e / 86400) % 999;
	var r = parseInt(e / 3600) % 24;
	var i = parseInt(e / 60) % 60;
	var s = e % 60;
	var o = new Array(" days, ", " hours, ", " minutes, ", " seconds");
	if (t != "min") {
		if (n === 1) {
			o[0] = " day, "
		}
		if (r === 1) {
			o[1] = " hour, "
		}
		if (i === 1) {
			o[2] = " minute, "
		}
		if (s === 1) {
			o[3] = " second"
		}
	} else {
		o = new Array("d, ", "h, ", "m, ", "s")
	}
	var u = "";
	if (n > 0) {
		u = u + n + o[0]
	}
	if (n > 0 || r > 0) {
		u = u + r + o[1]
	}
	if (n > 0 || r > 0 || i > 0) {
		u = u + i + o[2]
	}
	if (n > 0 || r > 0 || i > 0 || s > 0) {
		u = u + s + o[3]
	}
	return u
}