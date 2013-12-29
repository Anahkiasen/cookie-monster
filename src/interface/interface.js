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
	var o = new Array(this.color('yellow'), this.color('yellow'));
	var u = new Array(this.roundDecimal(s / e), Math.round(this.secondsLeft(t, "upgrade")));
	var a = new Array(Math.max.apply(Math, this.bottomBar.cpi), Math.max.apply(Math, this.bottomBar.cpi));
	var f = new Array(Math.min.apply(Math, this.bottomBar.cpi), Math.min.apply(Math, this.bottomBar.cpi));

	for (i = 0; i < o.length; i++) {
		if (u[i] < f[i]) {
			o[i] = this.color('blue');
			if (this.isInStore(r) && i === 0) {
				this.inStore[0]++;
			}
		} else if (u[i] === f[i]) {
			o[i] = this.color('green');
			if (this.isInStore(r) && i === 0) {
				this.inStore[1]++;
			}
		} else if (u[i] === a[i]) {
			o[i] = this.color('red');
			if (this.isInStore(r) && i === 0) {
				this.inStore[4]++;
			}
		} else if (u[i] > a[i]) {
			o[i] = this.color('purple');
			if (this.isInStore(r) && i === 0) {
				this.inStore[5]++;
			}
		} else if (a[i] - u[i] < u[i] - f[i]) {
			o[i] = this.color('orange');
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
		var l = new Array(this.lucky('regular'), this.lucky('frenzy'));
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
		$("#cm_up_div_" + t).html('<div style="position:absolute; top:4px; left:4px; color:#' +this.color('blue')+ '; font-weight:bold;">Bonus Income</div><div align=right style="position:absolute; top:18px; left:4px; color:white;">' + this.formatNumber(Math.round(e * 100) / 100) + '</div><div style="position:absolute; top:34px; left:4px; color:#' +this.color('blue')+ '; font-weight:bold;">Base Cost Per Income</div><div align=right style="position:absolute; top:48px; left:4px; color:#' + o[0] + ';">' + this.formatNumber(u[0]) + '</div><div style="position:absolute; top:64px; left:4px; color:#' +this.color('blue')+ '; font-weight:bold;">Time Left</div><div align=right style="position:absolute; top:78px; left:4px; color:#' + o[1] + ';">' + this.formatTime(u[1], true) + "</div>");

		$('#cm_up_warning_amount').text('Deficit: ' + this.formatNumber(h[0]));
		$('#cm_up_caution_amount').text('Deficit: ' + this.formatNumber(h[1]));

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
		var warning = this.getImage('warning');
		var caution = this.getImage('caution');

		return
			'<div id="cm_up_lucky_div_' +t+ '" style="position:absolute; top:-25px; left:-12px; height:32px;">'+
				'<div id="cm_up_lucky_div_warning" style="background:url(' +warning+ '); position:relative; float:left; height:32px; width:32px; display:none;"></div>'+
				'<div id="cm_up_lucky_div_caution" style="background:url(' +caution+ '); position:relative; float:left; height:32px; width:32px; display:none;"></div>'+
			'</div>'+
			'<div id="cm_up_div_' +t+ '" style="position:relative; height:96px; background:#' +this.color('greyTen')+ '; border:1px solid #000000; margin:6px -6px -6px -6px; display:none;"></div>'+
			'<div id="cm_up_note_div_' +t+ '" style="position:absolute; left:0px; margin-top:10px; color:white;">'+
				'<div id="cm_up_note_div_warning" style="background:#' +this.color('greyTen')+ '; position:relative; display:none; margin-top:4px; padding:2px; border:1px solid #' +this.color('red')+ ';">'+
					'<b style="color:#' +this.color('red')+ ';">Warning:</b>'+
					'Purchase of this item will put you under the number of Cookies required for "Lucky!"<br>'+
				'<span id="cm_up_warning_amount"></span>'+
				'<div id="cm_up_lucky_div_warning" style="position:absolute; left:-10px; top:-10px; height:32px; width:32px;">'+
					'<img src="' +warning+ '" height="16px" width="16px"></div>'+
			'</div>'+
			'<div id="cm_up_note_div_caution" style="background:#' +this.color('greyTen')+ '; position:relative; display:none; margin-top:4px; padding:2px; border:1px solid #' +this.color('yellow')+ ';">'+
				'<b style="color:#' +this.color('yellow')+ ';">Caution:</b>'+
				'Purchase of this item will put you under the number of Cookies required for "Lucky!" (Frenzy)<br>'+
				'<span id="cm_up_caution_amount"></span>'+
				'<div id="cm_up_lucky_div_warning" style="position:absolute; left:-10px; top:-10px; height:32px; width:32px;">'+
					'<img src="' +caution+ '" height="16px" width="16px">'+
				'</div>'+
			'</div>'+
			'</div>';
	}
};