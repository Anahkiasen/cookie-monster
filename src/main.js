CookieMonster.update = function() {
	Game.Logic = new Function("", Game.Logic.toString().replace(".title=", ".title=CookieMonster.goldenCookieAvailable+").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	var e = "\n\n'<div class=\"subsection\">'+" + '\'<div class="title"><span style="color:#4bb8f0;">Cookie Monster Goodies</span></div>\'+' + "'<div class=\"listing\"><b>\"Lucky!\" Cookies Required:</b> ' + CookieMonster.lucky('reg', false) + '</div>'+" + "'<div class=\"listing\"><b>\"Lucky!\" Cookies Required (Frenzy):</b> ' + CookieMonster.lucky('frenzy', false) + '</div>'+" + "'<div class=\"listing\"><b>\"Lucky!\" Reward (MAX):</b> ' + CookieMonster.luckyReward('max') + '</div>'+" + "'<div class=\"listing\"><b>\"Lucky!\" Reward (MAX) (Frenzy):</b> ' + CookieMonster.luckyReward('max_frenzy') + '</div>'+" + "'<div class=\"listing\"><b>\"Lucky!\" Reward (CUR):</b> ' + CookieMonster.luckyReward('cur') + '</div>'+" + "'</br><div class=\"listing\"><b>Heavenly Chips (MAX):</b> ' + CookieMonster.getHeavenlyChip('max') + '</div>'+" + "'<div class=\"listing\"><b>Heavenly Chips (CUR):</b> ' + CookieMonster.getHeavenlyChip('cur') + '</div>'+" + "'<div class=\"listing\"><b>Cookies To Next Chip:</b> ' + CookieMonster.getHeavenlyChip('next') + '</div>'+" + "'<div class=\"listing\"><b>Time To Next Chip:</b> ' + CookieMonster.getHeavenlyChip('time') + '</div>'+" + "'</div>'+";
	Game.UpdateMenu = new Function("", Game.UpdateMenu.toString().replace("Statistics</div>'+", "Statistics</div>'+" + e).replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	var t = "\n'<div class=\"subsection\">'+" + '\'<div class="title"><span style="color:#4bb8f0;">Cookie Monster Settings</span></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Flash Screen \' + CookieMonster.getOptionState(0) + \'</a><label>Flashes the screen when a Golden Cookie or Red Cookie appears</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Cookie Timer \' + CookieMonster.getOptionState(1) + \'</a><label>Displays a timer on Golden Cookies and Red Cookies</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Cookie Sound \' + CookieMonster.getOptionState(8) + \'</a><label>Plays a sound when a Golden Cookie or Red Cookie appears</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Next Cookie Timer \' + CookieMonster.getOptionState(4) + \'</a><label>Displays a countdown bar and updates the Title for when the next Cookie will appear</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Update Title \' + CookieMonster.getOptionState(9) + \'</a><label>Updates the Title to display if a Cookie is waiting to be clicked</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Buff Bars \' + CookieMonster.getOptionState(2) + \'</a><label>Displays a countdown bar for each effect currently active</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Bottom Bar \' + CookieMonster.getOptionState(5) + \'</a><label>Displays a bar at the bottom of the screen that shows all Building information</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Colored Prices \' + CookieMonster.getOptionState(6) + \'</a><label>Changes the colors of all Building prices to correspond with their Cost Per Income</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Upgrade Icons \' + CookieMonster.getOptionState(11) + \'</a><label>Displays a small square icon on the Upgrade to better display the Cost Per Income color value</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Short Numbers \' + CookieMonster.getShortNumbers() + \'</a><label>Formats all numbers to be shorter when displayed</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Upgrade Display (\' + CookieMonster.getUpgradeDisplay() + \')</a><label>Changes how the store displays Upgrades</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Lucky Alert (\' + CookieMonster.getLuckyAlert() + \')</a><label>Changes the tooltip to display if you would be under the number of cookies required for "Lucky!"</label></div>\'+' + '\'<div class="listing"><a class="option" onclick="CookieMonster.toggleOption(this);">Refresh Rate (\' + CookieMonster.getRefreshRate() + \' fps)</a><label>The rate at which Cookie Monster updates data (higher rates may slow the game)</label></div>\'+' + "'</div>'+";
	Game.UpdateMenu = new Function("", Game.UpdateMenu.toString().replace("OFF')+'</div>'+", "OFF')+'</div>'+" + t).replace("startDate=Game.sayTime(date.getTime()/1000*Game.fps,2);", "startDate = CookieMonster.formatTime(((new Date).getTime() - Game.startDate) / 1000, '');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	var n = "\n" + "var cm_id = from.id;" + '\nif(cm_id === "") { cm_id = $(from).parents(".product").prop("id"); }' + '\nif(cm_id === "product5" || cm_id === "product6" || cm_id === "product7" || cm_id === "product8" || cm_id === "product9") { y -= 100; }' + '\nif(cm_id === "product8" || cm_id === "product9") { y -= 13; }' + '\nif(cm_id === "product9" && CookieMonster.settings[7] === 0) { y -= 13; }' + "\n";
	Game.tooltip.draw = new Function("from,text,x,y,origin", Game.tooltip.draw.toString().replace("implemented');}", "implemented');}" + n).replace("this.on=1;", "this.on=1;\nCookieMonster.updateTooltips('all');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	Game.Reset = new Function("bypass", Game.Reset.toString().replace("Game.researchT=0;", "Game.researchT=0;\n$('#cookie_monster_timer_bars_div').text('');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	Game.LoadSave = new Function("data", Game.LoadSave.toString().replace("Game.Popup('Game loaded');", "Game.Popup('Game loaded');\n$('#cookie_monster_timer_bars_div').text('');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	Game.RebuildStore = new Function("", Game.RebuildStore.toString().replace("l('products').innerHTML=str;", "l('products').innerHTML=str;\nCookieMonster.updateTooltips('ob');").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	Game.Draw = new Function("", Game.Draw.toString().replace("Beautify(Math.round(Game.cookiesd))", "CookieMonster.formatNumberB(Game.cookiesd)").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""));
	var r = "return CookieMonster.formatNumber(what);";
	Beautify = new Function("what,floats", Beautify.toString().replace("var str='';", r + "\nvar str='';").replace(/^function[^{]+{/i, "").replace(/}[^}]*$/i, ""))
}

CookieMonster.start = function() {
	if ($("#cookie_monster_bar").length !== 0) {
		alert("Cookie Monster " + CookieMonster.version + "\n\nCookie Monster is already loaded, silly!");
		return false;
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
			if ($(this).attr("href") === "img/favicon.ico") {
				$(this).attr("id", "cm_favicon")
			}
		});

		CookieMonster.makeTable();
		CookieMonster.saveTooltips();
		CookieMonster.update();
		CookieMonster.loadSettings();
		CookieMonster.setupTooltips();
		CookieMonster.mainLoop();
		Game.Popup('<span style="color:#FFFF00; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black !important;">Cookie Monster ' + CookieMonster.version + " Loaded!</span>")
	}
}

CookieMonster.mainLoop = function() {
	CookieMonster.updateTable();
	CookieMonster.updateTooltips("all");
	CookieMonster.emphasize();
	CookieMonster.manageBuffs();
	loops++;
	if (loops === 1) {
		Game.RebuildStore()
	}
	setTimeout(function () {
		CookieMonster.mainLoop()
	}, CookieMonster.settings[3])
}

CookieMonster.version               = "v.1.038.01";
var emphasize                       = true;
var tooltips                        = [];
CookieMonster.buildingTooltips      = [];
CookieMonster.holdItem              = [];
CookieMonster.holdIs                = [];
CookieMonster.holdCPI               = [];
CookieMonster.holdTC                = [];
CookieMonster.goldenCookieAvailable = "";
CookieMonster.settings              = [];
CookieMonster.inStore               = new Array(0, 0, 0, 0, 0, 0);
CookieMonster.sellOut               = 0;
var upgrade_count                   = 33;
var sts_type                        = new Array([" M", " B", " T", " Qa", " Qi", " Sx", " Sp", " Oc", " No", " Dc"], [" M", " G", " T", " P", " E", " Z", " Y", " Oc", " No", " Dc"]);
var loops                           = 0;

if (document.title.indexOf("Cookie Clicker") !== -1 && $("#game").length !== 0) {
	CookieMonster.start()
} else {
	alert("Cookie Monster " + CookieMonster.version + "\n\nThese aren't the droids you're looking for.")
}