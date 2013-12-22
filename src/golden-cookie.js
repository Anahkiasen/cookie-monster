/**
 * Get the current frenzy multiplier
 *
 * @return {integer}
 */
CookieMonster.getFrenzyMultiplier = function() {
	if (Game.frenzy > 0) {
		return Game.frenzyPower
	}
	return 1
}


CookieMonster.manageBuffs = function() {
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
		break;
	}

	if (Game.frenzy > 0 && CookieMonster.settings[2] === 1) {
		if ($("#cookie_monster_timer_" + t).length !== 1) {
			$("#cookie_monster_timer_bars_div").append('<div id="cookie_monster_timer_' + t + '" style="padding:4px 0px 5px 0px;"><table cellpadding=0 cellspacing=0 style="font-style:inherit; color:inherit;  width:100%;"><tr>' + '<td style="width:130px; text-align:right;">' + e + "<td>" + '<td><div id="cmt_' + t + '" style="position:relative; background:#' + t + "; height:10px; width:" + Game.frenzy / s[2] * 100 + '%; margin-left:4px; border:1px solid black;"><div id="cmt_time_' + t + '" style="text-align:left; position:absolute; right:-50px; top:-5px; width:45px;">' + n + "</div></div></td>" + '<td style="width:55px;"></td>' + "</table></div>")
		} else {
			$("#cmt_" + t).css("width", Game.frenzy / s[2] * 100 + "%");
			$("#cmt_time_" + t).text(Math.round(Game.frenzy / Game.fps))
		}
		$("#cookie_monster_timer_" + t).fadeIn(250);
		if ($("#cookie_monster_timer_FFFF00").css("opacity") === "1" && t !== "FFFF00") {
			$("#cookie_monster_timer_FFFF00").fadeOut(250)
		}
		if ($("#cookie_monster_timer_00FF00").css("opacity") === "1" && t !== "00FF00") {
			$("#cookie_monster_timer_00FF00").fadeOut(250)
		}
		if ($("#cookie_monster_timer_FF0000").css("opacity") === "1" && t !== "FF0000") {
			$("#cookie_monster_timer_FF0000").fadeOut(250)
		}
	} else if ($("#cookie_monster_timer_" + t).length === 1 && $("#cookie_monster_timer_" + t).css("opacity") === "1") {
		$("#cookie_monster_timer_" + t).fadeOut(250)
	}

	if (Game.clickFrenzy > 0 && CookieMonster.settings[2] === 1) {
		if ($("#cookie_monster_timer_4BB8F0").length !== 1) {
			$("#cookie_monster_timer_bars_div").append('<div id="cookie_monster_timer_4BB8F0" style="padding:4px 0px 5px 0px;"><table cellpadding=0 cellspacing=0 style="font-style:inherit; color:inherit;  width:100%;"><tr>' + '<td style="width:130px; text-align:right;">Click Frenzy<td>' + '<td><div id="cmt_4BB8F0" style="position:relative; background:#4BB8F0; height:10px; width:' + Game.clickFrenzy / s[2] * 100 + '%; margin-left:4px; border:1px solid black;"><div id="cmt_time_4BB8F0" style="text-align:left; position:absolute; right:-50px; top:-5px; width:45px;">' + i + "</div></div></td>" + '<td style="width:55px;"></td>' + "</table></div>")
		} else {
			$("#cmt_4BB8F0").css("width", Game.clickFrenzy / s[2] * 100 + "%");
			$("#cmt_time_4BB8F0").text(Math.round(Game.clickFrenzy / Game.fps))
		}
		$("#cookie_monster_timer_4BB8F0").fadeIn(250)
	} else if ($("#cookie_monster_timer_4BB8F0").length === 1 && $("#cookie_monster_timer_4BB8F0").css("opacity") === "1") {
		$("#cookie_monster_timer_4BB8F0").fadeOut(250)
	}

	if (s[0] > 0 && $("#goldenCookie").css("display") === "none" && CookieMonster.settings[4] === 1) {
		if ($("#cookie_monster_timer_FF00FF").length !== 1) {
			$("#cookie_monster_timer_bars_div").append("" + '<div id="cookie_monster_timer_FF00FF" style="padding:4px 0px 5px 0px;"><table cellpadding=0 cellspacing=0 style="font-style:inherit; color:inherit;  width:100%;"><tr>' + '<td style="width:130px; text-align:right;">Next Cookie<td>' + '<td><div id="cmt_FF00FF" style="position:relative; background:#aaaaaa; height:10px; width:100%; margin-left:4px; border:1px solid black;"><div id="cmt2_FF00FF" style="position:relative; background:#FF00FF; height:10px; width:100%; margin-left:0px; max-width:' + (o - 189) * 0.67 + 'px; float:right;"></div><div id="cmt_time_FF00FF" style="text-align:left; position:absolute; right:-50px; top:-5px; width:45px;">' + Math.round((s[2] - s[0]) / Game.fps) + "</div></div></td>" + '<td style="width:55px;"></td>' + "</table></div>")
		} else {
			$("#cmt2_FF00FF").css("max-width", (o - 189) * 0.67 + "px");
			$("#cmt_FF00FF").css("width", (s[2] - s[0]) / s[2] * 100 + "%");
			$("#cmt_time_FF00FF").text(Math.round((s[2] - s[0]) / Game.fps))
		}
		$("#cookie_monster_timer_FF00FF").fadeIn(250)
	} else if ($("#cookie_monster_timer_FF00FF").length === 1 && $("#cookie_monster_timer_FF00FF").css("opacity") === "1") {
		$("#cookie_monster_timer_FF00FF").fadeOut(250)
	}

	if ((s[2] - s[0]) / Game.fps > 0 && $("#goldenCookie").css("display") === "none") {
		if (CookieMonster.settings[4] === 1) {
			CookieMonster.goldenCookieAvailable = "(" + Math.round((s[2] - s[0]) / Game.fps) + ") "
		} else {
			CookieMonster.goldenCookieAvailable = ""
		}
	}

	$("#versionNumber").css("bottom", $("#cookie_monster_timer_bars_div").css("height"))
}