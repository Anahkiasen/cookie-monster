/**
 * Get the additional CPS an upgrade will bring
 *
 * @param {Object} upgrade
 *
 * @return {Integer}
 */
CookieMonster.getUpgradeWorth = function(upgrade) {
	var income   = 0;
	var unlocked = 0;

	// Standard bulding upgrades
	var buildingUpgrades = ['Cursors', 'Grandmas', 'Farms', 'Factories', 'Mines', 'Shipments', 'Alchemy labs', 'Portals', 'Time machines', 'Antimatter condensers'];
	buildingUpgrades.forEach(function(building, key) {
		if (CookieMonster.matches(upgrade, building+' are <b>')) {
			income = CookieMonster.getBuildingUpgradeOutcome(key);
		}
	});

	// CPS building upgrades
	var gainsUpgrades = [
		{building: 'Cursors',               modifier: 0.1},
		{building: 'Grandmas',              modifier: 0.3},
		{building: 'Farms',                 modifier: 0.5},
		{building: 'Factories',             modifier: 4},
		{building: 'Mines',                 modifier: 10},
		{building: 'Shipments',             modifier: 30},
		{building: 'Alchemy labs',          modifier: 100},
		{building: 'Portals',               modifier: 1666},
		{building: 'Time machines',         modifier: 9876},
		{building: 'Antimatter condensers', modifier: 99999},
	];
	gainsUpgrades.forEach(function(gainUpgrade, key) {
		if (CookieMonster.matches(upgrade, gainUpgrade.building+' gain <b>')) {
			income = CookieMonster.getMultiplierOutcome(gainUpgrade.building, gainUpgrade.modifier, key);
		}
	});

	// Heavenly upgrades
	if (this.matches(upgrade, 'potential of your heavenly')) {
		income = this.getHeavenlyUpgradeOutcome(unlocked, upgrade);
		if (upgrade.name === 'Heavenly key') {
			unlocked += this.hasntAchievement('Wholesome');
		}
	}

	// Building counts
	if (Game.UpgradesOwned === 19) {
		unlocked += this.hasntAchievement('Enhancer');
	}
	if (Game.UpgradesOwned === 49) {
		unlocked += this.hasntAchievement('Augmenter');
	}
	if (Game.UpgradesOwned === 99) {
		unlocked += this.hasntAchievement('Upgrader');
	}

	// Achievements
	income += this.getAchievementWorth(unlocked, upgrade.id, income, 0);

	return income;
};

/**
 * Check if an upgrade matches against a piece of text
 *
 * @param {Object} upgrade
 * @param {String} matcher
 *
 * @return {Boolean}
 */
CookieMonster.matches = function(upgrade, matcher) {
	matcher = matcher.toLowerCase();

	return upgrade.desc.toLowerCase().indexOf(matcher) !== -1 || upgrade.name.toLowerCase().indexOf(matcher) !== -1;
};

//////////////////////////////////////////////////////////////////////
///////////////////////////// UPGRADES WORTH /////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the outcome of a building upgrade
 *
 * @param {Integer} buildingKey
 *
 * @return {Integer}
 */
CookieMonster.getBuildingUpgradeOutcome = function(buildingKey) {
	return Game.ObjectsById[buildingKey].storedTotalCps * Game.globalCpsMult;
};

/**
 * Get how much a given multiplier would impact the current CPS for a type of building
 *
 * @param {String}  building
 * @param {Integer} baseMultiplier
 * @param {Integer} buildingKey
 *
 * @return {Integer}
 */
CookieMonster.getMultiplierOutcome = function(building, baseMultiplier, buildingKey) {
	var multiplier = 1;

	// Gather current multipliers
	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.toLowerCase().indexOf(building + ' are <b>twice</b>') !== -1) {
			multiplier = multiplier * 2;
		}
		if (upgrade.bought && upgrade.desc.toLowerCase().indexOf(building + ' are <b>4 times</b>') !== -1) {
			multiplier = multiplier * 4;
		}
	});

	return Game.ObjectsById[buildingKey].amount * multiplier * baseMultiplier * Game.globalCpsMult;
};

/**
 * Get the output of an Heavenly Chips upgrade
 *
 * @param {Integer} unlocked
 * @param {Object}  upgrade
 *
 * @return {Integer}
 */
CookieMonster.getHeavenlyUpgradeOutcome = function(unlocked, upgrade) {
	var potential = upgrade.desc.substr(11, 2).replace('%', '');

	var u = this.getAchievementWorth(unlocked, upgrade.id, 0, Game.prestige['Heavenly chips'] * 2 * (potential / 100));

	return u - Game.cookiesPs;
};