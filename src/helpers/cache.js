/**
 * Cache the results of a Closure and return it
 *
 * @param {Array}    salts
 * @param {Function} callback
 * @param {Array}    args
 *
 * @return {Mixed}
 */
CookieMonster.cache = function(salts, callback, args) {
	args  = args || [];
	salts = salts.concat(args).concat([Game.UpgradesOwned, Game.BuildingsOwned]).join('-');

	// If we have a cached result, return it
	if (typeof this.cacheStore[salts] !== 'undefined') {
		return this.cacheStore[salts];
	}

	// Else compute results and cache it
	this.cacheStore[salts] = callback.apply(this, args);

	return this.cacheStore[salts];
};

/**
 * Call a Cookie Monster method and cache it
 *
 * @param {String} method
 * @param {Array} args
 * @param {Array} salts
 *
 * @return {Mixed}
 */
CookieMonster.callCached = function(method, args, salts) {
	salts = salts || [];
	salts.push(method);

	return this.cache(salts, this[method], args);
};

/**
 * Refresh the cache
 *
 * @return {void}
 */
CookieMonster.refreshCache = function() {
	this.cacheStore = {};
};