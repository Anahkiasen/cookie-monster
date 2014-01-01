/**
 * Compute how much buying an upgrade/building would earn in
 * additional achievements and bonus
 *
 * This is probably the worst method of all of CM so, you know, behold
 *
 * @param {Integer} unlocked
 * @param {Integer} upgradeKey
 * @param {Integer} originalIncome
 * @param {Nope}    customHeavenlyMultiplier
 *
 * @return {Integer}
 */
CookieMonster.getAchievementWorth = function(unlocked, upgradeKey, originalIncome, customHeavenlyMultiplier) {
	var income             = 0;
	var heavenlyMultiplier = this.getHeavenlyMultiplier();
	var futureMultiplier   = 0;
	var milkProgress       = Game.milkProgress;
	var frenzyMultiplier   = this.getFrenzyMultiplier();
	var number;

	// Swap out heavenly multiplier
	if (typeof customHeavenlyMultiplier === 'undefined') {
		customHeavenlyMultiplier = 0;
	}
	if (customHeavenlyMultiplier !== 0) {
		heavenlyMultiplier = customHeavenlyMultiplier;
	}

	// Loop over the available upgrades and compute the available
	// production multipliers
	Game.UpgradesById.forEach(function (upgrade) {
		var description = upgrade.desc.replace('[Research]<br>', '');
		if (upgrade.bought && description.indexOf('Cookie production multiplier <b>+') !== -1) {
			heavenlyMultiplier += description.substr(33, description.indexOf('%', 33) - 33) * 1;
		}
		if (upgrade.id === upgradeKey && upgrade && !upgrade.bought && description.indexOf('Cookie production multiplier <b>+') !== -1) {
			futureMultiplier += description.substr(33, description.indexOf('%', 33) - 33) * 1;
		}
	});

	number = 100 + heavenlyMultiplier;
	number = this.applyMilkPotential(number, milkProgress);
	var h = (Game.cookiesPs + originalIncome) / Game.globalCpsMult * (number / 100) * frenzyMultiplier;

	milkProgress += unlocked * 0.04;
	number = 100 + heavenlyMultiplier + futureMultiplier;
	number = this.applyMilkPotential(number, milkProgress);
	var thisPotential = this.milkPotentials[Game.UpgradesById[upgradeKey].name] || 0;
	number = number * (1 + thisPotential * milkProgress);
	income = (Game.cookiesPs + originalIncome) / Game.globalCpsMult * (number / 100) * frenzyMultiplier - h;
	var d = this.inc(income + h);

	if (d > 0) {
		milkProgress += d * 0.04;
		number = 100 + heavenlyMultiplier + futureMultiplier;
		number = this.applyMilkPotential(number, milkProgress);
		number = number * (1 + thisPotential * milkProgress);

		income = (Game.cookiesPs + originalIncome) / Game.globalCpsMult * (number / 100) * frenzyMultiplier - h;
	}

	// If custom multiplier, reapply... something
	if (customHeavenlyMultiplier !== 0) {
		income += h;
	}

	// Add Elder Covenant modifier
	if (Game.Has('Elder Covenant')) {
		income *= 0.95;
	}

	return income;
};

/**
 * Apply milk potential to a number
 *
 * @param {Integer} number
 * @param {Integer} milkProgress
 *
 * @return {Integer}
 */
CookieMonster.applyMilkPotential = function(number, milkProgress) {
	if (typeof milkProgress === 'undefined') {
		milkProgress = Game.milkProgress;
	}

	// Compute current potentials
	var milkUpgrades = [];
	for (var potential in this.milkPotentials) {
		milkUpgrades.push(Game.Has(potential) * this.milkPotentials[potential]);
	}

	// Apply potentials
	milkUpgrades.forEach(function(modifier) {
		number = number * (1 + modifier * milkProgress);
	});

	return number;
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Check if the user has won an achievement
 *
 * @param {String} checkedAchievement
 *
 * @return {Boolean}
 */
CookieMonster.hasAchievement = function(checkedAchievement) {
	var achievement = Game.Achievements[checkedAchievement];

	return achievement ? achievement.won : false;
};

/**
 * Check if the user hasn't won an achievement
 *
 * @param {string} checkedAchievement
 *
 * @return {Boolean}
 */
CookieMonster.hasntAchievement = function(checkedAchievement) {
	return !this.hasAchievement(checkedAchievement);
};

//////////////////////////////////////////////////////////////////////
//////////////////////////// BUILDING SCHEMAS ////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Check if a given building would unlock an amount-related achievement when bought
 *
 * @param {Object} building
 *
 * @return {Boolean}
 */
CookieMonster.buildingAmount = function(building) {
	var upgrades = {
		'Cursor': {
			0   : 'Click',
			1   : 'Double-click',
			49  : 'Mouse wheel',
			99  : 'Of Mice and Men',
			199 : 'The Digital',
		},
		'Grandma': {
			0   : 'Grandma\'s Cookies',
			49  : 'Sloppy kisses',
			99  : 'Retirement home',
			149 : 'Friend of the ancients',
			199 : 'Ruler of the ancients',
		},
		'Farm': {
			0  : 'My first farm',
			49 : 'Reap what you sow',
			99 : 'Farm ill',
		},
		'Factory': {
			0  : 'Production chain',
			49 : 'Industrial revolution',
			99 : 'Global warming',
		},
		'Mine': {
			0  : 'You know the drill',
			49 : 'Excavation site',
			99 : 'Hollow the planet',
		},
		'Shipment': {
			0  : 'Expedition',
			49 : 'Galactic highway',
			99 : 'Far far away',
		},
		'Alchemy lab': {
			0  : 'Transmutation',
			49 : 'Transmogrification',
			99 : 'Gold member',
		},
		'Portal': {
			0  : 'A whole new world',
			49 : 'Now you\'re thinking',
			99 : 'Dimensional shift',
		},
		'Time machine': {
			0  : 'Time warp',
			49 : 'Alternate timeline',
			99 : 'Rewriting history',
		},
		'Antimatter condenser': {
			0  : 'Antibatter',
			49 : 'Quirky quarks',
			99 : 'It does matter!',
		}
	};

	// Get unlocked achievements by amount of that building
	var achievement = upgrades[building.name][building.amount];
	if (achievement) {
		return this.hasntAchievement(achievement);
	}

	return false;
};

/**
 * Check if a given building would unlock Base 10 when bought
 *
 * @param {String} checkedBuilding
 *
 * @return {Boolean}
 */
CookieMonster.baseTen = function(checkedBuilding) {
	if (this.hasAchievement('Base 10')) {
		return false;
	}

	var names   = [];
	var amounts = [];
	Game.ObjectsById.forEach(function (building) {
		names.push(building.name);
		amounts.push(building.amount);
	});
	names.forEach(function (names, key) {
		if (names === checkedBuilding) {
			amounts[key]++;
		}
	});

	var base = amounts.length * 10;
	for (var i = 0; i < amounts.length; i++) {
		if (amounts[i] < base || amounts[i] > base) {
			return false;
		}
		base -= 10;
	}

	return true;
};

/**
 * Check if a given building would unlock Mathematician when bought
 *
 * @param {String} checkedBuilding
 *
 * @return {Boolean}
 */
CookieMonster.mathematician = function(checkedBuilding) {
	if (this.hasAchievement('Mathematician')) {
		return false;
	}

	var names   = [];
	var amounts = [];
	Game.ObjectsById.forEach(function (building) {
		names.push(building.name);
		amounts.push(building.amount);
	});
	names.forEach(function (name, key) {
		if (name === checkedBuilding) {
			amounts[key]++;
		}
	});

	var base = 128;
	for (var i = 0; i < amounts.length; i++) {
		if (i > 2) {
			base = base / 2;
		}
		if (amounts[i] < base) {
			return false;
		}
	}

	return true;
};

/**
 * Check if a given building would unlock OWE when bought
 *
 * @param {String} checkedBuilding
 *
 * @return {Boolean}
 */
CookieMonster.oneWithEverything = function(checkedBuilding) {
	if (this.hasAchievement('One with everything')) {
		return false;
	}

	return this.checkBuildingUnifiesAmounts(0, checkedBuilding);
};

/**
 * Check if a given building would unlock Centennial when bought
 *
 * @param {String} checkedBuilding
 *
 * @return {Boolean}
 */
CookieMonster.centennial = function(checkedBuilding) {
	if (this.hasAchievement('Centennial')) {
		return false;
	}

	return this.checkBuildingUnifiesAmounts(99, checkedBuilding);
};

/**
 * Checks whether buying a certain building would
 * bring all amounts to the same level
 *
 * @param {Integer} amount
 * @param {String}  checkedBuilding
 *
 * @return {Boolean}
 */
CookieMonster.checkBuildingUnifiesAmounts = function(amount, checkedBuilding) {
	var todo = [];
	Game.ObjectsById.forEach(function (building) {
		if (building.amount === amount) {
			todo.push(building.name);
		}
	});

	if (todo.length === 1 && todo[0] === checkedBuilding) {
		return true;
	}

	return false;
};