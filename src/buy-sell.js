/**
 * Computes the total sell out value
 *
 * @return {integer}
 */
CookieMonster.sellOutValue = function () {
	var e = 0;
	var t = Game.cookies;
	var n = new Array;
	var r = 0;

	Game.ObjectsById.forEach(function (e, t) {
		n[t] = e.amount;
		r += e.amount
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
				r--
			}
			while (t >= u.basePrice * Math.pow(1.15, n[i])) {
				s = true;
				t -= u.basePrice * Math.pow(1.15, n[i]);
				n[i]++;
				r++
			}
			if (s) {
				break
			}
		}
	}
	sell_out = e
}

/**
 * Sells out all buildings
 *
 * @return {void}
 */
CookieMonster.sellOut = function() {
	if (confirm("*** WARNING ***\nYou will have no buildings or cookies left after this.")) {
		Game.ObjectsById.forEach(function (e, t) {
			setTimeout(function () {
				while (e.amount > 0) {
					e.sell()
				}
			})
		});
		setTimeout(function () {
			Buy_Sell()
		})
	}
}

/**
 * Buys and sells all building
 *
 * @return {void}
 */
CookieMonster.buySell = function() {
	if (Game.cookies < 1e9 && Game.BuildingsOwned < 100) {
		CookieMonster.buySellNoWait();
		return false
	}

	for (var e = Game.ObjectsById.length - 1; e >= 0; e--) {
		var t = Game.ObjectsById[e];
		if (t.price <= Game.cookies) {
			t.buy();
			setTimeout(function () {
				CookieMonster.buySell();
			});
			return false
		}
		if (t.price > Game.cookies && t.amount > 0) {
			t.sell();
			setTimeout(function () {
				CookieMonster.buySell();
			});
			return false
		}
	}

	setTimeout(function () {
		CookieMonster.buySell();
	})
}

/**
 * Buys and sells all buildings (no wait)
 *
 * @return {void}
 */
CookieMonster.buySellNoWait = function() {
	if (Game.cookies < 15) {
		return false
	}
	for (var e = Game.ObjectsById.length - 1; e >= 0; e--) {
		var t = Game.ObjectsById[e];
		t.sell();
		if (t.price <= Game.cookies) {
			t.buy();
			t.sell();
			CookieMonster.buySellNoWait();
			return false
		}
	}
	CookieMonster.buySellNoWait()
}