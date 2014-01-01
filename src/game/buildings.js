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
		Math[minOrMax].apply(Math, this.informations.bci),
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
	var colors = this.computeColorCoding([informations.bci, informations.timeLeft, informations.roi]);

	this.informations.items[building]    = informations.items;
	this.informations.bonus[building]    = informations.bonus;
	this.informations.bci[building]      = informations.bci;
	this.informations.roi[building]      = informations.roi;
	this.informations.timeLeft[building] = informations.timeLeft;

	// Compute formatted informations
	this.bottomBar.items[building]    = informations.items;
	this.bottomBar.bonus[building]    = this.formatNumber(informations.bonus);
	this.bottomBar.bci[building]      = '<span class="text-' +colors[0]+ '">' +this.formatNumber(informations.bci)+ '</span>';
	this.bottomBar.roi[building]      = '<span class="text-' +colors[2]+ '">' +this.formatNumber(informations.roi)+ '</span>';
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
		var bci      = that.roundDecimal(building.price / bonus);
		var count    = '(<span class="text-blue">' +building.amount+ '</span>)';
		var profit   = building.price * (bonus + Game.cookiesPs) / bonus;
		var timeLeft = that.secondsLeft(building);

		// Save building informations
		that.setBuildingInformations(key, {
			items    : building.name.split(' ')[0] + ' ' + count,
			bonus    : bonus,
			bci      : bci,
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
	var multiplier = Game.globalCpsMult;
	var income     = building.storedCps * multiplier;
	var unlocked   = 0;

	// Get unlocked achievements by amount of buildings (50, 100, ...)
	unlocked += this.buildingAmount(building);

	// Get unlocked achievements by global number of buildings
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
			income += this.getTotalCursorModifiers() * multiplier;
			break;
		case 'Grandma':
			income += this.getTotalGrandmaModifiers(building.amount) * multiplier;
			break;
		case 'Portal':
			income += this.getTotalPortalModifiers() * multiplier;
			break;
	}

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
		if (upgrade.bought && upgrade.matches('The mouse and cursors gain')) {
			var r = 31;
			if (upgrade.matches(' another ')) {
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
		else if (upgrade.bought && upgrade.matches('Grandmas are <b>twice</b>.')) {
			modifiers *= 2;
		}
		else if (upgrade.bought && upgrade.matches('Grandmas are <b>4 times</b> as efficient.')) {
			modifiers *= 4;
		}
		else if (upgrade.bought && upgrade.matches('for every 50 grandmas')) {
			amount += (currentNumber + 1) * 0.02 * (currentNumber + 1) - currentNumber * 0.02 * currentNumber;
		}
		else if (upgrade.bought && upgrade.matches('for every 20 portals')) {
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
		if (upgrade.bought && upgrade.matches('Grandmas are <b>twice</b> as efficient.')) {
			modifiers *= 2;
		}
		else if (upgrade.bought && upgrade.matches('Grandmas are <b>4 times</b> as efficient.')) {
			modifiers *= 4;
		}
		else if (upgrade.bought && upgrade.matches('for every 20 portals')) {
			amount += Game.ObjectsById[1].amount * 0.05;
		}
	});

	return amount * modifiers;
};