/**
 * Save the currently available tooltips
 *
 * @return {void}
 */
CookieMonster.saveTooltips = function() {
	Game.UpgradesById.forEach(function (upgrades, key) {
		CookieMonster.tooltips[key] = upgrades.desc;
	});
	Game.ObjectsById.forEach(function (building, key) {
		CookieMonster.buildingTooltips[key] = building.desc;
	});
};

CookieMonster.setupTooltips = function() {
	var needsRebuild = false;

	Game.UpgradesById.forEach(function (upgrade, key) {
		for (var upgradeKey = 0; upgradeKey < CookieMonster.upgradeCount; upgradeKey++) {
			if (CookieMonster.checkUpgrade(upgradeKey, key, true)) {
				upgrade.desc = CookieMonster.manageTooltips(upgradeKey, key, true, false);
				needsRebuild = true;
				break;
			}
		}
		if (upgrade.bought && upgrade.desc !== CookieMonster.tooltips[key]) {
			upgrade.desc = CookieMonster.tooltips[key];
			needsRebuild = true;
		}
	});

	if (needsRebuild) {
		Game.RebuildUpgrades();
	}
};

/**
 * Update one or more types of tooltips
 *
 * @param {string} which [upgrades,objects,all]
 *
 * @return {void}
 */
CookieMonster.updateTooltips = function(which) {
	if (which === "all" || which === "upgrades") {
		this.inStore = [0, 0, 0, 0, 0, 0];

		Game.UpgradesById.forEach(function (upgrade, key) {
			for (var upgradeKey = 0; upgradeKey < CookieMonster.upgradeCount; upgradeKey++) {
				if (CookieMonster.checkUpgrade(upgradeKey, key, false)) {
					CookieMonster.manageTooltips(upgradeKey, key, false, false);
					break;
				}
			}
		});
	}
	if (which === "all" || which === "objects") {
		Game.ObjectsById.forEach(function (object) {
			CookieMonster.manageBuildingTooltip(object);
		});
	}
};

CookieMonster.manageTooltips = function(upgradeKey, t, n, r) {
	var i = 0;
	var s = 0;
	switch (upgradeKey) {
		case 0:
			i = this.bam('The mouse and cursors', 0.1, 0);
			break;
		case 1:
			i = this.bte(0);
			break;
		case 2:
			i = this.mcg(t);
			break;
		case 3:
			i = this.bam('Grandmas', 0.3, 1);
			break;
		case 4:
			i = this.bte(1);
			if (this.lgt(t)) {
				s++;
			}
			break;
		case 5:
			i = this.bam('Farms', 0.5, 2);
			break;
		case 6:
			i = this.bte(2);
			break;
		case 7:
			i = this.bam('Factories', 4, 3);
			break;
		case 8:
			i = this.bte(3);
			break;
		case 9:
			i = this.bam('Mines', 10, 4);
			break;
		case 10:
			i = this.bte(4);
			break;
		case 11:
			i = this.bam('Shipments', 30, 5);
			break;
		case 12:
			i = this.bte(5);
			break;
		case 13:
			i = this.bam('Alchemy labs', 100, 6);
			break;
		case 14:
			i = this.bte(6);
			break;
		case 15:
			i = this.bam('Portals', 1666, 7);
			break;
		case 16:
			i = this.bte(7);
			break;
		case 17:
			i = this.bam('Time machines', 9876, 8);
			break;
		case 18:
			i = this.bte(8);
			break;
		case 21:
			i = this.gpg();
			break;
		case 22:
			i = this.gpp();
			break;
		case 23:
			s += this.hasntAchievement("Elder nap");
			if (Game.pledges === 4) {
				s += this.hasntAchievement("Elder slumber");
			}
			break;
		case 24:
			s += this.hasntAchievement("Elder calm");
			break;
		case 28:
			i = this.fte(1);
			break;
		case 29:
			i = this.bte(9);
			break;
		case 30:
			i = this.bam('Antimatter condensers', 99999, 9);
			break;
		case 32:
			i = this.dhc(s, t, i);
			if (this.isHeavenlyKey(t)) {
				s += this.hasntAchievement("Wholesome");
			}
			break;
	}
	if (Game.UpgradesOwned === 19) {
		s += this.hasntAchievement("Enhancer");
	}
	if (Game.UpgradesOwned === 49) {
		s += this.hasntAchievement("Augmenter");
	}
	if (Game.UpgradesOwned === 99) {
		s += this.hasntAchievement("Upgrader");
	}
	i += this.getAchievementWorth(s, t, i, 0);
	if (r) {
		return i;
	}

	return this.tooltips[t] + this.colorize(i, t, n);
};

CookieMonster.manageBuildingTooltip = function(e) {
	var t = e.id;
	var n = new Array(this.lucky('regular', true), this.lucky("frenzy", true));
	var r = new Array("none", "none");
	var o = new Array(0, 0);
	var i;

	if (Game.cookies - e.price < n[0]) {
		r[0] = "block";
		o[0] = n[0] - (Game.cookies - e.price);
	}
	if (Game.cookies - e.price < n[1]) {
		r[1] = "block";
		o[1] = n[1] - (Game.cookies - e.price);
	}

	if (e.desc === this.buildingTooltips[e.id]) {
		e.desc += '<div id="cm_ob_div_' + t + '" style="position:relative; height:96px; background:#' +this.color('greyTen')+ '; border:1px solid #000000; margin:6px -6px -6px -6px; display:none;"></div>';
		e.desc += '<div id="cm_ob_lucky_div_' + t + '" style="position:absolute; top:-25px; left:-12px; height:32px;">' + '<div id="cm_ob_lucky_div_warning" style="background:url(http://frozenelm.com/cookiemonster/images/warning.png); position:relative; float:left; height:32px; width:32px; display:none;"></div>' + '<div id="cm_ob_lucky_div_caution" style="background:url(http://frozenelm.com/cookiemonster/images/caution.png); position:relative; float:left; height:32px; width:32px; display:none;"></div>' + "</div>";
		e.desc += '<div id="cm_ob_note_div_' + t + '" style="position:absolute; left:0px; margin-top:10px; color:white;">' + '<div id="cm_ob_note_div_warning" style="background:#' +this.color('greyTen')+ '; position:relative; display:none; margin-top:4px; padding:2px; border:1px solid #' +this.color('red')+ ';"><b style="color:#' +this.color('red')+ ';">Warning:</b> Purchase of this item will put you under the number of Cookies required for "Lucky!"</br><span id="cm_ob_warning_amount"></span>' + '<div id="cm_ob_lucky_div_warning" style="position:absolute; left:-10px; top:-10px; height:32px; width:32px;"><img src="http://frozenelm.com/cookiemonster/images/warning.png" height=16px width=16px></div></div>' + '<div id="cm_ob_note_div_caution" style="background:#' +this.color('greyTen')+ '; position:relative; display:none; margin-top:4px; padding:2px; border:1px solid #' +this.color('yellow')+ ';"><b style="color:#' +this.color('yellow')+ ';">Caution:</b> Purchase of this item will put you under the number of Cookies required for "Lucky!" (Frenzy)</br><span id="cm_ob_caution_amount"></span>' + '<div id="cm_ob_lucky_div_warning" style="position:absolute; left:-10px; top:-10px; height:32px; width:32px;"><img src="http://frozenelm.com/cookiemonster/images/caution.png" height=16px width=16px></div></div>' + "</div>";
		Game.RebuildStore();
	}

	var u = new Array(this.color('yellow'), this.color('yellow'));
	var a = new Array(this.bottomBar.cpi[t], this.bottomBar.timeLeft[t]);
	var f = new Array(Math.max.apply(Math, this.bottomBar.cpi), Math.max.apply(Math, this.bottomBar.timeLeft));
	var l = new Array(Math.min.apply(Math, this.bottomBar.cpi), Math.min.apply(Math, this.bottomBar.timeLeft));
	for (i = 0; i < u.length; i++) {
		if (a[i] === l[i]) {
			u[i] = this.color('green');
		} else if (a[i] === f[i]) {
			u[i] = this.color('red');
		} else if (f[i] - a[i] < a[i] - l[i]) {
			u[i] = this.color('orange');
		}
	}

	if ($("#cm_ob_div_" + t).length === 1) {
		$("#cm_ob_div_" + t).css("border", "1px solid #" + u[0]);
		$("#cm_ob_div_" + t).css("display", "");
		$("#cm_ob_div_" + t).html('<div style="position:absolute; top:4px; left:4px; color:#' +this.color('blue')+ '; font-weight:bold;">Bonus Income</div><div align=right style="position:absolute; top:18px; left:4px; color:white;">' + this.formatNumber(this.bottomBar.bonus[t]) + '</div><div style="position:absolute; top:34px; left:4px; color:#' +this.color('blue')+ '; font-weight:bold;">Base Cost Per Income</div><div align=right style="position:absolute; top:48px; left:4px; color:#' + u[0] + ';">' + this.formatNumber(a[0]) + '</div><div style="position:absolute; top:64px; left:4px; color:#' +this.color('blue')+ '; font-weight:bold;">Time Left</div><div align=right style="position:absolute; top:78px; left:4px; color:#' + u[1] + ';">' + this.formatTime(a[1], "") + "</div>");
		$("#cm_ob_warning_amount").text("Deficit: " + this.formatNumber(o[0]));
		$("#cm_ob_caution_amount").text("Deficit: " + this.formatNumber(o[1]));

		if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 2) {
			$("#cm_ob_lucky_div_warning").css("display", r[0]);
			$("#cm_ob_lucky_div_caution").css("display", r[1]);
		} else {
			$("#cm_ob_lucky_div_warning").css("display", "none");
			$("#cm_ob_lucky_div_caution").css("display", "none");
		}

		if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 3) {
			$("#cm_ob_note_div_warning").css("display", r[0]);
			$("#cm_ob_note_div_caution").css("display", r[1]);
		} else {
			$("#cm_ob_note_div_warning").css("display", "none");
			$("#cm_ob_note_div_caution").css("display", "none");
		}
	}

	if (this.getBooleanSetting('ColoredPrices')) {
		$("#product" + t).find(".price").first().css("color", "#" + u[0]);
	} else {
		$("#product" + t).find(".price").first().css("color", "");
	}
};