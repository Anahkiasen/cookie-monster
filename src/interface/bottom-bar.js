//////////////////////////////////////////////////////////////////////
///////////////////////////// INFORMATIONS ///////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get an array with the min/max CPI/timeLeft
 *
 * @param {String} minOrMax
 *
 * @return {Array}
 */
CookieMonster.getBestValue = function(minOrMax) {
	return [Math[minOrMax].apply(Math, this.bottomBar.cpi), Math[minOrMax].apply(Math, this.bottomBar.timeLeft)];
};

/**
 * Update the stored informations about a building
 *
 * @param {Integer} building
 * @param {Array}   informations
 */
CookieMonster.setBuildingInformations = function (building, informations) {
	this.bottomBar.items[building]    = informations.items;
	this.bottomBar.bonus[building]    = informations.bonus;
	this.bottomBar.cpi[building]      = informations.cpi;
	this.bottomBar.timeLeft[building] = informations.timeLeft;
};

//////////////////////////////////////////////////////////////////////
///////////////////////////// DOM MODIFIERS //////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Toggle the visibility of the Bottom Bar
 *
 * @return {void}
 */
CookieMonster.toggleBar = function() {
	var visible = this.getBooleanSetting('BottomBar');
	var bottom  = visible ? 57 : 0;

	this.$monsterBar.toggle(visible);
	this.$game.css('bottom', bottom+'px');
};

/**
 * Create the Bottom Bar
 *
 * @return {void}
 */
CookieMonster.createBottomBar = function() {
	$('body').append('<div id="cookie-monster__bottom-bar"></div>');

	this.$monsterBar = this.makeTable();
};

/**
 * Create the Bottom Bar
 *
 * @return {void}
 */
CookieMonster.makeTable = function() {
	var thead    = '<th class="text-yellow"> ' + this.version + "</th>";
	var bonus    = '<th class="text-blue">Bonus Income</th>';
	var baseCost = '<th class="text-blue">Base Cost Per Income</th>';
	var timeLeft = '<th class="text-blue">Time Left</th>';

	// Append each building type to the bar
	Game.ObjectsById.forEach(function (building, key) {
		thead    += '<th id="cookie_monster_item_' +key+ '"></th>';
		bonus    += '<td id="cookie_monster_is_'   +key+ '"></td>';
		baseCost += '<td id="cookie_monster_cpi_'  +key+ '"></td>';
		timeLeft += '<td id="cookie_monster_tc_'   +key+ '"></td>';
	});

	return $('#cookie-monster__bottom-bar').html(
		'<table>'+
			'<tr>'+thead+'</tr>'+
			'<tr>'+bonus+'</tr>'+
			'<tr>'+baseCost+'</tr>'+
			'<tr>'+timeLeft+'</tr>'+
		'</table>');
};

/**
 * Update the contents of the Bottom Bar
 *
 * @return {void}
 */
CookieMonster.updateTable = function() {
	var that = this;

	// Here we loop over the information we have, and building a multidimensionnal
	// array of it, by building key
	Game.ObjectsById.forEach(function (building, key) {
		var price      = building.price;
		var owned      = building.amount;
		var production = building.storedCps * Game.globalCpsMult;
		if (building.name === "Grandma") {
			production = 0;
		}

		// Compute informations
		var bonus = that.roundDecimal(production + that.getUpgradeBonuses(building.name, owned, production));
		var cpi   = that.roundDecimal(price / bonus);
		var count = '(<span class="text-blue">' + that.formatNumber(owned) + '</span>)';

		that.setBuildingInformations(key, {
			items    : building.name.split(' ')[0] + ' ' + count,
			bonus    : that.roundDecimal(bonus),
			cpi      : that.roundDecimal(cpi),
			timeLeft : Math.round(that.secondsLeft(key, 'object')),
		});
	});

	// Then we loop over the created array, format the information
	// and update the DOM
	Game.ObjectsById.forEach(function (building, key) {
		var colors       = ['yellow', 'yellow'];
		var informations = [that.bottomBar.cpi[key], that.bottomBar.timeLeft[key]];
		var worst        = CookieMonster.getBestValue('max');
		var best         = CookieMonster.getBestValue('min');

		// Compute correct colors
		for (var i = 0; i < colors.length; i++) {
			if (informations[i] === best[i]) {
				colors[i] = 'green';
			} else if (informations[i] === worst[i]) {
				colors[i] = 'red';
			} else if (worst[i] - informations[i] < informations[i] - best[i]) {
				colors[i] = 'orange';
			}
		}

		// Update DOM
		$('#cookie_monster_item_' + key).html(that.bottomBar.items[key]);
		$('#cookie_monster_is_'   + key).html(that.formatNumber(that.bottomBar.bonus[key]));
		$('#cookie_monster_cpi_'  + key).html('<span class="text-' + colors[0] + '">' + that.formatNumber(informations[0]) + '</span>');
		$('#cookie_monster_tc_'   + key).html('<span class="text-' + colors[1] + '">' + that.formatTime(informations[1], true) + '</span>');
	});
};