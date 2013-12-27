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

CookieMonster.baseTen = function(building) {
	if (this.hasntAchievement("Base 10")) {
		var t = [];
		var n = [];
		Game.ObjectsById.forEach(function (building) {
			t.push(building.name);
			n.push(building.amount);
		});
		t.forEach(function (t, r) {
			if (t === building) {
				n[r]++;
			}
		});
		var r = n.length * 10;
		for (var i = 0; i < n.length; i++) {
			if (n[i] < r) {
				return false;
			}
			r = r - 10;
		}
		return true;
	}

	return false;
};

CookieMonster.mathematician = function(building) {
	if (this.hasntAchievement("Mathematician")) {
		var t = [];
		var n = [];
		Game.ObjectsById.forEach(function (building) {
			t.push(building.name);
			n.push(building.amount);
		});
		t.forEach(function (t, r) {
			if (t === building) {
				n[r]++;
			}
		});
		var r = 128;
		for (var i = 0; i < n.length; i++) {
			if (i > 2) {
				r = r / 2;
			}
			if (n[i] < r) {
				return false;
			}
		}
		return true;
	}
	return false;
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
};

/**
 * Check if a given building will unlock Centennial when bought
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
		if (building.amount < 100) {
			todo.push(building);
		}
	});

	if (todo.length === 1 && todo[0].name === checkedBuilding && todo[0].amount === 99) {
		return true;
	}
};