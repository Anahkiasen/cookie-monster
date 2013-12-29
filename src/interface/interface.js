/**
 * Update the stylings of the upgrades to the selected option
 *
 * @return {void}
 */
CookieMonster.updateUpgradeDisplay = function() {
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

	$('#upgrades').css('height', height);
};

CookieMonster.colorize = function(e, upgradeKey, returnHtml) {
	var upgrade = Game.UpgradesById[upgradeKey];
	var price   = upgrade.basePrice;
	var colors  = ['yellow', 'yellow'];

	var u = [this.roundDecimal(price / e), Math.round(this.secondsLeft(upgradeKey, 'upgrade'))];
	var maxValues = [Math.max.apply(Math, this.bottomBar.cpi), Math.max.apply(Math, this.bottomBar.cpi)];
	var minValues = [Math.min.apply(Math, this.bottomBar.cpi), Math.min.apply(Math, this.bottomBar.cpi)];

	for (var i = 0; i < colors.length; i++) {
		if (u[i] < minValues[i]) {
			colors[i] = 'blue';
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[0]++;
			}
		} else if (u[i] === minValues[i]) {
			colors[i] = 'green';
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[1]++;
			}
		} else if (u[i] === maxValues[i]) {
			colors[i] = 'red';
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[4]++;
			}
		} else if (u[i] > maxValues[i]) {
			colors[i] = 'purple';
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[5]++;
			}
		} else if (maxValues[i] - u[i] < u[i] - minValues[i]) {
			colors[i] = 'orange';
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[3]++;
			}
		} else {
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[2]++;
			}
		}
	}
	for (i = 0; i < this.inStore.length; i++) {
		$('#cm_up_q' + i).text(this.inStore[i]);
	}
	if (this.getSetting('UpgradeIcons') && this.isInStore(upgrade)) {
		$('#upgrade' + Game.UpgradesInStore.indexOf(upgrade)).html('<div class="cookie-monster__upgrade background-' +colors[0]+ '"></div>');
	}

	var $upgrade = $('#cm_up_div_'+upgradeKey);
	if ($upgrade.length === 1) {
		var rewards  = [this.luckyReward('regular'), this.luckyReward('frenzy')];
		var display  = [false, false];
		var deficits = [0, 0];

		if (Game.cookies - price < rewards[0]) {
			display[0]  = true;
			deficits[0] = this.formatNumber(rewards[0] - (Game.cookies - price));
		}
		if (Game.cookies - price < rewards[1]) {
			display[1]  = true;
			deficits[1] = this.formatNumber(rewards[1] - (Game.cookies - price));
		}

		$upgrade.css('border', '1px solid #' + this.color(colors[0]));
		$upgrade.css('display', '');
		$upgrade.html(
			'<div style="position:absolute; top:4px; left:4px; color:#' +this.color('blue')+ '; font-weight:bold;">Bonus Income</div>'+
			'<div align=right style="position:absolute; top:18px; left:4px; color:white;">' + this.formatNumber(Math.round(e * 100) / 100) + '</div>'+

			'<div style="position:absolute; top:34px; left:4px; color:#' +this.color('blue')+ '; font-weight:bold;">Base Cost Per Income</div>'+
			'<div align=right style="position:absolute; top:48px; left:4px; color:#' + this.color(colors[0]) + ';">' + this.formatNumber(u[0]) + '</div>'+

			'<div style="position:absolute; top:64px; left:4px; color:#' +this.color('blue')+ '; font-weight:bold;">Time Left</div>'+
			'<div align=right style="position:absolute; top:78px; left:4px; color:#' + this.color(colors[1]) + ';">' + this.formatTime(u[1], true) + '</div>'
		);

		$('#cm_up_warning_amount').text('Deficit: ' + deficits[0]);
		$('#cm_up_caution_amount').text('Deficit: ' + deficits[1]);

		if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 2) {
			$("#cm_up_lucky_div_warning").toggle(display[0]);
			$("#cm_up_lucky_div_caution").toggle(display[1]);
		} else {
			$("#cm_up_lucky_div_warning").hide();
			$("#cm_up_lucky_div_caution").hide();
		}
		if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 3) {
			$("#cm_up_note_div_warning").toggle(display[0]);
			$("#cm_up_note_div_caution").toggle(display[1]);
		} else {
			$("#cm_up_note_div_warning").hide();
			$("#cm_up_note_div_caution").hide();
		}
	}
	if (returnHtml) {
		return this.makeTooltip('up', upgradeKey);
	}
};