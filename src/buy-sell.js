/**
 * Computes the total sell out value
 *
 * @return {integer}
 */
CookieMonster.sellOutValue = function () {
	var e = 0;
	var t = Game.cookies;
	var n = [];
	var r = 0;

	Game.ObjectsById.forEach(function (e, t) {
		n[t] = e.amount;
		r += e.amount;
	});

	while (t >= 15 || r > 0) {
		for (var i = n.length - 1; i >= 0; i--) {
			var s = false;
			var o = n[i];
			var u = Game.ObjectsById[i];
			for (var a = o; a > 0; a--) {
				t += Math.floor(u.basePrice * Math.pow(1.15, a) / 2);
				e += Math.floor(u.basePrice * Math.pow(1.15, a) / 2);
				n[i]--;
				r--;
			}
			while (t >= u.basePrice * Math.pow(1.15, n[i])) {
				s = true;
				t -= u.basePrice * Math.pow(1.15, n[i]);
				n[i]++;
				r++;
			}
			if (s) {
				break;
			}
		}
	}

	CookieMonster.sellOut = e;
};

/**
 * Sells out all buildings
 *
 * @return {void}
 */
CookieMonster.sellOut = function() {
	if (confirm("*** WARNING ***\nYou will have no buildings or cookies left after this.")) {
		Game.ObjectsById.forEach(function (building) {
			setTimeout(function () {
				while (building.amount > 0) {
					building.sell();
				}
			});
		});

		setTimeout(function () {
			CookieMonster.buySell();
		});
	}
};

/**
 * Buys and sells all building
 *
 * @return {void}
 */
CookieMonster.buySell = function() {
	if (Game.cookies < 1e9 && Game.BuildingsOwned < 100) {
		this.buySellNoWait();
		return false;
	}

	for (var e = Game.ObjectsById.length - 1; e >= 0; e--) {
		var t = Game.ObjectsById[e];
		if (t.price <= Game.cookies) {
			t.buy();
			return setTimeout(function () {
				CookieMonster.buySell();
			});
		}
		if (t.price > Game.cookies && t.amount > 0) {
			t.sell();
			return setTimeout(function () {
				CookieMonster.buySell();
			});
		}
	}

	setTimeout(function () {
		CookieMonster.buySell();
	});
};

/**
 * Buys and sells all buildings (no wait)
 *
 * @return {void}
 */
CookieMonster.buySellNoWait = function() {
	if (Game.cookies < 15) {
		return false;
	}

	for (var e = Game.ObjectsById.length - 1; e >= 0; e--) {
		var t = Game.ObjectsById[e];
		t.sell();

		if (t.price <= Game.cookies) {
			t.buy();
			t.sell();
			this.buySellNoWait();
			return false;
		}
	}

	this.buySellNoWait();
};