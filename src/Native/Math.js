/**
 * Compute the sum of various integers
 *
 * @return {Integer}
 */
Math.sum = function() {
	var sum = 0;

	for (var i = 0; i < arguments.length; i++) {
		sum += arguments[i];
	}

	return sum;
};

/**
 * Compute the average of various integers
 *
 * @return {Integer}
 */
Math.average = function() {
	return this.sum.apply(this, arguments) / arguments.length;
};

/**
 * Round a number to nearest decimal
 *
 * @param {Integer} number
 *
 * @return {Integer}
 */
Math.roundDecimal = function(number) {
	return Math.round(number * 100) / 100;
};