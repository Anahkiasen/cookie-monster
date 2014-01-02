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
	var state = [Game.UpgradesOwned, Game.BuildingsOwned, Game.globalCpsMult].join('-');

	// Create entry for current state
	if (typeof this.cacheStore[state] === 'undefined') {
		this.refreshCache();
		this.cacheStore[state] = {};
	}

	// Compute salts
	args  = args || [];
	salts = this.computeSalts(salts, args);

	// If we have a cached result, return it
	if (typeof this.cacheStore[state][salts] !== 'undefined') {
		return this.cacheStore[state][salts];
	}

	// Else compute results and cache it
	var result = callback.apply(this, args);
	this.cacheStore[state][salts] = result;

	return result;
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

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Compute salts from arguments an salts
 *
 * @param {Array} salts
 * @param {Array} args
 *
 * @return {String}
 */
CookieMonster.computeSalts = function(salts, args) {
	salts = salts.concat(args);

	// Get the objects identifiers as salt
	for (var i = 0; i < salts.length; i++) {
		if (typeof salts[i].identifier !== 'undefined') {
			salts[i] = salts[i].identifier();
		}
	}

	return salts.join('-');
};
