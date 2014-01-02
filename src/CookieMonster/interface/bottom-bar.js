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
			'<tr>'+baseCost+'<td>' +this.bottomBar.bci.join('</td><td>')+ '</td></tr>'+
			'<tr>'+timeLeft+'<td>' +this.bottomBar.timeLeft.join('</td><td>')+ '</td></tr>'+
		'</table>');
};

/**
 * Update the contents of the Bottom Bar
 *
 * @return {void}
 */
CookieMonster.updateTable = function() {
	this.updateBuildingsInformations();
	this.makeTable();
};