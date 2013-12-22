CookieMonster.saveTooltips = function() {
	Game.UpgradesById.forEach(function (e, t) {
		tooltips[t] = e.desc
	});
	Game.ObjectsById.forEach(function (e, t) {
		CookieMonster.buildingTooltips[t] = e.desc
	})
}

CookieMonster.setupTooltips = function() {
	var e = false;
	Game.UpgradesById.forEach(function (t, n) {
		for (var r = 0; r < upgrade_count; r++) {
			if (_cup(r, n, true)) {
				t.desc = CookieMonster.manageTooltips(r, n, true, false);
				e = true;
				break;
			}
		}
		if (t.bought && t.desc !== tooltips[n]) {
			t.desc = tooltips[n];
			e = true
		}
	});
	if (e) {
		Game.RebuildUpgrades()
	}
}

CookieMonster.updateTooltips = function(e) {
	if (e === "all" || e === "up") {
		in_store = new Array(0, 0, 0, 0, 0, 0);
		Game.UpgradesById.forEach(function (e, t) {
			for (var n = 0; n < upgrade_count; n++) {
				if (_cup(n, t, false)) {
					CookieMonster.manageTooltips(n, t, false, false);
					break;
				}
			}
		})
	}
	if (e === "all" || e === "ob") {
		Game.ObjectsById.forEach(function (e, t) {
			CookieMonster.manageBuildingTooltip(e)
		})
	}
}

CookieMonster.manageTooltips = function(e, t, n, r) {
	var i = 0;
	var s = 0;
	switch (e) {
	case 0:
		i = _bam("The mouse and cursors", .1, 0);
		break;
	case 1:
		i = _bte(0);
		break;
	case 2:
		i = _mcg(t);
		break;
	case 3:
		i = _bam("Grandmas", .3, 1);
		break;
	case 4:
		i = _bte(1);
		if (_lgt(t)) {
			s++
		}
		break;
	case 5:
		i = _bam("Farms", .5, 2);
		break;
	case 6:
		i = _bte(2);
		break;
	case 7:
		i = _bam("Factories", 4, 3);
		break;
	case 8:
		i = _bte(3);
		break;
	case 9:
		i = _bam("Mines", 10, 4);
		break;
	case 10:
		i = _bte(4);
		break;
	case 11:
		i = _bam("Shipments", 30, 5);
		break;
	case 12:
		i = _bte(5);
		break;
	case 13:
		i = _bam("Alchemy labs", 100, 6);
		break;
	case 14:
		i = _bte(6);
		break;
	case 15:
		i = _bam("Portals", 1666, 7);
		break;
	case 16:
		i = _bte(7);
		break;
	case 17:
		i = _bam("Time machines", 9876, 8);
		break;
	case 18:
		i = _bte(8);
		break;
	case 21:
		i = _gpg();
		break;
	case 22:
		i = _gpp();
		break;
	case 23:
		s += _cha("Elder nap");
		if (Game.pledges === 4) {
			s += _cha("Elder slumber")
		}
		break;
	case 24:
		s += _cha("Elder calm");
		break;
	case 28:
		i = _fte(1);
		break;
	case 29:
		i = _bte(9);
		break;
	case 30:
		i = _bam("Antimatter condensers", 99999, 9);
		break;
	case 32:
		i = _dhc(s, t, i);
		if (_lhc(t)) {
			s += _cha("Wholesome")
		}
		break;
	}
	if (Game.UpgradesOwned === 19) {
		s += _cha("Enhancer")
	}
	if (Game.UpgradesOwned === 49) {
		s += _cha("Augmenter")
	}
	if (Game.UpgradesOwned === 99) {
		s += _cha("Upgrader")
	}
	i += CookieMonster.getAchievementWorth(s, t, i, 0);
	if (r) {
		return i
	}
	return tooltips[t] + CookieMonster.colorize(i, t, n)
}

CookieMonster.manageBuildingTooltip = function(e) {
	var t = e.id;
	var n = new Array(CookieMonster.lucky("reg", true), CookieMonster.lucky("frenzy", true));
	var r = new Array("none", "none");
	var s = new Array("", "");
	var o = new Array(0, 0);
	if (Game.cookies - e.price < n[0]) {
		r[0] = "block";
		o[0] = n[0] - (Game.cookies - e.price)
	}
	if (Game.cookies - e.price < n[1]) {
		r[1] = "block";
		o[1] = n[1] - (Game.cookies - e.price)
	}
	if (e.desc === CookieMonster.buildingTooltips[e.id]) {
		e.desc += '<div id="cm_ob_div_' + t + '" style="position:relative; height:96px; background:#222222; border:1px solid #000000; margin:6px -6px -6px -6px; display:none;"></div>';
		e.desc += '<div id="cm_ob_lucky_div_' + t + '" style="position:absolute; top:-25px; left:-12px; height:32px;">' + '<div id="cm_ob_lucky_div_warning" style="background:url(http://frozenelm.com/cookiemonster/images/warning.png); position:relative; float:left; height:32px; width:32px; display:none;"></div>' + '<div id="cm_ob_lucky_div_caution" style="background:url(http://frozenelm.com/cookiemonster/images/caution.png); position:relative; float:left; height:32px; width:32px; display:none;"></div>' + "</div>";
		e.desc += '<div id="cm_ob_note_div_' + t + '" style="position:absolute; left:0px; margin-top:10px; color:white;">' + '<div id="cm_ob_note_div_warning" style="background:#222222; position:relative; display:none; margin-top:4px; padding:2px; border:1px solid #FF0000;"><b style="color:#FF0000;">Warning:</b> Purchase of this item will put you under the number of Cookies required for "Lucky!"</br><span id="cm_ob_warning_amount"></span>' + '<div id="cm_ob_lucky_div_warning" style="position:absolute; left:-10px; top:-10px; height:32px; width:32px;"><img src="http://frozenelm.com/cookiemonster/images/warning.png" height=16px width=16px></div></div>' + '<div id="cm_ob_note_div_caution" style="background:#222222; position:relative; display:none; margin-top:4px; padding:2px; border:1px solid #FFFF00;"><b style="color:#FFFF00;">Caution:</b> Purchase of this item will put you under the number of Cookies required for "Lucky!" (Frenzy)</br><span id="cm_ob_caution_amount"></span>' + '<div id="cm_ob_lucky_div_warning" style="position:absolute; left:-10px; top:-10px; height:32px; width:32px;"><img src="http://frozenelm.com/cookiemonster/images/caution.png" height=16px width=16px></div></div>' + "</div>";
		Game.RebuildStore()
	}
	var u = new Array("FFFF00", "FFFF00");
	var a = new Array(hold_cpi[t], hold_tc[t]);
	var f = new Array(Math.max.apply(Math, hold_cpi), Math.max.apply(Math, hold_tc));
	var l = new Array(Math.min.apply(Math, hold_cpi), Math.min.apply(Math, hold_tc));
	for (i = 0; i < u.length; i++) {
		if (a[i] === l[i]) {
			u[i] = "00FF00"
		} else if (a[i] === f[i]) {
			u[i] = "FF0000"
		} else if (f[i] - a[i] < a[i] - l[i]) {
			u[i] = "FF7F00"
		}
	}
	if ($("#cm_ob_div_" + t).length === 1) {
		$("#cm_ob_div_" + t).css("border", "1px solid #" + u[0]);
		$("#cm_ob_div_" + t).css("display", "");
		$("#cm_ob_div_" + t).html('<div style="position:absolute; top:4px; left:4px; color:#4bb8f0; font-weight:bold;">Bonus Income</div><div align=right style="position:absolute; top:18px; left:4px; color:white;">' + CookieMonster.formatNumber(hold_is[t]) + '</div><div style="position:absolute; top:34px; left:4px; color:#4bb8f0; font-weight:bold;">Base Cost Per Income</div><div align=right style="position:absolute; top:48px; left:4px; color:#' + u[0] + ';">' + CookieMonster.formatNumber(a[0]) + '</div><div style="position:absolute; top:64px; left:4px; color:#4bb8f0; font-weight:bold;">Time Left</div><div align=right style="position:absolute; top:78px; left:4px; color:#' + u[1] + ';">' + CookieMonster.formatTime(a[1], "") + "</div>");
		$("#cm_ob_warning_amount").text("Deficit: " + CookieMonster.formatNumber(o[0]));
		$("#cm_ob_caution_amount").text("Deficit: " + CookieMonster.formatNumber(o[1]));
		if (CookieMonster.settings[10] === 1 || CookieMonster.settings[10] === 2) {
			$("#cm_ob_lucky_div_warning").css("display", r[0]);
			$("#cm_ob_lucky_div_caution").css("display", r[1])
		} else {
			$("#cm_ob_lucky_div_warning").css("display", "none");
			$("#cm_ob_lucky_div_caution").css("display", "none")
		} if (CookieMonster.settings[10] === 1 || CookieMonster.settings[10] === 3) {
			$("#cm_ob_note_div_warning").css("display", r[0]);
			$("#cm_ob_note_div_caution").css("display", r[1])
		} else {
			$("#cm_ob_note_div_warning").css("display", "none");
			$("#cm_ob_note_div_caution").css("display", "none")
		}
	}

	console.log(CookieMonster.settings);
	if (CookieMonster.settings[6] === 1) {
		$("#product" + t).find(".price").first().css("color", "#" + u[0])
	} else {
		$("#product" + t).find(".price").first().css("color", "")
	}
}