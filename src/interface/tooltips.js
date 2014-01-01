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

	object.desc += ''+
		'<div class="cm-tooltip__images">'+
			'<div class="cm-tooltip__image" id="' +identifier+ 'lucky_div_warning" style="background:url(' +this.getImage('warning')+ ');"></div>'+
			'<div class="cm-tooltip__image" id="' +identifier+ 'lucky_div_caution" style="background:url(' +this.getImage('caution')+ ');"></div>'+
		'</div>'+
		'<div class="cm-tooltip__contents" id="' +identifier+ '"></div>'+
		'<div class="cm-tooltip__warnings" id="' +identifier+ 'note_div">'+
			'<div id="' +identifier+ 'note_div_warning" class="cm-tooltip__warning border-red">'+
				'<strong class="text-red">Warning:</strong> ' +this.texts.warning+ '<br>'+
				'<span id="' +identifier+ 'warning_amount"></span>'+
			'</div>'+
			'<div id="' +identifier+ 'note_div_caution" class="cm-tooltip__warning border-yellow">'+
				'<strong class="text-yellow">Caution:</strong> ' +this.texts.warning+ ' (Frenzy)<br>'+
				'<span id="' +identifier+ 'caution_amount"></span>'+
			'</div>'+
		'</div>';

	// Update store
	Game.RebuildUpgrades();
};

/**
 * Update a Building/Upgrade tooltip
 *
 * @param {Object} object
 * @param {Array}  colors
 * @param {Array}  informations
 *
 * @return {void}
 */
CookieMonster.updateTooltip = function(object, colors, informations) {
	var type       = object instanceof Game.Upgrade ? 'up' : 'ob';
	var deficits   = type === 'ob' ? this.getLuckyAlerts(object.price) : this.getLuckyAlerts(object.basePrice);
	var identifier = '#'+this.identifier(type, object.id);
	var $object    = $(identifier);

	// Create tooltip if it doesn't exist
	if (object.desc.indexOf(this.identifier(type, object.id)) === -1) {
		this.makeTooltip(object, type);
	}

	// Cancel if we're not in this particular tooltip at the moment
	if ($object.length !== 1 || $object.css('display') === 'none') {
		return;
	}

	// Update informations
	$object
	.attr('class', 'cm-tooltip__contents border-'+colors[0])
	.html(
		'<h4 class="text-blue">Bonus Income</h4>'+
		'<p>' + this.formatNumber(informations[0]) + '</p>'+

		'<h4 class="text-blue">Base Cost Per Income</h4>'+
		'<p class="text-' +colors[0]+ '">' + this.formatNumber(informations[1]) + '</p>'+

		'<h4 class="text-blue">Time Left</h4>'+
		'<p class="text-' +colors[1]+ '">' + this.formatTime(informations[2], true) + '</p>'
	);

	$(identifier+'warning_amount').html('Deficit: ' + this.formatNumber(deficits[0]));
	$(identifier+'caution_amount').html('Deficit: ' + this.formatNumber(deficits[1]));

	if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 2) {
		$(identifier+'lucky_div_warning').toggle(deficits[0] > 0);
		$(identifier+'lucky_div_caution').toggle(deficits[1] > 0);
	} else {
		$(identifier+'lucky_div_warning').hide();
		$(identifier+'lucky_div_caution').hide();
	}

	if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 3) {
		$(identifier+'note_div_warning').toggle(deficits[0] > 0);
		$(identifier+'note_div_caution').toggle(deficits[1] > 0);
	} else {
		$(identifier+'note_div_warning').hide();
		$(identifier+'note_div_caution').hide();
	}
};

//////////////////////////////////////////////////////////////////////
//////////////////////// GLOBAL SETUP AND UPDATE /////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Create the DOM for all tooltips
 *
 * @return {void}
 */
CookieMonster.setupTooltips = function() {
	this.updateTooltips();

	// Rebuild game elements
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
	if (typeof which === 'undefined') {
		which = 'all';
	}

	// Upgrades
	if (which === 'all' || which === 'upgrades') {
		this.upgradeCounts = [0, 0, 0, 0, 0, 0];
		Game.UpgradesById.forEach(function (upgrade) {
			CookieMonster.manageUpgradeTooltips(upgrade);
		});
		this.updateStoreCounters();
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

/**
 * Handles the creation/update of an upgrade's tooltip
 *
 * @param {Object} upgrade
 *
 * @return {void}
 */
CookieMonster.manageUpgradeTooltips = function(upgrade) {
	// Cancel if the upgrade isn't in the store
	if (!this.isInStore(upgrade)) {
		return;
	}

	// Gather comparative informations
	var income       = this.callCached('getUpgradeWorth', [upgrade]);
	var informations = [this.roundDecimal(upgrade.basePrice / income), this.secondsLeft(upgrade)];
	var colors       = this.computeColorCoding(informations);

	// Update store counters
	var colorKey = ['blue', 'green', 'yellow', 'orange', 'red', 'purple'].indexOf(colors[0]);
	this.upgradeCounts[colorKey]++;

	// Colorize upgrade icon
	if (this.getSetting('UpgradeIcons')) {
		$('#upgrade' + Game.UpgradesInStore.indexOf(upgrade)).html('<div class="cookie-monster__upgrade background-' +colors[0]+ '"></div>');
	}

	return this.updateTooltip(upgrade, colors, [
		this.roundDecimal(income),
		informations[0],
		informations[1]
	]);
};

/**
 * Handles the creation/update of a building's tooltip
 *
 * @param {Object} building
 *
 * @return {void}
 */
CookieMonster.manageBuildingTooltip = function(building) {
	var informations = [this.informations.bci[building.id], this.informations.timeLeft[building.id], this.informations.roi[building.id]];
	var colors       = this.computeColorCoding(informations);

	// Colorize building price
	if (this.getBooleanSetting('ColoredPrices')) {
		var color = this.getBooleanSetting('ReturnInvestment') ? colors[2] : colors[0];
		$('.price', '#product'+building.id).attr('class', 'price text-'+color);
	}

	return this.updateTooltip(building, colors, [
		this.informations.bonus[building.id],
		informations[0],
		informations[1]
	]);
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the lucky alerts for a price
 *
 * @param {Integer} price
 *
 * @return {Array}
 */
CookieMonster.getLuckyAlerts = function(price) {
	var rewards  = [this.luckyReward('regular'), this.luckyReward('frenzy')];
	var deficits = [0, 0];

	// Check Lucky alert
	if (Game.cookies - price < rewards[0]) {
		deficits[0] = rewards[0] - (Game.cookies - price);
	}

	// Check Lucky Frenzy alert
	if (Game.cookies - price < rewards[1]) {
		deficits[1] = rewards[1] - (Game.cookies - price);
	}

	return deficits;
};

/**
 * Get the color coding for a set of informations
 *
 * @param {Array} informations
 *
 * @return {Array}
 */
CookieMonster.computeColorCoding = function(informations) {
	var colors    = ['yellow', 'yellow', 'yellow'];
	var maxValues = this.getBestValue('max');
	var minValues = this.getBestValue('min');

	// Compute color
	for (var i = 0; i < informations.length; i++) {
		if (informations[i] < minValues[i]) {
			colors[i] = 'blue';
		} else if (informations[i] === minValues[i]) {
			colors[i] = 'green';
		} else if (informations[i] === maxValues[i]) {
			colors[i] = 'red';
		} else if (informations[i] > maxValues[i]) {
			colors[i] = 'purple';
		} else if (maxValues[i] - informations[i] < informations[i] - minValues[i]) {
			colors[i] = 'orange';
		}
	}

	// As ROI only has one color, use that one
	if (informations[2] === minValues[2]) {
		colors[2] = 'cyan';
	}

	return colors;
};
