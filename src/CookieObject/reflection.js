//////////////////////////////////////////////////////////////////////
////////////////////////////// REFLECTIONS ///////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the price of an object
 *
 * @return {Integer}
 */
CookieObject.getPriceOf = function() {
	return this instanceof Game.Upgrade ? this.basePrice : this.price;
};

/**
 * Get the type of an object
 *
 * @return {String}
 */
CookieObject.getTypeOf = function() {
	return this instanceof Game.Upgrade ? 'upgrade' : 'object';
};