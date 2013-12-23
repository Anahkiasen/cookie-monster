/**
 * Changes the favicon according to current state
 *
 * @param {integer} frame The current sprite of the favicon
 *
 * @return {void}
 */
CookieMonster.faviconSpinner = function(frame) {
	if (frame > 6) {
		frame = 1;
	}

	if (this.goldenCookieAvailable === "(G) ") {
		$("#cm_favicon").attr("href", "http://frozenelm.com/cookiemonster/images/cm_gc_" + frame + ".png");
		frame++;
		setTimeout(function () {
			CookieMonster.faviconSpinner(frame);
		}, 250);
	} else {
		$("#cm_favicon").attr("href", "http://orteil.dashnet.org/cookieclicker/img/favicon.ico");
	}
};

/**
 * Update the stylings of the upgrades to the selected option
 *
 * @return {void}
 */
CookieMonster.updateUpgradeDisplay = function() {
	var $upgrades = $("#upgrades");
	var height;

	switch (this.getSetting('UpgradeDisplay') * 1) {
		case 1:
			height = '';
			break;

		case 2:
			height = 'auto';
			break;

		default:
			height = '0px';
			break;
	}

	$upgrades.css('cssText', 'height: ' +height+ ' !important;');
};

CookieMonster.colorize = function(e, t, n) {
	var i = 0;
	var r = Game.UpgradesById[t];
	var s = r.basePrice;
	var o = new Array(this.colors.yellow, this.colors.yellow);
	var u = new Array(Math.round(s / e * 100) / 100, Math.round(this.secondsLeft(t, "upgrade")));
	var a = new Array(Math.max.apply(Math, this.holdCPI), Math.max.apply(Math, this.holdTC));
	var f = new Array(Math.min.apply(Math, this.holdCPI), Math.min.apply(Math, this.holdTC));

	for (i = 0; i < o.length; i++) {
		if (u[i] < f[i]) {
			o[i] = this.colors.blue;
			if (this.isInStore(r) && i === 0) {
				this.inStore[0]++;
			}
		} else if (u[i] === f[i]) {
			o[i] = this.colors.green;
			if (this.isInStore(r) && i === 0) {
				this.inStore[1]++;
			}
		} else if (u[i] === a[i]) {
			o[i] = this.colors.red;
			if (this.isInStore(r) && i === 0) {
				this.inStore[4]++;
			}
		} else if (u[i] > a[i]) {
			o[i] = this.colors.purple;
			if (this.isInStore(r) && i === 0) {
				this.inStore[5]++;
			}
		} else if (a[i] - u[i] < u[i] - f[i]) {
			o[i] = this.colors.orange;
			if (this.isInStore(r) && i === 0) {
				this.inStore[3]++;
			}
		} else {
			if (this.isInStore(r) && i === 0) {
				this.inStore[2]++;
			}
		}
	}
	for (i = 0; i < this.inStore.length; i++) {
		$("#cm_up_q" + i).text(this.inStore[i]);
	}
	if (this.getSetting('UpgradeIcons') && this.isInStore(r)) {
		$("#upgrade" + Game.UpgradesInStore.indexOf(r)).html('<div style="background-color:#' + o[0] + '; border:1px solid black; position:absolute; z-index:21; top:2px; left:2px; height:14px; width:14px; pointer-events:none;"></div>');
	}
	if ($("#cm_up_div_" + t).length === 1) {
		var l = new Array(this.lucky('regular', true), this.lucky("frenzy", true));
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
		$("#cm_up_div_" + t).html('<div style="position:absolute; top:4px; left:4px; color:#4bb8f0; font-weight:bold;">Bonus Income</div><div align=right style="position:absolute; top:18px; left:4px; color:white;">' + this.formatNumber(Math.round(e * 100) / 100) + '</div><div style="position:absolute; top:34px; left:4px; color:#4bb8f0; font-weight:bold;">Base Cost Per Income</div><div align=right style="position:absolute; top:48px; left:4px; color:#' + o[0] + ';">' + this.formatNumber(u[0]) + '</div><div style="position:absolute; top:64px; left:4px; color:#4bb8f0; font-weight:bold;">Time Left</div><div align=right style="position:absolute; top:78px; left:4px; color:#' + o[1] + ';">' + this.formatTime(u[1], "min") + "</div>");
		$("#cm_up_warning_amount").text("Deficit: " + this.formatNumber(h[0]));
		$("#cm_up_caution_amount").text("Deficit: " + this.formatNumber(h[1]));

		if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 2) {
			$("#cm_up_lucky_div_warning").css("display", c[0]);
			$("#cm_up_lucky_div_caution").css("display", c[1]);
		} else {
			$("#cm_up_lucky_div_warning").css("display", "none");
			$("#cm_up_lucky_div_caution").css("display", "none");
		}
		if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 3) {
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
	var t = this.$goldenCookie;
	if (t.css("display") === "none" && !this.emphasize) {
		this.emphasize = true;
		this.goldenCookieAvailable = "";
	}
	if (t.css("display") !== "none" && this.emphasize) {
		this.emphasize = false;
		if (this.getBooleanSetting('UpdateTitle')) {
			this.goldenCookieAvailable = "(G) ";
			this.faviconSpinner(1);
		}
		if (this.getBooleanSetting('CookieSound')) {
			var n = new realAudio("http://frozenelm.com/cookiemonster/sounds/ba%20dink.mp3");
			n.volume = 1;
			n.play();
		}
		if (this.getBooleanSetting('FlashScreen')) {
			$("#cookie_monster_overlay").fadeIn(100);
			$("#cookie_monster_overlay").fadeOut(500);
		}
	}
	if (t.css("display") !== "none" && this.getBooleanSetting('CookieTimer')) {
		e.css({
			display : 'block',
			opacity : t.css('opacity'),
			left    : t.css('left'),
			top     : t.css('top'),
		});
		e.html('<div style="position:absolute; top:30px; width:96px; height:36px;">' + Math.round(Game.goldenCookie.life / Game.fps) + "</div>");
	} else {
		e.css("display", "none");
	}
};