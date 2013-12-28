/**
 * Check if the user has won an achievement
 *
 * @param {String} checkedAchievement
 *
 * @return {Boolean}
 */
CookieMonster.hasAchievement = function(checkedAchievement) {
	var found = 0;

	Game.AchievementsById.forEach(function (achievement) {
		if (achievement.won && achievement.name === checkedAchievement) {
			found = 1;
		}
	});

	return found === 1;
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

	var names    = [];
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

	var todo = [];
	Game.ObjectsById.forEach(function (building) {
		if (building.amount === 0) {
			todo.push(building.name);
		}
	});

	if (todo.length === 1 && todo[0] === checkedBuilding) {
		return true;
	}

	return false;
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

	var todo = [];
	Game.ObjectsById.forEach(function (building) {
		if (building.amount === 99) {
			todo.push(building.name);
		}
	});

	if (todo.length === 1 && todo[0] === checkedBuilding) {
		return true;
	}

	return false;
};