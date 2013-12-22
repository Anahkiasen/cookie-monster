CookieMonster.cookiesToHeavenly = function(e) {
	return Math.floor(Math.sqrt(2.5 * Math.pow(10, 11) + 2 * e) / Math.pow(10, 6) - 0.5)
}

CookieMonster.heavenlyToCookies = function(e) {
	return 5 * Math.pow(10, 11) * e * (e + 1)
}

function _dhc(e, t, n) {
	var r = Game.UpgradesById[t];
	var i = r.desc.indexOf("<b>") + 3;
	var s = r.desc.indexOf("%");
	var o = r.desc.substr(i, s - i) * 1;
	var u = CookieMonster.getAchievementWorth(e, t, n, Game.prestige["Heavenly chips"] * 2 * (o / 100));
	return u - Game.cookiesPs
}

function _lhc(e) {
	if (Game.UpgradesById[e].name === "Heavenly key") {
		return true;
	}
	return false;
}

function _cpc() {
	return Game.mouseCps() * 0.01 * usr_clk
}

function _lgt(e) {
	if (CookieMonster.checkAchievement("Elder") === 1 && Game.UpgradesById[e].name.indexOf(" grandmas") !== -1) {
		var t = [];
		var n = [];
		Game.UpgradesById.forEach(function (e, r) {
			if (e.bought && e.name.indexOf(" grandmas") !== -1) {
				t.push(r)
			} else if (!e.bought && e.name.indexOf(" grandmas") !== -1) {
				n.push(r)
			}
		});
		if (n.length === 1 && n[0] === e) {
			return true;
		}
	}
	return false;
}

CookieMonster.checkAchievement = function(e) {
	var t = 0;
	Game.AchievementsById.forEach(function (n, r) {
		if (!n.won && n.name === e) {
			t = 1
		}
	});
	return t;
}

function _gpp() {
	var e = 1;

	Game.UpgradesById.forEach(function (t, n) {
		if (t.bought && t.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			e = e * 2;
		}

		if (t.bought && t.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			e = e * 4;
		}
	});

	return Game.ObjectsById[7].amount * 0.05 * e * Game.ObjectsById[1].amount * Game.globalCpsMult
}

function _gpg() {
	var e = 1;

	Game.UpgradesById.forEach(function (t, n) {
		if (t.bought && t.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			e = e * 2;
		}
		if (t.bought && t.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			e = e * 4;
		}
	});

	return Game.ObjectsById[1].amount * 0.02 * e * Game.ObjectsById[1].amount * Game.globalCpsMult
}

function _mcg(e) {
	var t = Game.UpgradesById[e].desc;
	var n = 31;
	if (t.indexOf(" another ") !== -1) {
		n += 8;
	}
	var r = t.substr(n, t.indexOf("<", n) - n) * 1;
	return r * (Game.BuildingsOwned - Game.ObjectsById[0].amount) * Game.ObjectsById[0].amount * Game.globalCpsMult;
}

function _bte(e) {
	return Game.ObjectsById[e].storedTotalCps * Game.globalCpsMult;
}

function _fte(e) {
	return Game.ObjectsById[e].storedTotalCps * 3 * Game.globalCpsMult;
}

function _bam(e, t, n) {
	var r = 1;
	Game.UpgradesById.forEach(function (t, n) {
		if (t.bought && t.desc.indexOf(e + " are <b>twice</b> as efficient.") !== -1) {
			r = r * 2;
		}
		if (t.bought && t.desc.indexOf(e + " are <b>4 times</b> as efficient.") !== -1) {
			r = r * 4;
		}
	});
	return t * r * Game.ObjectsById[n].amount * Game.globalCpsMult;
}

function _inc(e) {
	var t = 0;
	Game.AchievementsById.forEach(function (n, r) {
		var i = n.desc.replace(/,/g, "");
		if (!n.won && i.indexOf(" per second.") !== -1) {
			if (e >= i.substr(8, i.indexOf("</b>", 8) - 8) * 1) {
				t++;
			}
		}
	});
	return t;
}

function _bat(e) {
	if (CookieMonster.checkAchievement("Base 10") === 1) {
		var t = [];
		var n = [];
		Game.ObjectsById.forEach(function (e, r) {
			t.push(e.name);
			n.push(e.amount);
		});
		t.forEach(function (t, r) {
			if (t === e) {
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
}

function _mat(e) {
	if (CookieMonster.checkAchievement("Mathematician") === 1) {
		var t = [];
		var n = [];
		Game.ObjectsById.forEach(function (e, r) {
			t.push(e.name);
			n.push(e.amount);
		});
		t.forEach(function (t, r) {
			if (t === e) {
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
}

function _owe(e) {
	if (CookieMonster.checkAchievement("One with everything") === 1) {
		var t = [];
		var n = [];
		Game.ObjectsById.forEach(function (e, r) {
			if (e.amount > 0) {
				t.push(e.name);
			} else {
				n.push(e.name);
			}
		});
		if (n.length === 1 && n[0] === e) {
			return true;
		}
	}
	return false;
}

function _cen(e) {
	if (CookieMonster.checkAchievement("Centennial") === 1) {
		var t = [];
		var n = [];
		Game.ObjectsById.forEach(function (e, r) {
			if (e.amount >= 100) {
				t.push(e.name);
			} else {
				n.push(e);
			}
		});
		if (n.length === 1 && n[0].name === e && n[0].amount === 99) {
			return true;
		}
	}
	return false;
}

function _cup(e, t, n) {
	up = Game.UpgradesById[t];
	if (up.desc.indexOf("cm_up_div_") === -1 && !n) {
		return false;
	}
	switch (e) {
	case 0:
		if (!up.bought && up.name === "Reinforced index finger") {
			return true;
		}
		break;
	case 1:
		if (!up.bought && up.desc.indexOf("The mouse and cursors are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 2:
		if (!up.bought && up.desc.indexOf("The mouse and cursors gain") !== -1) {
			return true;
		}
		break;
	case 3:
		if (!up.bought && up.name === "Forwards from grandma") {
			return true;
		}
		break;
	case 4:
		if (!up.bought && up.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 5:
		if (!up.bought && up.name === "Cheap hoes") {
			return true;
		}
		break;
	case 6:
		if (!up.bought && up.desc.indexOf("Farms are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 7:
		if (!up.bought && up.name === "Sturdier conveyor belts") {
			return true;
		}
		break;
	case 8:
		if (!up.bought && up.desc.indexOf("Factories are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 9:
		if (!up.bought && up.name === "Sugar gas") {
			return true;
		}
		break;
	case 10:
		if (!up.bought && up.desc.indexOf("Mines are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 11:
		if (!up.bought && up.name === "Vanilla nebulae") {
			return true;
		}
		break;
	case 12:
		if (!up.bought && up.desc.indexOf("Shipments are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 13:
		if (!up.bought && up.name === "Antimony") {
			return true;
		}
		break;
	case 14:
		if (!up.bought && up.desc.indexOf("Alchemy labs are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 15:
		if (!up.bought && up.name === "Ancient tablet") {
			return true;
		}
		break;
	case 16:
		if (!up.bought && up.desc.indexOf("Portals are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 17:
		if (!up.bought && up.name === "Flux capacitors") {
			return true;
		}
		break;
	case 18:
		if (!up.bought && up.desc.indexOf("Time machines are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 19:
		if (!up.bought && up.desc.indexOf("the more milk you have") !== -1) {
			return true;
		}
		break;
	case 20:
		if (!up.bought && up.desc.indexOf("Cookie production multiplier <b>+") !== -1) {
			return true;
		}
		break;
	case 21:
		if (!up.bought && up.desc.indexOf("for each 50 grandmas") !== -1) {
			return true;
		}
		break;
	case 22:
		if (!up.bought && up.desc.indexOf("for each 20 portals") !== -1) {
			return true;
		}
		break;
	case 23:
		if (!up.bought && up.name === "Elder Pledge") {
			return true;
		}
		break;
	case 24:
		if (!up.bought && up.name === "Elder Covenant") {
			return true;
		}
		break;
	case 25:
		if (!up.bought && up.name === "Sacrificial rolling pins") {
			return true;
		}
		break;
	case 26:
		if (!up.bought && up.desc.indexOf("Golden cookie") !== -1) {
			return true;
		}
		break;
	case 27:
		if (!up.bought && up.desc.indexOf("Clicking gains <b>+1% of your CpS</b>.") !== -1) {
			return true;
		}
		break;
	case 28:
		if (!up.bought && up.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 29:
		if (!up.bought && up.desc.indexOf("Antimatter condensers are <b>twice</b> as efficient.") !== -1) {
			return true;
		}
		break;
	case 30:
		if (!up.bought && up.name === "Sugar bosons") {
			return true;
		}
		break;
	case 31:
		if (!up.bought && up.name === "Revoke Elder Covenant") {
			return true;
		}
		break;
	case 32:
		if (!up.bought && up.desc.indexOf("heavenly chips") !== -1) {
			return true;
		}
		break;
	}
	return false;
}

CookieMonster.inStore = function(e) {
	if (Game.UpgradesInStore.indexOf(e) !== -1) {
		return true;
	}
	return false;
}