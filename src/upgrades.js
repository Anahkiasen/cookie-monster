CookieMonster.getUpgradeBonuses = function(building, currentNumber, n) {
	var r = 0;
	var i = 0;

	var upgrades = {
		'Cursor': {
			0   : 'Click',
			1   : 'Double-click',
			49  : 'Mouse wheel',
			99  : 'Of Mice and Men',
			199 : 'The Digital',
		},
		'Grandma': {
			0   : 'Grandma\'s Cookies',
			49  : 'Sloppy kisses',
			99  : 'Retirement home',
			149 : 'Friend of the ancients',
			199 : 'Ruler of the ancients',
		},
		'Farm': {
			0  : 'My first farm',
			49 : 'Reap what you sow',
			99 : 'Farm ill',
		},
		'Factory': {
			0  : 'Production chain',
			49 : 'Industrial revolution',
			99 : 'Global warming',
		},
		'Mine': {
			0  : 'You know the drill',
			49 : 'Excavation site',
			99 : 'Hollow the planet',
		},
		'Shipment': {
			0  : 'Expedition',
			49 : 'Galactic highway',
			99 : 'Far far away',
		},
		'Alchemy lab': {
			0  : 'Transmutation',
			49 : 'Transmogrification',
			99 : 'Gold member',
		},
		'Portal': {
			0  : 'A whole new world',
			49 : 'Now you\'re thinking',
			99 : 'Dimensional shift',
		},
		'Time machine': {
			0  : 'Time warp',
			49 : 'Alternate timeline',
			99 : 'Rewriting history',
		},
		'Antimatter condenser': {
			0  : 'Antibatter',
			49 : 'Quirky quarks',
			99 : 'It does matter!',
		}
	};

	i += this.hasAchievement(upgrades[building][currentNumber]);

	switch (building) {
		case "Grandma":
			r += this.getTotalGrandmaModifiers(currentNumber) * Game.globalCpsMult;
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case "Farm":
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case "Factory":
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case "Mine":
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case "Shipment":
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case "Alchemy lab":
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case "Portal":
			r += this.getTotalPortalModifiers() * Game.globalCpsMult;
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case "Time machine":
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case "Antimatter condenser":
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
	}

	if (Game.BuildingsOwned === 99) {
		i += this.hasAchievement("Builder");
	}
	if (Game.BuildingsOwned === 399) {
		i += this.hasAchievement("Architect");
	}
	if (Game.BuildingsOwned === 799) {
		i += this.hasAchievement("Engineer");
	}
	if (this.oneWithEverything(building)) {
		i++;
	}
	if (this.mathematician(building)) {
		i++;
	}
	if (this.baseTen(building)) {
		i++;
	}
	if (this.centennial(building)) {
		i++;
	}

	return r + this.getAchievementWorth(i, 0, r + n, 0);
};

//////////////////////////////////////////////////////////////////////
/////////////////////////////// MODIFIERS ////////////////////////////
//////////////////////////////////////////////////////////////////////

CookieMonster.getTotalCursorModifiers = function() {
	var modifier = 0;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf("The mouse and cursors gain") !== -1) {
			var r = 31;
			if (upgrade.desc.indexOf(" another ") !== -1) {
				r += 8;
			}
			modifier += upgrade.desc.substr(r, upgrade.desc.indexOf("<", r) - r) * 1;
		}
	});

	return modifier * Game.ObjectsById[0].amount;
};

CookieMonster.getTotalGrandmaModifiers = function(currentNumber) {
	var t = 0.5;
	var n = 0;
	var r = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.name === "Forwards from grandma") {
			t += 0.3;
		}
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			r = r * 2;
		}
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			r = r * 4;
		}
		if (upgrade.bought && upgrade.desc.indexOf("for every 50 grandmas") !== -1) {
			n += (currentNumber + 1) * 0.02 * (currentNumber + 1) - currentNumber * 0.02 * currentNumber;
		}
		if (upgrade.bought && upgrade.desc.indexOf("for every 20 portals") !== -1) {
			n += Game.ObjectsById[7].amount * 0.05;
		}
	});

	return t * r + n * r;
};

CookieMonster.getTotalPortalModifiers = function() {
	var modifier = 0;
	var total    = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			total = total * 2;
		}
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			total = total * 4;
		}
		if (upgrade.bought && upgrade.desc.indexOf("for every 20 portals") !== -1) {
			modifier += Game.ObjectsById[1].amount * 0.05;
		}
	});

	return modifier * total;
};

//////////////////////////////////////////////////////////////////////
//////////////////////////// BUILDING SCHEMAS ////////////////////////
//////////////////////////////////////////////////////////////////////

CookieMonster.baseTen = function(building) {
	if (this.hasAchievement("Base 10") === 1) {
		var t = [];
		var n = [];
		Game.ObjectsById.forEach(function (building) {
			t.push(building.name);
			n.push(building.amount);
		});
		t.forEach(function (t, r) {
			if (t === building) {
				n[r]++;
			}
		});
		var r = n.length * 10;
		for (var i = 0; i < n.length; i++) {
			if (n[i] < r) {
				return false;
			}
			r = r - 10;
		}
		return true;
	}

	return false;
};

CookieMonster.mathematician = function(building) {
	if (this.hasAchievement("Mathematician") === 1) {
		var t = [];
		var n = [];
		Game.ObjectsById.forEach(function (building) {
			t.push(building.name);
			n.push(building.amount);
		});
		t.forEach(function (t, r) {
			if (t === building) {
				n[r]++;
			}
		});
		var r = 128;
		for (var i = 0; i < n.length; i++) {
			if (i > 2) {
				r = r / 2;
			}
			if (n[i] < r) {
				return false;
			}
		}
		return true;
	}
	return false;
};

CookieMonster.oneWithEverything = function(building) {
	if (this.hasAchievement("One with everything") === 1) {
		var t = [];
		var n = [];

		Game.ObjectsById.forEach(function (building) {
			if (building.amount > 0) {
				t.push(building.name);
			} else {
				n.push(building.name);
			}
		});
		if (n.length === 1 && n[0] === building) {
			return true;
		}
	}
	return false;
};

CookieMonster.centennial = function(building) {
	if (this.hasAchievement("Centennial") === 1) {
		var t = [];
		var n = [];
		Game.ObjectsById.forEach(function (building) {
			if (building.amount >= 100) {
				t.push(building.name);
			} else {
				n.push(building);
			}
		});
		if (n.length === 1 && n[0].name === building && n[0].amount === 99) {
			return true;
		}
	}
	return false;
};