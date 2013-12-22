CookieMonster.getUpgradeBonuses = function(e, t, n) {
	var r = 0;
	var i = 0;
	switch (e) {
	case "Cursor":
		if (t === 0) {
			i += this.checkAchievement("Click");
		}
		if (t === 1) {
			i += this.checkAchievement("Double-click");
		}
		if (t === 49) {
			i += this.checkAchievement("Mouse wheel");
		}
		if (t === 99) {
			i += this.checkAchievement("Of Mice and Men");
		}
		if (t === 199) {
			i += this.checkAchievement("The Digital");
		}
		break;
	case "Grandma":
		r += this.getTotalGrandmaModifiers(t) * Game.globalCpsMult;
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("Grandma's Cookies");
		}
		if (t === 49) {
			i += this.checkAchievement("Sloppy kisses");
		}
		if (t === 99) {
			i += this.checkAchievement("Retirement home");
		}
		if (t === 149) {
			i += this.checkAchievement("Friend of the ancients");
		}
		if (t === 199) {
			i += this.checkAchievement("Ruler of the ancients");
		}
		break;
	case "Farm":
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("My first farm");
		}
		if (t === 49) {
			i += this.checkAchievement("Reap what you sow");
		}
		if (t === 99) {
			i += this.checkAchievement("Farm ill");
		}
		break;
	case "Factory":
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("Production chain");
		}
		if (t === 49) {
			i += this.checkAchievement("Industrial revolution");
		}
		if (t === 99) {
			i += this.checkAchievement("Global warming");
		}
		break;
	case "Mine":
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("You know the drill");
		}
		if (t === 49) {
			i += this.checkAchievement("Excavation site");
		}
		if (t === 99) {
			i += this.checkAchievement("Hollow the planet");
		}
		break;
	case "Shipment":
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("Expedition");
		}
		if (t === 49) {
			i += this.checkAchievement("Galactic highway");
		}
		if (t === 99) {
			i += this.checkAchievement("Far far away");
		}
		break;
	case "Alchemy lab":
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("Transmutation");
		}
		if (t === 49) {
			i += this.checkAchievement("Transmogrification");
		}
		if (t === 99) {
			i += this.checkAchievement("Gold member");
		}
		break;
	case "Portal":
		r += CookieMonster.getTotalPortalModifiers() * Game.globalCpsMult;
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("A whole new world");
		}
		if (t === 49) {
			i += this.checkAchievement("Now you're thinking");
		}
		if (t === 99) {
			i += this.checkAchievement("Dimensional shift");
		}
		break;
	case "Time machine":
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("Time warp");
		}
		if (t === 49) {
			i += this.checkAchievement("Alternate timeline");
		}
		if (t === 99) {
			i += this.checkAchievement("Rewriting history");
		}
		break;
	case "Antimatter condenser":
		r += this.getTotalCursorModifiers() * Game.globalCpsMult;
		if (t === 0) {
			i += this.checkAchievement("Antibatter");
		}
		if (t === 49) {
			i += this.checkAchievement("Quirky quarks");
		}
		if (t === 99) {
			i += this.checkAchievement("It does matter!");
		}
		break;
	}
	if (Game.BuildingsOwned === 99) {
		i += this.checkAchievement("Builder");
	}
	if (Game.BuildingsOwned === 399) {
		i += this.checkAchievement("Architect");
	}
	if (Game.BuildingsOwned === 799) {
		i += this.checkAchievement("Engineer");
	}
	if (CookieMonster.oneWithEverything(e)) {
		i++;
	}
	if (CookieMonster.mathematician(e)) {
		i++;
	}
	if (CookieMonster.baseTen(e)) {
		i++;
	}
	if (CookieMonster.centennial(e)) {
		i++;
	}
	return r + this.getAchievementWorth(i, 0, r + n, 0);
};

CookieMonster.getTotalCursorModifiers = function() {
	var e = 0;
	Game.UpgradesById.forEach(function (t) {
		if (t.bought && t.desc.indexOf("The mouse and cursors gain") !== -1) {
			var r = 31;
			if (t.desc.indexOf(" another ") !== -1) {
				r += 8;
			}
			e += t.desc.substr(r, t.desc.indexOf("<", r) - r) * 1;
		}
	});

	return e * Game.ObjectsById[0].amount;
};

CookieMonster.getTotalGrandmaModifiers = function(e) {
	var t = 0.5;
	var n = 0;
	var r = 1;

	Game.UpgradesById.forEach(function (i) {
		if (i.bought && i.name === "Forwards from grandma") {
			t += 0.3;
		}
		if (i.bought && i.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			r = r * 2;
		}
		if (i.bought && i.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			r = r * 4;
		}
		if (i.bought && i.desc.indexOf("for each 50 grandmas") !== -1) {
			n += (e + 1) * 0.02 * (e + 1) - e * 0.02 * e;
		}
		if (i.bought && i.desc.indexOf("for each 20 portals") !== -1) {
			n += Game.ObjectsById[7].amount * 0.05;
		}
	});

	return t * r + n * r;
};

CookieMonster.getTotalPortalModifiers = function() {
	var e     = 0;
	var total = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			total = total * 2;
		}
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			total = total * 4;
		}
		if (upgrade.bought && upgrade.desc.indexOf("for each 20 portals") !== -1) {
			e += Game.ObjectsById[1].amount * 0.05;
		}
	});

	return e * total;
};