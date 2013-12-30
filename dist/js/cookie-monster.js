/* exported CookieMonster */

/**
 * The CookieMonster plugin
 *
 * @type {Object}
 */
var CookieMonster = {

	// Runtime variables
	////////////////////////////////////////////////////////////////////

	version : '1.040.04',
	loops   : 0,

	tooltips         : [],
	buildingTooltips : [],
	humanNumbers     : new Array(
		[' M', ' B', ' T', ' Qa', ' Qi', ' Sx', ' Sp', ' Oc', ' No', ' Dc'],
		[' M', ' G', ' T', ' P', ' E', ' Z', ' Y', ' Oc', ' No', ' Dc']
	),

	// Emphasizers
	////////////////////////////////////////////////////////////////////

	titleModifier : '',
	onScreen      : {},

	// Stored informations
	////////////////////////////////////////////////////////////////////

	bottomBar: {
		items    : [],
		bonus    : [],
		cpi      : [],
		timeLeft : [],
	},

	// Upgrades
	////////////////////////////////////////////////////////////////////

	inStore      : [0, 0, 0, 0, 0, 0],
	upgradeCount : 33,

	// Settings
	////////////////////////////////////////////////////////////////////

	settings: {

		// Sections
		'BottomBar'      : {type: 'boolean', value: 1,   label: 'Bottom Bar',        desc: 'Displays a bar at the bottom of the screen that shows all Building information'},
		'UpgradeDisplay' : {type: 'switch',  value: 1,   label: 'Upgrade Display',   desc: 'Changes how the store displays Upgrades'},

		// Colors
		'Colorblind'     : {type: 'boolean', value: 0,   label: 'Colorblind',        desc: 'Use colorblind safe colors'},
		'ColoredPrices'  : {type: 'boolean', value: 1,   label: 'Colored Prices',    desc: 'Changes the colors of all Building prices to correspond with their Cost Per Income'},
		'UpgradeIcons'   : {type: 'boolean', value: 1,   label: 'Upgrade Icons',     desc: 'Displays a small square icon on the Upgrade to better display the Cost Per Income color value'},

		// Emphasizers
		'BuffBars'       : {type: 'boolean', value: 1,   label: 'Buff Bars',         desc: 'Displays a countdown bar for each effect currently active'},
		'CookieBar'      : {type: 'boolean', value: 1,   label: 'Next Cookie Timer', desc: 'Displays a countdown bar and updates the Title for when the next Cookie will appear'},
		'CookieTimer'    : {type: 'boolean', value: 1,   label: 'Cookie Timer',      desc: 'Displays a timer on Golden Cookies and Red Cookies'},
		'FlashScreen'    : {type: 'boolean', value: 1,   label: 'Flash Screen',      desc: 'Flashes the screen when a Golden Cookie or Red Cookie appears'},
		'Sounds'         : {type: 'boolean', value: 0,   label: 'Sounds',            desc: 'Plays a sound when a Red/Golden Cookie or a Reindeer appears'},
		'UpdateTitle'    : {type: 'boolean', value: 1,   label: 'Update Title',      desc: 'Updates the Title to display if a Cookie is waiting to be clicked'},

		// Display
		'LuckyAlert'     : {type: 'switch',  value: 1,   label: 'Lucky Alert',       desc: 'Changes the tooltip to display if you would be under the number of cookies required for \"Lucky\"!'},
		'Refresh'        : {type: 'switch',  value: 1e3, label: 'Refresh Rate',      desc: 'The rate at which Cookie Monster updates data (higher rates may slow the game)'},
		'ShortNumbers'   : {type: 'switch',  value: 1,   label: 'Short Numbers',     desc: 'Formats all numbers to be shorter when displayed'},

	},

	// Selectors
	////////////////////////////////////////////////////////////////////

	$game          : $('#game'),
	$goldenCookie  : $('#goldenCookie'),
	$goldenOverlay : $('#cookie-monster__golden-overlay'),
	$monsterBar    : $('#cookie-monster__bottom-bar'),
	$flashOverlay  : $('#cookie-monster__overlay'),
	$timerBars     : $('#cookie-monster__buff-bars'),
	$reindeer      : $('#seasonPopup'),

	// Texts
	////////////////////////////////////////////////////////////////////

	texts: {
		warning: 'Purchase of this item will put you under the number of Cookies required for "Lucky!"',
	},

	// Colors
	////////////////////////////////////////////////////////////////////

	colors: {
		blue    : '4BB8F0',
		green   : '00FF00',
		orange  : 'FF7F00',
		purple  : 'FF00FF',
		red     : 'FF0000',
		yellow  : 'FFFF00',
		greyTen : '222222',
	},

	colorsBlind: {
		blue    : '4BB8F0',
		green   : '76b7e1',
		orange  : 'FF7F00',
		purple  : 'FF00FF',
		red     : 'FF0000',
		yellow  : 'FFFF00',
		greyTen : '222222',
	}

};

// Export module
if (typeof module !== 'undefined') {
	module.exports = CookieMonster;
}
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

/**
 * Get the actual milk modifier
 *
 * @param {Integer} milk
 *
 * @return {Integer}
 */
CookieMonster.getMilkPotential = function(milkProgress) {
	var potential = 0;
	milkProgress = typeof milkProgress !== 'undefined' ? milkProgress : Game.milkProgress;

	potential += this.hasAchievement('Santa\'s milk and cookies') * 0.05;
	potential += this.hasAchievement('Kitten helpers') * 0.05;
	potential += this.hasAchievement('Kitten workers') * 0.1;
	potential += this.hasAchievement('Kitten engineers') * 0.2;
	potential += this.hasAchievement('Kitten overseers') * 0.2;

	return 1 + (potential * milkProgress);
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
}
/**
 * Get the current frenzy multiplier
 *
 * @return {integer}
 */
CookieMonster.getFrenzyMultiplier = function() {
	return (Game.frenzy > 0) ? Game.frenzyPower : 1;
};

/**
 * Emphasize the apparition of a Golden Cookie
 *
 * @return {void}
 */
CookieMonster.emphasizeGolden = function() {
	$golden = this.whileOnScreen(this.$goldenCookie,
		function() {
			this.$goldenOverlay.hide();
			this.titleModifier = '';
		},
		function() {
			this.$goldenOverlay.show();

			this.Emphasizers.updateTitle('G');
			this.Emphasizers.playSound();
			this.Emphasizers.flashScreen();
		});

	if ($golden.is(':visible')) {
		this.Emphasizers.displayGoldenTimer();
	}
};

//////////////////////////////////////////////////////////////////////
////////////////////////////// DOM ELEMENTS //////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Create the overlay for the Golden Cookie
 *
 * @return {void}
 */
CookieMonster.createGoldenOverlay = function() {
	$('body').append('<div id="cookie-monster__golden-overlay" onclick="Game.goldenCookie.click();"></div>');

	this.$goldenOverlay = $('#cookie-monster__golden-overlay');
};

/**
 * Create the flashing overlay
 *
 * @return {void}
 */
CookieMonster.createFlashOverlay = function() {
	$('body').append('<div id="cookie-monster__overlay"></div>');

	this.$flashOverlay = $('#cookie-monster__overlay');
};
/**
 * Get the number of Heavenly Chips from a number of cookies (all time)
 *
 * @param {integer} cookiesNumber
 *
 * @return {integer}
 */
CookieMonster.cookiesToHeavenly = function(cookiesNumber) {
	return Math.floor(Math.sqrt(2.5 * Math.pow(10, 11) + 2 * cookiesNumber) / Math.pow(10, 6) - 0.5);
};

/**
 * Get the number of cookies required to have X chips
 *
 * @param {integer} chipsNumber
 *
 * @return {integer}
 */
CookieMonster.heavenlyToCookies = function(chipsNumber) {
	return 5 * Math.pow(10, 11) * chipsNumber * (chipsNumber + 1);
};

/**
 * Get the current heavenly multiplier
 *
 * @return {integer}
 */
CookieMonster.getHeavenlyMultiplier = function() {
	var chips     = Game.prestige['Heavenly chips'] * 2;
	var potential = 0;

	if (Game.Has('Heavenly chip secret')) {
		potential += 0.05;
	}
	if (Game.Has('Heavenly cookie stand')) {
		potential += 0.2;
	}
	if (Game.Has('Heavenly bakery')) {
		potential += 0.25;
	}
	if (Game.Has('Heavenly confectionery')) {
		potential += 0.25;
	}
	if (Game.Has('Heavenly key')) {
		potential += 0.25;
	}

	return chips * potential;
};

/**
 * Get the number of heavenly chips for a particular context
 *
 * @param {string} context [max,cur,next,time]
 *
 * @return {string}
 */
CookieMonster.getHeavenlyChip = function(context) {
	var nextReset     = this.cookiesToHeavenly(Game.cookiesReset + Game.cookiesEarned);
	var currentAmount = this.cookiesToHeavenly(Game.cookiesReset);
	var nextChip      = this.heavenlyToCookies(nextReset + 1) - (Game.cookiesReset + Game.cookiesEarned);

	switch (context) {
		case 'max':
			return this.formatNumber(nextReset) + " <small>(" + this.formatNumber(nextReset * 2) + "%)</small>";

		case 'cur':
			return this.formatNumber(currentAmount) + " <small>(" + this.formatNumber(currentAmount * 2) + "%)</small>";

		case 'next':
			return this.formatNumber(Math.round(nextChip));

		case 'time':
			return this.formatTime(Math.round(nextChip / Game.cookiesPs));
	}
};

CookieMonster.getAchievementWorth = function(unlocked, upgradeKey, originalIncome, r) {
	var income             = 0;
	var heavenlyMultiplier = this.getHeavenlyMultiplier();
	var futureMultiplier   = 0;
	var milkModifiers      = [];
	var milkProgress       = Game.milkProgress;
	var frenzyMultiplier   = this.getFrenzyMultiplier();
	var l;
	if (r !== 0) {
		heavenlyMultiplier = r;
	}

	var milkPotentials = {
		'Kitten helpers'            : 0.05,
		'Kitten workers'            : 0.1,
		'Kitten engineers'          : 0.2,
		'Kitten overseers'          : 0.2,
		'Santa\'s milk and cookies' : 0.05,
	};

	Game.UpgradesById.forEach(function (upgrade) {
		var description = upgrade.desc.replace("[Research]<br>", "");
		if (upgrade.bought && description.indexOf("Cookie production multiplier <b>+") !== -1) {
			heavenlyMultiplier += description.substr(33, description.indexOf("%", 33) - 33) * 1;
		}
		if (!upgrade.bought && description.indexOf("Cookie production multiplier <b>+") !== -1 && upgrade.id === upgradeKey) {
			futureMultiplier += description.substr(33, description.indexOf("%", 33) - 33) * 1;
		}

		var milkUpgrade = milkPotentials[upgrade.name];
		if (upgrade.bought && typeof milkUpgrade !== 'undefined') {
			milkModifiers.push(milkUpgrade);
		}
	});

	l = 100 + heavenlyMultiplier;
	milkModifiers.forEach(function(modifier) {
		l = l * (1 + modifier * milkProgress);
	});
	var h = (Game.cookiesPs + originalIncome) / Game.globalCpsMult * (l / 100) * frenzyMultiplier;

	milkProgress += unlocked * 0.04;
	l = 100 + heavenlyMultiplier + futureMultiplier;
	milkModifiers.forEach(function(modifier) {
		l = l * (1 + modifier * milkProgress);
	});
	var p = milkPotentials[Game.UpgradesById[upgradeKey].name] || 0;
	l = l * (1 + p * milkProgress);

	income = (Game.cookiesPs + originalIncome) / Game.globalCpsMult * (l / 100) * frenzyMultiplier - h;
	var d = this.inc(income + h);
	if (d > 0) {

		milkProgress += d * 0.04;
		l = 100 + heavenlyMultiplier + futureMultiplier;
		milkModifiers.forEach(function(modifier) {
			l = l * (1 + modifier * milkProgress);
		});
		l = l * (1 + p * milkProgress);

		income = (Game.cookiesPs + originalIncome) / Game.globalCpsMult * (l / 100) * frenzyMultiplier - h;
	}
	if (r !== 0) {
		income = (Game.cookiesPs + originalIncome) / Game.globalCpsMult * (l / 100) * frenzyMultiplier;
	}
	if (Game.Has("Elder Covenant")) {
		income *= 0.95;
	}
	return income;
};
/**
 * Get the lucky reward for a particular situation
 *
 * @param {String}  context   [regular,max]
 * @param {Boolean} formatted Return in text form or formatted
 *
 * @return {String}
 */
CookieMonster.luckyReward = function(context, formatted) {
	var reward = Math.round(this.getFrenzyRate(context) / 0.1);

	if (formatted) {
		if (reward <= Game.cookies) {
			reward = '<strong class="text-green">' + this.formatNumber(reward) + "</strong>";
		} else {
			reward = this.formatNumber(reward);
		}
	}

	return reward;
};

/**
 * Get the (MAX) lucky reward for a particular situation
 *
 * @param {String} context [current,max,max_frenzy]
 *
 * @return {String}
 */
CookieMonster.maxLuckyReward = function(context) {
	var reward = this.getFrenzyRate(context);
	var number = [Math.round(reward), Math.round(Game.cookies * 0.1 + 13)];

	if (context === 'max' || context === 'frenzy') {
		if (Math.round(reward / 0.1) > Game.cookies) {
			return this.formatNumber(number[0]);
		}
	}

	return this.formatNumber(Math.min.apply(Math, number));
};

/**
 * Get the frenzy Cookie/s for a context
 *
 * @param {String} context
 *
 * @return {Integer}
 */
CookieMonster.getFrenzyRate = function(context) {
	var reward = Game.cookiesPs;

	if (Game.frenzy > 0 && context !== 'current') {
		reward = reward / Game.frenzyPower;
	}
	if (context === 'frenzy') {
		reward = reward * 7;
	}

	return reward * 1200 + 13;
};
/**
 * Emphasize the apparition of a Reindeer
 *
 * @return {void}
 */
CookieMonster.emphasizeSeason = function() {
	this.whileOnScreen(this.$reindeer,
		function() {
			this.$flashOverlay.hide();
		},
		function() {
			this.Emphasizers.playSound();
			this.Emphasizers.flashScreen();
		});
};
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

////////////////////////////////////////////////////////////////////
///////////////////////////// FOOBAR //////////////////////////
////////////////////////////////////////////////////////////////////

CookieMonster.getUpgradeBonuses = function(building, currentNumber, production) {
	var r = 0;
	var i = 0;

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

	var achievement = upgrades[building][currentNumber];
	if (achievement) {
		i += this.hasntAchievement(achievement);
	}

	switch (building) {
		case 'Grandma':
			r += this.getTotalGrandmaModifiers(currentNumber) * Game.globalCpsMult;
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case 'Farm':
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case 'Factory':
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case 'Mine':
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case 'Shipment':
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case 'Alchemy lab':
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case 'Portal':
			r += this.getTotalPortalModifiers() * Game.globalCpsMult;
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case 'Time machine':
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case 'Antimatter condenser':
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
	}

	if (Game.BuildingsOwned === 99) {
		i += this.hasntAchievement("Builder");
	}
	if (Game.BuildingsOwned === 399) {
		i += this.hasntAchievement("Architect");
	}
	if (Game.BuildingsOwned === 799) {
		i += this.hasntAchievement("Engineer");
	}
	if (this.oneWithEverything(building)) {
		i++;
	}
	if (this.mathematician(building)) {
		i++;
	}
	if (this.baseTen(building)) {
		i++;
	}
	if (this.centennial(building)) {
		i++;
	}

	return r + this.getAchievementWorth(i, 0, r + production, 0);
};

//////////////////////////////////////////////////////////////////////
/////////////////////////////// MODIFIERS ////////////////////////////
//////////////////////////////////////////////////////////////////////

CookieMonster.getTotalCursorModifiers = function() {
	var modifier = 0;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf("The mouse and cursors gain") !== -1) {
			var r = 31;
			if (upgrade.desc.indexOf(" another ") !== -1) {
				r += 8;
			}
			modifier += upgrade.desc.substr(r, upgrade.desc.indexOf("<", r) - r) * 1;
		}
	});

	return modifier * Game.ObjectsById[0].amount;
};

CookieMonster.getTotalGrandmaModifiers = function(currentNumber) {
	var t = 0.5;
	var n = 0;
	var r = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.name === "Forwards from grandma") {
			t += 0.3;
		}
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>twice</b>.") !== -1) {
			r = r * 2;
		}
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			r = r * 4;
		}
		if (upgrade.bought && upgrade.desc.indexOf("for every 50 grandmas") !== -1) {
			n += (currentNumber + 1) * 0.02 * (currentNumber + 1) - currentNumber * 0.02 * currentNumber;
		}
		if (upgrade.bought && upgrade.desc.indexOf("for every 20 portals") !== -1) {
			n += Game.ObjectsById[7].amount * 0.05;
		}
	});

	return t * r + n * r;
};

CookieMonster.getTotalPortalModifiers = function() {
	var modifier = 0;
	var total    = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			total = total * 2;
		}
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			total = total * 4;
		}
		if (upgrade.bought && upgrade.desc.indexOf("for every 20 portals") !== -1) {
			modifier += Game.ObjectsById[1].amount * 0.05;
		}
	});

	return modifier * total;
};
/**
 * Play a sound
 *
 * @param {String} sound
 *
 * @return {void}
 */
CookieMonster.playSound = function(sound) {
	sound = new realAudio(sound);

	// Play sound
	sound.volume = 1;
	sound.play();

	return sound;
};

/**
 * Shortcut for playing the bell sound
 *
 * @return {void}
 */
CookieMonster.playBell = function() {
	return this.playSound('http://autopergamene.eu/cookie-monster/mp3/bell.mp3');
};

/**
 * Get the full path to an image
 *
 * @param {String} image
 *
 * @return {String}
 */
CookieMonster.getImage = function(image) {
	if (image.indexOf('http') === -1) {
		image = 'http://autopergamene.eu/cookie-monster/img/'+image+'.png';
	}

	return image;
};

/**
 * Update the favicon
 *
 * @param {String} favicon
 *
 * @return {void}
 */
CookieMonster.updateFavicon = function (favicon) {
	favicon = this.getImage(favicon);

	$('#cm_favicon').attr('href', favicon);
};
//////////////////////////////////////////////////////////////////////
////////////////////////////// EMPHASIZERS ///////////////////////////
//////////////////////////////////////////////////////////////////////

CookieMonster.Emphasizers = {};

/**
 * Executes actions while something goes in and out of focus
 *
 * @param {DOMElement} $selector
 * @param {Closure}    offScreen
 * @param {Closure}    onScreen
 *
 * @return {DOMElement}
 */
CookieMonster.whileOnScreen = function($selector, offScreen, onScreen) {
	var identifier = $selector.attr('id');

	// Set key in array if it doesn't exist
	if (typeof this.onScreen[identifier] === 'undefined') {
		this.onScreen[identifier] = false;
	}

	// Execute the two callbacks
	if ($selector.is(':hidden') && this.onScreen[identifier]) {
		this.onScreen[identifier] = false;
		offScreen.call(this, $selector);
	} else if ($selector.is(':visible') && !this.onScreen[identifier]) {
		this.onScreen[identifier] = true;
		onScreen.call(this, $selector);
	}

	return $selector;
};

/**
 * Display a timer in an overlay above the golden cookie
 *
 * @return {Void}
 */
CookieMonster.Emphasizers.displayGoldenTimer = function() {
	if (!CookieMonster.getBooleanSetting('CookieTimer')) {
		return false;
	}

	CookieMonster.$goldenOverlay
		.css(CookieMonster.$goldenCookie.css(['opacity', 'top', 'left', 'top']))
		.text(Math.round(Game.goldenCookie.life / Game.fps));
};

/**
 * Update the title of the page to notify about something
 *
 * @return {String}
 */
CookieMonster.Emphasizers.updateTitle = function(type) {
	if (!CookieMonster.getBooleanSetting('UpdateTitle')) {
		return false;
	}

	CookieMonster.titleModifier = '(' +type+ ') ';
	this.faviconSpinner(1);
};

/**
 * Changes the favicon according to current state
 *
 * @param {integer} frame The current sprite of the favicon
 *
 * @return {void}
 */
CookieMonster.Emphasizers.faviconSpinner = function(frame) {
	if (frame > 6) {
		frame = 1;
	}

	if (CookieMonster.onScreen.goldenCookie) {
		CookieMonster.updateFavicon('cm_gc_' +frame);
		frame++;
		setTimeout(function () {
			CookieMonster.Emphasizers.faviconSpinner(frame);
		}, 250);
	} else {
		CookieMonster.updateFavicon('http://orteil.dashnet.org/cookieclicker/img/favicon.ico');
	}
};

/**
 * Play the Golden Cookie sound
 *
 * @return {void}
 */
CookieMonster.Emphasizers.playSound = function() {
	if (!CookieMonster.getBooleanSetting('Sounds')) {
		return false;
	}

	return CookieMonster.playBell();
};

/**
 * Flash the screen
 *
 * @return {void}
 */
CookieMonster.Emphasizers.flashScreen = function() {
	if (!CookieMonster.getBooleanSetting('FlashScreen')) {
		return;
	}

	CookieMonster.$flashOverlay.fadeIn(100);
	CookieMonster.$flashOverlay.fadeOut(500);
};
/**
 * Format a number to a string (adds separators, convert units, etc)
 *
 * @param {String|Integer} number
 *
 * @return {String}
 */
CookieMonster.formatNumber = function(number) {
	return this.toHumanNumber(number);
};

/**
 * Rounds a number and format it to string
 *
 * @param {String|Integer} number
 *
 * @return {String}
 */
CookieMonster.formatNumberRounded = function(number) {
	return this.toHumanNumber(number, true);
};

/**
 * Formats a raw number to an human-readable one
 *
 * @param {Integer} number
 * @param {Boolean} round
 *
 * @return {Integer|String}
 */
CookieMonster.toHumanNumber = function(number, round) {
	var shortNumbers = this.getSetting('ShortNumbers') - 1;

	if (shortNumbers > -1) {
		var r = 1e33;
		for (var i = this.humanNumbers[shortNumbers].length - 1; i >= 0; i--) {
			var s = (number / r % 999).toFixed(3);
			if (s >= 1) {
				return s + this.humanNumbers[shortNumbers][i];
			}
			r /= 1e3;
		}
	}

	// Round the number off
	// Else we'll return the number rounded off to nearest decimal
	number = round ? Math.round(number) : this.roundDecimal(number);

	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Round a number to the nearest decimal
 *
 * @param {Integer} number
 *
 * @return {Integer}
 */
CookieMonster.roundDecimal = function(number) {
	return Math.round(number * 100) / 100;
};
/**
 * Get a color for regular or colorblind people
 *
 * @param {String} color
 *
 * @return {String}
 */
CookieMonster.color = function(color) {
	var colors = this.getSetting('Colorblind') ? this.colorsBlind : this.colors;

	return colors[color];
};

/**
 * Check if the upgrade ID is the one for Heavenly Key
 *
 * @param {integer} upgrade
 *
 * @return {Boolean}
 */
CookieMonster.isHeavenlyKey = function(upgrade) {
	return Game.UpgradesById[upgrade].name === 'Heavenly key';
};

//////////////////////////////////////////////////////////////////////
//////////// THE "I HAVE NO FUCKING IDEA WHAT THESE DO" LAND /////////
//////////////////////////////////////////////////////////////////////

CookieMonster.lgt = function(e) {
	if (this.hasntAchievement('Elder') && Game.UpgradesById[e].name.indexOf(" grandmas") !== -1) {
		var t = [];
		var n = [];
		Game.UpgradesById.forEach(function (upgrade, key) {
			if (upgrade.bought && upgrade.name.indexOf(" grandmas") !== -1) {
				t.push(key);
			} else if (!upgrade.bought && upgrade.name.indexOf(" grandmas") !== -1) {
				n.push(key);
			}
		});
		if (n.length === 1 && n[0] === e) {
			return true;
		}
	}
	return false;
};


CookieMonster.gpp = function() {
	var multiplier = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>twice</b>.") !== -1) {
			multiplier = multiplier * 2;
		}
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			multiplier = multiplier * 4;
		}
	});

	return Game.ObjectsById[7].amount * 0.05 * multiplier * Game.ObjectsById[1].amount * Game.globalCpsMult;
};

/**
 * Computes the production of Grandmas
 *
 * @return {Integer}
 */
CookieMonster.getGrandmasProduction = function() {
	var multiplier = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf('Grandmas are <b>twice</b>') !== -1) {
			multiplier = multiplier * 2;
		}
		if (upgrade.bought && upgrade.desc.indexOf('Grandmas are <b>4 times</b> as efficient.') !== -1) {
			multiplier = multiplier * 4;
		}
	});

	return Game.ObjectsById[1].amount * 0.02 * multiplier * Game.globalCpsMult;
};

CookieMonster.mcg = function(e) {
	var t = Game.UpgradesById[e].desc;
	var n = 31;
	if (t.indexOf(" another ") !== -1) {
		n += 8;
	}
	var r = t.substr(n, t.indexOf("<", n) - n) * 1;
	return r * (Game.BuildingsOwned - Game.ObjectsById[0].amount) * Game.ObjectsById[0].amount * Game.globalCpsMult;
};

CookieMonster.fte = function(e) {
	return Game.ObjectsById[e].storedTotalCps * 3 * Game.globalCpsMult;
};

CookieMonster.inc = function(e) {
	var t = 0;

	Game.AchievementsById.forEach(function (achievement) {
		var i = achievement.desc.replace(/,/g, "");
		if (!achievement.won && i.indexOf(" per second.") !== -1) {
			if (e >= i.substr(8, i.indexOf("</b>", 8) - 8) * 1) {
				t++;
			}
		}
	});

	return t;
};
/**
 * Computes the time (s) required to buy a building/upgrade
 *
 * @param {Integer} object
 * @param {String}  type
 *
 * @return {Integer}
 */
CookieMonster.secondsLeft = function(object, type) {
	// Get the price of the object we want
	var basePrice = 0;
	if (type === 'object') {
		basePrice = Game.ObjectsById[object].price;
	} else if (type === 'upgrade') {
		basePrice = Game.UpgradesById[object].basePrice;
	}

	// Get the amount of cookies needed
	var realPrice = Game.cookies - basePrice;

	// If we're not making any cookies, or have
	// enough already, return 0
	if (Game.cookiesPs === 0 || realPrice > 0) {
		return 0;
	}

	return Math.abs(realPrice) / Game.cookiesPs;
};

/**
 * Format a time (s) to an human-readable format
 *
 * @param {Integer} time
 * @param {String}  compressed  Compressed output (minutes => m, etc.)
 *
 * @return {String}
 */
CookieMonster.formatTime = function(time, compressed) {
	time = Math.round(time);
	if (typeof compressed === 'undefined') compressed = false;

	// Take care of special cases
	if (time === Infinity) {
		return 'Never';
	} else if (time === 0) {
		return 'Done!';
	} else if (time / 86400 > 1e3) {
		return '> 1,000 days';
	}

	// Compute each units separately
	var days    = parseInt(time / 86400) % 999;
	var hours   = parseInt(time / 3600) % 24;
	var minutes = parseInt(time / 60) % 60;
	var seconds = time % 60;

	// Format units
	var units = [' days, ', ' hours, ', ' minutes, ', ' seconds'];
	if (!compressed) {
		if (days === 1) {
			units[0] = ' day, ';
		}
		if (hours === 1) {
			units[1] = ' hour, ';
		}
		if (minutes === 1) {
			units[2] = ' minute, ';
		}
		if (seconds === 1) {
			units[3] = ' second';
		}
	} else {
		units = ['d, ', 'h, ', 'm, ', 's'];
	}

	// Create final string
	var formated = '';
	if (days > 0) {
		formated += days + units[0];
	}
	if (days > 0 || hours > 0) {
		formated += hours + units[1];
	}
	if (days > 0 || hours > 0 || minutes > 0) {
		formated += minutes + units[2];
	}
	if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
		formated += seconds + units[3];
	}

	return formated;
};
/**
 * Update the stored informations about a building
 *
 * @param {Integer} building
 * @param {Array}   informations
 */
CookieMonster.setBuildingInformations = function (building, informations) {
	this.bottomBar.items[building]    = informations.items;
	this.bottomBar.bonus[building]    = informations.bonus;
	this.bottomBar.cpi[building]      = informations.cpi;
	this.bottomBar.timeLeft[building] = informations.timeLeft;
};

//////////////////////////////////////////////////////////////////////
///////////////////////////// DOM MODIFIERS //////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Toggle the visibility of the Bottom Bar
 *
 * @return {void}
 */
CookieMonster.toggleBar = function() {
	var visible = this.getBooleanSetting('BottomBar');
	var bottom  = visible ? 57 : 0;

	this.$monsterBar.toggle(visible);
	this.$game.css('bottom', bottom+'px');
};

/**
 * Create the Bottom Bar
 *
 * @return {void}
 */
CookieMonster.createBottomBar = function() {
	$('body').append('<div id="cookie-monster__bottom-bar"></div>');

	this.$monsterBar = this.makeTable();
};

/**
 * Create the Bottom Bar
 *
 * @return {void}
 */
CookieMonster.makeTable = function() {
	var thead    = '<th class="text-yellow"> ' + this.version + "</th>";
	var bonus    = '<th class="text-blue">Bonus Income</th>';
	var baseCost = '<th class="text-blue">Base Cost Per Income</th>';
	var timeLeft = '<th class="text-blue">Time Left</th>';

	// Append each building type to the bar
	Game.ObjectsById.forEach(function (building, key) {
		thead    += '<th id="cookie_monster_item_' +key+ '"></th>';
		bonus    += '<td id="cookie_monster_is_'   +key+ '"></td>';
		baseCost += '<td id="cookie_monster_cpi_'  +key+ '"></td>';
		timeLeft += '<td id="cookie_monster_tc_'   +key+ '"></td>';
	});

	return $('#cookie-monster__bottom-bar').html(
		'<table>'+
			'<tr>'+thead+'</tr>'+
			'<tr>'+bonus+'</tr>'+
			'<tr>'+baseCost+'</tr>'+
			'<tr>'+timeLeft+'</tr>'+
		'</table>');
};

/**
 * Update the contents of the Bottom Bar
 *
 * @return {void}
 */
CookieMonster.updateTable = function() {
	var that = this;

	// Here we loop over the information we have, and building a multidimensionnal
	// array of it, by building key
	Game.ObjectsById.forEach(function (building, key) {
		var price      = building.price;
		var owned      = building.amount;
		var production = building.storedCps * Game.globalCpsMult;
		if (building.name === "Grandma") {
			production = 0;
		}

		// Compute informations
		var bonus = that.roundDecimal(production + that.getUpgradeBonuses(building.name, owned, production));
		var cpi   = that.roundDecimal(price / bonus);
		var count = '(<span class="text-blue">' + that.formatNumber(owned) + '</span>)';

		that.setBuildingInformations(key, {
			items    : building.name.split(' ')[0] + ' ' + count,
			bonus    : that.roundDecimal(bonus),
			cpi      : that.roundDecimal(cpi),
			timeLeft : Math.round(that.secondsLeft(key, 'object')),
		});
	});

	// Then we loop over the created array, format the information
	// and update the DOM
	Game.ObjectsById.forEach(function (building, key) {
		var colors       = ['yellow', 'yellow'];
		var informations = [that.bottomBar.cpi[key], that.bottomBar.timeLeft[key]];
		var worst        = [Math.max.apply(Math, that.bottomBar.cpi), Math.max.apply(Math, that.bottomBar.timeLeft)];
		var best         = [Math.min.apply(Math, that.bottomBar.cpi), Math.min.apply(Math, that.bottomBar.timeLeft)];

		// Compute correct colors
		for (var i = 0; i < colors.length; i++) {
			if (informations[i] === best[i]) {
				colors[i] = 'green';
			} else if (informations[i] === worst[i]) {
				colors[i] = 'red';
			} else if (worst[i] - informations[i] < informations[i] - best[i]) {
				colors[i] = 'orange';
			}
		}

		// Update DOM
		$('#cookie_monster_item_' + key).html(that.bottomBar.items[key]);
		$('#cookie_monster_is_'   + key).html(that.formatNumber(that.bottomBar.bonus[key]));
		$('#cookie_monster_cpi_'  + key).html('<span class="text-' + colors[0] + '">' + that.formatNumber(informations[0]) + '</span>');
		$('#cookie_monster_tc_'   + key).html('<span class="text-' + colors[1] + '">' + that.formatTime(informations[1], true) + '</span>');
	});
};
/**
 * Updates the various buff bars
 *
 * @return {void}
 */
CookieMonster.manageBuffs = function() {
	this.manageFrenzyBars();
	this.manageClickingFrenzy();
	this.manageNextCookie();
	this.manageNextReindeer();

	// Offset version number
	$('#versionNumber').css('bottom', this.$timerBars.css('height'));
};

//////////////////////////////////////////////////////////////////////
///////////////////////////// DOM ELEMENTS ///////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Create the bars container
 *
 * @return {void}
 */
CookieMonster.createBarsContainer = function() {
	$('#sectionLeft').append('<div id="cookie-monster__buff-bars"></div>');

	this.$timerBars = $('#cookie-monster__buff-bars');
};

//////////////////////////////////////////////////////////////////////
////////////////////////////////// BARS //////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Manage regular frenzies bars
 *
 * @return {void}
 */
CookieMonster.manageFrenzyBars = function() {
	var frenzyName = '';
	var color      = '';
	var multiplier = 0;

	// Detect what kind of frenzy we're in
	switch (Game.frenzyPower) {
		case 7:
			multiplier = 77 + 77 * Game.Has('Get lucky');
			frenzyName = 'Frenzy';
			color      = 'yellow';
			break;

		case 666:
			multiplier = 6 + 6 * Game.Has('Get lucky');
			frenzyName = 'Blood Frenzy';
			color      = 'green';
			break;

		case 0.5:
			multiplier = 66 + 66 * Game.Has('Get lucky');
			frenzyName = 'Clot';
			color      = 'red';
			break;
	}

	// Remove bars if the frenzy has ended or we disabled them
	if (Game.frenzy <= 0 || !this.getBooleanSetting('BuffBars')) {
		return this.fadeOutBar(color);
	}

	this.updateBar(frenzyName, color, Game.frenzy);

	// No idea what that does
	var buffColors = ['yellow', 'green', 'red'];
	for (var thisColor in buffColors) {
		this.fadeOutBar(buffColors[thisColor], color);
	}
};

/**
 * Manage clicking frenzies bars
 *
 * @return {void}
 */
CookieMonster.manageClickingFrenzy = function() {
	if (Game.clickFrenzy <= 0 || !this.getBooleanSetting('BuffBars')) {
		return this.fadeOutBar('blue');
	}

	this.updateBar('Click frenzy', 'blue', Game.clickFrenzy);
};

/**
 * Manage the "Next Reindeer" bar
 *
 * @return {void}
 */
CookieMonster.manageNextReindeer = function() {
	var timers = [Game.seasonPopup.time, Game.seasonPopup.minTime, Game.seasonPopup.maxTime];
	var width  = timers[2] - timers[0];

	// Hide if Reindeer on screen
	if (timers[0] <= 0 || this.$reindeer.is(':visible') || !this.getBooleanSetting('CookieBar')) {
		return this.fadeOutBar('orange');
	}

	this.updateBar('Next Reindeer', 'orange', width, width / timers[2] * 100);
};

/**
 * Manage the "Next cookie" bar
 *
 * @return {void}
 */
CookieMonster.manageNextCookie = function() {
	var barsWidth = parseInt(this.$timerBars.css('width'));
	var timers    = [Game.goldenCookie.time, Game.goldenCookie.minTime, Game.goldenCookie.maxTime];
	var width     = timers[2] - timers[0];
	var countdown = Math.round(width / Game.fps);

	// Update title
	if (countdown > 0 && this.$goldenCookie.is(':hidden')) {
		this.titleModifier = this.getBooleanSetting('CookieBar') ? '(' + countdown + ') ' : '';
	}

	// Cancel if disabled
	if (timers[0] <= 0 || this.$goldenCookie.is(':visible') || !this.getBooleanSetting('CookieBar')) {
		return this.fadeOutBar('purple');
	}

	this.updateBar('Next Cookie', 'purple', width, width / timers[2] * 100);
	$('#cmt2_'+this.color('purple')).css('max-width', (barsWidth - 189) * 0.67 + "px");
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Update a buff bar's informations
 *
 * @param {String}  name
 * @param {String}  color
 * @param {Integer} timer
 * @param {Integer} width
 *
 * @return {void}
 */
CookieMonster.updateBar = function (name, color, timer, width) {
	var $bar = $('#cookie-monster__timer-'+color);

	// Create bar if it doesn't exist
	if ($bar.length !== 1) {
		this.createBar(name, color);
	}

	// Define text count and CSS width
	var count = timer / Game.fps;
	if (typeof width === 'undefined') {
		width = timer / Game.goldenCookie.maxTime * 100;
	}

	$('#cmt_'+color).css('width', width);
	$('#cmt_time_'+color).text(Math.round(count));
	$bar.fadeIn(250);
};

/**
 * Append a timer bar
 *
 * @param {String}  color
 * @param {Integer} count
 *
 * @return {void}
 */
CookieMonster.createBar = function (name, color) {
	var secondBar  = '';

	// Add second bar for golden cookies
	if (name === 'Next Cookie') {
		secondBar = '<div class="cm-buff-bar__bar background-purple" id="cmt2_'+this.color('purple')+'"></div>';
	}

	this.$timerBars.append(
		'<div class="cm-buff-bar" id="cookie-monster__timer-' + color + '">'+
			'<table cellpadding="0" cellspacing="0">'+
				'<tr>' +
					'<td>' + name + "<td>" +
					'<td>'+
						'<div class="cm-buff-bar__container background-' +color+ '" id="cmt_' + color + '">'+
							secondBar +
							'<div class="cm-buff-bar__timer" id="cmt_time_' + color + '">0</div>'+
						'</div>'+
					'</td>'+
					'<td style="width:55px;"></td>'+
				'</tr>' +
			'</table>'+
		'</div>');
};

/**
 * Fade out a bar of a certain color
 *
 * @param {string} color
 *
 * @return {void}
 */
CookieMonster.fadeOutBar = function(color, match) {
	var $bar = $("#cookie-monster__timer-" + color);

	if ($bar.length === 1 && $bar.css("opacity") === "1" && color !== match) {
		$bar.stop(true, true).fadeOut(250);
	}
};
/**
 * Load a setting from localStorage
 *
 * @param {integer} key
 * @param {string}  name
 * @param {mixed}   defaultValue
 *
 * @return {void}
 */
CookieMonster.loadSetting = function(name) {
	// If we have a value in memory, load it
	if (localStorage[name] !== undefined) {
		this.setSetting(name, parseInt(localStorage[name], 10));
	}

	// Else save default
	else {
		localStorage[name] = this.getSetting(name);
	}
};

/**
 * Load the various settings from localStorage
 *
 * @return {void}
 */
CookieMonster.loadSettings = function() {
	for (var setting in this.settings) {
		this.loadSetting(setting);
	}

	this.toggleBar();
};

/**
 * Update the settings in localStorage
 *
 * @return {void}
 */
CookieMonster.saveSettings = function() {
	if (typeof Storage !== 'undefined' || typeof localStorage !== 'undefined') {
		for (var setting in this.settings) {
			localStorage[setting] = this.getSetting(setting);
		}
	}

	this.toggleBar();
};

//////////////////////////////////////////////////////////////////////
////////////////////////// GETTERS AND SETTERS ///////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Toggle a setting to its next possible value
 *
 * @param {String} setting
 *
 * @return {Void}
 */
CookieMonster.toggleSetting = function(setting) {
	var option  = this.settings[setting];
	var current = option.value;

	// Look for available states
	var states = [];
	switch (setting) {
		case 'ShortNumbers':
		case 'UpgradeDisplay':
			states = [0, 1, 2];
			break;

		case 'Refresh':
			states = [1e3, 500, 250, 100, 33];
			break;

		case 'LuckyAlert':
			states = [0, 1, 2, 3];
			break;

		default:
			states = [0, 1];
			break;
	}

	// Look for next state, or go back to start
	var next = states.indexOf(current) + 1;
	next = typeof states[next] !== 'undefined' ? states[next] : states[0];

	this.setSetting(setting, next);

	return next;
};

/**
 * Set a setting by name
 *
 * @param {String} setting
 * @param {Mixed}  value
 */
CookieMonster.setSetting = function(setting, value) {
	this.settings[setting].value = value;
};

/**
 * Get an option's value by name
 *
 * @param {String}  setting
 * @param {Boolean} asBoolean
 *
 * @return {Mixed}
 */
CookieMonster.getSetting = function(setting) {
	return this.settings[setting].value;
};

/**
 * Alias for getSetting(setting, true)
 *
 * @param {String} setting
 *
 * @return {Mixed}
 */
CookieMonster.getBooleanSetting = function (setting) {
	return this.getSetting(setting) ? true : false;
};

/**
 * Get the text version state of an option
 *
 * @param {integer} name
 *
 * @return {string}
 */
CookieMonster.getOptionState = function(name) {
	var method = 'get'+name+'State';
	if (typeof this[method] !== 'undefined') {
		return this[method]();
	}

	return (this.getSetting(name) === 0) ? 'OFF' : 'ON';
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// OPTIONS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Toggle an option's status
 *
 * @param {DOMElement} option
 *
 * @return {void}
 */
CookieMonster.toggleOption = function(option) {
	var $option   = $(option);
	var optionKey = $option.data('option');

	// Update option
	this.toggleSetting(optionKey);
	$option.text(this.getLabel(optionKey));

	switch (optionKey) {
		case 'Colorblind':
			this.loadStyles();
			break;
		case 'ColoredPrices':
			this.updateTooltips("objects");
			break;
		case 'UpgradeIcons':
			Game.RebuildUpgrades();
			break;
		case 'UpgradeDisplay':
			this.updateUpgradeDisplay();
			break;
		case 'ShortNumbers':
			Game.RebuildStore();
			Game.RebuildUpgrades();
			this.updateTable();
			break;
	}

	this.saveSettings();
};

//////////////////////////////////////////////////////////////////////
///////////////////////////// OPTION LABELS //////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the label for an option
 *
 * @param {String} option
 *
 * @return {String}
 */
CookieMonster.getLabel = function(option) {
	return this.settings[option].label+ ' (' +this.getOptionState(option)+ ')';
};

/**
 * Get the description of an option
 *
 * @param {String} option
 *
 * @return {String}
 */
CookieMonster.getDescription = function(option) {
	return this.settings[option].desc;
};

//////////////////////////////////////////////////////////////////////
///////////////////////////// OPTION VALUES //////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get a text version of the current short numbers option
 *
 * @return {string}
 */
CookieMonster.getShortNumbersState = function() {
	switch (this.getSetting('ShortNumbers') * 1) {
		case 1:
			return 'ON [A]';
		case 2:
			return 'ON [B]';
		case 0:
			return 'OFF';
		default:
			return 'OFF';
	}
};

/**
 * Get a text version of the current refresh rate
 *
 * @return {string}
 */
CookieMonster.getRefreshState = function() {
	switch (this.getSetting('Refresh') * 1) {
		case 1e3:
			return '1 fps';
		case 500:
			return '2 fps';
		case 250:
			return '4 fps';
		case 100:
			return '10 fps';
		case 33:
			return '30 fps';
		default:
			return '1 fps';
	}
};

/**
 * Get a text version of the "Upgrade display" option
 *
 * @return {string}
 */
CookieMonster.getUpgradeDisplayState = function() {
	switch (this.getSetting('UpgradeDisplay') * 1) {
		case 1:
			return 'Normal';
		case 2:
			return 'All';
		case 0:
			return 'None';
		default:
			return 'Normal';
	}
};

/**
 * Get a text version of the "Luck alerts" option
 *
 * @return {string}
 */
CookieMonster.getLuckyAlertState = function () {
	switch (this.getSetting('LuckyAlert') * 1) {
		case 1:
			return 'Both';
		case 2:
			return 'Icons';
		case 3:
			return 'Notes';
		case 0:
			return 'Off';
		default:
			return 'Both';
	}
};
/**
 * Create the various upgrade counters above the store
 *
 * @return {void}
 */
CookieMonster.createStoreCounters = function() {

	$('#storeTitle').after(
	'<table cellpadding="0" cellspacing="0">'+
		'<tr>'+
			'<td align="center" class="text-blue"   id="cm_up_q0">0</td>' +
			'<td align="center" class="text-green"  id="cm_up_q1">0</td>' +
			'<td align="center" class="text-yellow" id="cm_up_q2">0</td>' +
			'<td align="center" class="text-orange" id="cm_up_q3">0</td>' +
			'<td align="center" class="text-red"    id="cm_up_q4">0</td>' +
			'<td align="center" class="text-purple" id="cm_up_q5">0</td>' +
		'</tr>'+
	'</table>');
};

/**
 * Check if an upgrade is in store
 *
 * @param {Array} upgrade
 *
 * @return {Boolean}
 */
CookieMonster.isInStore = function(upgrade) {
	return Game.UpgradesInStore.indexOf(upgrade) !== -1;
};

/**
 * Update the stylings of the upgrades to the selected option
 *
 * @return {void}
 */
CookieMonster.updateUpgradeDisplay = function() {
	var height;

	switch (this.getSetting('UpgradeDisplay') * 1) {
		case 1:
			height = '';
			break;

		case 2:
			height = 'auto';
			break;

		default:
			height = '0px';
			break;
	}

	$('#upgrades').css('height', height);
};
//////////////////////////////////////////////////////////////////////
////////////////////////////// DOM HANDLERS //////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Create a tooltip for a type of object
 *
 * @param {Object} object
 * @param {String} type
 *
 * @return {Void}
 */
CookieMonster.makeTooltip = function(object, type) {
	var identifier = 'cm_'+type+'_'+object.id+'_';
	var warning    = this.getImage('warning');
	var caution    = this.getImage('caution');

	object.desc += ''+
		'<div id="' +identifier+ 'lucky_" style="position:absolute; top:-25px; left:-12px; height:32px;">'+
			'<div class="cm-tooltip__image" id="' +identifier+ 'lucky_div_warning" style="background:url(' +warning+ ');"></div>'+
			'<div class="cm-tooltip__image" id="' +identifier+ 'lucky_div_caution" style="background:url(' +caution+ ');"></div>'+
		'</div>'+
		'<div class="cm-tooltip" id="' +identifier+ '"></div>'+
		'<div id="' +identifier+ 'note_div" style="position:absolute; left:0px; margin-top:10px; color:white;">'+
			'<div id="' +identifier+ 'note_div_warning" class="cm-tooltip__warning border-red">'+
				'<strong class="text-red">Warning:</strong>' +this.texts.warning+ '<br>'+
				'<span id="' +identifier+ 'warning_amount"></span>'+
				'<div id="' +identifier+ 'lucky_div_warning">'+
					'<img src="' +warning+ '">'+
				'</div>'+
			'</div>'+
			'<div id="' +identifier+ 'note_div_caution" class="cm-tooltip__warning border-yellow">'+
				'<strong class="text-yellow">Caution:</strong>' +this.texts.warning+ ' (Frenzy)<br>'+
				'<span id="' +identifier+ 'caution_amount"></span>'+
				'<div id="' +identifier+ 'lucky_div_warning">'+
					'<img src="' +caution+ '">'+
				'</div>'+
			'</div>'+
		'</div>';
};

/**
 * Update a Building/Upgrade tooltip
 *
 * @param {String}  type
 * @param {Integer} key
 * @param {Array}   colors
 * @param {Array}   deficits
 * @param {Array}   display
 * @param {Array}   informations
 *
 * @return {Void}
 */
CookieMonster.updateTooltip = function(type, key, colors, deficits, display, informations) {
	var identifier = '#cm_'+type+'_'+key+'_';
	var $object    = $(identifier);

	// Create tooltip if it doesn't exist
	var object = type === 'up' ? Game.UpgradesById[key] : Game.ObjectsById[key];
	if (object.desc.indexOf('cm_'+type+'_'+key) === -1) {
		this.makeTooltip(object, type);
	}

	$object.css({
		'border'  : '1px solid #'+this.color(colors[0]),
		'display' : '',
	}).html(
		'<div class="text-blue" style="position:absolute; top:4px; left:4px; font-weight:bold;">Bonus Income</div>'+
		'<div align=right style="position:absolute; top:18px; left:4px; color:white;">' + this.formatNumber(informations[0]) + '</div>'+

		'<div class="text-blue" style="position:absolute; top:34px; left:4px; font-weight:bold;">Base Cost Per Income</div>'+
		'<div align=right class="text-' +colors[0]+ '" style="position:absolute; top:48px; left:4px;">' + this.formatNumber(informations[1]) + '</div>'+

		'<div class="text-blue" style="position:absolute; top:64px; left:4px; font-weight:bold;">Time Left</div>'+
		'<div align=right class="text-' +colors[1]+ '" style="position:absolute; top:78px; left:4px;">' + this.formatTime(informations[2]) + "</div>"
	);

	$(identifier+'warning_amount').text('Deficit: ' + this.formatNumber(deficits[0]));
	$(identifier+'caution_amount').text('Deficit: ' + this.formatNumber(deficits[1]));

	if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 2) {
		$(identifier+'lucky_div_warning').toggle(display[0]);
		$(identifier+'lucky_div_caution').toggle(display[1]);
	} else {
		$(identifier+'lucky_div_warning').hide();
		$(identifier+'lucky_div_caution').hide();
	}

	if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 3) {
		$(identifier+'note_div_warning').toggle(display[0]);
		$(identifier+'note_div_caution').toggle(display[1]);
	} else {
		$(identifier+'note_div_warning').hide();
		$(identifier+'note_div_caution').hide();
	}
};

//////////////////////////////////////////////////////////////////////
///////////////////////////////// CACHE //////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Save the currently available tooltips
 *
 * @return {void}
 */
CookieMonster.saveTooltips = function() {
	Game.UpgradesById.forEach(function (upgrades, key) {
		CookieMonster.tooltips[key] = upgrades.desc;
	});
	Game.ObjectsById.forEach(function (building, key) {
		CookieMonster.buildingTooltips[key] = building.desc;
	});
};

/**
 * Create the DOM for all tooltips
 *
 * @return {[type]} [description]
 */
CookieMonster.setupTooltips = function() {
	this.updateTooltips('all');
	Game.RebuildUpgrades();
	Game.RebuildStore();
};

/**
 * Update one or more types of tooltips
 *
 * @param {string} which [upgrades,objects,all]
 *
 * @return {void}
 */
CookieMonster.updateTooltips = function(which) {
	// Upgrades
	if (which === 'all' || which === 'upgrades') {
		this.inStore = [0, 0, 0, 0, 0, 0];

		Game.UpgradesById.forEach(function (upgrade) {
			CookieMonster.manageUpgradeTooltips(upgrade);
		});
	}

	// Buildings
	if (which === 'all' || which === 'objects') {
		Game.ObjectsById.forEach(function (building) {
			CookieMonster.manageBuildingTooltip(building);
		});
	}
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// MANAGERS ////////////////////////////
//////////////////////////////////////////////////////////////////////

CookieMonster.manageUpgradeTooltips = function(upgrade) {
	var income = this.getUpgradeWorth(upgrade);

	return this.manageUpgradesTooltips(income, upgrade);
};

CookieMonster.manageUpgradesTooltips = function(income, upgrade) {
	var price   = upgrade.basePrice;
	var colors  = ['yellow', 'yellow'];

	var informations = [this.roundDecimal(price / income), Math.round(this.secondsLeft(upgrade.id, 'upgrade'))];
	var maxValues    = [Math.max.apply(Math, this.bottomBar.cpi), Math.max.apply(Math, this.bottomBar.cpi)];
	var minValues    = [Math.min.apply(Math, this.bottomBar.cpi), Math.min.apply(Math, this.bottomBar.cpi)];

	for (var i = 0; i < colors.length; i++) {
		if (informations[i] < minValues[i]) {
			colors[i] = 'blue';
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[0]++;
			}
		} else if (informations[i] === minValues[i]) {
			colors[i] = 'green';
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[1]++;
			}
		} else if (informations[i] === maxValues[i]) {
			colors[i] = 'red';
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[4]++;
			}
		} else if (informations[i] > maxValues[i]) {
			colors[i] = 'purple';
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[5]++;
			}
		} else if (maxValues[i] - informations[i] < informations[i] - minValues[i]) {
			colors[i] = 'orange';
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[3]++;
			}
		} else {
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[2]++;
			}
		}
	}

	for (i = 0; i < this.inStore.length; i++) {
		$('#cm_up_q' + i).text(this.inStore[i]);
	}
	if (this.getSetting('UpgradeIcons') && this.isInStore(upgrade)) {
		$('#upgrade' + Game.UpgradesInStore.indexOf(upgrade)).html('<div class="cookie-monster__upgrade background-' +colors[0]+ '"></div>');
	}

	var rewards  = [this.luckyReward('regular'), this.luckyReward('frenzy')];
	var display  = [false, false];
	var deficits = [0, 0];

	if (Game.cookies - price < rewards[0]) {
		display[0]  = true;
		deficits[0] = rewards[0] - (Game.cookies - price);
	}
	if (Game.cookies - price < rewards[1]) {
		display[1]  = true;
		deficits[1] = rewards[1] - (Game.cookies - price);
	}

	return this.updateTooltip('up', upgrade.id, colors, deficits, display, [
		this.roundDecimal(income),
		informations[0],
		informations[1],
	]);
};

CookieMonster.manageBuildingTooltip = function(building) {
	var rewards  = [this.luckyReward('regular'), this.luckyReward('frenzy')];
	var display  = [false, false];
	var deficits = [0, 0];

	if (Game.cookies - building.price < rewards[0]) {
		display[0]  = true;
		deficits[0] = rewards[0] - (Game.cookies - building.price);
	}
	if (Game.cookies - building.price < rewards[1]) {
		display[1]  = true;
		deficits[1] = rewards[1] - (Game.cookies - building.price);
	}

	// Get statistics
	var colors       = ['yellow', 'yellow'];
	var informations = [this.bottomBar.cpi[building.id], this.bottomBar.timeLeft[building.id]];
	var maxValues    = [Math.max.apply(Math, this.bottomBar.cpi), Math.max.apply(Math, this.bottomBar.timeLeft)];
	var minValues    = [Math.min.apply(Math, this.bottomBar.cpi), Math.min.apply(Math, this.bottomBar.timeLeft)];

	// Compute building color
	for (var i = 0; i < colors.length; i++) {
		if (informations[i] === minValues[i]) {
			colors[i] = 'green';
		} else if (informations[i] === maxValues[i]) {
			colors[i] = 'red';
		} else if (maxValues[i] - informations[i] < informations[i] - minValues[i]) {
			colors[i] = 'orange';
		}
	}

	// Colorize building price
	$('.price', '#product'+building.id).addClass(this.getBooleanSetting('ColoredPrices') ? 'text-'+colors[0] : '');

	return this.updateTooltip('ob', building.id, colors, deficits, display, [
		this.bottomBar.bonus[building.id],
		informations[0],
		informations[1],
	]);
};
/*jshint -W054 */

/**
 * Setup CookieMonster
 *
 * @return {void}
 */
CookieMonster.start = function() {
	if (!this.shouldRun()) {
		return;
	}

	// Add Cookie Monster elements
	this.createBottomBar();
	this.createGoldenOverlay();
	this.createFlashOverlay();
	this.createBarsContainer();
	this.createStoreCounters();

	// Load stylesheet
	this.loadSettings();
	this.loadStyles();

	// Add ID to favicon
	$('link[href="favicon.ico"]').attr('id', 'cm_favicon');

	// Setup Cookie Monster
	this.saveTooltips();
	this.update();
	this.setupTooltips();

	// Start the loop
	this.mainLoop();

	Game.Popup('<span style="color:#' +this.color('yellow')+ '; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black !important;">Cookie Monster ' + this.version + " Loaded!</span>");
};

/**
 * Load some styles
 *
 * @return {void}
 */
CookieMonster.loadStyles = function() {
	var stylesheet = this.runningInLocal() ? 'http://localhost/_github/cookie-monster/dist/cookie-monster' : 'https://rawgithub.com/Anahkiasen/cookie-monster/master/dist/cookie-monster';
	var $styles    = $('#cookie-monster__styles');

	// Create link if undefined
	if ($styles.length === 0) {
		$('head').append('<link id="cookie-monster__styles" rel="stylesheet" href="">');
		$styles = $('#cookie-monster__styles');
	}

	// Add colorblind modifier if necessary
	if (this.getBooleanSetting('Colorblind')) {
		stylesheet += '-colorblind';
	}

	$styles.attr('href', stylesheet+'.min.css');
};

/**
 * Executes the main updating loop to refrsh CookieMonster
 *
 * @return {void}
 */
CookieMonster.mainLoop = function() {
	CookieMonster.updateTable();
	CookieMonster.updateTooltips('all');
	CookieMonster.manageBuffs();

	CookieMonster.emphasizeGolden();
	CookieMonster.emphasizeSeason();

	CookieMonster.loops++;

	if (CookieMonster.loops === 1) {
		Game.RebuildStore();
	}

	// Use animationFrame if available
	setTimeout(function() {
		CookieMonster.mainLoop();
	}, CookieMonster.getSetting('Refresh'));
};

//////////////////////////////////////////////////////////////////////
/////////////////////// THE SEVENTH LAYER OF HELL ////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Execute replacements on a method's code
 *
 * @param {String}  code
 * @param {Closure} replaces
 *
 * @return {String}
 */
CookieMonster.replaceCode = function(code, replaces) {
	return replaces(code.toString())
		.replace(/^function[^{]+{/i, "")
		.replace(/}[^}]*$/i, "");
};

/**
 * Replace a native CookieClicker function with another
 *
 * @param {String}  native
 * @param {Closure} replaces
 *
 * @return {void}
 */
CookieMonster.replaceNative = function(native, replaces, args) {
	var newCode = Game[native];
	if (typeof args === 'undefined') {
		args = '';
	}

	Game[native] = new Function(args, this.replaceCode(newCode, replaces));
};

/**
 * Hook CookieMonster onto various parts of the Cookie Clicker code
 *
 * It's not the prettiest code in the world but I can't think
 * of a better way
 *
 * @return {void}
 */
CookieMonster.update = function() {
	this.replaceNative('Logic', function (native) {
		return native.replace('.title=', '.title=CookieMonster.titleModifier+');
	});
	this.replaceNative('UpdateMenu', function (native) {
		return native.replace("Statistics</div>'+", "Statistics</div>'+\n\n"+
			"'<div class=\"subsection\">" +
				"<div class=\"title\"><span class=\"text-blue\">Cookie Monster Goodies</span></div>"+
				"<div class=\"listing\"><b>\"Lucky!\" Cookies Required:</b> '          + CookieMonster.luckyReward('regular', true) + '</div>"+
				"<div class=\"listing\"><b>\"Lucky!\" Cookies Required (Frenzy):</b> ' + CookieMonster.luckyReward('frenzy', true) + '</div>"+
				"<div class=\"listing\"><b>\"Lucky!\" Reward (MAX):</b> '              + CookieMonster.maxLuckyReward('max') + '</div>"+
				"<div class=\"listing\"><b>\"Lucky!\" Reward (MAX) (Frenzy):</b> '     + CookieMonster.maxLuckyReward('frenzy') + '</div>"+
				"<div class=\"listing\"><b>\"Lucky!\" Reward (CUR):</b> '              + CookieMonster.maxLuckyReward('current') + '</div><br>"+
				"<div class=\"listing\"><b>Heavenly Chips (MAX):</b> '                 + CookieMonster.getHeavenlyChip('max') + '</div>"+
				"<div class=\"listing\"><b>Heavenly Chips (CUR):</b> '                 + CookieMonster.getHeavenlyChip('cur') + '</div>"+
				"<div class=\"listing\"><b>Cookies To Next Chip:</b> '                 + CookieMonster.getHeavenlyChip('next') + '</div>"+
				"<div class=\"listing\"><b>Time To Next Chip:</b> '                    + CookieMonster.getHeavenlyChip('time') + '</div>"+
			"</div>'+");
	});

	var cookieMonsterSettings = "\n'<div class=\"subsection\"><div class=\"title\"><span class=\"text-blue\">Cookie Monster Settings</span></div>";
	for (var setting in this.settings) {
		cookieMonsterSettings +=
			'<div class="listing">'+
				"<a class=\"option\" data-option=\"" +setting+ "\" onclick=\"CookieMonster.toggleOption(this);\">' + CookieMonster.getLabel('" +setting+ "') + '</a>"+
				"<label>' + CookieMonster.getDescription('" +setting+ "') + '</label>"+
			'</div>';
	}
	cookieMonsterSettings += "</div>'+";

	this.replaceNative('UpdateMenu', function (native) {
		return native
			.replace("OFF')+'</div>'+", "OFF')+'</div>'+" + cookieMonsterSettings)
			.replace("startDate=Game.sayTime(date.getTime()/1000*Game.fps,2);", "startDate = CookieMonster.formatTime(((new Date).getTime() - Game.startDate) / 1000, '');");
	});

	var n = "\n" +
		"var cm_id = from.id;" +
		'\nif(cm_id === "") { cm_id = $(from).parents(".product").prop("id"); }' +
		'\nif(cm_id === "product5" || cm_id === "product6" || cm_id === "product7" || cm_id === "product8" || cm_id === "product9") { y -= 100; }' +
		'\nif(cm_id === "product8" || cm_id === "product9") { y -= 13; }' +
		'\nif(cm_id === "product9" && !CookieMonster.getBooleanSetting("ShortNumbers")) { y -= 13; }' + "\n";

	Game.tooltip.draw = new Function('from,text,x,y,origin', this.replaceCode(Game.tooltip.draw, function (native) {
		return native
			.replace("implemented');}", "implemented');}" + n)
			.replace("this.on=1;", "this.on=1;\nCookieMonster.updateTooltips('all');");
	}));

	this.replaceNative('Reset', function (native) {
		return native.replace("Game.researchT=0;", "Game.researchT=0;\nCookieMonster.$monsterBar.text('');");
	}, 'bypass');

	this.replaceNative('LoadSave', function (native) {
		return native.replace("Game.Popup('Game loaded');", "Game.Popup('Game loaded');\nCookieMonster.$timerBars.text('');");
	}, 'data');

	this.replaceNative('RebuildStore', function (native) {
		return native.replace("l('products').innerHTML=str;", "l('products').innerHTML=str;\nCookieMonster.updateTooltips('objects');");
	});

	this.replaceNative('Draw', function (native) {
		return native.replace("Beautify(Math.round(Game.cookiesd))", "CookieMonster.formatNumberRounded(Game.cookiesd)");
	});

	Beautify = new Function('what,floats', this.replaceCode(Beautify, function (native) {
		return native.replace("var str='';", "return CookieMonster.formatNumber(what);" + "\nvar str='';");
	}));
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Checks if we're running in local or not
 *
 * @return {Boolean}
 */
CookieMonster.runningInLocal = function() {
	var $script = $('script[src]').last();
	if (!$script.length) {
		return true;
	}

	return $script.attr('src').indexOf('localhost') !== -1;
};

/**
 * Checks if CookieMonster should run
 *
 * @return {Boolean}
 */
CookieMonster.shouldRun = function() {
	// Check if we're in Cookie Clicker
	if (document.title.indexOf('Cookie Clicker') === -1 || this.$game.length === 0) {
		return this.displayError("These aren't the droids you're looking for.");
	}

	// Cancel if already loaded
	if (this.$monsterBar.length !== 0) {
		return this.displayError('Cookie Monster is already loaded, silly!');
	}

	return true;
};

/**
 * Display an error as an alert
 *
 * @param {String} error
 *
 * @return {Void}
 */
CookieMonster.displayError = function(error) {
	if (typeof alert !== 'undefined') {
		alert('Cookie Monster ' +this.version+ "\n\n" + error);
	}

	return false;
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// RUNTIME /////////////////////////////
//////////////////////////////////////////////////////////////////////

CookieMonster.start();