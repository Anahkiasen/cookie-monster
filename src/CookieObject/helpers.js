//////////////////////////////////////////////////////////////////////
//////////////////////////////// GLOBAL //////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the identifier of an object
 *
 * @return {Integer}
 */
CookieObject.identifier = function() {
	return 'cookie-monster__'+this.getType()+'--'+this.id;
};

/**
 * Check if an object matches against a piece of text
 *
 * @param {String} matcher
 *
 * @return {Boolean}
 */
CookieObject.matches = function(matcher) {
	if (!this.desc) {
		return false;
	}

	return this.desc.toLowerCase().indexOf(matcher.toLowerCase()) !== -1;
};

/**
 * Get the integer mentionned in a description
 *
 * @return {Integer}
 */
CookieObject.getDescribedInteger = function() {
	if (!this.matches('<b>')) {
		return;
	}

	return this.desc.match(/<b>\+?([\.0-9]+)%?/)[1].replace(/[%,]/g, '') * 1;
};

/**
 * Checks if the object can be bought
 *
 * @return {Boolean}
 */
CookieObject.buyable = function() {
	return this.getPrice() <= Game.cookies;
};

/**
 * Checks if an upgrade is in store
 *
 * @return {Boolean}
 */
CookieObject.isInStore = function() {
	return Game.UpgradesInStore.indexOf(this) !== -1;
};

//////////////////////////////////////////////////////////////////////
/////////////////////////////// BUILDINGS ////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Toggle bought state of a building
 *
 * @param {Boolean} buyOrReverse Buy or reverse
 *
 * @return {void}
 */
CookieObject.simulateBuildingToggle = function(buyOrReverse) {
	if (buyOrReverse) {
		this.amount++;
		this.bought++;
		if (this.buyFunction) {
			this.buyFunction();
		}
	} else {
		this.amount--;
		this.bought--;
		if (this.sellFunction) {
			this.sellFunction();
		}
	}
};

//////////////////////////////////////////////////////////////////////
////////////////////////////// UPGRADES //////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Toggle bought state of an upgrade
 *
 * @param {Boolean} buyOrReverse Buy or reverse
 *
 * @return {void}
 */
CookieObject.simulateUpgradeToggle = function(buyOrReverse) {
	if (buyOrReverse) {
		this.bought = 1;
		if (this.buyFunction) {
			this.buyFunction();
		}
		if (this.hide !== 3) {
			Game.UpgradesOwned++;
		}
	} else {
		this.bought = 0;
		if (this.hide !== 3) {
			Game.UpgradesOwned--;
		}
	}
};

/**
 * Checks if an upgrade is clicking related or not
 *
 * @return {Boolean}
 */
CookieObject.isClickingRelated = function() {
	return this.matches('Clicking') || this.matches('The mouse');
};