/**
 * Rounds the current number
 *
 * @return {Integer}
 */
Number.prototype.round = function() {
	return Math.round(this);
};

/**
 * Rounds up to nearest decimal
 *
 * @return {Integer}
 */
Number.prototype.roundDecimal = function() {
	return Math.roundDecimal(this);
};