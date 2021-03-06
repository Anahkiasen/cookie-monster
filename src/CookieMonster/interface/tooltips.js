//////////////////////////////////////////////////////////////////////
////////////////////////////// DOM HANDLERS //////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Create a tooltip for a type of object
 *
 * @param {Object} object
 *
 * @return {Void}
 */
CookieMonster.makeTooltip = function(object) {
	var identifier = object.identifier();

	object.desc += ''+
		'<div class="cm-tooltip__images">'+
			'<div class="cm-tooltip__image" id="' +identifier+ 'lucky_div_warning" style="background:url(' +this.getImage('warning')+ ');"></div>'+
			'<div class="cm-tooltip__image" id="' +identifier+ 'lucky_div_caution" style="background:url(' +this.getImage('caution')+ ');"></div>'+
		'</div>'+
		'<div class="cm-tooltip__contents" id="' +identifier+ '"></div>';
	/**
	 * If the object is an upgrade or a cookie upgrade (basically, anything with a static tooltip), 
	 * then add this Notes html code to the 'object.desc'
	 *
	 * We don't want to add this html to building objects because the Clicker code dynamically generates building tooltips
	 * by appending dynamic tooltip stats to the object.desc value. This causes the Notes to be drawn on top of
	 * dynamic tooltip stats instead of below them. The appending of Notes to the bottom of the 'tooltip' div is accomplished
	 * at the time of dynamic tooltip generation in the modifyDynamicTooltip function.
	 */
	if(typeof object.cmType === 'undefined' || object.cmType !== 'building' ) {
		object.desc += '<div class="cm-tooltip__warnings" id="' +identifier+ 'note_div">'+
			'<div id="' +identifier+ 'note_div_warning" class="cm-tooltip__warning border-red">'+
				'<strong class="text-red">Warning:</strong> ' +this.texts.warning+ '<br>'+
				'<span id="' +identifier+ 'warning_amount"></span>'+
			'</div>'+
			'<div id="' +identifier+ 'note_div_caution" class="cm-tooltip__warning border-yellow">'+
				'<strong class="text-yellow">Caution:</strong> ' +this.texts.warning+ ' (Frenzy)<br>'+
				'<span id="' +identifier+ 'caution_amount"></span>'+
			'</div>'+
		'</div>';
	}

	// Update store
	Game.RebuildUpgrades();
};

/**
 * Update a Building/Upgrade tooltip
 *
 * @param {Object} object
 * @param {Array}  colors
 *
 * @return {void}
 */
CookieMonster.updateTooltip = function(object, colors) {
	var informations = [object.getWorth(true), object.getBaseCostPerIncome(), object.getTimeLeft()];
	var deficits     = this.getLuckyAlerts(object);
	var identifier   = '#'+object.identifier();
	var $object      = $(identifier);

	// Create tooltip if it doesn't exist
	if (!object.matches(object.identifier())) {
		this.makeTooltip(object);
	}

	// Cancel if we're not in this particular tooltip at the moment
	if ($object.length !== 1 || $object.css('display') === 'none') {
		return;
	}

	// Compute percentage
	var percentage = this.formatNumber(100 * informations[0] / Game.cookiesPs);
	percentage = percentage > 0 ? ' (' +percentage+ '% of income)' : '';

	// Build base tooltip HTML
	var tooltip =
		'<h4 class="text-blue">Bonus Income</h4>'+
		'<p>' + this.formatNumber(informations[0]) + percentage + '</p>'+

		'<h4 class="text-blue">Base Cost Per Income</h4>'+
		'<p class="text-' +colors[0]+ '">' + this.formatNumber(informations[1]) + '</p>'+

		'<h4 class="text-blue">Time Left</h4>'+
		'<p class="text-' +colors[1]+ '">' + this.formatCompressedTime(informations[2]) + '</p>';

	// Add clicking bonus informations
	if (object.getType() === 'upgrade' && object.isClickingRelated()) {
		tooltip =
			'<h4 class="text-blue">Bonus click CPS</h4>'+
			'<p>' + this.formatNumber(object.getClickingWorth()) + '</p>'+
			tooltip;
	}

	// Update informations
	$object.attr('class', 'cm-tooltip__contents border-'+colors[0]).html(tooltip);

	// Compute and display deficits
	var timeLefts = deficits.map(this.getTimeForCookies, this).map(this.formatCompressedTime, this);
	$(identifier+'warning_amount').html('Deficit: ' + this.formatNumber(deficits[0]) + ' (' +timeLefts[0]+ ')');
	$(identifier+'caution_amount').html('Deficit: ' + this.formatNumber(deficits[1]) + ' (' +timeLefts[1]+ ')');

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

	this.tooltipLastObjectId = identifier;

        //Set 'desc' to the recently updated tooltip HTML
        //Required because getDynamicTooltip in Orteil's code will replace CookieMonster tooltip HTML
        //when refreshing Orteil's tooltip. Orteil updates his tooltip with the 'desc' value
        object.desc = $('#tooltipAnchor .description').html();

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
	Game.RefreshStore();
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

/**
 * Try to make tooltip stay on the screen
 *
 * @return {void}
 */
CookieMonster.controlTooltipPosition = function() {
	var yMax = Game.mouseY;

	if (this.tooltipLastObjectId) {
		var $elem1 = $(this.tooltipLastObjectId + 'note_div_warning');
		var $elem2 = $(this.tooltipLastObjectId + 'note_div_caution');

		var underLuckyHeight = $elem1.is(':visible') ? $elem1.outerHeight(true): 0;
		underLuckyHeight += $elem2.is(':visible') ? $elem2.outerHeight(true) + 2: 0; // 2 is a magic number

		yMax = $(window).height() - $(tooltip).outerHeight(); // window size - tooltip size
		yMax -= underLuckyHeight; // - notes about "Lucky"
		yMax -= 40; // distance beetwen tooltip and tooltipAnchor
		yMax -= this.getSetting('BottomBar') ? 57 : 0;
		yMax = yMax < -40 ? -40 : yMax; // will never be above the screen
		yMax = Game.mouseY < yMax ? Game.mouseY : yMax;
	}

	$(tooltipAnchor).offset({
		top: yMax,
		left: Game.mouseX
	});
};

/**
 * Append Warning and Caution notes to dynamic tooltip string
 *
 * @param {Object} object
 *
 * @return {String}
 */
CookieMonster.modifyDynamicTooltip = function(object, dynamicTooltip) {
	var identifier    = object.identifier();
	var deficits      = this.getLuckyAlerts(object);
	var tooltipString = dynamicTooltip;

	// Compute and display deficits
	var timeLefts = deficits.map(this.getTimeForCookies, this).map(this.formatCompressedTime, this);

	// Show or hide Warning and Caution notes based on deficit values
	var toggleNoteDivWarning = deficits[0] > 0 ? '' : 'style="display: none"';
	var toggleNoteDivCaution = deficits[1] > 0 ? '' : 'style="display: none"';

	tooltipString += '<div class="cm-tooltip__warnings" id="' +identifier+ 'note_div">'+
		'<div id="' +identifier+ 'note_div_warning" class="cm-tooltip__warning border-red" ' +toggleNoteDivWarning+ '>'+
			'<strong class="text-red">Warning:</strong> ' +this.texts.warning+ '<br>'+
			'<span id="' +identifier+ 'warning_amount">Deficit: ' + this.formatNumber(deficits[0]) + ' (' +timeLefts[0]+ ')</span>'+
		'</div>'+
		'<div id="' +identifier+ 'note_div_caution" class="cm-tooltip__warning border-yellow" '+toggleNoteDivCaution+'>'+
			'<strong class="text-yellow">Caution:</strong> ' +this.texts.warning+ ' (Frenzy)<br>'+
			'<span id="' +identifier+ 'caution_amount">Deficit: ' + this.formatNumber(deficits[1]) + ' (' +timeLefts[1]+ ')</span>'+
		'</div>'+
	'</div>';
	
	return tooltipString;	
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
	if (!upgrade.isInStore()) {
		return;
	}

	// Update store counters
	var colors   = upgrade.getColors();
	var colorKey = ['blue', 'green', 'yellow', 'orange', 'red', 'purple'].indexOf(colors[0]);
	this.upgradeCounts[colorKey]++;

	// Colorize upgrade icon
	if (this.getSetting('UpgradeIcons')) {
		$('#upgrade' + Game.UpgradesInStore.indexOf(upgrade)).html('<div class="cookie-monster__upgrade background-' +colors[0]+ '"></div>');
	}

	return this.updateTooltip(upgrade, colors);
};

/**
 * Handles the creation/update of a building's tooltip
 *
 * @param {Object} building
 *
 * @return {void}
 */
CookieMonster.manageBuildingTooltip = function(building) {
	var colors = building.getColors();

	// Colorize building price
	if (this.getSetting('ColoredPrices')) {
		var color = this.getSetting('ReturnInvestment') ? colors[2] : colors[0];
		$('.price', '#product'+building.id).attr('class', 'price text-'+color);
	}

	return this.updateTooltip(building, colors);
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the lucky alerts for a price
 *
 * @param {Object} object
 *
 * @return {Array}
 */
CookieMonster.getLuckyAlerts = function(object) {
	var price     = object.getPrice();
	var rewards   = [this.getLuckyTreshold(false, Game.cookiesPs), this.getLuckyTreshold('frenzy', Game.cookiesPs)];
	var deficits  = [0, 0];

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
		if (informations[i] === Infinity) {
			colors[i] = 'greyLight';
		} else if (informations[i] < minValues[i]) {
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
