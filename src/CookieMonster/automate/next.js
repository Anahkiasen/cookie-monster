/**
 * Get the next best building to buy
 *
 * @return {Object}
 */
CookieMonster.Automate.getNextBestBuilding = function() {
	return this.getNextBest(Game.ObjectsById);
};

/**
 * Get the next best upgrade to buy
 *
 * @return {Upgrade}
 */
CookieMonster.Automate.getNextBestUpgrade = function() {
	return this.getNextBest(Game.UpgradesInStore, function(upgrade) {
		return !upgrade.bought && upgrade.unlocked;
	});
};

/**
 * Get the best next item to buy
 *
 * @return {Void}
 */
CookieMonster.Automate.getNextBestItem = function() {
	var building = this.getNextBestBuilding();
	var upgrade  = this.getNextBestUpgrade();

	return building[this.index]() > upgrade[this.index]() ? building : upgrade;
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the next best of something
 *
 * @param {Array}   objects
 * @param {Closure} additional
 *
 * @return {Object}
 */
CookieMonster.Automate.getNextBest = function(objects, additional) {
	var index = this.index;
	var best  = objects[0];

	// Define additional
	if (typeof additional === 'undefined') {
		additional = function() {
			return true;
		};
	}

	// Loop over object and increment the best one
	objects.forEach(function(object) {
		var objectIndex = object[index]();

		if (
			objectIndex !== Infinity &&
			(objectIndex < best[index]() && object.buyable() || CookieMonster.Automate.priority.indexOf(object.name) !== -1) &&
			additional(object)) {
			best = object;
		}
	});

	// Confirm item if good color
	var color = best.getColors()[0];
	if (best.getColors()[2] === 'cyan' || color === 'blue' || color === 'green' || color === 'greyLight') {
		return best;
	}

	return false;
};