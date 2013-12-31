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
	return [Math[minOrMax].apply(Math, this.informations.cpi), Math[minOrMax].apply(Math, this.informations.timeLeft)];
};

/**
 * Update the stored informations about a building
 *
 * @param {Integer} building
 * @param {Array}   informations
 */
CookieMonster.setBuildingInformations = function (building, informations) {
	this.informations.items[building]    = informations.items;
	this.informations.bonus[building]    = informations.bonus;
	this.informations.cpi[building]      = informations.cpi;
	this.informations.timeLeft[building] = informations.timeLeft;

	// Compute formatted informations
	var colors = this.getLuckyColors([informations.cpi, informations.timeLeft]);
	this.bottomBar.items[building]    = informations.items;
	this.bottomBar.bonus[building]    = this.formatNumber(informations.bonus);
	this.bottomBar.cpi[building]      = '<span class="text-' +colors[0]+ '">' +this.formatNumber(informations.cpi)+ '</span>';
	this.bottomBar.timeLeft[building] = '<span class="text-' +colors[1]+ '">' +this.formatTime(informations.timeLeft, true)+ '</span>';
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
	this.$monsterBar = $('#cookie-monster__bottom-bar');

	this.makeTable();
};

/**
 * Create the Bottom Bar
 *
 * @return {void}
 */
CookieMonster.makeTable = function() {
	var thead    = '<th class="text-yellow"> ' + this.version + '</th>';
	var bonus    = '<th class="text-blue">Bonus Income</th>';
	var baseCost = '<th class="text-blue">Base Cost Per Income</th>';
	var timeLeft = '<th class="text-blue">Time Left</th>';

	return this.$monsterBar.html(
		'<table>'+
			'<tr>'+thead+'<th>' +this.bottomBar.items.join('</th><th>')+ '</th></tr>'+
			'<tr>'+bonus+'<td>' +this.bottomBar.bonus.join('</td><td>')+ '</td></tr>'+
			'<tr>'+baseCost+'<td>' +this.bottomBar.cpi.join('</td><td>')+ '</td></tr>'+
			'<tr>'+timeLeft+'<td>' +this.bottomBar.timeLeft.join('</td><td>')+ '</td></tr>'+
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

		// Compute informations
		var bonus    = that.roundDecimal(that.getBuildingWorth(building));
		var cpi      = that.roundDecimal(building.price / bonus);
		var count    = '(<span class="text-blue">' +building.amount+ '</span>)';
		var timeLeft = Math.round(that.secondsLeft(key, 'object'));

		// Save building informations
		that.setBuildingInformations(key, {
			items    : building.name.split(' ')[0] + ' ' + count,
			bonus    : bonus,
			cpi      : cpi,
			timeLeft : timeLeft,
		});
	});

	this.makeTable();
};