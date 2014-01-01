//////////////////////////////////////////////////////////////////////
///////////////////////////// INFORMATIONS ///////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get an array with the min/max CPI/timeLeft
 *
 * @param {String} minOrMax
 *
 * @return {Array}
 */
CookieMonster.getBestValue = function(minOrMax) {
	return [
		Math[minOrMax].apply(Math, this.informations.cpi),
		Math[minOrMax].apply(Math, this.informations.timeLeft),
		Math[minOrMax].apply(Math, this.informations.roi)
	];
};

/**
 * Update the stored informations about a building
 *
 * @param {Integer} building
 * @param {Array}   informations
 */
CookieMonster.setBuildingInformations = function (building, informations) {
	this.informations.items[building]    = informations.items;
	this.informations.bonus[building]    = informations.bonus;
	this.informations.cpi[building]      = informations.cpi;
	this.informations.roi[building]      = informations.roi;
	this.informations.timeLeft[building] = informations.timeLeft;

	// Compute formatted informations
	var colors = this.computeColorCoding([informations.cpi, informations.timeLeft]);
	this.bottomBar.items[building]    = informations.items;
	this.bottomBar.bonus[building]    = this.formatNumber(informations.bonus);
	this.bottomBar.cpi[building]      = '<span class="text-' +colors[0]+ '">' +this.formatNumber(informations.cpi)+ '</span>';
	this.bottomBar.timeLeft[building] = '<span class="text-' +colors[1]+ '">' +this.formatTime(informations.timeLeft, true)+ '</span>';
};

/**
 * Update all of the building's informations in memory
 *
 * @return {void}
 */
CookieMonster.updateBuildingsInformations = function() {
	var that = this;

	// Here we loop over the information we have, and building a multidimensionnal
	// array of it, by building key
	Game.ObjectsById.forEach(function (building, key) {

		// Compute informations
		var bonus    = that.roundDecimal(that.getBuildingWorth(building));
		var cpi      = that.roundDecimal(building.price / bonus);
		var count    = '(<span class="text-blue">' +building.amount+ '</span>)';
		var profit   = building.price * (bonus + Game.cookiesPs) / bonus;
		var timeLeft = Math.round(that.secondsLeft(key, 'object'));

		// Save building informations
		that.setBuildingInformations(key, {
			items    : building.name.split(' ')[0] + ' ' + count,
			bonus    : bonus,
			cpi      : cpi,
			roi      : profit,
			timeLeft : timeLeft,
		});
	});
};

//////////////////////////////////////////////////////////////////////
/////////////////////////////// TRUE WORTH ///////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get how much buying one of a building would earn
 *
 * @param {Object} building
 *
 * @return {Integer}
 */
CookieMonster.getBuildingWorth = function(building) {
	var income     = 0;
	var unlocked   = 0;
	var production = building.storedCps * Game.globalCpsMult;

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
		unlocked += this.hasntAchievement(achievement);
	}

	// Add cursor modifiers
	switch (building.name) {
		case 'Grandma':
		case 'Farm':
		case 'Factory':
		case 'Mine':
		case 'Shipment':
		case 'Alchemy lab':
		case 'Portal':
		case 'Time machine':
		case 'Antimatter condenser':
		case 'Grandma':
			income += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case 'Grandma':
			income += this.getTotalGrandmaModifiers(building.amount) * Game.globalCpsMult;
			break;
		case 'Portal':
			income += this.getTotalPortalModifiers() * Game.globalCpsMult;
			break;
	}

	// Get unlocked achievements by number of buildings
	if (Game.BuildingsOwned === 99) {
		unlocked += this.hasntAchievement('Builder');
	}
	if (Game.BuildingsOwned === 399) {
		unlocked += this.hasntAchievement('Architect');
	}
	if (Game.BuildingsOwned === 799) {
		unlocked += this.hasntAchievement('Engineer');
	}

	// Get unlocked achievements by building schemas
	if (this.oneWithEverything(building.name)) {
		unlocked++;
	}
	if (this.mathematician(building.name)) {
		unlocked++;
	}
	if (this.baseTen(building.name)) {
		unlocked++;
	}
	if (this.centennial(building.name)) {
		unlocked++;
	}

	// Compute final income
	income += production;

	return income + this.callCached('getAchievementWorth', [unlocked, 0, income]);
};

//////////////////////////////////////////////////////////////////////
/////////////////////////////// MODIFIERS ////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the cursor modifiers
 *
 * @return {Integer}
 */
CookieMonster.getTotalCursorModifiers = function() {
	var modifier = 0;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf('The mouse and cursors gain') !== -1) {
			var r = 31;
			if (upgrade.desc.indexOf(' another ') !== -1) {
				r += 8;
			}
			modifier += upgrade.desc.substr(r, upgrade.desc.indexOf('<', r) - r) * 1;
		}
	});

	return modifier * Game.ObjectsById[0].amount;
};

/**
 * Get the various Grandma modifiers
 *
 * @param {Integer} currentNumber
 *
 * @return {Integer}
 */
CookieMonster.getTotalGrandmaModifiers = function(currentNumber) {
	var cookiesPs = 0.5;
	var amount    = 0;
	var modifiers = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.name === 'Forwards from grandma') {
			cookiesPs += 0.3;
		}
		else if (upgrade.bought && upgrade.desc.indexOf('Grandmas are <b>twice</b>.') !== -1) {
			modifiers *= 2;
		}
		else if (upgrade.bought && upgrade.desc.indexOf('Grandmas are <b>4 times</b> as efficient.') !== -1) {
			modifiers *= 4;
		}
		else if (upgrade.bought && upgrade.desc.indexOf('for every 50 grandmas') !== -1) {
			amount += (currentNumber + 1) * 0.02 * (currentNumber + 1) - currentNumber * 0.02 * currentNumber;
		}
		else if (upgrade.bought && upgrade.desc.indexOf('for every 20 portals') !== -1) {
			amount += Game.ObjectsById[7].amount * 0.05;
		}
	});

	return cookiesPs * modifiers + amount * modifiers;
};

/**
 * Get the portal modifiers
 *
 * @return {Integer}
 */
CookieMonster.getTotalPortalModifiers = function() {
	var amount    = 0;
	var modifiers = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf('Grandmas are <b>twice</b> as efficient.') !== -1) {
			modifiers *= 2;
		}
		else if (upgrade.bought && upgrade.desc.indexOf('Grandmas are <b>4 times</b> as efficient.') !== -1) {
			modifiers *= 4;
		}
		else if (upgrade.bought && upgrade.desc.indexOf('for every 20 portals') !== -1) {
			amount += Game.ObjectsById[1].amount * 0.05;
		}
	});

	return amount * modifiers;
};