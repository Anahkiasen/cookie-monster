//////////////////////////////////////////////////////////////////////
////////////////////////////// DOM HANDLERS //////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Create a tooltip for a type of object
 *
 * @param {String}  type
 * @param {Integer} key
 *
 * @return {String}
 */
CookieMonster.makeTooltip = function(type, key) {
	var warning = this.getImage('warning');
	var caution = this.getImage('caution');
	type = 'cm_'+type+'_';

	return ''+
		'<div id="' +type+ 'lucky_div_' + key + '" style="position:absolute; top:-25px; left:-12px; height:32px;">'+
			'<div class="cm-tooltip__image" id="' +type+ 'lucky_div_warning" style="background:url(' +warning+ ');"></div>'+
			'<div class="cm-tooltip__image" id="' +type+ 'lucky_div_caution" style="background:url(' +caution+ ');"></div>'+
		'</div>'+
		'<div class="cm-tooltip" id="' +type+ 'div_' + key + '"></div>'+
		'<div id="' +type+ 'note_div_' + key + '" style="position:absolute; left:0px; margin-top:10px; color:white;">'+
			'<div id="' +type+ 'note_div_warning" class="cm-tooltip__warning border-red">'+
				'<strong class="text-red">Warning:</strong>' +this.texts.warning+ '<br>'+
				'<span id="' +type+ 'warning_amount"></span>'+
				'<div id="' +type+ 'lucky_div_warning">'+
					'<img src="' +warning+ '">'+
				'</div>'+
			'</div>'+
			'<div id="' +type+ 'note_div_caution" class="cm-tooltip__warning border-yellow">'+
				'<strong class="text-yellow">Caution:</strong>' +this.texts.warning+ ' (Frenzy)<br>'+
				'<span id="' +type+ 'caution_amount"></span>'+
				'<div id="' +type+ 'lucky_div_warning">'+
					'<img src="' +caution+ '">'+
				'</div>'+
			'</div>'+
		'</div>';
};

/**
 * Update a Building/Upgrade tooltip
 *
 * @param {String}  type
 * @param {Integer} key
 * @param {Array}   colors
 * @param {Array}   deficits
 * @param {Array}   display
 * @param {Array}   informations
 *
 * @return {Void}
 */
CookieMonster.updateTooltip = function(type, key, colors, deficits, display, informations) {
	var identifier = ('#cm_'+type+'_');
	var $object    = $(identifier+ 'div_' + key);

	if ($object.length === 1) {
		$object.css({
			'border'  : '1px solid #'+this.color(colors[0]),
			'display' : '',
		}).html(
			'<div class="text-blue" style="position:absolute; top:4px; left:4px; font-weight:bold;">Bonus Income</div>'+
			'<div align=right style="position:absolute; top:18px; left:4px; color:white;">' + this.formatNumber(informations[0]) + '</div>'+

			'<div class="text-blue" style="position:absolute; top:34px; left:4px; font-weight:bold;">Base Cost Per Income</div>'+
			'<div align=right class="text-' +colors[0]+ '" style="position:absolute; top:48px; left:4px;">' + this.formatNumber(informations[1]) + '</div>'+

			'<div class="text-blue" style="position:absolute; top:64px; left:4px; font-weight:bold;">Time Left</div>'+
			'<div align=right class="text-' +colors[1]+ '" style="position:absolute; top:78px; left:4px;">' + this.formatTime(informations[2]) + "</div>"
		);

		$(identifier+'warning_amount').text('Deficit: ' + this.formatNumber(deficits[0]));
		$(identifier+'caution_amount').text('Deficit: ' + this.formatNumber(deficits[1]));

		if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 2) {
			$(identifier+'lucky_div_warning').toggle(display[0]);
			$(identifier+'lucky_div_caution').toggle(display[1]);
		} else {
			$(identifier+'lucky_div_warning').hide();
			$(identifier+'lucky_div_caution').hide();
		}

		if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 3) {
			$(identifier+'note_div_warning').toggle(display[0]);
			$(identifier+'note_div_caution').toggle(display[1]);
		} else {
			$(identifier+'note_div_warning').hide();
			$(identifier+'note_div_caution').hide();
		}
	}
};

//////////////////////////////////////////////////////////////////////
///////////////////////////////// CACHE //////////////////////////////
//////////////////////////////////////////////////////////////////////

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
	if (which === 'all' || which === 'upgrades') {
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
	if (which === 'all' || which === 'objects') {
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
		s += this.hasntAchievement('Enhancer');
	}
	if (Game.UpgradesOwned === 49) {
		s += this.hasntAchievement('Augmenter');
	}
	if (Game.UpgradesOwned === 99) {
		s += this.hasntAchievement('Upgrader');
	}
	i += this.getAchievementWorth(s, t, i, 0);
	if (r) {
		return i;
	}

	return this.tooltips[t] + this.manageUpgradesTooltips(i, t, n);
};

CookieMonster.manageBuildingTooltip = function(building) {
	var buildingKey = building.id;
	var rewards     = [this.luckyReward('regular'), this.luckyReward('frenzy')];
	var display     = [false, false];
	var deficits    = [0, 0];

	if (Game.cookies - building.price < rewards[0]) {
		display[0]  = true;
		deficits[0] = rewards[0] - (Game.cookies - building.price);
	}
	if (Game.cookies - building.price < rewards[1]) {
		display[1]  = true;
		deficits[1] = rewards[1] - (Game.cookies - building.price);
	}

	// Create tooltips
	if (building.desc === this.buildingTooltips[building.id]) {
		building.desc += this.makeTooltip('ob', buildingKey);
		Game.RebuildStore();
	}

	var colors       = ['yellow', 'yellow'];
	var informations = [this.bottomBar.cpi[buildingKey], this.bottomBar.timeLeft[buildingKey]];
	var maxValues    = [Math.max.apply(Math, this.bottomBar.cpi), Math.max.apply(Math, this.bottomBar.timeLeft)];
	var minValues    = [Math.min.apply(Math, this.bottomBar.cpi), Math.min.apply(Math, this.bottomBar.timeLeft)];

	for (var i = 0; i < colors.length; i++) {
		if (informations[i] === minValues[i]) {
			colors[i] = 'green';
		} else if (informations[i] === maxValues[i]) {
			colors[i] = 'red';
		} else if (maxValues[i] - informations[i] < informations[i] - minValues[i]) {
			colors[i] = 'orange';
		}
	}

	this.updateTooltip('ob', buildingKey, colors, deficits, display, [
		this.bottomBar.bonus[buildingKey],
		informations[0],
		informations[1],
	]);

	var color = this.getBooleanSetting('ColoredPrices') ? '#'+this.color(colors[0]) : '';

	$('.price', '#product'+buildingKey).first().css('color', color);
};

CookieMonster.manageUpgradesTooltips = function(e, upgradeKey, returnHtml) {
	var upgrade = Game.UpgradesById[upgradeKey];
	var price   = upgrade.basePrice;
	var colors  = ['yellow', 'yellow'];

	var informations = [this.roundDecimal(price / e), Math.round(this.secondsLeft(upgradeKey, 'upgrade'))];
	var maxValues    = [Math.max.apply(Math, this.bottomBar.cpi), Math.max.apply(Math, this.bottomBar.cpi)];
	var minValues    = [Math.min.apply(Math, this.bottomBar.cpi), Math.min.apply(Math, this.bottomBar.cpi)];

	for (var i = 0; i < colors.length; i++) {
		if (informations[i] < minValues[i]) {
			colors[i] = 'blue';
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[0]++;
			}
		} else if (informations[i] === minValues[i]) {
			colors[i] = 'green';
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[1]++;
			}
		} else if (informations[i] === maxValues[i]) {
			colors[i] = 'red';
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[4]++;
			}
		} else if (informations[i] > maxValues[i]) {
			colors[i] = 'purple';
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[5]++;
			}
		} else if (maxValues[i] - informations[i] < informations[i] - minValues[i]) {
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

	var rewards  = [this.luckyReward('regular'), this.luckyReward('frenzy')];
	var display  = [false, false];
	var deficits = [0, 0];

	if (Game.cookies - price < rewards[0]) {
		display[0]  = true;
		deficits[0] = rewards[0] - (Game.cookies - price);
	}
	if (Game.cookies - price < rewards[1]) {
		display[1]  = true;
		deficits[1] = rewards[1] - (Game.cookies - price);
	}

	this.updateTooltip('up', upgradeKey, colors, deficits, display, [
		Math.round(e * 100) / 100,
		informations[0],
		informations[1],
	]);

	if (returnHtml) {
		return this.makeTooltip('up', upgradeKey);
	}
};