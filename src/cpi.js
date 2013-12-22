CookieMonster.getTrueCPI = function(e, t) {
	var n = 0;
	var r = 0;
	var i = 0;
	if (t === "ob") {
		n = this.secondsLeft(Game.ObjectsById[e], "ob");
		r = Game.ObjectsById[e].price;
		i = this.holdIs[e];
	}
	if (t === "up") {
		n = this.secondsLeft(Game.UpgradesById[e], "up");
		r = Game.UpgradesById[e].basePrice;
		for (var s = 0; s < this.upgradeCount; s++) {
			if (this.checkUpgrade(s, e, false)) {
				i = this.manageTooltips(s, e, false, true);
				break;
			}
		}
	}
	var o = r / i;
	Game.ObjectsById.forEach(function (s, u) {
		var a = s.price;
		var f = this.holdIs[u];
		var l = this.secondsLeft(s, "ob");
		if (l < n && (t === "up" || u !== e)) {
			var c = n - l;
			var h = f * c;
			var p = r - a + h;
			var d = p / i;
			if (d > o) {
				o = d;
			}
		}
	});

	return o;
};

CookieMonster.testTrueCPI = function(e, t) {
	var n = 0;
	var r = 0;
	var i = 0;
	var s = 0;
	if (t === "ob") {
		n = this.secondsLeft(e, "ob");
		i = Game.ObjectsById[e].price;
		s = this.holdIs[e];
	}
	if (t === "up") {
		n = this.secondsLeft(e, "up");
		i = Game.UpgradesById[e].basePrice;
		for (var o = 0; o < this.upgradeCount; o++) {
			if (this.checkUpgrade(o, e, false)) {
				s = this.manageTooltips(o, e, false, true);
				break;
			}
		}
	}
	var u = this.organizeObjectList();
	var a = i;
	var f = a / s;
	var l = f;
	var c = s;
	u.forEach(function (o, f) {
		if (i > o.price && (t === "up" || o.id !== e)) {
			var h = o.price;
			var p = this.holdIs[o.id];
			var d = this.holdCPI[o.id];
			if (c === 0) {
				c = p;
			}
			if (l === 0) {
				l = d;
			}
			var v = this.secondsLeft(o.id, "ob");
			var m = 0;
			var g = u[f + 1];
			if (g.id !== u.length && (this.holdCPI[g.id] < l || g.id === e)) {
				m = this.secondsLeft(g.id, "ob");
				l = this.holdCPI[g.id];
				c = p;
			}
			if (v < n - r) {
				var y = m - v;
				r += y;
				var b = c * y;
				if (y > 0) {
					s -= c;
					a = a - h + b;
				}
			}
		}
	});
	f = a / s;

	return f;
};