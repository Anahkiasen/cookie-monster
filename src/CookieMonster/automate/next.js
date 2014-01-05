/**
 * Get the next best building to buy
 *
 * @return {Object}
 */
CookieMonster.getNextBestBuilding = function() {
	var best = Game.ObjectsById[0];
	Game.ObjectsById.forEach(function(building) {
		if (building.getWorth() > best.getWorth()) {
			best = building;
		}
	});

	return best;
};

/**
 * Get the next best upgrade to buy
 *
 * @return {Upgrade}
 */
CookieMonster.getNextBestUpgrade = function() {
	var best = Game.UpgradesById[0];
	Game.UpgradesInStore.forEach(function(upgrade) {
		if (upgrade.getWorth() > best.getWorth()) {
			best = upgrade;
		}
	});

	return best;
};

/**
 * Get the best next item to buy
 *
 * @return {Void}
 */
CookieMonster.getNextBestItem = function() {
	var building = this.getNextBestBuilding();
	var upgrade  = this.getNextBestUpgrade();

	return building.getWorth() > upgrade.getWorth() ? building : upgrade;
};