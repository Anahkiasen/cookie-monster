/**
 * Toggle the visibility of the CookieMonster bottom bar
 *
 * @return {void}
 */
CookieMonster.toggleBar = function() {
	var toggle = this.getBooleanSetting('CMBar');
	var bottom = !toggle ? 0 : 57;

	this.$monsterBar.toggle(toggle);
	$('#game').css('bottom', bottom+'px');
};

/**
 * Create the Bottom Bar
 *
 * @return {void}
 */
CookieMonster.makeTable = function() {
	var e = '<th align=left width=130 style="color:#' +this.colors.yellow+ ';"> ' + this.version + "</th>";
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

		CookieMonster.holdItem[t] = e.name.replace(a, "") + ' (<span style="color:#' +CookieMonster.colors.blue+ ';">' + CookieMonster.formatNumber(r) + "</span>)";
		CookieMonster.holdIs[t]   = Math.round(o * 100) / 100;
		CookieMonster.holdCPI[t]  = Math.round(u * 100) / 100;
		CookieMonster.holdTC[t]   = Math.round(CookieMonster.secondsLeft(t, "object"));
	});

	Game.ObjectsById.forEach(function (e, t) {
		var i = 0;
		var n = new Array(CookieMonster.colors.yellow, CookieMonster.colors.yellow);
		var r = new Array(CookieMonster.holdCPI[t], CookieMonster.holdTC[t]);
		var s = new Array(Math.max.apply(Math, CookieMonster.holdCPI), Math.max.apply(Math, CookieMonster.holdTC));
		var o = new Array(Math.min.apply(Math, CookieMonster.holdCPI), Math.min.apply(Math, CookieMonster.holdTC));

		for (i = 0; i < n.length; i++) {
			if (r[i] === o[i]) {
				n[i] = CookieMonster.colors.green;
			} else if (r[i] === s[i]) {
				n[i] = CookieMonster.colors.red;
			} else if (s[i] - r[i] < r[i] - o[i]) {
				n[i] = CookieMonster.colors.orange;
			}
		}
		$("#cookie_monster_item_" + t).html(CookieMonster.holdItem[t]);
		$("#cookie_monster_is_" + t).html(CookieMonster.formatNumber(CookieMonster.holdIs[t]));
		$("#cookie_monster_cpi_" + t).html('<span style="color:#' + n[0] + ';">' + CookieMonster.formatNumber(r[0]) + "</span>");
		$("#cookie_monster_tc_" + t).html('<span style="color:#' + n[1] + ';">' + CookieMonster.formatTime(r[1], "min") + "</span>");
	});
};