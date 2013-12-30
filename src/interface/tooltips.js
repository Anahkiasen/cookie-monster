//////////////////////////////////////////////////////////////////////
////////////////////////////// DOM HANDLERS //////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the tooltip handle for a type/key
 *
 * @param {String}  type
 * @param {Integer} key
 *
 * @return {String}
 */
CookieMonster.identifier = function(type, key) {
	return 'cm_'+type+'_'+key+'_';
};

/**
 * Create a tooltip for a type of object
 *
 * @param {Object} object
 * @param {String} type
 *
 * @return {Void}
 */
CookieMonster.makeTooltip = function(object, type) {
	var identifier = this.identifier(type, object.id);
	var warning    = this.getImage('warning');
	var caution    = this.getImage('caution');

	object.desc += ''+
		'<div id="' +identifier+ 'lucky_" style="position:absolute; top:-25px; left:-12px; height:32px;">'+
			'<div class="cm-tooltip__image" id="' +identifier+ 'lucky_div_warning" style="background:url(' +warning+ ');"></div>'+
			'<div class="cm-tooltip__image" id="' +identifier+ 'lucky_div_caution" style="background:url(' +caution+ ');"></div>'+
		'</div>'+
		'<div class="cm-tooltip" id="' +identifier+ '"></div>'+
		'<div id="' +identifier+ 'note_div" style="position:absolute; left:0px; margin-top:10px; color:white;">'+
			'<div id="' +identifier+ 'note_div_warning" class="cm-tooltip__warning border-red">'+
				'<strong class="text-red">Warning:</strong>' +this.texts.warning+ '<br>'+
				'<span id="' +identifier+ 'warning_amount"></span>'+
				'<div id="' +identifier+ 'lucky_div_warning">'+
					'<img src="' +warning+ '">'+
				'</div>'+
			'</div>'+
			'<div id="' +identifier+ 'note_div_caution" class="cm-tooltip__warning border-yellow">'+
				'<strong class="text-yellow">Caution:</strong>' +this.texts.warning+ ' (Frenzy)<br>'+
				'<span id="' +identifier+ 'caution_amount"></span>'+
				'<div id="' +identifier+ 'lucky_div_warning">'+
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
	var identifier = '#'+this.identifier(type, key);
	var $object    = $(identifier);

	// Create tooltip if it doesn't exist
	var object = type === 'up' ? Game.UpgradesById[key] : Game.ObjectsById[key];
	if (object.desc.indexOf(this.identifier(type, key)) === -1) {
		this.makeTooltip(object, type);
	}

	// Update informations
	$object.css({
		'border'  : '1px solid #'+this.color(colors[0]),
		'display' : '',
	}).html(
		'<div class="text-blue" style="position:absolute; top:4px; left:4px; font-weight:bold;">Bonus Income</div>'+
		'<div align=right style="position:absolute; top:18px; left:4px; color:white;">' + this.formatNumber(informations[0]) + '</div>'+

		'<div class="text-blue" style="position:absolute; top:34px; left:4px; font-weight:bold;">Base Cost Per Income</div>'+
		'<div align=right class="text-' +colors[0]+ '" style="position:absolute; top:48px; left:4px;">' + this.formatNumber(informations[1]) + '</div>'+

		'<div class="text-blue" style="position:absolute; top:64px; left:4px; font-weight:bold;">Time Left</div>'+
		'<div align=right class="text-' +colors[1]+ '" style="position:absolute; top:78px; left:4px;">' + this.formatTime(informations[2], true) + "</div>"
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

/**
 * Create the DOM for all tooltips
 *
 * @return {[type]} [description]
 */
CookieMonster.setupTooltips = function() {
	this.updateTooltips('all');
	Game.RebuildUpgrades();
	Game.RebuildStore();
};

/**
 * Update one or more types of tooltips
 *
 * @param {string} which [upgrades,objects,all]
 *
 * @return {void}
 */
CookieMonster.updateTooltips = function(which) {
	// Upgrades
	if (which === 'all' || which === 'upgrades') {
		this.inStore = [0, 0, 0, 0, 0, 0];

		Game.UpgradesById.forEach(function (upgrade) {
			CookieMonster.manageUpgradeTooltips(upgrade);
		});
	}

	// Buildings
	if (which === 'all' || which === 'objects') {
		Game.ObjectsById.forEach(function (building) {
			CookieMonster.manageBuildingTooltip(building);
		});
	}
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// MANAGERS ////////////////////////////
//////////////////////////////////////////////////////////////////////

CookieMonster.manageUpgradeTooltips = function(upgrade) {
	var income = this.getUpgradeWorth(upgrade);

	return this.manageUpgradesTooltips(income, upgrade);
};

CookieMonster.manageUpgradesTooltips = function(income, upgrade) {
	var price   = upgrade.basePrice;
	var colors  = ['yellow', 'yellow'];

	var informations = [this.roundDecimal(price / income), Math.round(this.secondsLeft(upgrade.id, 'upgrade'))];
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

	return this.updateTooltip('up', upgrade.id, colors, deficits, display, [
		this.roundDecimal(income),
		informations[0],
		informations[1],
	]);
};

CookieMonster.manageBuildingTooltip = function(building) {
	var rewards  = [this.luckyReward('regular'), this.luckyReward('frenzy')];
	var display  = [false, false];
	var deficits = [0, 0];

	if (Game.cookies - building.price < rewards[0]) {
		display[0]  = true;
		deficits[0] = rewards[0] - (Game.cookies - building.price);
	}
	if (Game.cookies - building.price < rewards[1]) {
		display[1]  = true;
		deficits[1] = rewards[1] - (Game.cookies - building.price);
	}

	// Get statistics
	var colors       = ['yellow', 'yellow'];
	var informations = [this.bottomBar.cpi[building.id], this.bottomBar.timeLeft[building.id]];
	var maxValues    = [Math.max.apply(Math, this.bottomBar.cpi), Math.max.apply(Math, this.bottomBar.timeLeft)];
	var minValues    = [Math.min.apply(Math, this.bottomBar.cpi), Math.min.apply(Math, this.bottomBar.timeLeft)];

	// Compute building color
	for (var i = 0; i < colors.length; i++) {
		if (informations[i] === minValues[i]) {
			colors[i] = 'green';
		} else if (informations[i] === maxValues[i]) {
			colors[i] = 'red';
		} else if (maxValues[i] - informations[i] < informations[i] - minValues[i]) {
			colors[i] = 'orange';
		}
	}

	// Colorize building price
	$('.price', '#product'+building.id).addClass(this.getBooleanSetting('ColoredPrices') ? 'text-'+colors[0] : '');

	return this.updateTooltip('ob', building.id, colors, deficits, display, [
		this.bottomBar.bonus[building.id],
		informations[0],
		informations[1],
	]);
};