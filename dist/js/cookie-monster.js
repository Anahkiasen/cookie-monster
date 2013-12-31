/* exported CookieMonster */

/**
 * The CookieMonster plugin
 *
 * @type {Object}
 */
var CookieMonster = {

	// Runtime variables
	////////////////////////////////////////////////////////////////////

	version : '1.040.05',
	loops   : 0,

	humanNumbers : new Array(
		[' M', ' B', ' T', ' Qa', ' Qi', ' Sx', ' Sp', ' Oc', ' No', ' Dc'],
		[' M', ' G', ' T', ' P', ' E', ' Z', ' Y', ' Oc', ' No', ' Dc']
	),

	// Emphasizers
	////////////////////////////////////////////////////////////////////

	titleModifier : '',
	onScreen      : {},

	// Stored informations
	////////////////////////////////////////////////////////////////////

	cacheStore   : {},
	bottomBar    : {
		items    : [],
		bonus    : [],
		cpi      : [],
		timeLeft : [],
	},
	informations : {
		items    : [],
		bonus    : [],
		cpi      : [],
		timeLeft : [],
	},

	// Upgrades
	////////////////////////////////////////////////////////////////////

	upgradeCounts  : [0, 0, 0, 0, 0, 0],
	milkPotentials : {
		'Kitten helpers'            : 0.05,
		'Kitten workers'            : 0.1,
		'Kitten engineers'          : 0.2,
		'Kitten overseers'          : 0.2,
		'Santa\'s milk and cookies' : 0.05,
	},

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

};

// Export module
if (typeof module !== 'undefined') {
	module.exports = CookieMonster;
}
CookieMonster.Events = {};

/**
 * Event when the user clicks on a golden cookie
 *
 * @return {void}
 */
CookieMonster.Events.onGoldenClick = function() {
	CookieMonster.$goldenCookie.click(function() {
		if (Game.frenzyPower === 7) {
			CookieMonster.fadeOutBar('Frenzy');
			CookieMonster.manageFrenzyBars();
		}
	});
};

/*jshint -W054 */

/**
 * Hook CookieMonster onto various parts of the Cookie Clicker code
 *
 * It's not the prettiest code in the world but I can't think
 * of a better way
 *
 * @return {void}
 */
CookieMonster.hookIntoNative = function() {

	// Add Cookie Monster modifiers in title
	this.replaceNative('Logic', function (native) {
		return native.replace('.title=', '.title=CookieMonster.titleModifier+');
	});

	// Add additional settings and statistics to main menu
	this.replaceNative('UpdateMenu', function (native) {
		return native
			.replace("Statistics</div>'+", CookieMonster.getStatistics())
			.replace("OFF')+'</div>'+", "OFF')+'</div>'+" + CookieMonster.getSettingsText())
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
			.replace("this.on=1;", "this.on=1;\nCookieMonster.updateTooltips();");
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
/////////////////////////////// CORE DATA ////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the HTML for the additional statistics
 *
 * @return {String}
 */
CookieMonster.getStatistics = function() {
	var statisticsHtml = "Statistics</div>'+\n\n'<div class=\"subsection\"><div class=\"title\"><span class=\"text-blue\">Cookie Monster Goodies</span></div>";
	var statistics = {
		'Lucky Cookies': {
			'"Lucky!" Cookies Required'          : "CookieMonster.luckyReward('regular', true)",
			'"Lucky!" Cookies Required (Frenzy)' : "CookieMonster.luckyReward('frenzy', true)",
			'"Lucky!" Reward (MAX)'              : "CookieMonster.maxLuckyReward('max')",
			'"Lucky!" Reward (MAX) (Frenzy)'     : "CookieMonster.maxLuckyReward('frenzy')",
			'"Lucky!" Reward (CUR)'              : "CookieMonster.maxLuckyReward('current')",
		},
		'Heavenly Chips': {
			'Heavenly Chips (MAX)' : "CookieMonster.getHeavenlyChip('max')",
			'Heavenly Chips (CUR)' : "CookieMonster.getHeavenlyChip('cur')",
			'Cookies To Next Chip' : "CookieMonster.getHeavenlyChip('next')",
			'Time To Next Chip'    : "CookieMonster.getHeavenlyChip('time')",
		},
		'Wrinklers': {
			'Cookies sucked'       : 'CookieMonster.getWrinklersSucked()',
			'Reward after popping' : 'CookieMonster.getWrinklersReward()',
		},
	};

	// Loop over statistics and add them one by one
	for (var section in statistics) {
		statisticsHtml += '<div class="subtitle">'+section+'</div>';
		for (var statistic in statistics[section]) {
			statisticsHtml += "<div class=\"listing\"><b>" +statistic+ " :</b> ' +" +statistics[section][statistic]+ "+ '</div>";
		}
	}

	return statisticsHtml + "</div>'+";
};

/**
 * Get the HTML for the additional settings
 *
 * @return {String}
 */
CookieMonster.getSettingsText = function() {
	var settings = "\n'<div class=\"subsection\"><div class=\"title\"><span class=\"text-blue\">Cookie Monster Settings</span></div>";

	// Loop over the settings and add they one by one
	for (var setting in this.settings) {
		settings +=
			'<div class="listing">'+
				"<a class=\"option\" data-option=\"" +setting+ "\" onclick=\"CookieMonster.toggleOption(this);\">' + CookieMonster.getLabel('" +setting+ "') + '</a>"+
				"<label>' + CookieMonster.getDescription('" +setting+ "') + '</label>"+
			'</div>';
	}

	return settings + "</div>'+";
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
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
	this.hookIntoNative();
	this.setupTooltips();

	// Events
	this.Events.onGoldenClick();

	// Start the loop
	this.mainLoop();

	Game.Popup('<span class="cm-popup">Cookie Monster ' + this.version + " Loaded!</span>");
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

	$styles.attr('href', stylesheet+'.min.css?'+new Date().getTime());
};

/**
 * Executes the main updating loop to refrsh CookieMonster
 *
 * @return {void}
 */
CookieMonster.mainLoop = function() {
	CookieMonster.updateTable();
	CookieMonster.updateTooltips();
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
	var milkModifiers      = [];
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
	});

	// Future production multiplier
	var upgrade = Game.UpgradesById[upgradeKey];
	if (upgrade && !upgrade.bought && upgrade.desc.indexOf('Cookie production multiplier <b>+') !== -1) {
		futureMultiplier += upgrade.desc.substr(33, upgrade.desc.indexOf('%', 33) - 33) * 1;
	}

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
	var onScreen = this.whileOnScreen('goldenCookie',
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

	if (onScreen) {
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

//////////////////////////////////////////////////////////////////////
//////////// THE "I HAVE NO FUCKING IDEA WHAT THESE DO" LAND /////////
//////////////////////////////////////////////////////////////////////

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
	this.whileOnScreen('seasonPopup',
		function() {
			this.$flashOverlay.hide();
		},
		function() {
			this.Emphasizers.playSound('http://www.freesound.org/data/previews/121/121099_2193266-lq.mp3');
			this.Emphasizers.flashScreen();
		});
};

/**
 * Get the amount of cookies sucked by wrinklers
 *
 * @return {Integer}
 */
CookieMonster.getWrinklersSucked = function(raw) {
	var sucked = 0;

	Game.wrinklers.forEach(function(wrinkler) {
		sucked += wrinkler.sucked;
	});

	return raw ? sucked : this.formatNumber(sucked);
};

/**
 * Get the reward for popping all wrinklers
 *
 * @return {Integer}
 */
CookieMonster.getWrinklersReward = function() {
	return this.formatNumber(this.getWrinklersSucked(true) * 1.1);
};
/**
 * Get how much buying an upgrade would earn
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

	if (this.matches(upgrade, 'Grandmas are <b>twice</b> as efficient')) {
		unlocked += this.lgt(upgrade);
	}

	// Grandmas per grandmas
	else if (this.matches(upgrade, 'for every 50 grandmas')) {
		income = this.getGrandmasPerGrandmaOutcome();
	}

	// Grandmas per portals
	else if (this.matches(upgrade, 'for every 20 portals')) {
		income = this.getGrandmasPerPortalOutcome();
	}

	// Heavenly upgrades
	else if (this.matches(upgrade, 'potential of your heavenly')) {
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

	return income + this.callCached('getAchievementWorth', [unlocked, upgrade.id, income]);
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

	return upgrade.desc.toLowerCase().indexOf(matcher) !== -1;
};

//////////////////////////////////////////////////////////////////////
///////////////////////////// UPGRADES WORTH /////////////////////////
//////////////////////////////////////////////////////////////////////

// Classic situations
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
	var potential  = upgrade.desc.match(/<b>(.+)%<\/b>/)[1];
	var multiplier = Game.prestige['Heavenly chips'] * 2 * (potential / 100);

	return this.callCached('getAchievementWorth', [unlocked, upgrade.id, 0, multiplier]) - Game.cookiesPs;
};

// Special cases
//////////////////////////////////////////////////////////////////////

/**
 * Compute the production of Grandmas per 20 portals
 *
 * @return {Integer}
 */
CookieMonster.getGrandmasPerPortalOutcome = function() {
	var multiplier = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf('Grandmas are <b>twice</b>.') !== -1) {
			multiplier = multiplier * 2;
		}
		if (upgrade.bought && upgrade.desc.indexOf('Grandmas are <b>4 times</b> as efficient.') !== -1) {
			multiplier = multiplier * 4;
		}
	});

	return Game.ObjectsById[7].amount * 0.05 * multiplier * Game.ObjectsById[1].amount * Game.globalCpsMult;
};

/**
 * Computes the production of Grandmas per 50 grandmas
 *
 * @return {Integer}
 */
CookieMonster.getGrandmasPerGrandmaOutcome = function() {
	var multiplier = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf('Grandmas are <b>twice</b>') !== -1) {
			multiplier = multiplier * 2;
		}
		if (upgrade.bought && upgrade.desc.indexOf('Grandmas are <b>4 times</b> as efficient.') !== -1) {
			multiplier = multiplier * 4;
		}
	});

	return Game.ObjectsById[1].amount * 0.02 * multiplier * Game.ObjectsById[1].amount * Game.globalCpsMult;
};

CookieMonster.lgt = function(upgrade) {
	if (this.hasAchievement('Elder Pact') || upgrade.name.indexOf(' grandmas') === -1) {
		return false;
	}

	var todo = [];
	Game.UpgradesById.forEach(function (upgrade, key) {
		if (!upgrade.bought && upgrade.name.indexOf(' grandmas ') !== -1) {
			todo.push(key);
		}
	});

	return (todo.length === 1 && todo[0] === upgrade.id);
};

CookieMonster.getMouseAndCursorGainOutcome = function(upgradeKey) {
	var t = Game.UpgradesById[upgradeKey].desc;
	var n = 31;
	if (t.indexOf(" another ") !== -1) {
		n += 8;
	}
	var r = t.substr(n, t.indexOf("<", n) - n) * 1;
	return r * (Game.BuildingsOwned - Game.ObjectsById[0].amount) * Game.ObjectsById[0].amount * Game.globalCpsMult;
};

CookieMonster.getFourTimesEfficientOutcome = function(buildingKey) {
	return Game.ObjectsById[buildingKey].storedTotalCps * 3 * Game.globalCpsMult;
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
/**
 * Cache the results of a Closure and return it
 *
 * @param {Array}    salts
 * @param {Function} callback
 * @param {Array}    args
 *
 * @return {Mixed}
 */
CookieMonster.cache = function(salts, callback, args) {
	var state = [Game.UpgradesOwned, Game.BuildingsOwned].join('-');

	// Create entry for current state
	if (typeof this.cacheStore[state] === 'undefined') {
		this.refreshCache();
		this.cacheStore[state] = {};
	}

	// Compute salts
	args  = args || [];
	salts = this.computeSalts(salts, args);

	// If we have a cached result, return it
	if (typeof this.cacheStore[state][salts] !== 'undefined') {
		return this.cacheStore[state][salts];
	}

	// Else compute results and cache it
	var result = callback.apply(this, args);
	this.cacheStore[state][salts] = result;

	return result;
};

/**
 * Call a Cookie Monster method and cache it
 *
 * @param {String} method
 * @param {Array} args
 * @param {Array} salts
 *
 * @return {Mixed}
 */
CookieMonster.callCached = function(method, args, salts) {
	salts = salts || [];
	salts.push(method);

	return this.cache(salts, this[method], args);
};

/**
 * Refresh the cache
 *
 * @return {void}
 */
CookieMonster.refreshCache = function() {
	this.cacheStore = {};
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Compute salts from arguments an salts
 *
 * @param {Array} salts
 * @param {Array} args
 *
 * @return {String}
 */
CookieMonster.computeSalts = function(salts, args) {
	return JSON.stringify(salts.concat(args));
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
CookieMonster.whileOnScreen = function(identifier, offScreen, onScreen) {

	// Set key in array if it doesn't exist
	if (typeof this.onScreen[identifier] === 'undefined') {
		this.onScreen[identifier] = false;
	}

	// Execute the two callbacks
	if (Game[identifier].life <= 0 && this.onScreen[identifier]) {
		this.onScreen[identifier] = false;
		offScreen.call(this);
	} else if (Game[identifier].life && !this.onScreen[identifier]) {
		this.onScreen[identifier] = true;
		onScreen.call(this);
	}

	return this.onScreen[identifier];
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
CookieMonster.Emphasizers.playSound = function(sound) {
	if (!CookieMonster.getBooleanSetting('Sounds')) {
		return false;
	}

	return sound ? CookieMonster.playSound(sound) : CookieMonster.playBell();
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
	return [Math[minOrMax].apply(Math, this.informations.cpi), Math[minOrMax].apply(Math, this.informations.timeLeft)];
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
	this.informations.timeLeft[building] = informations.timeLeft;

	// Compute formatted informations
	var colors = this.getLuckyColors([informations.cpi, informations.timeLeft]);
	this.bottomBar.items[building]    = informations.items;
	this.bottomBar.bonus[building]    = this.formatNumber(informations.bonus);
	this.bottomBar.cpi[building]      = '<span class="text-' +colors[0]+ '">' +this.formatNumber(informations.cpi)+ '</span>';
	this.bottomBar.timeLeft[building] = '<span class="text-' +colors[1]+ '">' +this.formatTime(informations.timeLeft, true)+ '</span>';
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
	this.$monsterBar = $('#cookie-monster__bottom-bar');

	this.makeTable();
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

	return this.$monsterBar.html(
		'<table>'+
			'<tr>'+thead+'<th>' +this.bottomBar.items.join('</th><th>')+ '</th></tr>'+
			'<tr>'+bonus+'<td>' +this.bottomBar.bonus.join('</td><td>')+ '</td></tr>'+
			'<tr>'+baseCost+'<td>' +this.bottomBar.cpi.join('</td><td>')+ '</td></tr>'+
			'<tr>'+timeLeft+'<td>' +this.bottomBar.timeLeft.join('</td><td>')+ '</td></tr>'+
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

		// Compute informations
		var bonus    = that.roundDecimal(that.getBuildingWorth(building));
		var cpi      = that.roundDecimal(building.price / bonus);
		var count    = '(<span class="text-blue">' +building.amount+ '</span>)';
		var timeLeft = Math.round(that.secondsLeft(key, 'object'));

		// Save building informations
		that.setBuildingInformations(key, {
			items    : building.name.split(' ')[0] + ' ' + count,
			bonus    : bonus,
			cpi      : cpi,
			timeLeft : timeLeft,
		});
	});

	this.makeTable();
};
/**
 * Updates the various buff bars
 *
 * @return {void}
 */
CookieMonster.manageBuffs = function() {
	this.manageFrenzyBars();
	this.manageClickingFrenzy();
	this.manageTimersBar('seasonPopup', 'Next Reindeer');
	this.manageTimersBar('goldenCookie', 'Next Cookie');
};

/**
 * Get the width of the timers container
 *
 * @return {Integer}
 */
CookieMonster.getBarsWidth = function() {
	var windowWidth = window.innerWidth || document.documentElement;

	return 0.3 * windowWidth;
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
	var $version = $('#versionNumber');

	// Create container and move version inside it
	$('#sectionLeft').append('<div id="cookie-monster__buff-bars"><div id="versionNumber">' +$version.text()+ '</div></div>');
	$version.remove();

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
	var identifier = frenzyName.replace(' ', '');
	if (Game.frenzy <= 0 || !this.getBooleanSetting('BuffBars')) {
		return this.fadeOutBar(identifier);
	}

	// Update current bar
	this.updateBar(frenzyName, color, Game.frenzy);

	// As only one effect can be active at a time, we'll fade out
	// the other effect bars
	var buffs = ['Frenzy', 'BloodFrenzy', 'Clot'];
	for (var i = 0; i < 2; i++) {
		if (buffs[i] !== identifier) {
			this.fadeOutBar(buffs[i]);
		}
	}
};

/**
 * Manage clicking frenzies bars
 *
 * @return {void}
 */
CookieMonster.manageClickingFrenzy = function() {
	if (Game.clickFrenzy <= 0 || !this.getBooleanSetting('BuffBars')) {
		return this.fadeOutBar('Clickfrenzy');
	}

	this.updateBar('Click frenzy', 'blue', Game.clickFrenzy);
};

/**
 * Manage a bar with multiple timers (min, max, etc.)
 *
 * @param {String} name
 * @param {String} label
 *
 * @return {Void}
 */
CookieMonster.manageTimersBar = function(name, label) {
	var timers   = [Game[name].time, Game[name].minTime, Game[name].maxTime];
	var width    = timers[2] - timers[0];
	var barWidth = width / timers[2] * 100;

	// Hide if popup on screen
	if (timers[0] <= 0 || this.onScreen[name] || !this.getBooleanSetting('CookieBar')) {
		return this.fadeOutBar(label);
	}

	// Update title
	var countdown = Math.round(width / Game.fps);
	if (name === 'goldenCookie' && countdown > 0 && !this.onScreen.goldenCookie) {
		this.titleModifier = this.getBooleanSetting('CookieBar') ? '(' + countdown + ') ' : '';
	}

	var $container = this.updateBar(label, 'greyLight', width, barWidth);
	$('.cm-buff-bar__inner', $container).css('max-width', (this.getBarsWidth() - 189) * 0.67 + 'px');
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
	var identifier = name.replace(' ', '');
	var $bar  = $('#cookie-monster__timer-'+identifier);
	var count = Math.round(timer / Game.fps);
	width = width || timer / Game.goldenCookie.maxTime * 100;

	// Check existence
	if ($bar.length === 0) {
		$bar = this.createBar(name, color);
	}

	// Update timer
	$('#cmt_time_'+identifier).text(count);

	// Old-school if transitions are unsupported
	var $container = $('#cmt_'+identifier);
	if (typeof document.body.style.transition === 'undefined') {
		return $container.css('width', width+'%');
	}

	// Check if we applied transitions
	if ($container.hasClass('active')) {
		return;
	}

	// Add transition
	$container.addClass('active').css('width', width+'%');
	setTimeout(function() {
		$container.css({
			width      : 0,
			transition : 'width linear ' +count+ 's'
		});
	}, 100);
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
	var secondBars = {'Next Cookie': 'purple', 'Next Reindeer': 'orange'};
	var secondBar  = secondBars[name] || '';
	var identifier = name.replace(' ', '');

	// Add second bar for golden cookies
	if (secondBar) {
		secondBar = '<div class="cm-buff-bar__inner background-' +secondBar+ '" id="cmt2_'+secondBar+'"></div>';
	}

	this.$timerBars.append(
		'<div class="cm-buff-bar" id="cookie-monster__timer-' + identifier + '" style="display: none">'+
			'<p class="cm-buff-bar__name">'+name+'</p>'+
			'<div class="cm-buff-bar__container">'+
				'<div class="cm-buff-bar__bar background-' +color+ '" id="cmt_' + identifier + '">'+
					secondBar +
					'<div class="cm-buff-bar__timer" id="cmt_time_' + identifier + '">0</div>'+
				'</div>'+
			'</div>'+
		'</div>'
	);

	return $('#cookie-monster__timer-'+identifier).fadeIn(500);
};

/**
 * Fade out a bar of a certain effect
 *
 * @param {string} identifier
 *
 * @return {void}
 */
CookieMonster.fadeOutBar = function(identifier) {
	identifier = identifier.replace(' ', '');
	var $bar = $("#cookie-monster__timer-" + identifier);

	if ($bar.length === 1 && $bar.css('opacity') === '1') {
		$bar.fadeOut(500, function() {
			$(this).remove();
		});
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
			this.updateTooltips('objects');
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

	return $option;
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
	return Math.round(1000 / this.getSetting('Refresh') * 1)+ ' fps';
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
 * Update the store counters
 *
 * @return {void}
 */
CookieMonster.updateStoreCounters = function() {
	this.upgradeCounts.forEach(function(count, key) {
		$('#cm_up_q' + key).text(count);
	});
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
 * Get the tooltip handle for a type/key
 *
 * @param {String}  type
 * @param {Integer} key
 *
 * @return {String}
 */
CookieMonster.identifier = function(type, key) {
	return 'cm_'+type+'_'+key+'_';
};

/**
 * Create a tooltip for a type of object
 *
 * @param {Object} object
 * @param {String} type
 *
 * @return {Void}
 */
CookieMonster.makeTooltip = function(object, type) {
	var identifier = this.identifier(type, object.id);
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
 * @param {Array}   informations
 *
 * @return {Void}
 */
CookieMonster.updateTooltip = function(type, key, colors, deficits, informations) {
	var identifier = '#'+this.identifier(type, key);
	var $object    = $(identifier);

	// Create tooltip if it doesn't exist
	var object = type === 'up' ? Game.UpgradesById[key] : Game.ObjectsById[key];
	if (object.desc.indexOf(this.identifier(type, key)) === -1) {
		this.makeTooltip(object, type);
	}

	// Cancel if we're not in this particular tooltip at the moment
	if ($object.length !== 1 || $object.css('display') === 'none') {
		return;
	}

	// Update informations
	$object
	.attr('class', 'cm-tooltip border-'+colors[0])
	.html(
		'<div class="text-blue" style="position:absolute; top:4px; left:4px; font-weight:bold;">Bonus Income</div>'+
		'<div align=right style="position:absolute; top:18px; left:4px; color:white;">' + this.formatNumber(informations[0]) + '</div>'+

		'<div class="text-blue" style="position:absolute; top:34px; left:4px; font-weight:bold;">Base Cost Per Income</div>'+
		'<div align=right class="text-' +colors[0]+ '" style="position:absolute; top:48px; left:4px;">' + this.formatNumber(informations[1]) + '</div>'+

		'<div class="text-blue" style="position:absolute; top:64px; left:4px; font-weight:bold;">Time Left</div>'+
		'<div align=right class="text-' +colors[1]+ '" style="position:absolute; top:78px; left:4px;">' + this.formatTime(informations[2], true) + "</div>"
	);

	$(identifier+'warning_amount').html('Deficit: ' + this.formatNumber(deficits[0]));
	$(identifier+'caution_amount').html('Deficit: ' + this.formatNumber(deficits[1]));

	if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 2) {
		$(identifier+'lucky_div_warning').toggle(deficits[0] > 0);
		$(identifier+'lucky_div_caution').toggle(deficits[1] > 0);
	} else {
		$(identifier+'lucky_div_warning').hide();
		$(identifier+'lucky_div_caution').hide();
	}

	if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 3) {
		$(identifier+'note_div_warning').toggle(deficits[0] > 0);
		$(identifier+'note_div_caution').toggle(deficits[1] > 0);
	} else {
		$(identifier+'note_div_warning').hide();
		$(identifier+'note_div_caution').hide();
	}
};

//////////////////////////////////////////////////////////////////////
//////////////////////// GLOBAL SETUP AND UPDATE /////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Create the DOM for all tooltips
 *
 * @return {void}
 */
CookieMonster.setupTooltips = function() {
	this.updateTooltips();

	// Rebuild game elements
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
	if (typeof which === 'undefined') {
		which = 'all';
	}

	// Upgrades
	if (which === 'all' || which === 'upgrades') {
		this.upgradeCounts = [0, 0, 0, 0, 0, 0];
		Game.UpgradesById.forEach(function (upgrade) {
			CookieMonster.manageUpgradeTooltips(upgrade);
		});
		this.updateStoreCounters();
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

/**
 * Handles the creation/update of an upgrade's tooltip
 *
 * @param {Object} upgrade
 *
 * @return {void}
 */
CookieMonster.manageUpgradeTooltips = function(upgrade) {
	// Cancel if the upgrade isn't in the store
	if (!this.isInStore(upgrade)) {
		return;
	}

	// Gather comparative informations
	var income       = this.callCached('getUpgradeWorth', [upgrade]);
	var informations = [this.roundDecimal(upgrade.basePrice / income), Math.round(this.secondsLeft(upgrade.id, 'upgrade'))];
	var colors       = this.getLuckyColors(informations);

	// Update store counters
	var colorKey = ['blue', 'green', 'yellow', 'orange', 'red', 'purple'].indexOf(colors[0]);
	this.upgradeCounts[colorKey]++;

	// Colorize upgrade icon
	if (this.getSetting('UpgradeIcons')) {
		$('#upgrade' + Game.UpgradesInStore.indexOf(upgrade)).html('<div class="cookie-monster__upgrade background-' +colors[0]+ '"></div>');
	}

	return this.updateTooltip('up', upgrade.id, colors, this.getLuckyAlerts(upgrade.basePrice), [
		this.roundDecimal(income),
		informations[0],
		informations[1],
	]);
};

/**
 * Handles the creation/update of a building's tooltip
 *
 * @param {Object} building
 *
 * @return {void}
 */
CookieMonster.manageBuildingTooltip = function(building) {
	var informations = [this.informations.cpi[building.id], this.informations.timeLeft[building.id]];
	var colors       = this.getLuckyColors(informations);

	// Colorize building price
	if (this.getBooleanSetting('ColoredPrices')) {
		$('.price', '#product'+building.id).attr('class', 'price text-'+colors[0]);
	}

	return this.updateTooltip('ob', building.id, colors, this.getLuckyAlerts(building.price), [
		this.informations.bonus[building.id],
		informations[0],
		informations[1],
	]);
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
//////////////////////////////////////////////////////////////////////



/**
 * Get the lucky alerts for a price
 *
 * @param {Integer} price
 *
 * @return {Array}
 */
CookieMonster.getLuckyAlerts = function(price) {
	var rewards  = [this.luckyReward('regular'), this.luckyReward('frenzy')];
	var deficits = [0, 0];

	// Check Lucky alert
	if (Game.cookies - price < rewards[0]) {
		deficits[0] = rewards[0] - (Game.cookies - price);
	}

	// Check Lucky Frenzy alert
	if (Game.cookies - price < rewards[1]) {
		deficits[1] = rewards[1] - (Game.cookies - price);
	}

	return deficits;
};

/**
 * Get the colors for the lucky alerts
 *
 * @param {Array} informations
 *
 * @return {Array}
 */
CookieMonster.getLuckyColors = function(informations) {
	var colors    = ['yellow', 'yellow'];
	var maxValues = this.getBestValue('max');
	var minValues = this.getBestValue('min');

	// Compute color
	for (var i = 0; i < colors.length; i++) {
		if (informations[i] < minValues[i]) {
			colors[i] = 'blue';
		} else if (informations[i] === minValues[i]) {
			colors[i] = 'green';
		} else if (informations[i] === maxValues[i]) {
			colors[i] = 'red';
		} else if (informations[i] > maxValues[i]) {
			colors[i] = 'purple';
		} else if (maxValues[i] - informations[i] < informations[i] - minValues[i]) {
			colors[i] = 'orange';
		}
	}

	return colors;
};

CookieMonster.start();