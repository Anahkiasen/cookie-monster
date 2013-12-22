CookieMonster.getUpgradeBonuses = function(e, t, n) {
	var r = 0;
	var i = 0;
	switch (e) {
	case "Cursor":
		if (t == 0) {
			i += _cha("Click")
		}
		if (t == 1) {
			i += _cha("Double-click")
		}
		if (t == 49) {
			i += _cha("Mouse wheel")
		}
		if (t == 99) {
			i += _cha("Of Mice and Men")
		}
		if (t == 199) {
			i += _cha("The Digital")
		}
		break;
	case "Grandma":
		r += CookieMonster.getTotalGrandmaModifiers(t) * Game.globalCpsMult;
		r += CookieMonster.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t == 0) {
			i += _cha("Grandma's Cookies")
		}
		if (t == 49) {
			i += _cha("Sloppy kisses")
		}
		if (t == 99) {
			i += _cha("Retirement home")
		}
		if (t == 149) {
			i += _cha("Friend of the ancients")
		}
		if (t == 199) {
			i += _cha("Ruler of the ancients")
		}
		break;
	case "Farm":
		r += CookieMonster.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t == 0) {
			i += _cha("My first farm")
		}
		if (t == 49) {
			i += _cha("Reap what you sow")
		}
		if (t == 99) {
			i += _cha("Farm ill")
		}
		break;
	case "Factory":
		r += CookieMonster.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t == 0) {
			i += _cha("Production chain")
		}
		if (t == 49) {
			i += _cha("Industrial revolution")
		}
		if (t == 99) {
			i += _cha("Global warming")
		}
		break;
	case "Mine":
		r += CookieMonster.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t == 0) {
			i += _cha("You know the drill")
		}
		if (t == 49) {
			i += _cha("Excavation site")
		}
		if (t == 99) {
			i += _cha("Hollow the planet")
		}
		break;
	case "Shipment":
		r += CookieMonster.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t == 0) {
			i += _cha("Expedition")
		}
		if (t == 49) {
			i += _cha("Galactic highway")
		}
		if (t == 99) {
			i += _cha("Far far away")
		}
		break;
	case "Alchemy lab":
		r += CookieMonster.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t == 0) {
			i += _cha("Transmutation")
		}
		if (t == 49) {
			i += _cha("Transmogrification")
		}
		if (t == 99) {
			i += _cha("Gold member")
		}
		break;
	case "Portal":
		r += CookieMonster.getTotalPortalModifiers() * Game.globalCpsMult;
		r += CookieMonster.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t == 0) {
			i += _cha("A whole new world")
		}
		if (t == 49) {
			i += _cha("Now you're thinking")
		}
		if (t == 99) {
			i += _cha("Dimensional shift")
		}
		break;
	case "Time machine":
		r += CookieMonster.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t == 0) {
			i += _cha("Time warp")
		}
		if (t == 49) {
			i += _cha("Alternate timeline")
		}
		if (t == 99) {
			i += _cha("Rewriting history")
		}
		break;
	case "Antimatter condenser":
		r += CookieMonster.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t == 0) {
			i += _cha("Antibatter")
		}
		if (t == 49) {
			i += _cha("Quirky quarks")
		}
		if (t == 99) {
			i += _cha("It does matter!")
		}
		break
	}
	if (Game.BuildingsOwned == 99) {
		i += _cha("Builder")
	}
	if (Game.BuildingsOwned == 399) {
		i += _cha("Architect")
	}
	if (Game.BuildingsOwned == 799) {
		i += _cha("Engineer")
	}
	if (_owe(e)) {
		i++
	}
	if (_mat(e)) {
		i++
	}
	if (_bat(e)) {
		i++
	}
	if (_cen(e)) {
		i++
	}
	return r + CookieMonster.getAchievementWorth(i, 0, r + n, 0)
}

CookieMonster.getTotalCursorModifiers = function() {
	var e = 0;
	Game.UpgradesById.forEach(function (t, n) {
		if (t.bought && t.desc.indexOf("The mouse and cursors gain") != -1) {
			var r = 31;
			if (t.desc.indexOf(" another ") != -1) {
				r += 8
			}
			e += t.desc.substr(r, t.desc.indexOf("<", r) - r) * 1
		}
	});
	return e * Game.ObjectsById[0].amount
}

CookieMonster.getTotalGrandmaModifiers = function(e) {
	var t = .5;
	var n = 0;
	var r = 1;
	Game.UpgradesById.forEach(function (i, s) {
		if (i.bought && i.name == "Forwards from grandma") {
			t += .3
		}
		if (i.bought && i.desc.indexOf("Grandmas are <b>twice</b> as efficient.") != -1) {
			r = r * 2
		}
		if (i.bought && i.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") != -1) {
			r = r * 4
		}
		if (i.bought && i.desc.indexOf("for each 50 grandmas") != -1) {
			n += (e + 1) * .02 * (e + 1) - e * .02 * e
		}
		if (i.bought && i.desc.indexOf("for each 20 portals") != -1) {
			n += Game.ObjectsById[7].amount * .05
		}
	});
	return t * r + n * r
}

CookieMonster.getTotalPortalModifiers = function() {
	var e = 0;
	var t = 1;
	Game.UpgradesById.forEach(function (n, r) {
		if (n.bought && n.desc.indexOf("Grandmas are <b>twice</b> as efficient.") != -1) {
			t = t * 2
		}
		if (n.bought && n.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") != -1) {
			t = t * 4
		}
		if (n.bought && n.desc.indexOf("for each 20 portals") != -1) {
			e += Game.ObjectsById[1].amount * .05
		}
	});
	return e * t
}