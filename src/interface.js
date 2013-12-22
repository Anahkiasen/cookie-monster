CookieMonster.faviconSpinner = function(e) {
	if (e > 6) {
		e = 1;
	}

	if (CookieMonster.goldenCookieAvailable === "(G) ") {
		$("#cm_favicon").attr("href", "http://frozenelm.com/cookiemonster/images/cm_gc_" + e + ".png");
		e++;
		setTimeout(function () {
			CookieMonster.faviconSpinner(e);
		}, 250);
	} else {
		$("#cm_favicon").attr("href", "http://orteil.dashnet.org/cookieclicker/img/favicon.ico");
	}
};

CookieMonster.toggleBar = function() {
	if (CookieMonster.settings[5] === 0) {
		CookieMonster.$monsterBar.css("display", "none");
		$("#game").css("bottom", "0px");
	} else {
		CookieMonster.$monsterBar.css("display", "");
		$("#game").css("bottom", "57px");
	}
};

CookieMonster.updateUpgradeDisplay = function() {
	var e = $("#upgrades");

	switch (CookieMonster.settings[12] * 1) {
		case 1:
			e.css("cssText", "");
			break;

		case 2:
			e.css("cssText", "height: auto !important;");
			break;

		case 0:
			e.css("cssText", "height: 0px !important;");
			break;
	}
};

CookieMonster.makeTable = function() {
	var e = '<th align=left width=130 style="color:#FFFF00;"> ' + CookieMonster.version + "</th>";
	var t = "";
	var n = "";
	var r = "";
	var i = "";
	Game.ObjectsById.forEach(function (t, s) {
		e += '<th align=middle id="cookie_monster_item_' + s + '" style="font-weight:bold;"></th>';
		n += '<td align=middle id="cookie_monster_is_' + s + '"></td>';
		r += '<td align=middle id="cookie_monster_cpi_' + s + '"></td>';
		i += '<td align=middle id="cookie_monster_tc_' + s + '"></td>';
	});

	CookieMonster.$monsterBar.html(
		'<table style="width:100%; table-layout:fixed; margin-top:2px;">' +
			"<tr>" + e + '</tr>'+
			'<tr>'+
				'<th align=right style="color:#4bb8f0;">Bonus Income</th>' + n +
			'</tr>' +
			'<tr>'+
				'<th align=right style="color:#4bb8f0;">Base Cost Per Income</th>' + r +
			'</tr>' +
			'<tr>' +
				'<th align=right style="color:#4bb8f0;">Time Left</th>' + i +
			'</tr>' +
		"</table>");

	CookieMonster.$monsterBar = $('#cookie_monster_bar');
};

CookieMonster.updateTable = function() {
	Game.ObjectsById.forEach(function (e, t) {
		var n = e.price;
		var r = e.amount;
		var s = e.storedCps * Game.globalCpsMult;
		if (e.name === "Grandma") {
			s = 0;
		}
		var o = Math.round((s + CookieMonster.getUpgradeBonuses(e.name, r, s)) * 100) / 100;
		var u = Math.round(n / o * 100) / 100;
		var a = e.name.replace(/([^\s]+)/, "");

		CookieMonster.holdItem[t] = e.name.replace(a, "") + ' (<span style="color:#4bb8f0;">' + CookieMonster.formatNumber(r) + "</span>)";
		CookieMonster.holdIs[t] = Math.round(o * 100) / 100;
		CookieMonster.holdCPI[t] = Math.round(u * 100) / 100;
		CookieMonster.holdTC[t] = Math.round(CookieMonster.secondsLeft(t, "ob"));
	});

	Game.ObjectsById.forEach(function (e, t) {
		var i = 0;
		var n = new Array("FFFF00", "FFFF00");
		var r = new Array(CookieMonster.holdCPI[t], CookieMonster.holdTC[t]);
		var s = new Array(Math.max.apply(Math, CookieMonster.holdCPI), Math.max.apply(Math, CookieMonster.holdTC));
		var o = new Array(Math.min.apply(Math, CookieMonster.holdCPI), Math.min.apply(Math, CookieMonster.holdTC));

		for (i = 0; i < n.length; i++) {
			if (r[i] === o[i]) {
				n[i] = "00FF00";
			} else if (r[i] === s[i]) {
				n[i] = "FF0000";
			} else if (s[i] - r[i] < r[i] - o[i]) {
				n[i] = "FF7F00";
			}
		}
		$("#cookie_monster_item_" + t).html(CookieMonster.holdItem[t]);
		$("#cookie_monster_is_" + t).html(CookieMonster.formatNumber(CookieMonster.holdIs[t]));
		$("#cookie_monster_cpi_" + t).html('<span style="color:#' + n[0] + ';">' + CookieMonster.formatNumber(r[0]) + "</span>");
		$("#cookie_monster_tc_" + t).html('<span style="color:#' + n[1] + ';">' + CookieMonster.formatTime(r[1], "min") + "</span>");
	});
};

CookieMonster.colorize = function(e, t, n) {
	var i = 0;
	var r = Game.UpgradesById[t];
	var s = r.basePrice;
	var o = new Array("FFFF00", "FFFF00");
	var u = new Array(Math.round(s / e * 100) / 100, Math.round(CookieMonster.secondsLeft(t, "up")));
	var a = new Array(Math.max.apply(Math, CookieMonster.holdCPI), Math.max.apply(Math, CookieMonster.holdTC));
	var f = new Array(Math.min.apply(Math, CookieMonster.holdCPI), Math.min.apply(Math, CookieMonster.holdTC));

	for (i = 0; i < o.length; i++) {
		if (u[i] < f[i]) {
			o[i] = "4BB8F0";
			if (CookieMonster.isInStore(r) && i === 0) {
				CookieMonster.inStore[0]++;
			}
		} else if (u[i] === f[i]) {
			o[i] = "00FF00";
			if (CookieMonster.isInStore(r) && i === 0) {
				CookieMonster.inStore[1]++;
			}
		} else if (u[i] === a[i]) {
			o[i] = "FF0000";
			if (CookieMonster.isInStore(r) && i === 0) {
				CookieMonster.inStore[4]++;
			}
		} else if (u[i] > a[i]) {
			o[i] = "FF00FF";
			if (CookieMonster.isInStore(r) && i === 0) {
				CookieMonster.inStore[5]++;
			}
		} else if (a[i] - u[i] < u[i] - f[i]) {
			o[i] = "FF7F00";
			if (CookieMonster.isInStore(r) && i === 0) {
				CookieMonster.inStore[3]++;
			}
		} else {
			if (CookieMonster.isInStore(r) && i === 0) {
				CookieMonster.inStore[2]++;
			}
		}
	}
	for (i = 0; i < CookieMonster.inStore.length; i++) {
		$("#cm_up_q" + i).text(CookieMonster.inStore[i]);
	}
	if (CookieMonster.settings[11] && CookieMonster.isInStore(r)) {
		$("#upgrade" + Game.UpgradesInStore.indexOf(r)).html('<div style="background-color:#' + o[0] + '; border:1px solid black; position:absolute; z-index:21; top:2px; left:2px; height:14px; width:14px; pointer-events:none;"></div>');
	}
	if ($("#cm_up_div_" + t).length === 1) {
		var l = new Array(CookieMonster.lucky("reg", true), CookieMonster.lucky("frenzy", true));
		var c = new Array("none", "none");
		var h = new Array(0, 0);
		if (Game.cookies - s < l[0]) {
			c[0] = "block";
			h[0] = l[0] - (Game.cookies - s);
		}
		if (Game.cookies - s < l[1]) {
			c[1] = "block";
			h[1] = l[1] - (Game.cookies - s);
		}
		$("#cm_up_div_" + t).css("border", "1px solid #" + o[0]);
		$("#cm_up_div_" + t).css("display", "");
		$("#cm_up_div_" + t).html('<div style="position:absolute; top:4px; left:4px; color:#4bb8f0; font-weight:bold;">Bonus Income</div><div align=right style="position:absolute; top:18px; left:4px; color:white;">' + CookieMonster.formatNumber(Math.round(e * 100) / 100) + '</div><div style="position:absolute; top:34px; left:4px; color:#4bb8f0; font-weight:bold;">Base Cost Per Income</div><div align=right style="position:absolute; top:48px; left:4px; color:#' + o[0] + ';">' + CookieMonster.formatNumber(u[0]) + '</div><div style="position:absolute; top:64px; left:4px; color:#4bb8f0; font-weight:bold;">Time Left</div><div align=right style="position:absolute; top:78px; left:4px; color:#' + o[1] + ';">' + CookieMonster.formatTime(u[1], "min") + "</div>");
		$("#cm_up_warning_amount").text("Deficit: " + CookieMonster.formatNumber(h[0]));
		$("#cm_up_caution_amount").text("Deficit: " + CookieMonster.formatNumber(h[1]));

		if (CookieMonster.settings[10] === 1 || CookieMonster.settings[10] === 2) {
			$("#cm_up_lucky_div_warning").css("display", c[0]);
			$("#cm_up_lucky_div_caution").css("display", c[1]);
		} else {
			$("#cm_up_lucky_div_warning").css("display", "none");
			$("#cm_up_lucky_div_caution").css("display", "none");
		}
		if (CookieMonster.settings[10] === 1 || CookieMonster.settings[10] === 3) {
			$("#cm_up_note_div_warning").css("display", c[0]);
			$("#cm_up_note_div_caution").css("display", c[1]);
		} else {
			$("#cm_up_note_div_warning").css("display", "none");
			$("#cm_up_note_div_caution").css("display", "none");
		}
	}
	if (n) {
		o = "000000";
		return '<div id="cm_up_lucky_div_' + t + '" style="position:absolute; top:-25px; left:-12px; height:32px;">' + '<div id="cm_up_lucky_div_warning" style="background:url(http://frozenelm.com/images/cookiemonster/warning.png); position:relative; float:left; height:32px; width:32px; display:none;"></div>' + '<div id="cm_up_lucky_div_caution" style="background:url(http://frozenelm.com/images/cookiemonster/caution.png); position:relative; float:left; height:32px; width:32px; display:none;"></div>' + "</div>" + '<div id="cm_up_div_' + t + '" style="position:relative; height:96px; background:#222222; border:1px solid #' + o + '; margin:6px -6px -6px -6px; display:none;"></div>' + '<div id="cm_up_note_div_' + t + '" style="position:absolute; left:0px; margin-top:10px; color:white;">' + '<div id="cm_up_note_div_warning" style="background:#222222; position:relative; display:none; margin-top:4px; padding:2px; border:1px solid #FF0000;"><b style="color:#FF0000;">Warning:</b> Purchase of this item will put you under the number of Cookies required for "Lucky!"</br><span id="cm_up_warning_amount"></span>' + '<div id="cm_up_lucky_div_warning" style="position:absolute; left:-10px; top:-10px; height:32px; width:32px;"><img src="http://frozenelm.com/images/cookiemonster/warning.png" height=16px width=16px></div></div>' + '<div id="cm_up_note_div_caution" style="background:#222222; position:relative; display:none; margin-top:4px; padding:2px; border:1px solid #FFFF00;"><b style="color:#FFFF00;">Caution:</b> Purchase of this item will put you under the number of Cookies required for "Lucky!" (Frenzy)</br><span id="cm_up_caution_amount"></span>' + '<div id="cm_up_lucky_div_warning" style="position:absolute; left:-10px; top:-10px; height:32px; width:32px;"><img src="http://frozenelm.com/images/cookiemonster/caution.png" height=16px width=16px></div></div>' + "</div>";
	}
};

CookieMonster.organizeObjectList = function() {
	var e = [];
	Game.ObjectsById.forEach(function (t) {
		var r = true;
		if (e.length > 0) {
			e.forEach(function (n, i) {
				if (t.price < n.price && r) {
					r = false;
					e.splice(i, 0, t);
					e.join();
				}
			});
			if (r) {
				e.push(t);
			}
		} else {
			e.push(t);
		}
	});
	return e;
};

CookieMonster.doEmphasize = function() {
	var e = $("#cookie_monster_golden_overlay");
	var t = CookieMonster.$goldenCookie;
	if (t.css("display") === "none" && !CookieMonster.emphasize) {
		CookieMonster.emphasize = true;
		CookieMonster.goldenCookieAvailable = "";
	}
	if (t.css("display") !== "none" && CookieMonster.emphasize) {
		CookieMonster.emphasize = false;
		if (CookieMonster.settings[9] === 1) {
			CookieMonster.goldenCookieAvailable = "(G) ";
			CookieMonster.faviconSpinner(1);
		}
		if (CookieMonster.settings[8] === 1) {
			var n = new Audio("http://frozenelm.com/cookiemonster/sounds/ba%20dink.mp3");
			n.volume = 1;
			n.play();
		}
		if (CookieMonster.settings[0] === 1) {
			$("#cookie_monster_overlay").fadeIn(100);
			$("#cookie_monster_overlay").fadeOut(500);
		}
	}
	if (t.css("display") !== "none" && CookieMonster.settings[1] === 1) {
		e.css("display", "block");
		e.css("opacity", t.css("opacity"));
		e.css("left", t.css("left"));
		e.css("top", t.css("top"));
		e.html('<div style="position:absolute; top:30px; width:96px; height:36px;">' + Math.round(Game.goldenCookie.life / Game.fps) + "</div>");
	} else {
		e.css("display", "none");
	}
};