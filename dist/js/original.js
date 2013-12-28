function Start_Cookie_Monster() {
	if ($("#cookie_monster_bar").length != 0) {
		alert("Cookie Monster " + version + "\n\nCookie Monster is already loaded, silly!");
		return false
	} else {
		$("#topBar").css("display", "none");
		$("#tooltip").css("margin-top", "32px");
		$("#tooltip").css("pointer-events", "none");
		$("#cookies").css("background", "rgba(0,0,0,0.75)");
		$("#cookies").css("border-top", "1px solid black");
		$("#cookies").css("border-bottom", "1px solid black");
		$("#goldenCookie").css("cssText", "" + "z-index: 1000001 !important;");
		$("#game").css("cssText", "" + "-webkit-touch-callout: none;" + "-webkit-user-select: none;" + "-khtml-user-select: none;" + "-moz-user-select: none;" + "-ms-user-select: none;" + "-o-user-select: none;" + "user-select: none;" + "top: 0px;" + "bottom: 57px;" + "");
		$("#storeTitle").css("cssText", "" + "font-size: 18px;" + "padding: 4px 8px 2px 8px;" + "border-bottom: 1px solid black;" + "");
		$("#storeTitle").after('<table cellpadding=0 cellspacing=0 style="width:300px; table-layout:fixed; padding:4px; font-weight:bold; background:rgba(0,0,0,0.6); border-bottom: 1px solid black; cursor:default;"><tr>' + '<td align=center style="color:#4bb8f0; padding:2px;" id="cm_up_q0">0</td>' + '<td align=center style="color:#00ff00; padding:2px;" id="cm_up_q1">0</td>' + '<td align=center style="color:#ffff00; padding:2px;" id="cm_up_q2">0</td>' + '<td align=center style="color:#ff7f00; padding:2px;" id="cm_up_q3">0</td>' + '<td align=center style="color:#ff0000; padding:2px;" id="cm_up_q4">0</td>' + '<td align=center style="color:#ff00ff; padding:2px;" id="cm_up_q5">0</td>' + "</tr></table>");
		$("body").append('<div id="cookie_monster_bar" style="z-index:1000; position:absolute; bottom:0px; left:0px; width:100%; height:56px; border-top:1px solid black; cursor:default;' + "text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;" + "background: rgb(69,72,77); /* Old browsers */" + "background: -moz-linear-gradient(top,  rgba(69,72,77,1) 0%, rgba(0,0,0,1) 100%); /* FF3.6+ */" + "background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(69,72,77,1)), color-stop(100%,rgba(0,0,0,1))); /* Chrome,Safari4+ */" + "background: -webkit-linear-gradient(top,  rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%); /* Chrome10+,Safari5.1+ */" + "background: -o-linear-gradient(top,  rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%); /* Opera 11.10+ */" + "background: -ms-linear-gradient(top,  rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%); /* IE10+ */" + "background: linear-gradient(to bottom,  rgba(69,72,77,1) 0%,rgba(0,0,0,1) 100%); /* W3C */" + "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#45484d', endColorstr='#000000',GradientType=0 ); /* IE6-9 */" + '"></div>');
		$("body").append('<div id="cookie_monster_overlay" style="position:fixed; z-index:1000000; height:100%; width:100%; background:rgba(255,255,255,1); pointer-events:none; display:none;"></div>');
		$("body").append('<div id="cookie_monster_golden_overlay" style="position:fixed; z-index:1000002; height:96px; width:96px; pointer-events:none; cursor:pointer; opacity:0; display:none; text-align:center; font-family: \'Kavoon\', Georgia,serif; font-size:32px; text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black !important;" onclick="Game.goldenCookie.click();"></div>');
		$("#sectionLeft").append('<div id="cookie_monster_timer_bars_div" style="position:absolute; z-index:1000; bottom:-1px; left:0px; width:100%; pointer-events:none; text-align:center; font-family: \'Kavoon\', Georgia,serif; font-size:16px; background:rgba(0,0,0,0.6); border-top:1px solid black;"></div>');
		$("link").each(function () {
			if ($(this).attr("href") == "img/favicon.ico") {
				$(this).attr("id", "cm_favicon")
			}
		});

		Make_Table();
		Save_Tooltips();
		Update_Game_Scripts();
		Load_Settings();
		Set_Up_Tooltips();
		Main_Loop();
		Game.Popup('<span style="color:#FFFF00; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black !important;">Cookie Monster ' + version + " Loaded!</span>")
	}
}

function Main_Loop() {
	Update_Table();
	Update_Tooltips("all");
	Do_Emphasize();
	Manage_Buffs();
	loops++;
	if (loops == 1) {
		Game.RebuildStore()
	}
	setTimeout(function () {
		Main_Loop()
	}, settings[3])
}

function Fav_Icon_Spinner(e) {
	if (e > 6) {
		e = 1
	}
	if (gc_avail == "(G) ") {
		$("#cm_favicon").attr("href", "http://frozenelm.com/cookiemonster/images/cm_gc_" + e + ".png");
		e++;
		setTimeout(function () {
			Fav_Icon_Spinner(e)
		}, 250)
	} else {
		$("#cm_favicon").attr("href", "http://orteil.dashnet.org/cookieclicker/img/favicon.ico")
	}
}

function Load_Settings() {
	settings = [1, 1, 1, 1e3, 1, 1, 1, 1, 0, 1, 1, 1, 1];
	if (typeof Storage !== "undefined") {
		if (localStorage.FlashScreen != undefined) {
			settings[0] = localStorage.FlashScreen
		} else {
			localStorage.FlashScreen = 1;
			settings[0] = 1
		} if (localStorage.CookieTimer != undefined) {
			settings[1] = localStorage.CookieTimer
		} else {
			localStorage.CookieTimer = 1;
			settings[1] = 1
		} if (localStorage.BuffBars != undefined) {
			settings[2] = localStorage.BuffBars
		} else {
			localStorage.BuffBars = 1;
			settings[2] = 1
		} if (localStorage.Refresh != undefined) {
			settings[3] = localStorage.Refresh
		} else {
			localStorage.Refresh = 1e3;
			settings[3] = 1e3
		} if (localStorage.CookieCD != undefined) {
			settings[4] = localStorage.CookieCD
		} else {
			localStorage.CookieCD = 1;
			settings[4] = 1
		} if (localStorage.CMBar != undefined) {
			settings[5] = localStorage.CMBar
		} else {
			localStorage.CMBar = 1;
			settings[5] = 1
		} if (localStorage.ColoredPrices != undefined) {
			settings[6] = localStorage.ColoredPrices
		} else {
			localStorage.ColoredPrices = 1;
			settings[6] = 1
		} if (localStorage.ShortNumbers != undefined) {
			settings[7] = localStorage.ShortNumbers
		} else {
			localStorage.ShortNumbers = 1;
			settings[7] = 1
		} if (localStorage.CookieSound != undefined) {
			settings[8] = localStorage.CookieSound
		} else {
			localStorage.CookieSound = 0;
			settings[8] = 0
		} if (localStorage.UpdateTitle != undefined) {
			settings[9] = localStorage.UpdateTitle
		} else {
			localStorage.UpdateTitle = 1;
			settings[9] = 1
		} if (localStorage.LuckyAlert != undefined) {
			settings[10] = localStorage.LuckyAlert
		} else {
			localStorage.LuckyAlert = 1;
			settings[10] = 1
		} if (localStorage.UpgradeIcons != undefined) {
			settings[11] = localStorage.UpgradeIcons
		} else {
			localStorage.UpgradeIcons = 1;
			settings[11] = 1
		} if (localStorage.UpgradeDisplay != undefined) {
			settings[12] = localStorage.UpgradeDisplay
		} else {
			localStorage.UpgradeDisplay = 1;
			settings[12] = 1
		}
	}
	Show_Hide_CM_Bar()
}

function Save_Settings() {
	if (typeof Storage !== "undefined") {
		localStorage.FlashScreen = settings[0];
		localStorage.CookieTimer = settings[1];
		localStorage.BuffBars = settings[2];
		localStorage.Refresh = settings[3];
		localStorage.CookieCD = settings[4];
		localStorage.CMBar = settings[5];
		localStorage.ColoredPrices = settings[6];
		localStorage.ShortNumbers = settings[7];
		localStorage.CookieSound = settings[8];
		localStorage.UpdateTitle = settings[9];
		localStorage.LuckyAlert = settings[10];
		localStorage.UpgradeIcons = settings[11];
		localStorage.UpgradeDisplay = settings[12]
	} else {}
	Show_Hide_CM_Bar()
}

function Show_Hide_CM_Bar() {
	if (settings[5] == 0) {
		$("#cookie_monster_bar").css("display", "none");
		$("#game").css("bottom", "0px")
	} else {
		$("#cookie_monster_bar").css("display", "");
		$("#game").css("bottom", "57px")
	}
}

function Update_Game_Scripts() {
	Game.Logic = new Function("", Game.Logic.toString().replace(".title=", ".title=gc_avail+").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	var e = "\n\n'<div class=\"subsection\">'+" + '\'<div class="title"><span style="color:#4bb8f0;">Cookie Monster Goodies</span></div>\'+' + "'<div class=\"listing\"><b>\"Lucky!\" Cookies Required:</b> ' + CM_Lucky('reg', false) + '</div>'+" + "'<div class=\"listing\"><b>\"Lucky!\" Cookies Required (Frenzy):</b> ' + CM_Lucky('frenzy', false) + '</div>'+" + "'<div class=\"listing\"><b>\"Lucky!\" Reward (MAX):</b> ' + CM_Lucky_Reward('max') + '</div>'+" + "'<div class=\"listing\"><b>\"Lucky!\" Reward (MAX) (Frenzy):</b> ' + CM_Lucky_Reward('max_frenzy') + '</div>'+" + "'<div class=\"listing\"><b>\"Lucky!\" Reward (CUR):</b> ' + CM_Lucky_Reward('cur') + '</div>'+" + "'</br><div class=\"listing\"><b>Heavenly Chips (MAX):</b> ' + CM_Heavenly_Chip('max') + '</div>'+" + "'<div class=\"listing\"><b>Heavenly Chips (CUR):</b> ' + CM_Heavenly_Chip('cur') + '</div>'+" + "'<div class=\"listing\"><b>Cookies To Next Chip:</b> ' + CM_Heavenly_Chip('next') + '</div>'+" + "'<div class=\"listing\"><b>Time To Next Chip:</b> ' + CM_Heavenly_Chip('time') + '</div>'+" + "'</div>'+";
	Game.UpdateMenu = new Function("", Game.UpdateMenu.toString().replace("Statistics</div>'+", "Statistics</div>'+" + e).replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	var t = "\n'<div class=\"subsection\">'+" + '\'<div class="title"><span style="color:#4bb8f0;">Cookie Monster Settings</span></div>\'+' + '\'<div class="listing"><a class="option" onclick="CM_Option_Toggle(this);">Flash Screen \' + CM_Option_State(0) + \'</a><label>Flashes the screen when a Golden Cookie or Red Cookie appears</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CM_Option_Toggle(this);">Cookie Timer \' + CM_Option_State(1) + \'</a><label>Displays a timer on Golden Cookies and Red Cookies</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CM_Option_Toggle(this);">Cookie Sound \' + CM_Option_State(8) + \'</a><label>Plays a sound when a Golden Cookie or Red Cookie appears</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CM_Option_Toggle(this);">Next Cookie Timer \' + CM_Option_State(4) + \'</a><label>Displays a countdown bar and updates the Title for when the next Cookie will appear</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CM_Option_Toggle(this);">Update Title \' + CM_Option_State(9) + \'</a><label>Updates the Title to display if a Cookie is waiting to be clicked</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CM_Option_Toggle(this);">Buff Bars \' + CM_Option_State(2) + \'</a><label>Displays a countdown bar for each effect currently active</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CM_Option_Toggle(this);">Bottom Bar \' + CM_Option_State(5) + \'</a><label>Displays a bar at the bottom of the screen that shows all Building information</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CM_Option_Toggle(this);">Colored Prices \' + CM_Option_State(6) + \'</a><label>Changes the colors of all Building prices to correspond with their Cost Per Income</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CM_Option_Toggle(this);">Upgrade Icons \' + CM_Option_State(11) + \'</a><label>Displays a small square icon on the Upgrade to better display the Cost Per Income color value</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CM_Option_Toggle(this);">Short Numbers \' + CM_Short_Numbers() + \'</a><label>Formats all numbers to be shorter when displayed</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CM_Option_Toggle(this);">Upgrade Display (\' + CM_Upgrade_Display() + \')</a><label>Changes how the store displays Upgrades</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CM_Option_Toggle(this);">Lucky Alert (\' + CM_Lucky_Alert() + \')</a><label>Changes the tooltip to display if you would be under the number of cookies required for "Lucky!"</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CM_Option_Toggle(this);">Refresh Rate (\' + CM_Refresh() + \' fps)</a><label>The rate at which Cookie Monster updates data (higher rates may slow the game)</label></div>\'+' + "'</div>'+";
	Game.UpdateMenu = new Function("", Game.UpdateMenu.toString().replace("OFF')+'</div>'+", "OFF')+'</div>'+" + t).replace("startDate=Game.sayTime(date.getTime()/1000*Game.fps,2);", "startDate = formatTime(((new Date).getTime() - Game.startDate) / 1000, '');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	var n = "\n" + "var cm_id = from.id;" + '\nif(cm_id == "") { cm_id = $(from).parents(".product").prop("id"); }' + '\nif(cm_id == "product5" || cm_id == "product6" || cm_id == "product7" || cm_id == "product8" || cm_id == "product9") { y -= 100; }' + '\nif(cm_id == "product8" || cm_id == "product9") { y -= 13; }' + '\nif(cm_id == "product9" && settings[7] == 0) { y -= 13; }' + "\n";
	Game.tooltip.draw = new Function("from,text,x,y,origin", Game.tooltip.draw.toString().replace("implemented');}", "implemented');}" + n).replace("this.on=1;", "this.on=1;\nUpdate_Tooltips('all');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	Game.Reset = new Function("bypass", Game.Reset.toString().replace("Game.researchT=0;", "Game.researchT=0;\n$('#cookie_monster_timer_bars_div').text('');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	Game.LoadSave = new Function("data", Game.LoadSave.toString().replace("Game.Popup('Game loaded');", "Game.Popup('Game loaded');\n$('#cookie_monster_timer_bars_div').text('');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	Game.RebuildStore = new Function("", Game.RebuildStore.toString().replace("l('products').innerHTML=str;", "l('products').innerHTML=str;\nUpdate_Tooltips('ob');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	Game.Draw = new Function("", Game.Draw.toString().replace("Beautify(Math.round(Game.cookiesd))", "formatNumB(Game.cookiesd)").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	var r = "return formatNum(what);";
	Beautify = new Function("what,floats", Beautify.toString().replace("var str='';", r + "\nvar str='';").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""))
}

function CM_Heavenly_Chip(e) {
	var t = cookies_to_h_chips(Game.cookiesReset + Game.cookiesEarned);
	var n = cookies_to_h_chips(Game.cookiesReset + Game.cookiesEarned + sell_out);
	var r = cookies_to_h_chips(Game.cookiesReset);
	var i = h_chips_to_cookies(t + 1) - (Game.cookiesReset + Game.cookiesEarned);
	var s = h_chips_to_cookies(n + 1) - (Game.cookiesReset + Game.cookiesEarned + sell_out);
	if (e == "max") {
		return formatNum(t) + " <small>(" + formatNum(t * 2) + "%)</small>"
	}
	if (e == "max_sell_out") {
		return formatNum(n) + " <small>(" + formatNum(n * 2) + "%)</small>"
	}
	if (e == "cur") {
		return formatNum(r) + " <small>(" + formatNum(r * 2) + "%)</small>"
	}
	if (e == "next") {
		return formatNum(Math.round(i))
	}
	if (e == "next_sell_out") {
		return formatNum(Math.round(s))
	}
	if (e == "time") {
		return formatTime(Math.round(i / Game.cookiesPs), "")
	}
}

function cookies_to_h_chips(e) {
	return Math.floor(Math.sqrt(2.5 * Math.pow(10, 11) + 2 * e) / Math.pow(10, 6) - .5)
}

function h_chips_to_cookies(e) {
	return 5 * Math.pow(10, 11) * e * (e + 1)
}

function CM_Upgrade_Display() {
	switch (settings[12] * 1) {
	case 1:
		return "Normal";
	case 2:
		return "All";
	case 0:
		return "None";
	default:
		return "Normal"
	}
}

function CM_Short_Numbers() {
	switch (settings[7] * 1) {
	case 1:
		return "ON (A)";
	case 2:
		return "ON (B)";
	case 0:
		return "OFF";
	default:
		return "OFF"
	}
}

function CM_Lucky_Alert() {
	switch (settings[10] * 1) {
	case 1:
		return "Both";
	case 2:
		return "Icons";
	case 3:
		return "Notes";
	case 0:
		return "Off";
	default:
		return "Both"
	}
}

function CM_Refresh() {
	switch (settings[3] * 1) {
	case 1e3:
		return "1";
	case 500:
		return "2";
	case 250:
		return "4";
	case 100:
		return "10";
	case 33:
		return "30";
	default:
		return "1"
	}
}

function CM_Option_State(e) {
	if (settings[e] == 0) {
		return "OFF"
	}
	return "ON"
}

function CM_Option_Toggle(e) {
	e = $(e);
	var t = e.text();
	switch (t) {
	case "Flash Screen ON":
		settings[0] = 0;
		e.text("Flash Screen OFF");
		break;
	case "Flash Screen OFF":
		settings[0] = 1;
		e.text("Flash Screen ON");
		break;
	case "Cookie Sound ON":
		settings[8] = 0;
		e.text("Cookie Sound OFF");
		break;
	case "Cookie Sound OFF":
		settings[8] = 1;
		e.text("Cookie Sound ON");
		break;
	case "Cookie Timer ON":
		settings[1] = 0;
		e.text("Cookie Timer OFF");
		break;
	case "Cookie Timer OFF":
		settings[1] = 1;
		e.text("Cookie Timer ON");
		break;
	case "Next Cookie Timer ON":
		settings[4] = 0;
		e.text("Next Cookie Timer OFF");
		break;
	case "Next Cookie Timer OFF":
		settings[4] = 1;
		e.text("Next Cookie Timer ON");
		break;
	case "Update Title ON":
		settings[9] = 0;
		e.text("Update Title OFF");
		break;
	case "Update Title OFF":
		settings[9] = 1;
		e.text("Update Title ON");
		break;
	case "Buff Bars ON":
		settings[2] = 0;
		e.text("Buff Bars OFF");
		break;
	case "Buff Bars OFF":
		settings[2] = 1;
		e.text("Buff Bars ON");
		break;
	case "Bottom Bar ON":
		settings[5] = 0;
		e.text("Bottom Bar OFF");
		break;
	case "Bottom Bar OFF":
		settings[5] = 1;
		e.text("Bottom Bar ON");
		break;
	case "Colored Prices ON":
		settings[6] = 0;
		e.text("Colored Prices OFF");
		Update_Tooltips("ob");
		break;
	case "Colored Prices OFF":
		settings[6] = 1;
		e.text("Colored Prices ON");
		Update_Tooltips("ob");
		break;
	case "Upgrade Icons ON":
		settings[11] = 0;
		e.text("Upgrade Icons OFF");
		Game.RebuildUpgrades();
		break;
	case "Upgrade Icons OFF":
		settings[11] = 1;
		e.text("Upgrade Icons ON");
		Game.RebuildUpgrades();
		break;
	case "Upgrade Display (All)":
		settings[12] = 0;
		e.text("Upgrade Display (None)");
		Update_Upgrade_Display();
		break;
	case "Upgrade Display (None)":
		settings[12] = 1;
		e.text("Upgrade Display (Normal)");
		Update_Upgrade_Display();
		break;
	case "Upgrade Display (Normal)":
		settings[12] = 2;
		e.text("Upgrade Display (All)");
		Update_Upgrade_Display();
		break;
	case "Short Numbers ON (B)":
		settings[7] = 0;
		e.text("Short Numbers OFF");
		Game.RebuildStore();
		Game.RebuildUpgrades();
		Update_Table();
		break;
	case "Short Numbers OFF":
		settings[7] = 1;
		e.text("Short Numbers ON (A)");
		Game.RebuildStore();
		Game.RebuildUpgrades();
		Update_Table();
		break;
	case "Short Numbers ON (A)":
		settings[7] = 2;
		e.text("Short Numbers ON (B)");
		Game.RebuildStore();
		Game.RebuildUpgrades();
		Update_Table();
		break;
	case "Lucky Alert (Both)":
		settings[10] = 2;
		e.text("Lucky Alert (Icons)");
		break;
	case "Lucky Alert (Icons)":
		settings[10] = 3;
		e.text("Lucky Alert (Notes)");
		break;
	case "Lucky Alert (Notes)":
		settings[10] = 0;
		e.text("Lucky Alert (Off)");
		break;
	case "Lucky Alert (Off)":
		settings[10] = 1;
		e.text("Lucky Alert (Both)");
		break;
	case "Refresh Rate (1 fps)":
		settings[3] = 500;
		e.text("Refresh Rate (2 fps)");
		break;
	case "Refresh Rate (2 fps)":
		settings[3] = 250;
		e.text("Refresh Rate (4 fps)");
		break;
	case "Refresh Rate (4 fps)":
		settings[3] = 100;
		e.text("Refresh Rate (10 fps)");
		break;
	case "Refresh Rate (10 fps)":
		settings[3] = 33;
		e.text("Refresh Rate (30 fps)");
		break;
	case "Refresh Rate (30 fps)":
		settings[3] = 1e3;
		e.text("Refresh Rate (1 fps)");
		break
	}
	Save_Settings()
}

function Update_Upgrade_Display() {
	var e = $("#upgrades");
	switch (settings[12] * 1) {
	case 1:
		e.css("cssText", "");
		break;
	case 2:
		e.css("cssText", "height: auto !important;");
		break;
	case 0:
		e.css("cssText", "height: 0px !important;");
		break
	}
}

function CM_Lucky(e, t) {
	var n = Game.cookiesPs;
	if (Game.frenzy > 0) {
		n = n / Game.frenzyPower
	}
	if (e == "frenzy") {
		n = n * 7
	}
	var r = Math.round((n * 1200 + 13) / .1);
	if (!t) {
		if (r <= Game.cookies) {
			r = '<span style="color:#00FF00; font-weight:bold;">' + formatNum(r) + "</span>"
		} else {
			r = formatNum(r)
		}
	}
	return r
}

function CM_Lucky_Reward(e) {
	var t = Game.cookiesPs;
	if (Game.frenzy > 0 && e != "cur") {
		t = t / Game.frenzyPower
	}
	if (e == "max_frenzy") {
		t = t * 7
	}
	var n = new Array(Math.round(t * 1200 + 13), Math.round(Game.cookies * .1 + 13));
	if (e == "max" || e == "max_frenzy") {
		if (Math.round((t * 1200 + 13) / .1) > Game.cookies) {
			return formatNum(n[0])
		}
	}
	return formatNum(Math.min.apply(Math, n))
}

function Save_Tooltips() {
	Game.UpgradesById.forEach(function (e, t) {
		tooltips[t] = e.desc
	});
	Game.ObjectsById.forEach(function (e, t) {
		building_tooltips[t] = e.desc
	})
}

function Set_Up_Tooltips() {
	var e = false;
	Game.UpgradesById.forEach(function (t, n) {
		for (var r = 0; r < upgrade_count; r++) {
			if (_cup(r, n, true)) {
				t.desc = Manage_Tooltip(r, n, true, false);
				e = true;
				break
			}
		}
		if (t.bought && t.desc != tooltips[n]) {
			t.desc = tooltips[n];
			e = true
		}
	});
	if (e) {
		Game.RebuildUpgrades()
	}
}

function Update_Tooltips(e) {
	if (e == "all" || e == "up") {
		in_store = new Array(0, 0, 0, 0, 0, 0);
		Game.UpgradesById.forEach(function (e, t) {
			for (var n = 0; n < upgrade_count; n++) {
				if (_cup(n, t, false)) {
					Manage_Tooltip(n, t, false, false);
					break
				}
			}
		})
	}
	if (e == "all" || e == "ob") {
		Game.ObjectsById.forEach(function (e, t) {
			Manage_Building_Tooltip(e)
		})
	}
}

function _cup(e, t, n) {
	up = Game.UpgradesById[t];
	if (up.desc.indexOf("cm_up_div_") == -1 && !n) {
		return false
	}
	switch (e) {
	case 0:
		if (!up.bought && up.name == "Reinforced index finger") {
			return true
		}
		break;
	case 1:
		if (!up.bought && up.desc.indexOf("The mouse and cursors are <b>twice</b> as efficient.") != -1) {
			return true
		}
		break;
	case 2:
		if (!up.bought && up.desc.indexOf("The mouse and cursors gain") != -1) {
			return true
		}
		break;
	case 3:
		if (!up.bought && up.name == "Forwards from grandma") {
			return true
		}
		break;
	case 4:
		if (!up.bought && up.desc.indexOf("Grandmas are <b>twice</b> as efficient.") != -1) {
			return true
		}
		break;
	case 5:
		if (!up.bought && up.name == "Cheap hoes") {
			return true
		}
		break;
	case 6:
		if (!up.bought && up.desc.indexOf("Farms are <b>twice</b> as efficient.") != -1) {
			return true
		}
		break;
	case 7:
		if (!up.bought && up.name == "Sturdier conveyor belts") {
			return true
		}
		break;
	case 8:
		if (!up.bought && up.desc.indexOf("Factories are <b>twice</b> as efficient.") != -1) {
			return true
		}
		break;
	case 9:
		if (!up.bought && up.name == "Sugar gas") {
			return true
		}
		break;
	case 10:
		if (!up.bought && up.desc.indexOf("Mines are <b>twice</b> as efficient.") != -1) {
			return true
		}
		break;
	case 11:
		if (!up.bought && up.name == "Vanilla nebulae") {
			return true
		}
		break;
	case 12:
		if (!up.bought && up.desc.indexOf("Shipments are <b>twice</b> as efficient.") != -1) {
			return true
		}
		break;
	case 13:
		if (!up.bought && up.name == "Antimony") {
			return true
		}
		break;
	case 14:
		if (!up.bought && up.desc.indexOf("Alchemy labs are <b>twice</b> as efficient.") != -1) {
			return true
		}
		break;
	case 15:
		if (!up.bought && up.name == "Ancient tablet") {
			return true
		}
		break;
	case 16:
		if (!up.bought && up.desc.indexOf("Portals are <b>twice</b> as efficient.") != -1) {
			return true
		}
		break;
	case 17:
		if (!up.bought && up.name == "Flux capacitors") {
			return true
		}
		break;
	case 18:
		if (!up.bought && up.desc.indexOf("Time machines are <b>twice</b> as efficient.") != -1) {
			return true
		}
		break;
	case 19:
		if (!up.bought && up.desc.indexOf("the more milk you have") != -1) {
			return true
		}
		break;
	case 20:
		if (!up.bought && up.desc.indexOf("Cookie production multiplier <b>+") != -1) {
			return true
		}
		break;
	case 21:
		if (!up.bought && up.desc.indexOf("for each 50 grandmas") != -1) {
			return true
		}
		break;
	case 22:
		if (!up.bought && up.desc.indexOf("for each 20 portals") != -1) {
			return true
		}
		break;
	case 23:
		if (!up.bought && up.name == "Elder Pledge") {
			return true
		}
		break;
	case 24:
		if (!up.bought && up.name == "Elder Covenant") {
			return true
		}
		break;
	case 25:
		if (!up.bought && up.name == "Sacrificial rolling pins") {
			return true
		}
		break;
	case 26:
		if (!up.bought && up.desc.indexOf("Golden cookie") != -1) {
			return true
		}
		break;
	case 27:
		if (!up.bought && up.desc.indexOf("Clicking gains <b>+1% of your CpS</b>.") != -1) {
			return true
		}
		break;
	case 28:
		if (!up.bought && up.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") != -1) {
			return true
		}
		break;
	case 29:
		if (!up.bought && up.desc.indexOf("Antimatter condensers are <b>twice</b> as efficient.") != -1) {
			return true
		}
		break;
	case 30:
		if (!up.bought && up.name == "Sugar bosons") {
			return true
		}
		break;
	case 31:
		if (!up.bought && up.name == "Revoke Elder Covenant") {
			return true
		}
		break;
	case 32:
		if (!up.bought && up.desc.indexOf("heavenly chips") != -1) {
			return true
		}
		break
	}
	return false
}

function Manage_Tooltip(e, t, n, r) {
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
		if (Game.pledges == 4) {
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
		break
	}
	if (Game.UpgradesOwned == 19) {
		s += _cha("Enhancer")
	}
	if (Game.UpgradesOwned == 49) {
		s += _cha("Augmenter")
	}
	if (Game.UpgradesOwned == 99) {
		s += _cha("Upgrader")
	}
	i += Get_Achi_Worth(s, t, i, 0);
	if (r) {
		return i
	}
	return tooltips[t] + Colorize(i, t, n)
}

function _dhc(e, t, n) {
	var r = Game.UpgradesById[t];
	var i = r.desc.indexOf("<b>") + 3;
	var s = r.desc.indexOf("%");
	var o = r.desc.substr(i, s - i) * 1;
	var u = Get_Achi_Worth(e, t, n, Game.prestige["Heavenly chips"] * 2 * (o / 100));
	return u - Game.cookiesPs
}

function _lhc(e) {
	if (Game.UpgradesById[e].name == "Heavenly key") {
		return true
	}
	return false
}

function _cpc() {
	return Game.mouseCps() * .01 * usr_clk
}

function _lgt(e) {
	if (_cha("Elder") == 1 && Game.UpgradesById[e].name.indexOf(" grandmas") != -1) {
		var t = new Array;
		var n = new Array;
		Game.UpgradesById.forEach(function (e, r) {
			if (e.bought && e.name.indexOf(" grandmas") != -1) {
				t.push(r)
			} else if (!e.bought && e.name.indexOf(" grandmas") != -1) {
				n.push(r)
			}
		});
		if (n.length == 1 && n[0] == e) {
			return true
		}
	}
	return false
}

function _cha(e) {
	var t = 0;
	Game.AchievementsById.forEach(function (n, r) {
		if (!n.won && n.name == e) {
			t = 1
		}
	});
	return t
}

function _gpp() {
	var e = 1;
	Game.UpgradesById.forEach(function (t, n) {
		if (t.bought && t.desc.indexOf("Grandmas are <b>twice</b> as efficient.") != -1) {
			e = e * 2
		}
		if (t.bought && t.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") != -1) {
			e = e * 4
		}
	});
	return Game.ObjectsById[7].amount * .05 * e * Game.ObjectsById[1].amount * Game.globalCpsMult
}

function _gpg() {
	var e = 1;
	Game.UpgradesById.forEach(function (t, n) {
		if (t.bought && t.desc.indexOf("Grandmas are <b>twice</b> as efficient.") != -1) {
			e = e * 2
		}
		if (t.bought && t.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") != -1) {
			e = e * 4
		}
	});
	return Game.ObjectsById[1].amount * .02 * e * Game.ObjectsById[1].amount * Game.globalCpsMult
}

function _mcg(e) {
	var t = Game.UpgradesById[e].desc;
	var n = 31;
	if (t.indexOf(" another ") != -1) {
		n += 8
	}
	var r = t.substr(n, t.indexOf("<", n) - n) * 1;
	return r * (Game.BuildingsOwned - Game.ObjectsById[0].amount) * Game.ObjectsById[0].amount * Game.globalCpsMult
}

function _bte(e) {
	return Game.ObjectsById[e].storedTotalCps * Game.globalCpsMult
}

function _fte(e) {
	return Game.ObjectsById[e].storedTotalCps * 3 * Game.globalCpsMult
}

function _bam(e, t, n) {
	var r = 1;
	Game.UpgradesById.forEach(function (t, n) {
		if (t.bought && t.desc.indexOf(e + " are <b>twice</b> as efficient.") != -1) {
			r = r * 2
		}
		if (t.bought && t.desc.indexOf(e + " are <b>4 times</b> as efficient.") != -1) {
			r = r * 4
		}
	});
	return t * r * Game.ObjectsById[n].amount * Game.globalCpsMult
}

function _inc(e) {
	var t = 0;
	Game.AchievementsById.forEach(function (n, r) {
		var i = n.desc.replace(/,/g, "");
		if (!n.won && i.indexOf(" per second.") != -1) {
			if (e >= i.substr(8, i.indexOf("</b>", 8) - 8) * 1) {
				t++
			}
		}
	});
	return t
}

function Get_Achi_Worth(e, t, n, r) {
	var i = 0;
	var s = Calc_Heavenly_Mult();
	if (r != 0) {
		s = r
	}
	var o = 0;
	var u = new Array(0, 0, 0, 0);
	var a = Game.milkProgress;
	var f = Get_Frenzy_Mult();
	Game.UpgradesById.forEach(function (e, n) {
		var r = e.desc.replace("[Research]<br>", "");
		if (e.bought && r.indexOf("Cookie production multiplier <b>+") != -1) {
			s += r.substr(33, r.indexOf("%", 33) - 33) * 1
		}
		if (!e.bought && r.indexOf("Cookie production multiplier <b>+") != -1 && e.id == t) {
			o += r.substr(33, r.indexOf("%", 33) - 33) * 1
		}
		if (e.bought && e.name == "Kitten helpers") {
			u[0] = .05
		}
		if (e.bought && e.name == "Kitten workers") {
			u[1] = .1
		}
		if (e.bought && e.name == "Kitten engineers") {
			u[2] = .2
		}
		if (e.bought && e.name == "Kitten overseers") {
			u[3] = .2
		}
	});
	var l = 100 + s;
	l = l * (1 + u[0] * a);
	l = l * (1 + u[1] * a);
	l = l * (1 + u[2] * a);
	l = l * (1 + u[3] * a);
	var c = n;
	var h = (Game.cookiesPs + c) / Game.globalCpsMult * (l / 100) * f;
	a += e * .04;
	l = 100 + s + o;
	l = l * (1 + u[0] * a);
	l = l * (1 + u[1] * a);
	l = l * (1 + u[2] * a);
	l = l * (1 + u[3] * a);
	var p = 0;
	switch (Game.UpgradesById[t].name) {
	case "Kitten helpers":
		p = .05;
		break;
	case "Kitten workers":
		p = .1;
		break;
	case "Kitten engineers":
		p = .2;
		break;
	case "Kitten overseers":
		p = .2;
		break
	}
	l = l * (1 + p * a);
	i = (Game.cookiesPs + c) / Game.globalCpsMult * (l / 100) * f - h;
	var d = _inc(i + h);
	if (d > 0) {
		a += d * .04;
		l = 100 + s + o;
		l = l * (1 + u[0] * a);
		l = l * (1 + u[1] * a);
		l = l * (1 + u[2] * a);
		l = l * (1 + u[3] * a);
		l = l * (1 + p * a);
		i = (Game.cookiesPs + c) / Game.globalCpsMult * (l / 100) * f - h
	}
	if (r != 0) {
		i = (Game.cookiesPs + c) / Game.globalCpsMult * (l / 100) * f
	}
	if (Game.Has("Elder Covenant")) {
		i *= .95
	}
	return i
}

function Calc_Heavenly_Mult() {
	var e = Game.prestige["Heavenly chips"] * 2;
	var t = 0;
	if (Game.Has("Heavenly chip secret")) {
		t += .05
	}
	if (Game.Has("Heavenly cookie stand")) {
		t += .2
	}
	if (Game.Has("Heavenly bakery")) {
		t += .25
	}
	if (Game.Has("Heavenly confectionery")) {
		t += .25
	}
	if (Game.Has("Heavenly key")) {
		t += .25
	}
	return e * t
}

function Get_Frenzy_Mult() {
	if (Game.frenzy > 0) {
		return Game.frenzyPower
	}
	return 1
}

function Manage_Building_Tooltip(e) {
	var t = e.id;
	var n = new Array(CM_Lucky("reg", true), CM_Lucky("frenzy", true));
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
	if (e.desc == building_tooltips[e.id]) {
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
		if (a[i] == l[i]) {
			u[i] = "00FF00"
		} else if (a[i] == f[i]) {
			u[i] = "FF0000"
		} else if (f[i] - a[i] < a[i] - l[i]) {
			u[i] = "FF7F00"
		}
	}
	if ($("#cm_ob_div_" + t).length == 1) {
		$("#cm_ob_div_" + t).css("border", "1px solid #" + u[0]);
		$("#cm_ob_div_" + t).css("display", "");
		$("#cm_ob_div_" + t).html('<div style="position:absolute; top:4px; left:4px; color:#4bb8f0; font-weight:bold;">Bonus Income</div><div align=right style="position:absolute; top:18px; left:4px; color:white;">' + formatNum(hold_is[t]) + '</div><div style="position:absolute; top:34px; left:4px; color:#4bb8f0; font-weight:bold;">Base Cost Per Income</div><div align=right style="position:absolute; top:48px; left:4px; color:#' + u[0] + ';">' + formatNum(a[0]) + '</div><div style="position:absolute; top:64px; left:4px; color:#4bb8f0; font-weight:bold;">Time Left</div><div align=right style="position:absolute; top:78px; left:4px; color:#' + u[1] + ';">' + formatTime(a[1], "") + "</div>");
		$("#cm_ob_warning_amount").text("Deficit: " + formatNum(o[0]));
		$("#cm_ob_caution_amount").text("Deficit: " + formatNum(o[1]));
		if (settings[10] == 1 || settings[10] == 2) {
			$("#cm_ob_lucky_div_warning").css("display", r[0]);
			$("#cm_ob_lucky_div_caution").css("display", r[1])
		} else {
			$("#cm_ob_lucky_div_warning").css("display", "none");
			$("#cm_ob_lucky_div_caution").css("display", "none")
		} if (settings[10] == 1 || settings[10] == 3) {
			$("#cm_ob_note_div_warning").css("display", r[0]);
			$("#cm_ob_note_div_caution").css("display", r[1])
		} else {
			$("#cm_ob_note_div_warning").css("display", "none");
			$("#cm_ob_note_div_caution").css("display", "none")
		}
	}
	if (settings[6] == 1) {
		$("#product" + t).find(".price").first().css("color", "#" + u[0])
	} else {
		$("#product" + t).find(".price").first().css("color", "")
	}
}

function Make_Table() {
	var e = '<th align=left width=130 style="color:#FFFF00;"> ' + version + "</th>";
	var t = "";
	var n = "";
	var r = "";
	var i = "";
	Game.ObjectsById.forEach(function (t, s) {
		e += '<th align=middle id="cookie_monster_item_' + s + '" style="font-weight:bold;"></th>';
		n += '<td align=middle id="cookie_monster_is_' + s + '"></td>';
		r += '<td align=middle id="cookie_monster_cpi_' + s + '"></td>';
		i += '<td align=middle id="cookie_monster_tc_' + s + '"></td>'
	});
	$("#cookie_monster_bar").html("" + '<table style="width:100%; table-layout:fixed; margin-top:2px;">' + "<tr>" + e + "</tr>" + '<tr><th align=right style="color:#4bb8f0;">Bonus Income</th>' + n + "</tr>" + '<tr><th align=right style="color:#4bb8f0;">Base Cost Per Income</th>' + r + "</tr>" + '<tr><th align=right style="color:#4bb8f0;">Time Left</th>' + i + "</tr>" + "</table>")
}

function Update_Table() {
	Game.ObjectsById.forEach(function (e, t) {
		var n = e.price;
		var r = e.amount;
		var i = e.storedTotalCps;
		var s = e.storedCps * Game.globalCpsMult;
		if (e.name == "Grandma") {
			s = 0
		}
		var o = Math.round((s + Get_Upgrade_Bonuses(e.name, r, s)) * 100) / 100;
		var u = Math.round(n / o * 100) / 100;
		var a = e.name.replace(/([^\s]+)/, "");
		hold_item[t] = e.name.replace(a, "") + ' (<span style="color:#4bb8f0;">' + formatNum(r) + "</span>)";
		hold_is[t] = Math.round(o * 100) / 100;
		hold_cpi[t] = Math.round(u * 100) / 100;
		hold_tc[t] = Math.round(Seconds_Left(t, "ob"))
	});
	Game.ObjectsById.forEach(function (e, t) {
		var n = new Array("FFFF00", "FFFF00");
		var r = new Array(hold_cpi[t], hold_tc[t]);
		var s = new Array(Math.max.apply(Math, hold_cpi), Math.max.apply(Math, hold_tc));
		var o = new Array(Math.min.apply(Math, hold_cpi), Math.min.apply(Math, hold_tc));
		for (i = 0; i < n.length; i++) {
			if (r[i] == o[i]) {
				n[i] = "00FF00"
			} else if (r[i] == s[i]) {
				n[i] = "FF0000"
			} else if (s[i] - r[i] < r[i] - o[i]) {
				n[i] = "FF7F00"
			}
		}
		$("#cookie_monster_item_" + t).html(hold_item[t]);
		$("#cookie_monster_is_" + t).html(formatNum(hold_is[t]));
		$("#cookie_monster_cpi_" + t).html('<span style="color:#' + n[0] + ';">' + formatNum(r[0]) + "</span>");
		$("#cookie_monster_tc_" + t).html('<span style="color:#' + n[1] + ';">' + formatTime(r[1], "min") + "</span>")
	})
}

function Do_Emphasize() {
	var e = $("#cookie_monster_golden_overlay");
	var t = $("#goldenCookie");
	if (t.css("display") == "none" && !emphasize) {
		emphasize = true;
		gc_avail = ""
	}
	if (t.css("display") != "none" && emphasize) {
		emphasize = false;
		if (settings[9] == 1) {
			gc_avail = "(G) ";
			Fav_Icon_Spinner(1)
		}
		if (settings[8] == 1) {
			var n = new Audio("http://frozenelm.com/cookiemonster/sounds/ba%20dink.mp3");
			n.volume = 1;
			n.play()
		}
		if (settings[0] == 1) {
			$("#cookie_monster_overlay").fadeIn(100);
			$("#cookie_monster_overlay").fadeOut(500)
		}
	}
	if (t.css("display") != "none" && settings[1] == 1) {
		e.css("display", "block");
		e.css("opacity", t.css("opacity"));
		e.css("left", t.css("left"));
		e.css("top", t.css("top"));
		e.html('<div style="position:absolute; top:30px; width:96px; height:36px;">' + Math.round(Game.goldenCookie.life / Game.fps) + "</div>")
	} else {
		e.css("display", "none")
	}
}

function Manage_Buffs() {
	var e = "";
	var t = "";
	var n = 0;
	var r = 0;
	var i = 13 + 13 * Game.Has("Get lucky");
	var s = new Array(Game.goldenCookie.time, Game.goldenCookie.minTime, Game.goldenCookie.maxTime);
	var o = parseInt($("#cookie_monster_timer_bars_div").css("width"));
	switch (Game.frenzyPower) {
	case 7:
		n = 77 + 77 * Game.Has("Get lucky");
		e = "Frenzy";
		t = "FFFF00";
		break;
	case 666:
		n = 6 + 6 * Game.Has("Get lucky");
		e = "Blood Frenzy";
		t = "00FF00";
		n = 66 + 66 * Game.Has("Get lucky");
		e = "Clot";
		t = "FF0000";
		break
	}
	if (Game.frenzy > 0 && settings[2] == 1) {
		if ($("#cookie_monster_timer_" + t).length != 1) {
			$("#cookie_monster_timer_bars_div").append('<div id="cookie_monster_timer_' + t + '" style="padding:4px 0px 5px 0px;"><table cellpadding=0 cellspacing=0 style="font-style:inherit; color:inherit;  width:100%;"><tr>' + '<td style="width:130px; text-align:right;">' + e + "<td>" + '<td><div id="cmt_' + t + '" style="position:relative; background:#' + t + "; height:10px; width:" + Game.frenzy / s[2] * 100 + '%; margin-left:4px; border:1px solid black;"><div id="cmt_time_' + t + '" style="text-align:left; position:absolute; right:-50px; top:-5px; width:45px;">' + n + "</div></div></td>" + '<td style="width:55px;"></td>' + "</table></div>")
		} else {
			$("#cmt_" + t).css("width", Game.frenzy / s[2] * 100 + "%");
			$("#cmt_time_" + t).text(Math.round(Game.frenzy / Game.fps))
		}
		$("#cookie_monster_timer_" + t).fadeIn(250);
		if ($("#cookie_monster_timer_FFFF00").css("opacity") == "1" && t != "FFFF00") {
			$("#cookie_monster_timer_FFFF00").fadeOut(250)
		}
		if ($("#cookie_monster_timer_00FF00").css("opacity") == "1" && t != "00FF00") {
			$("#cookie_monster_timer_00FF00").fadeOut(250)
		}
		if ($("#cookie_monster_timer_FF0000").css("opacity") == "1" && t != "FF0000") {
			$("#cookie_monster_timer_FF0000").fadeOut(250)
		}
	} else if ($("#cookie_monster_timer_" + t).length == 1 && $("#cookie_monster_timer_" + t).css("opacity") == "1") {
		$("#cookie_monster_timer_" + t).fadeOut(250)
	}
	if (Game.clickFrenzy > 0 && settings[2] == 1) {
		if ($("#cookie_monster_timer_4BB8F0").length != 1) {
			$("#cookie_monster_timer_bars_div").append('<div id="cookie_monster_timer_4BB8F0" style="padding:4px 0px 5px 0px;"><table cellpadding=0 cellspacing=0 style="font-style:inherit; color:inherit;  width:100%;"><tr>' + '<td style="width:130px; text-align:right;">Click Frenzy<td>' + '<td><div id="cmt_4BB8F0" style="position:relative; background:#4BB8F0; height:10px; width:' + Game.clickFrenzy / s[2] * 100 + '%; margin-left:4px; border:1px solid black;"><div id="cmt_time_4BB8F0" style="text-align:left; position:absolute; right:-50px; top:-5px; width:45px;">' + i + "</div></div></td>" + '<td style="width:55px;"></td>' + "</table></div>")
		} else {
			$("#cmt_4BB8F0").css("width", Game.clickFrenzy / s[2] * 100 + "%");
			$("#cmt_time_4BB8F0").text(Math.round(Game.clickFrenzy / Game.fps))
		}
		$("#cookie_monster_timer_4BB8F0").fadeIn(250)
	} else if ($("#cookie_monster_timer_4BB8F0").length == 1 && $("#cookie_monster_timer_4BB8F0").css("opacity") == "1") {
		$("#cookie_monster_timer_4BB8F0").fadeOut(250)
	}
	if (s[0] > 0 && $("#goldenCookie").css("display") == "none" && settings[4] == 1) {
		if ($("#cookie_monster_timer_FF00FF").length != 1) {
			$("#cookie_monster_timer_bars_div").append("" + '<div id="cookie_monster_timer_FF00FF" style="padding:4px 0px 5px 0px;"><table cellpadding=0 cellspacing=0 style="font-style:inherit; color:inherit;  width:100%;"><tr>' + '<td style="width:130px; text-align:right;">Next Cookie<td>' + '<td><div id="cmt_FF00FF" style="position:relative; background:#aaaaaa; height:10px; width:100%; margin-left:4px; border:1px solid black;"><div id="cmt2_FF00FF" style="position:relative; background:#FF00FF; height:10px; width:100%; margin-left:0px; max-width:' + (o - 189) * .67 + 'px; float:right;"></div><div id="cmt_time_FF00FF" style="text-align:left; position:absolute; right:-50px; top:-5px; width:45px;">' + Math.round((s[2] - s[0]) / Game.fps) + "</div></div></td>" + '<td style="width:55px;"></td>' + "</table></div>")
		} else {
			$("#cmt2_FF00FF").css("max-width", (o - 189) * .67 + "px");
			$("#cmt_FF00FF").css("width", (s[2] - s[0]) / s[2] * 100 + "%");
			$("#cmt_time_FF00FF").text(Math.round((s[2] - s[0]) / Game.fps))
		}
		$("#cookie_monster_timer_FF00FF").fadeIn(250)
	} else if ($("#cookie_monster_timer_FF00FF").length == 1 && $("#cookie_monster_timer_FF00FF").css("opacity") == "1") {
		$("#cookie_monster_timer_FF00FF").fadeOut(250)
	}
	if ((s[2] - s[0]) / Game.fps > 0 && $("#goldenCookie").css("display") == "none") {
		if (settings[4] == 1) {
			gc_avail = "(" + Math.round((s[2] - s[0]) / Game.fps) + ") "
		} else {
			gc_avail = ""
		}
	}
	$("#versionNumber").css("bottom", $("#cookie_monster_timer_bars_div").css("height"))
}

function Get_Upgrade_Bonuses(e, t, n) {
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
		r += Get_Grandma_Mod_Total(t) * Game.globalCpsMult;
		r += Get_Cursor_Mod_Total() * Game.globalCpsMult;
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
		r += Get_Cursor_Mod_Total() * Game.globalCpsMult;
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
		r += Get_Cursor_Mod_Total() * Game.globalCpsMult;
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
		r += Get_Cursor_Mod_Total() * Game.globalCpsMult;
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
		r += Get_Cursor_Mod_Total() * Game.globalCpsMult;
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
		r += Get_Cursor_Mod_Total() * Game.globalCpsMult;
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
		r += Get_Portal_Mod_Total() * Game.globalCpsMult;
		r += Get_Cursor_Mod_Total() * Game.globalCpsMult;
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
		r += Get_Cursor_Mod_Total() * Game.globalCpsMult;
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
		r += Get_Cursor_Mod_Total() * Game.globalCpsMult;
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
	return r + Get_Achi_Worth(i, 0, r + n, 0)
}

function _bat(e) {
	if (_cha("Base 10") == 1) {
		var t = new Array;
		var n = new Array;
		Game.ObjectsById.forEach(function (e, r) {
			t.push(e.name);
			n.push(e.amount)
		});
		t.forEach(function (t, r) {
			if (t == e) {
				n[r]++
			}
		});
		var r = n.length * 10;
		for (var i = 0; i < n.length; i++) {
			if (n[i] < r) {
				return false
			}
			r = r - 10
		}
		return true
	}
	return false
}

function _mat(e) {
	if (_cha("Mathematician") == 1) {
		var t = new Array;
		var n = new Array;
		Game.ObjectsById.forEach(function (e, r) {
			t.push(e.name);
			n.push(e.amount)
		});
		t.forEach(function (t, r) {
			if (t == e) {
				n[r]++
			}
		});
		var r = 128;
		for (var i = 0; i < n.length; i++) {
			if (i > 2) {
				r = r / 2
			}
			if (n[i] < r) {
				return false
			}
		}
		return true
	}
	return false
}

function _owe(e) {
	if (_cha("One with everything") == 1) {
		var t = new Array;
		var n = new Array;
		Game.ObjectsById.forEach(function (e, r) {
			if (e.amount > 0) {
				t.push(e.name)
			} else {
				n.push(e.name)
			}
		});
		if (n.length == 1 && n[0] == e) {
			return true
		}
	}
	return false
}

function _cen(e) {
	if (_cha("Centennial") == 1) {
		var t = new Array;
		var n = new Array;
		Game.ObjectsById.forEach(function (e, r) {
			if (e.amount >= 100) {
				t.push(e.name)
			} else {
				n.push(e)
			}
		});
		if (n.length == 1 && n[0].name == e && n[0].amount == 99) {
			return true
		}
	}
	return false
}

function Get_Cursor_Mod_Total() {
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

function Get_Grandma_Mod_Total(e) {
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

function Get_Portal_Mod_Total() {
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

function inStore(e) {
	if (Game.UpgradesInStore.indexOf(e) != -1) {
		return true
	}
	return false
}

function formatNum(e) {
	return _sts(e, false).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function formatNumB(e) {
	return _sts(e, true).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function formatTime(e, t) {
	e = Math.round(e);
	if (e == Infinity) {
		return "Never"
	}
	if (e == 0) {
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
		if (n == 1) {
			o[0] = " day, "
		}
		if (r == 1) {
			o[1] = " hour, "
		}
		if (i == 1) {
			o[2] = " minute, "
		}
		if (s == 1) {
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

function Colorize(e, t, n) {
	var r = Game.UpgradesById[t];
	var s = r.basePrice;
	var o = new Array("FFFF00", "FFFF00");
	var u = new Array(Math.round(s / e * 100) / 100, Math.round(Seconds_Left(t, "up")));
	var a = new Array(Math.max.apply(Math, hold_cpi), Math.max.apply(Math, hold_tc));
	var f = new Array(Math.min.apply(Math, hold_cpi), Math.min.apply(Math, hold_tc));
	for (i = 0; i < o.length; i++) {
		if (u[i] < f[i]) {
			o[i] = "4BB8F0";
			if (inStore(r) && i == 0) {
				in_store[0]++
			}
		} else if (u[i] == f[i]) {
			o[i] = "00FF00";
			if (inStore(r) && i == 0) {
				in_store[1]++
			}
		} else if (u[i] == a[i]) {
			o[i] = "FF0000";
			if (inStore(r) && i == 0) {
				in_store[4]++
			}
		} else if (u[i] > a[i]) {
			o[i] = "FF00FF";
			if (inStore(r) && i == 0) {
				in_store[5]++
			}
		} else if (a[i] - u[i] < u[i] - f[i]) {
			o[i] = "FF7F00";
			if (inStore(r) && i == 0) {
				in_store[3]++
			}
		} else {
			if (inStore(r) && i == 0) {
				in_store[2]++
			}
		}
	}
	for (i = 0; i < in_store.length; i++) {
		$("#cm_up_q" + i).text(in_store[i])
	}
	if (settings[11] && inStore(r)) {
		$("#upgrade" + Game.UpgradesInStore.indexOf(r)).html('<div style="background-color:#' + o[0] + '; border:1px solid black; position:absolute; z-index:21; top:2px; left:2px; height:14px; width:14px; pointer-events:none;"></div>')
	}
	if ($("#cm_up_div_" + t).length == 1) {
		var l = new Array(CM_Lucky("reg", true), CM_Lucky("frenzy", true));
		var c = new Array("none", "none");
		var h = new Array(0, 0);
		if (Game.cookies - s < l[0]) {
			c[0] = "block";
			h[0] = l[0] - (Game.cookies - s)
		}
		if (Game.cookies - s < l[1]) {
			c[1] = "block";
			h[1] = l[1] - (Game.cookies - s)
		}
		$("#cm_up_div_" + t).css("border", "1px solid #" + o[0]);
		$("#cm_up_div_" + t).css("display", "");
		$("#cm_up_div_" + t).html('<div style="position:absolute; top:4px; left:4px; color:#4bb8f0; font-weight:bold;">Bonus Income</div><div align=right style="position:absolute; top:18px; left:4px; color:white;">' + formatNum(Math.round(e * 100) / 100) + '</div><div style="position:absolute; top:34px; left:4px; color:#4bb8f0; font-weight:bold;">Base Cost Per Income</div><div align=right style="position:absolute; top:48px; left:4px; color:#' + o[0] + ';">' + formatNum(u[0]) + '</div><div style="position:absolute; top:64px; left:4px; color:#4bb8f0; font-weight:bold;">Time Left</div><div align=right style="position:absolute; top:78px; left:4px; color:#' + o[1] + ';">' + formatTime(u[1], "min") + "</div>");
		$("#cm_up_warning_amount").text("Deficit: " + formatNum(h[0]));
		$("#cm_up_caution_amount").text("Deficit: " + formatNum(h[1]));
		if (settings[10] == 1 || settings[10] == 2) {
			$("#cm_up_lucky_div_warning").css("display", c[0]);
			$("#cm_up_lucky_div_caution").css("display", c[1])
		} else {
			$("#cm_up_lucky_div_warning").css("display", "none");
			$("#cm_up_lucky_div_caution").css("display", "none")
		} if (settings[10] == 1 || settings[10] == 3) {
			$("#cm_up_note_div_warning").css("display", c[0]);
			$("#cm_up_note_div_caution").css("display", c[1])
		} else {
			$("#cm_up_note_div_warning").css("display", "none");
			$("#cm_up_note_div_caution").css("display", "none")
		}
	}
	if (n) {
		o = "000000";
		return '<div id="cm_up_lucky_div_' + t + '" style="position:absolute; top:-25px; left:-12px; height:32px;">' + '<div id="cm_up_lucky_div_warning" style="background:url(http://frozenelm.com/images/cookiemonster/warning.png); position:relative; float:left; height:32px; width:32px; display:none;"></div>' + '<div id="cm_up_lucky_div_caution" style="background:url(http://frozenelm.com/images/cookiemonster/caution.png); position:relative; float:left; height:32px; width:32px; display:none;"></div>' + "</div>" + '<div id="cm_up_div_' + t + '" style="position:relative; height:96px; background:#222222; border:1px solid #' + o + '; margin:6px -6px -6px -6px; display:none;"></div>' + '<div id="cm_up_note_div_' + t + '" style="position:absolute; left:0px; margin-top:10px; color:white;">' + '<div id="cm_up_note_div_warning" style="background:#222222; position:relative; display:none; margin-top:4px; padding:2px; border:1px solid #FF0000;"><b style="color:#FF0000;">Warning:</b> Purchase of this item will put you under the number of Cookies required for "Lucky!"</br><span id="cm_up_warning_amount"></span>' + '<div id="cm_up_lucky_div_warning" style="position:absolute; left:-10px; top:-10px; height:32px; width:32px;"><img src="http://frozenelm.com/images/cookiemonster/warning.png" height=16px width=16px></div></div>' + '<div id="cm_up_note_div_caution" style="background:#222222; position:relative; display:none; margin-top:4px; padding:2px; border:1px solid #FFFF00;"><b style="color:#FFFF00;">Caution:</b> Purchase of this item will put you under the number of Cookies required for "Lucky!" (Frenzy)</br><span id="cm_up_caution_amount"></span>' + '<div id="cm_up_lucky_div_warning" style="position:absolute; left:-10px; top:-10px; height:32px; width:32px;"><img src="http://frozenelm.com/images/cookiemonster/caution.png" height=16px width=16px></div></div>' + "</div>"
	}
}

function Factor_Time(e) {
	var t = Game.cookies - e;
	var n = Game.cookiesPs;
	if (n == 0) {
		return 1
	}
	if (t < 0) {
		var r = e / n;
		return 1 - t * -1 / n / r
	}
	return 1
}

function Seconds_Left(e, t) {
	var n = 0;
	if (t == "ob") {
		n = Game.ObjectsById[e].price
	}
	if (t == "up") {
		n = Game.UpgradesById[e].basePrice
	}
	var r = Game.cookies - n;
	var i = Game.cookiesPs;
	if (i == 0) {
		return 0
	}
	if (r < 0) {
		var s = n / i;
		var o = r * -1 / i;
		return o
	}
	return 0
}

function _sts(e, t) {
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

function Sell_Out_Value() {
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

function Sell_Out() {
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

function Buy_Sell() {
	if (Game.cookies < 1e9 && Game.BuildingsOwned < 100) {
		Buy_Sell_No_Wait();
		return false
	}
	for (var e = Game.ObjectsById.length - 1; e >= 0; e--) {
		var t = Game.ObjectsById[e];
		if (t.price <= Game.cookies) {
			t.buy();
			setTimeout(function () {
				Buy_Sell()
			});
			return false
		}
		if (t.price > Game.cookies && t.amount > 0) {
			t.sell();
			setTimeout(function () {
				Buy_Sell()
			});
			return false
		}
	}
	setTimeout(function () {
		Buy_Sell()
	})
}

function Buy_Sell_No_Wait() {
	if (Game.cookies < 15) {
		return false
	}
	for (var e = Game.ObjectsById.length - 1; e >= 0; e--) {
		var t = Game.ObjectsById[e];
		t.sell();
		if (t.price <= Game.cookies) {
			t.buy();
			t.sell();
			Buy_Sell_No_Wait();
			return false
		}
	}
	Buy_Sell_No_Wait()
}

function Get_True_CPI(e, t) {
	var n = 0;
	var r = 0;
	var i = 0;
	if (t == "ob") {
		n = Seconds_Left(Game.ObjectsById[e], "ob");
		r = Game.ObjectsById[e].price;
		i = hold_is[e]
	}
	if (t == "up") {
		n = Seconds_Left(Game.UpgradesById[e], "up");
		r = Game.UpgradesById[e].basePrice;
		for (var s = 0; s < upgrade_count; s++) {
			if (_cup(s, e, false)) {
				i = Manage_Tooltip(s, e, false, true);
				break
			}
		}
	}
	var o = r / i;
	Game.ObjectsById.forEach(function (s, u) {
		var a = s.price;
		var f = hold_is[u];
		var l = Seconds_Left(s, "ob");
		if (l < n && (t == "up" || u != e)) {
			var c = n - l;
			var h = f * c;
			var p = r - a + h;
			var d = p / i;
			if (d > o) {
				o = d
			}
		} else {}
	});
	return o
}

function Test_True_CPI(e, t) {
	var n = 0;
	var r = 0;
	var i = 0;
	var s = 0;
	if (t == "ob") {
		n = Seconds_Left(e, "ob");
		i = Game.ObjectsById[e].price;
		s = hold_is[e]
	}
	if (t == "up") {
		n = Seconds_Left(e, "up");
		i = Game.UpgradesById[e].basePrice;
		for (var o = 0; o < upgrade_count; o++) {
			if (_cup(o, e, false)) {
				s = Manage_Tooltip(o, e, false, true);
				break
			}
		}
	}
	var u = Organize_Object_List();
	var a = i;
	var f = a / s;
	var l = f;
	var c = s;
	u.forEach(function (o, f) {
		if (i > o.price && (t == "up" || o.id != e)) {
			var h = o.price;
			var p = hold_is[o.id];
			var d = hold_cpi[o.id];
			if (c == 0) {
				c = p
			}
			if (l == 0) {
				l = d
			}
			var v = Seconds_Left(o.id, "ob");
			var m = 0;
			var g = u[f + 1];
			if (g.id != u.length && (hold_cpi[g.id] < l || g.id == e)) {
				m = Seconds_Left(g.id, "ob");
				l = hold_cpi[g.id];
				c = p
			}
			if (v < n - r) {
				var y = m - v;
				r += y;
				var b = c * y;
				if (y > 0) {
					s -= c;
					a = a - h + b
				}
			}
		}
	});
	f = a / s;
	return f
}

function Organize_Object_List() {
	var e = new Array;
	Game.ObjectsById.forEach(function (t, n) {
		var r = true;
		if (e.length > 0) {
			e.forEach(function (n, i) {
				if (t.price < n.price && r) {
					r = false;
					e.splice(i, 0, t);
					e.join()
				}
			});
			if (r) {
				e.push(t)
			}
		} else {
			e.push(t)
		}
	});
	return e
}

var version           = "v.1.038.01";
var emphasize         = true;
var tooltips          = new Array;
var building_tooltips = new Array;
var hold_item         = new Array;
var hold_is           = new Array;
var hold_cpi          = new Array;
var hold_tc           = new Array;
var gc_avail          = "";
var settings          = new Array;
var in_store          = new Array(0, 0, 0, 0, 0, 0);
var sell_out          = 0;
var upgrade_count     = 33;
var sts_type          = new Array([" M", " B", " T", " Qa", " Qi", " Sx", " Sp", " Oc", " No", " Dc"], [" M", " G", " T", " P", " E", " Z", " Y", " Oc", " No", " Dc"]);
var loops             = 0;

if (document.title.indexOf("Cookie Clicker") != -1 && $("#game").length != 0) {
	Start_Cookie_Monster()
} else {
	alert("Cookie Monster " + version + "\n\nThese aren't the droids you're looking for.")
}