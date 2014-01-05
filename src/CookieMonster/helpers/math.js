/**
 * Rounds a number and format it to string
 *
 * @param {String|Integer} number
 *
 * @return {String}
 */
CookieMonster.formatNumberRounded = function(number) {
	return this.formatNumber(number, true);
};

/**
 * Formats a raw number to an human-readable one
 *
 * @param {Integer} number
 * @param {Boolean} round
 *
 * @return {Integer|String}
 */
CookieMonster.formatNumber = function(number, round) {
	var shortNumbers = this.getSetting('ShortNumbers') - 1;
	var qualifier    = number < 0 ? '-' : '';

	// Human formatting
	number = Math.abs(number);
	if (shortNumbers > -1) {
		var divider = 1e33;
		for (var i = this.humanNumbers[shortNumbers].length - 1; i >= 0; i--) {
			var formattedNumber = (number / divider % 999).toFixed(3);
			if (formattedNumber >= 1) {
				return qualifier + formattedNumber + this.humanNumbers[shortNumbers][i];
			}
			divider /= 1e3;
		}
	}

	// Round the number off
	// Else we'll return the number rounded off to nearest decimal
	number = round ? number.round() : number.roundDecimal();
	number = qualifier + number;

	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};