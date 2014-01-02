//////////////////////////////////////////////////////////////////////
/////////////////////////////// TRUE WORTH ///////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Compute how much buying an upgrade/building would earn in
 * additional achievements and bonus
 *
 * This is probably the *worst* method of all of CM so, you know,
 * HERE BE MOTHERFUCKING DRAGONS
 *
 *                                                  /===-_---~~~~~~~~~------____
 *                                                 |===-~___                _,-'
 *                  -==\\                         `//~\\   ~~~~`---.___.-~~
 *              ______-==|                         | |  \\           _-~`
 *        __--~~~  ,-/-==\\                        | |   `\        ,'
 *     _-~       /'    |  \\                      / /      \      /
 *   .'        /       |   \\                   /' /        \   /'
 *  /  ____  /         |    \`\.__/-~~ ~ \ _ _/'  /          \/'
 * /-'~    ~~~~~---__  |     ~-/~         ( )   /'        _--~`
 *                   \_|      /        _)   ;  ),   __--~~
 *                     '~~--_/      _-~/-  / \   '-~ \
 *                    {\__--_/}    / \\_>- )<__\      \
 *                    /'   (_/  _-~  | |__>--<__|      |
 *                   |0  0 _/) )-~     | |__>--<__|     |
 *                   / /~ ,_/       / /__>---<__/      |
 *                  o o _ *        /-~_>---<__-~      /
 *                  (^(~          /~_>---<__-      _-~
 *                 ,/|           /__>--<__/     _-~
 *              ,//('(          |__>--<__|     /                  .----_
 *             ( ( '))          |__>--<__|    |                 /' _---_~\
 *          `-)) )) (           |__>--<__|    |               /'  /     ~\`\
 *         ,/,'//( (             \__>--<__\    \            /'   *        ||
 *       ,( ( ((, ))              ~-__>--<_~-_  ~--____---~' _/'/        /'
 *     `~/  )` ) ,/|                 ~-_~>--<_/-__       __-~ _/
 *   ._-~//( )/ )) `                    ~~-'_/_/ /~~~~~~~__--~
 *    ;'( ')/ ,)(                              ~~~~~~~~~~
 *   ' ') '( (/
 *     '   '  `
 *
 * @param {Integer} unlocked
 * @param {Integer} upgradeKey
 * @param {Integer} originalIncome
 * @param {Nope}    customMultiplier
 *
 * @return {Integer}
 */
CookieMonster.getAchievementWorth = function(unlocked, upgradeKey, originalIncome, customMultiplier) {
	var income           = 0;
	var baseMultiplier   = this.getHeavenlyMultiplier();
	var futureMultiplier = 0;
	var milkProgress     = Game.milkProgress;
	var multiplier;

	// Swap out heavenly multiplier
	if (typeof customMultiplier === 'undefined') {
		customMultiplier = 0;
	}
	if (customMultiplier !== 0) {
		baseMultiplier = customMultiplier;
	}

	// Loop over the available upgrades and compute the available
	// production multipliers, plus a potential new one unlocked
	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.matches('Cookie production multiplier <b>+')) {
			baseMultiplier += upgrade.getDescribedInteger();
		}
		if (upgrade.id === upgradeKey && upgrade && !upgrade.bought && upgrade.matches('Cookie production multiplier <b>+')) {
			futureMultiplier += upgrade.getDescribedInteger();
		}
	});

	// Compute a first project income, applying all multipliers to it
	multiplier = this.applyMilkPotential(baseMultiplier, milkProgress);
	var projectedIncome = this.computeNewIncome(originalIncome, multiplier);

	// Then we check if the provided upgrade is an Heavenly Upgrade
	var newPotential = Game.UpgradesById[upgradeKey].name;
	baseMultiplier    += futureMultiplier;

	// First we increment the milk with the newly unlocked achievements
	// Then we apply all potentials, plus new one, to the multiplier
	// And from there we redo an income projection
	milkProgress += unlocked * 0.04;
	multiplier   = this.applyMilkPotential(baseMultiplier, milkProgress, newPotential);
	income       = this.computeNewIncome(originalIncome, multiplier);

	// Now we check if this new projected income would unlock
	// any "Bake X cookies/s achievements"
	unlocked = this.getUnlockedIncomeAchievements(income);

	// If our new income would unlock achievements, compute their milk bonus
	// And redo the whole routine to do a THIRD projected income (yes)
	if (unlocked > 0) {
		milkProgress += unlocked * 0.04;
		multiplier   = this.applyMilkPotential(baseMultiplier, milkProgress, newPotential);
		income       = this.computeNewIncome(originalIncome, multiplier);
	}

	// Finally deduce our original prevision from the result
	if (customMultiplier === 0) {
		income -= projectedIncome;
	}

	// And apply the covenant deduction if necessary
	if (Game.Has('Elder Covenant')) {
		income *= 0.95;
	}

	return income;
};

/**
 * Apply a differential of multiplier to an income
 *
 * @param {Integer} income
 * @param {Integer} multiplier
 *
 * @return {Integer}
 */
CookieMonster.computeNewIncome = function(income, multiplier) {
	return (Game.cookiesPs + income) / Game.globalCpsMult * (multiplier / 100) * this.getFrenzyMultiplier();
};

/**
 * Returns how many cookies/s-related achievements would be unlocked for a given income
 *
 * @param {Integer} cookiesPs
 *
 * @return {Integer}
 */
CookieMonster.getUnlockedIncomeAchievements = function(cookiesPs) {
	var unlocked = 0;

	// Cancel if we're during a frenzy
	if (Game.frenzyPower) {
		return 0;
	}

	// Gather the number of achievements that would be unlocked
	Game.AchievementsById.forEach(function (achievement) {
		if (!achievement.won && achievement.matches(' per second.')) {
			if (cookiesPs >= achievement.getDescribedInteger()) {
				unlocked++;
			}
		}
	});

	return unlocked;
};

/**
 * Apply milk potential to a multiplier, optionally specifying
 * a future potential to be unlocked
 *
 * @param {Integer} multiplier
 * @param {Integer} milkProgress
 * @param {String}  futurePotential
 *
 * @return {Integer}
 */
CookieMonster.applyMilkPotential = function(multiplier, milkProgress, futurePotential) {
	if (typeof milkProgress === 'undefined') {
		milkProgress = Game.milkProgress;
	}

	// Compute current potentials
	var milkUpgrades = [];
	for (var potential in this.milkPotentials) {
		var hasPotential = Game.Has(potential) || potential === futurePotential;
		milkUpgrades.push(hasPotential * this.milkPotentials[potential]);
	}

	// Apply potentials
	multiplier += 100;
	milkUpgrades.forEach(function(modifier) {
		multiplier = multiplier * (1 + modifier * milkProgress);
	});

	return multiplier;
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