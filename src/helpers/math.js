/**
 * Format a number to a string (adds separators, convert units, etc)
 *
 * @param {String|Integer} number
 *
 * @return {String}
 */
CookieMonster.formatNumber = function(number) {
	return this.toHumanNumber(number, false).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Rounds a number and format it to string
 *
 * @param {String|Integer} number
 *
 * @return {String}
 */
CookieMonster.formatNumberB = function(number) {
	return this.toHumanNumber(number, true).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Formats a raw number to an human-readable one
 *
 * @param {Integer} number
 * @param {Boolean} round
 *
 * @return {Integer|String}
 */
CookieMonster.toHumanNumber = function(number, round) {
	var shortNumbers = this.settings[7] - 1;

	if (shortNumbers > -1) {
		var r = 1e33;
		for (var i = this.humanNumbers[shortNumbers].length - 1; i >= 0; i--) {
			var s = (number / r % 999).toFixed(3);
			if (s >= 1) {
				return s + this.humanNumbers[shortNumbers][i];
			}
			r /= 1e3;
		}
	}

	// Round the number off
	// Else we'll return the number rounded off to nearest decimal
	if (round) {
		return Math.round(number);
	}

	return Math.round(number * 100) / 100;
};