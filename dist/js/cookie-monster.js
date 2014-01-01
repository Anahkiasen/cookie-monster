/* exported CookieMonster */

/**
 * The CookieMonster plugin
 *
 * @type {Object}
 */
var CookieMonster = {

	// Runtime variables
	////////////////////////////////////////////////////////////////////

	version : '1.040.08',

	domain  : 'http://cookie-monster.autopergamene.eu',
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
		bci      : [],
		roi      : [],
		timeLeft : [],
	},
	informations : {
		items    : [],
		bonus    : [],
		bci      : [],
		roi      : [],
		timeLeft : [],
	},

	milkPotentials : {
		'Kitten helpers'            : 0.05,
		'Kitten workers'            : 0.1,
		'Kitten engineers'          : 0.2,
		'Kitten overseers'          : 0.2,
		'Santa\'s milk and cookies' : 0.05,
	},

	frenzies: {
		7   : {name: 'Frenzy',       identifier: 'Frenzy',      color: 'yellow'},
		666 : {name: 'Blood Frenzy', identifier: 'BloodFrenzy', color: 'green'},
		0.5 : {name: 'Clot',         identifier: 'Clot',        color: 'red'},
	},

	// Upgrades
	////////////////////////////////////////////////////////////////////

	upgradeCounts  : [0, 0, 0, 0, 0, 0],

	// Settings
	////////////////////////////////////////////////////////////////////

	settings: {

		// Sections
		'BottomBar'        : {type: 'boolean', value: 1,   label: 'Bottom Bar',        desc: 'Displays a bar at the bottom of the screen that shows all buildings information'},
		'UpgradeDisplay'   : {type: 'switch',  value: 1,   label: 'Upgrade Display',   desc: 'Changes how the store displays upgrades'},

		// Colors
		'Colorblind'       : {type: 'boolean', value: 0,   label: 'Colorblind',        desc: 'Use colorblind safe colors'},
		'ColoredPrices'    : {type: 'boolean', value: 1,   label: 'Colored Prices',    desc: 'Changes the colors of all Building prices to correspond with their Cost Per Income'},
		'UpgradeIcons'     : {type: 'boolean', value: 1,   label: 'Upgrade Icons',     desc: 'Displays a small colored icon on the upgrades to better display the Cost Per Income'},
		'ReturnInvestment' : {type: 'boolean', value: 0,   label: 'ROI/BCI',           desc: 'Uses ROI to compute the best building to buy (buildings only)'},

		// Emphasizers
		'BuffBars'         : {type: 'boolean', value: 1,   label: 'Buff Bars',         desc: 'Displays a countdown bar for each effect currently active'},
		'CookieBar'        : {type: 'boolean', value: 1,   label: 'Next Cookie Timer', desc: 'Displays a countdown bar and updates the Title for when the next Cookie will appear'},
		'CookieTimer'      : {type: 'boolean', value: 1,   label: 'Cookie Timer',      desc: 'Displays a timer on Golden Cookies and Red Cookies'},
		'FlashScreen'      : {type: 'boolean', value: 1,   label: 'Flash Screen',      desc: 'Flashes the screen when a Golden Cookie or Red Cookie appears'},
		'Sounds'           : {type: 'boolean', value: 0,   label: 'Sounds',            desc: 'Plays a sound when a Red/Golden Cookie or a Reindeer appears'},
		'UpdateTitle'      : {type: 'boolean', value: 1,   label: 'Update Title',      desc: 'Updates the Title to display if a Cookie is waiting to be clicked'},

		// Display
		'LuckyAlert'       : {type: 'switch',  value: 1,   label: 'Lucky Alert',       desc: 'Changes the tooltip to display if you would be under the number of cookies required for "Lucky"!'},
		'Refresh'          : {type: 'switch',  value: 1e3, label: 'Refresh Rate',      desc: 'The rate at which Cookie Monster updates data (higher rates may slow the game)'},
		'ShortNumbers'     : {type: 'switch',  value: 1,   label: 'Short Numbers',     desc: 'Formats all numbers to be shorter when displayed'},

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
/*jshint -W014*/

var CookieObject = {};

//////////////////////////////////////////////////////////////////////
////////////////////////////// REFLECTIONS ///////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the price of an object
 *
 * @return {Integer}
 */
CookieObject.getPriceOf = function() {
	return this instanceof Game.Upgrade ? this.basePrice : this.price;
};

/**
 * Get the type of an object
 *
 * @return {String}
 */
CookieObject.getTypeOf = function() {
	return this instanceof Game.Upgrade ? 'upgrade' : 'object';
};

//////////////////////////////////////////////////////////////////////
///////////////////////////// INFORMATIONS ///////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the true worth of an object
 *
 * @param {Boolean} rounded
 *
 * @return {Integer}
 */
CookieObject.getWorthOf = function(rounded) {
	var worth = this.getType() === 'upgrade'
		? CookieMonster.callCached('getUpgradeWorth', [this])
		: CookieMonster.callCached('getBuildingWorth', [this]);

	return rounded ? CookieMonster.roundDecimal(worth) : worth;
};

/**
 * Get the Best Cost per Income
 *
 * @param {Boolean} rounded
 *
 * @return {Integer}
 */
CookieObject.getBaseCostPerIncome = function(rounded) {
	var worth = this.getWorth();
	var bci   = CookieMonster.roundDecimal(this.getPrice() / worth);
	if (worth < 0) {
		return Infinity;
	}

	return rounded ? CookieMonster.roundDecimal(bci) : bci;
};

/**
 * Get the Return On Investment
 *
 * @return {Integer}
 */
CookieObject.getReturnInvestment = function() {
	var worth = this.getWorth();

	return this.price * (worth + Game.cookiesPs) / worth;
};

/**
 * Get the time left for this Object
 *
 * @return {String}
 */
CookieObject.getTimeLeft = function() {
	return CookieMonster.secondsLeft(this);
};

/**
 * Get the core statistics for comparaisons
 *
 * @return {Array}
 */
CookieObject.getComparativeInfos = function() {
	return [
		this.getBaseCostPerIncome(),
		this.getTimeLeft(),
		this.getReturnInvestment(),
	];
};

/**
 * Get the colors assigned to this object
 *
 * @return {Array}
 */
CookieObject.getColors = function() {
	return CookieMonster.computeColorCoding(this.getComparativeInfos());
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the identifier of an object
 *
 * @return {Integer}
 */
CookieObject.identifier = function() {
	return 'cookie-monster__'+this.getType()+'--'+this.id;
};

/**
 * Check if an object matches against a piece of text
 *
 * @param {String} matcher
 *
 * @return {Boolean}
 */
CookieObject.matches = function(matcher) {
	if (!this.desc) {
		return false;
	}

	return this.desc.toLowerCase().indexOf(matcher.toLowerCase()) !== -1;
};

// Hook into the game
//////////////////////////////////////////////////////////////////////

Game.Object.prototype.getBaseCostPerIncome  = CookieObject.getBaseCostPerIncome;
Game.Object.prototype.getColors             = CookieObject.getColors;
Game.Object.prototype.getComparativeInfos   = CookieObject.getComparativeInfos;
Game.Object.prototype.getPrice              = CookieObject.getPriceOf;
Game.Object.prototype.getReturnInvestment   = CookieObject.getReturnInvestment;
Game.Object.prototype.getTimeLeft           = CookieObject.getTimeLeft;
Game.Object.prototype.getType               = CookieObject.getTypeOf;
Game.Object.prototype.getWorth              = CookieObject.getWorthOf;
Game.Object.prototype.identifier            = CookieObject.identifier;
Game.Object.prototype.matches               = CookieObject.matches;

Game.Upgrade.prototype.getBaseCostPerIncome = CookieObject.getBaseCostPerIncome;
Game.Upgrade.prototype.getColors            = CookieObject.getColors;
Game.Upgrade.prototype.getComparativeInfos  = CookieObject.getComparativeInfos;
Game.Upgrade.prototype.getPrice             = CookieObject.getPriceOf;
Game.Upgrade.prototype.getReturnInvestment  = CookieObject.getReturnInvestment;
Game.Upgrade.prototype.getTimeLeft          = CookieObject.getTimeLeft;
Game.Upgrade.prototype.getType              = CookieObject.getTypeOf;
Game.Upgrade.prototype.getWorth             = CookieObject.getWorthOf;
Game.Upgrade.prototype.identifier           = CookieObject.identifier;
Game.Upgrade.prototype.matches              = CookieObject.matches;
CookieMonster.Events = {};

/**
 * Event when the user clicks on a golden cookie
 *
 * @return {void}
 */
CookieMonster.Events.onGoldenClick = function() {
	CookieMonster.$goldenCookie.click(function() {
		var frenzy = CookieMonster.frenzies[Game.frenzyPower];
		if (frenzy) {
			CookieMonster.fadeOutBar(frenzy.name.replace(' ', ''));
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
	this.replaceNative('Logic', {
		'.title=': '.title=CookieMonster.titleModifier+',
	});

	// Add additional settings and statistics to main menu
	this.replaceNative('UpdateMenu', {
		"Statistics</div>'+": "Statistics</div>'+"+ CookieMonster.getStatistics(),
		"OFF')+'</div>'+"   : "OFF')+'</div>'+"   + CookieMonster.getSettingsText(),
		"startDate=Game.sayTime(date.getTime()/1000*Game.fps,2);": "startDate = CookieMonster.formatTime((+new Date - Game.startDate) / 1000);",
	});

	// Rebuild Cookie Monster on game changing events
	Game.Reset    = this.appendToNative(Game.Reset, CookieMonster.tearDown);
	Game.LoadSave = this.appendToNative(Game.LoadSave, CookieMonster.tearDown);

	// Refresh tooltips on store rebuild
	Game.tooltip.draw = this.appendToNative(Game.tooltip.draw, CookieMonster.updateTooltips);
	Game.RebuildStore = this.appendToNative(Game.RebuildStore, CookieMonster.updateTooltips);

	// Swap out the original Beautify for ours
	Beautify = this.formatNumber;
	this.replaceNative('Draw', {
		'Beautify(Math.round(Game.cookiesd))': 'CookieMonster.formatNumberRounded(Game.cookiesd)',
	});
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
	return this.buildList('Goodies', {
		'Lucky Cookies': {
			'"Lucky!" Cookies Required'          : "CookieMonster.luckyRequiredFormatted()",
			'"Lucky!" Cookies Required (Frenzy)' : "CookieMonster.luckyRequiredFormatted('frenzy')",
			'"Lucky!" Reward (MAX)'              : "CookieMonster.luckyReward('max')",
			'"Lucky!" Reward (MAX) (Frenzy)'     : "CookieMonster.luckyReward('frenzy')",
			'"Lucky!" Reward (CUR)'              : "CookieMonster.luckyReward()",
		},
		'Heavenly Chips': {
			'Heavenly Chips (MAX)' : "CookieMonster.getHeavenlyChip('max')",
			'Heavenly Chips (CUR)' : "CookieMonster.getHeavenlyChip('cur')",
			'Cookies To Next Chip' : "CookieMonster.getHeavenlyChip('next')",
			'Time To Next Chip'    : "CookieMonster.getHeavenlyChip('time')",
		},
		'Wrinklers': {
			'Cookies sucked'      : 'CookieMonster.getWrinklersSucked(true)',
			'Rewards of popping'  : 'CookieMonster.getWrinklersReward()',
			'Benefits of popping' : "CookieMonster.getWrinklersReward('reward')",
		},
	}, function(statistic, method) {
		return "<b>" +statistic+ " :</b> ' +" +method+ "+ '";
	});
};

/**
 * Get the HTML for the additional settings
 *
 * @return {String}
 */
CookieMonster.getSettingsText = function() {
	return this.buildList('Settings', {
		'Additional sections': [
			'BottomBar',
			'UpgradeDisplay',
		],
		'Color coding': [
			'Colorblind',
			'ColoredPrices',
			'UpgradeIcons',
			'ReturnInvestment',
		],
		'Emphasizers': [
			'BuffBars',
			'CookieBar',
			'CookieTimer',
			'FlashScreen',
			'Sounds',
			'UpdateTitle',
		],
		'Display': [
			'LuckyAlert',
			'Refresh',
			'ShortNumbers',
		],
	}, function(key, setting) {
		return "<a class=\"option\" data-option=\"" +setting+ "\" onclick=\"CookieMonster.toggleOption(this);\">' + CookieMonster.getLabel('" +setting+ "') + '</a><label>' + CookieMonster.getDescription('" +setting+ "') + '</label>";
	});
};

/**
 * Build a list
 *
 * @param {String}   title
 * @param {Object}   list
 * @param {Function} callback
 *
 * @return {String}
 */
CookieMonster.buildList = function(title, list, callback) {
	var output = "\n'" + '<div class="subsection"><div class="title"><span class="text-blue">Cookie Monster ' +title+ '</span></div>';

	// Loop over the settings and add they one by one
	for (var section in list) {
		output += '<div class="subtitle">' +section+ '</div>';
		for (var item in list[section]) {
			output += '<div class="listing">' +callback(item, list[section][item])+ '</div>';
		}
	}

	return output + "</div>'+";
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Append a piece of code to native code
 *
 * @param {String}  native
 * @param {Closure} append
 *
 * @return {Void}
 */
CookieMonster.appendToNative = function(native, append) {
	return function() {
		native.apply(null, arguments);
		append.apply(CookieMonster);
	};
};

/**
 * Execute replacements on a method's code
 *
 * @param {String}  code
 * @param {Closure} replaces
 *
 * @return {String}
 */
CookieMonster.replaceCode = function(code, replaces) {
	code = code.toString();

	// Apply the various replaces
	for (var replace in replaces) {
		code = code.replace(replace, replaces[replace]);
	}

	return code
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
		return this.displayError('These aren\'t the droids you\'re looking for.');
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

	// Setup Cookie Monster
	this.hookIntoNative();

	// Add Cookie Monster elements
	this.setupElements();

	// Load stylesheet
	this.loadSettings();
	this.loadStyles();

	// Add ID to favicon
	$('link[href="favicon.ico"]').attr('id', 'cm_favicon');

	// Events
	this.Events.onGoldenClick();

	// Start the loop
	this.mainLoop();

	Game.Popup('<span class="cm-popup">Cookie Monster ' + this.version + ' Loaded!</span>');
};

/**
 * Set up the DOM elements of Cookie Monster
 *
 * @return {void}
 */
CookieMonster.setupElements = function() {
	this.createBottomBar();
	this.createGoldenOverlay();
	this.createFlashOverlay();
	this.createBarsContainer();
	this.createStoreCounters();
	this.setupTooltips();
};

/**
 * Load some styles
 *
 * @return {void}
 */
CookieMonster.loadStyles = function() {
	var stylesheet = this.runningInLocal() ? 'http://localhost/_github/cookie-monster/dist/cookie-monster' : this.domain+'/cookie-monster';
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
 * Tear down Cookie Monster completely and rebuild it
 *
 * @return {void}
 */
CookieMonster.tearDown = function() {
	// Destroy current elements
	this.destroyBars();
	this.$goldenOverlay.remove();
	this.$monsterBar.remove();
	this.$flashOverlay.remove();
	this.$timerBars.remove();
	$('#cookie-monster__store').remove();

	// Redo a setup
	this.setupElements();
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
	Game.ObjectsById.forEach(function (building, key) {
		var count = '(<span class="text-blue">' +building.amount+ '</span>)';

		// Save building informations
		CookieMonster.setBuildingInformations(key, {
			items    : building.name.split(' ')[0] + ' ' + count,
			bonus    : building.getWorth(true),
			bci      : building.getBaseCostPerIncome(true),
			roi      : building.getReturnInvestment(),
			timeLeft : building.getTimeLeft(),
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
///////////////////////////// LUCKY COOKIES //////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the amount of cookies required for Lucky Cookies, formatted
 *
 * @param {String} context [current,frenzy]
 *
 * @return {String}
 */
CookieMonster.luckyRequiredFormatted = function(context) {
	var treshold = this.getLuckyTreshold(context);
	var color  = Game.cookies < treshold ? 'red' : 'green';

	return '<strong class="text-' +color+ '">' + this.formatNumber(treshold) + '</strong>';
};

/**
 * Get the reward for Lucky Cookies
 *
 * Lowest of 10% of cookies in bank, or 20mn of production
 *
 * @param {String} context [current,frenzy,max]
 *
 * @return {String}
 */
CookieMonster.luckyReward = function(context, income) {
	var twentyMinutes = this.getLuckyTreshold(context, income) / 10;
	var tenPercent    = Math.round(Game.cookies * 0.1 + 13);

	// If we want to know how much would 20mn earn, return
	// the simulated frenzy
	if (context === 'max' || context === 'frenzy') {
		if ((twentyMinutes * 10) > Game.cookies) {
			return this.formatNumber(twentyMinutes);
		}
	}

	return this.formatNumber(Math.min(twentyMinutes, tenPercent));
};

/**
 * Get how much a Lucky cookie would yield for a particular context
 * Doesn't take into account current cookies, just the "max" you
 * could get
 *
 * Formula is cookiesPs * 60 * 20 + 13 (for some reason)
 *
 * @param {String} context
 *
 * @return {Integer}
 */
CookieMonster.getLuckyTreshold = function(context, income) {
	var reward = (income || Game.cookiesPs);

	// Here we remove the effects of the current multiplier
	// to get the real Cookies/s
	reward /= this.getFrenzyMultiplier();

	// If we want we simulate a frenzy
	if (context === 'frenzy') {
		reward *= 7;
	}

	return Math.round((reward * 60 * 20 + 13) * 10);
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

	var upgrades = {
		'Heavenly chip secret'   : 0.05,
		'Heavenly cookie stand'  : 0.2,
		'Heavenly bakery'        : 0.25,
		'Heavenly confectionery' : 0.25,
		'Heavenly key'           : 0.25,
	};

	// Apply the various potentials
	for (var upgrade in upgrades) {
		if (Game.Has(upgrade)) {
			potential += upgrades[upgrade];
		}
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
			return this.formatNumber(nextReset) + ' <small>(' + this.formatNumber(nextReset * 2) + '%)</small>';

		case 'cur':
			return this.formatNumber(currentAmount) + ' <small>(' + this.formatNumber(currentAmount * 2) + '%)</small>';

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
		var i = achievement.desc.replace(/,/g, '');
		if (!achievement.won && i.indexOf(' per second.') !== -1) {
			if (e >= i.substr(8, i.indexOf('</b>', 8) - 8) * 1) {
				t++;
			}
		}
	});

	return t;
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
 * @param {Integer} modifier
 * @param {Boolean} formatted
 *
 * @return {Integer}
 */
CookieMonster.getWrinklersSucked = function(formatted, modifier) {
	var sucked = 0;
	modifier = modifier || 1;

	// Here we loop over the wrinklers and
	// compute how muck cookies they sucked * the modifier
	Game.wrinklers.forEach(function(wrinkler) {
		sucked += wrinkler.sucked * modifier;
	});

	return formatted ? this.formatNumber(sucked) : sucked;
};

/**
 * Get the reward for popping all wrinklers
 *
 * @param {String} context
 *
 * @return {String}
 */
CookieMonster.getWrinklersReward = function(context) {
	var sucked = this.getWrinklersSucked(false, 1.1);

	// If we only want the actual benefit from the wrinklers
	// We substract how much they sucked without the modifier
	if (context === 'reward') {
		sucked -= this.getWrinklersSucked();
	}

	return this.formatNumber(sucked);
};
/**
 * Get how much buying an upgrade would earn
 *
 * @param {Object} upgrade
 *
 * @return {Integer}
 */
CookieMonster.getUpgradeWorth = function(upgrade) {
	var income     = 0;
	var unlocked   = 0;
	var multiplier = Game.globalCpsMult;

	// Standard bulding upgrades
	var buildingUpgrades = ['Cursors', 'Grandmas', 'Farms', 'Factories', 'Mines', 'Shipments', 'Alchemy labs', 'Portals', 'Time machines', 'Antimatter condensers'];
	buildingUpgrades.forEach(function(building, key) {
		if (upgrade.matches(building+' are <b>')) {
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
		if (upgrade.matches(gainUpgrade.building+' gain <b>')) {
			income = CookieMonster.getMultiplierOutcome(gainUpgrade.building, gainUpgrade.modifier, key);
		}
	});

	if (upgrade.matches('Grandmas are <b>twice</b>')) {
		unlocked += this.lgt(upgrade);
	}

	else if (upgrade.matches('for each non-cursor object')) {
		income = this.getNonObjectsGainOutcome(upgrade);
	}

	// Grandmas per grandmas
	else if (upgrade.matches('for every 50 grandmas')) {
		income = this.getGrandmasPerGrandmaOutcome();
	}

	// Grandmas per portals
	else if (upgrade.matches('for every 20 portals')) {
		income = this.getGrandmasPerPortalOutcome();
	}

	// Heavenly upgrades
	else if (upgrade.matches('potential of your heavenly')) {
		income = this.getHeavenlyUpgradeOutcome(unlocked, upgrade) / multiplier;
		if (upgrade.name === 'Heavenly key') {
			unlocked += this.hasntAchievement('Wholesome');
		}
	}

	// Elder pacts
	if (upgrade.name === 'Elder Covenant') {
		return Game.cookiesPs * -0.05;
	} else if (upgrade.name === 'Revoke Elder Covenant') {
		return (Game.cookiesPs / multiplier) * (multiplier * 1.05) - Game.cookiesPs;
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

	return (income * multiplier) + this.callCached('getAchievementWorth', [unlocked, upgrade.id, income]);
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
	return Game.ObjectsById[buildingKey].storedTotalCps;
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
		if (upgrade.bought && upgrade.matches(building + ' are <b>twice</b>')) {
			multiplier = multiplier * 2;
		}
		if (upgrade.bought && upgrade.matches(building + ' are <b>4 times</b>')) {
			multiplier = multiplier * 4;
		}
	});

	return Game.ObjectsById[buildingKey].amount * multiplier * baseMultiplier;
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
		if (upgrade.bought && upgrade.matches('Grandmas are <b>twice</b>.')) {
			multiplier = multiplier * 2;
		}
		if (upgrade.bought && upgrade.matches('Grandmas are <b>4 times</b>')) {
			multiplier = multiplier * 4;
		}
	});

	return Game.ObjectsById[7].amount * 0.05 * multiplier * Game.ObjectsById[1].amount;
};

/**
 * Computes the production of Grandmas per 50 grandmas
 *
 * @return {Integer}
 */
CookieMonster.getGrandmasPerGrandmaOutcome = function() {
	var multiplier = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.matches('Grandmas are <b>twice</b>')) {
			multiplier = multiplier * 2;
		}
		if (upgrade.bought && upgrade.matches('Grandmas are <b>4 times</b>')) {
			multiplier = multiplier * 4;
		}
	});

	return Game.ObjectsById[1].amount * 0.02 * multiplier * Game.ObjectsById[1].amount;
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

/**
 * Computes the production of cursors per non-cursor objects
 *
 * @param {Object} upgrade
 *
 * @return {Integer}
 */
CookieMonster.getNonObjectsGainOutcome = function(upgrade) {
	var modifier = upgrade.desc.match(/<b>\+(.+)<\/b>/)[1] * 1;

	return modifier * (Game.BuildingsOwned - Game.ObjectsById[0].amount) * Game.ObjectsById[0].amount;
};

/**
 * Compute the production of a building once 4 times as efficient
 *
 * @param {Integer} buildingKey
 *
 * @return {Integer}
 */
CookieMonster.getFourTimesEfficientOutcome = function(buildingKey) {
	return Game.ObjectsById[buildingKey].storedTotalCps * 3;
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
	return this.playSound(this.domain+'/mp3/bell.mp3');
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
		image = this.domain+'/img/'+image+'.png';
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
	var state = [Game.UpgradesOwned, Game.BuildingsOwned, Game.globalCpsMult].join('-');

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
	salts = salts.concat(args);

	// Get the objects identifiers as salt
	for (var i = 0; i < salts.length; i++) {
		if (typeof salts[i].identifier !== 'undefined') {
			salts[i] = salts[i].identifier();
		}
	}

	return salts.join('-');
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
	return CookieMonster.toHumanNumber(number);
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
	var qualifier    = number < 0 ? '-' : '';

	// Human formatting
	number = Math.abs(number);
	if (shortNumbers > -1) {
		var divider = 1e33;
		for (var i = this.humanNumbers[shortNumbers].length - 1; i >= 0; i--) {
			var formattedNumber = (number / divider % 999).toFixed(3);
			if (formattedNumber >= 1) {
				return qualifier + formattedNumber + this.humanNumbers[shortNumbers][i];
			}
			divider /= 1e3;
		}
	}

	// Round the number off
	// Else we'll return the number rounded off to nearest decimal
	number = round ? Math.round(number) : this.roundDecimal(number);
	number = qualifier + number;

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
 * @param {Object} object
 *
 * @return {Integer}
 */
CookieMonster.secondsLeft = function(object) {
	// Get the price of the object we want and how much we need
	var realPrice = Game.cookies - object.getPrice();

	// If we're not making any cookies, or have
	// enough already, return 0
	if (Game.cookiesPs === 0 || realPrice > 0) {
		return 0;
	}

	return Math.round(Math.abs(realPrice) / Game.cookiesPs);
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
	if (typeof compressed === 'undefined') {
		compressed = false;
	}

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
	var thead    = '<th class="text-yellow"> ' + this.version + '</th>';
	var bonus    = '<th class="text-blue">Bonus Income</th>';
	var baseCost = '<th class="text-blue">Base Cost Per Income</th>';
	var timeLeft = '<th class="text-blue">Time Left</th>';

	return this.$monsterBar.html(
		'<table>'+
			'<tr>'+thead+'<th>' +this.bottomBar.items.join('</th><th>')+ '</th></tr>'+
			'<tr>'+bonus+'<td>' +this.bottomBar.bonus.join('</td><td>')+ '</td></tr>'+
			'<tr>'+baseCost+'<td>' +this.bottomBar.bci.join('</td><td>')+ '</td></tr>'+
			'<tr>'+timeLeft+'<td>' +this.bottomBar.timeLeft.join('</td><td>')+ '</td></tr>'+
		'</table>');
};

/**
 * Update the contents of the Bottom Bar
 *
 * @return {void}
 */
CookieMonster.updateTable = function() {
	this.updateBuildingsInformations();
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
 * Destroy all bars in the game
 *
 * @return {void}
 */
CookieMonster.destroyBars = function() {
	var bars = ['Frenzy', 'BloodFrenzy', 'Clot', 'Clickfrenzy', 'goldenCookie', 'seasonPopup'];
	for (var bar in bars) {
		this.fadeOutBar(bar);
	}
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
	var frenzy = this.frenzies[Game.frenzyPower];
	if (typeof frenzy === 'undefined') {
		return;
	}

	// Remove bars if the frenzy has ended or we disabled them
	if (Game.frenzy <= 0 || !this.getBooleanSetting('BuffBars')) {
		return this.fadeOutBar(frenzy.identifier);
	}

	// Update current bar
	this.updateBar(frenzy.name, frenzy.color, Game.frenzy);

	// As only one effect can be active at a time, we'll fade out
	// the other effect bars
	for (var frenzyPower in this.frenzies) {
		if (this.frenzies[frenzyPower].identifier !== frenzy.identifier) {
			this.fadeOutBar(this.frenzies[frenzyPower].identifier);
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

	// Autocleanup
	if (count <= 0) {
		this.fadeOutBar(identifier);
	}

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
	var $bar = $('#cookie-monster__timer-' + identifier);

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
			$('.product .price').attr('class', 'price');
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
	'<table id="cookie-monster__store" cellpadding="0" cellspacing="0">'+
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
 * Create a tooltip for a type of object
 *
 * @param {Object} object
 *
 * @return {Void}
 */
CookieMonster.makeTooltip = function(object) {
	var identifier = object.identifier();

	object.desc += ''+
		'<div class="cm-tooltip__images">'+
			'<div class="cm-tooltip__image" id="' +identifier+ 'lucky_div_warning" style="background:url(' +this.getImage('warning')+ ');"></div>'+
			'<div class="cm-tooltip__image" id="' +identifier+ 'lucky_div_caution" style="background:url(' +this.getImage('caution')+ ');"></div>'+
		'</div>'+
		'<div class="cm-tooltip__contents" id="' +identifier+ '"></div>'+
		'<div class="cm-tooltip__warnings" id="' +identifier+ 'note_div">'+
			'<div id="' +identifier+ 'note_div_warning" class="cm-tooltip__warning border-red">'+
				'<strong class="text-red">Warning:</strong> ' +this.texts.warning+ '<br>'+
				'<span id="' +identifier+ 'warning_amount"></span>'+
			'</div>'+
			'<div id="' +identifier+ 'note_div_caution" class="cm-tooltip__warning border-yellow">'+
				'<strong class="text-yellow">Caution:</strong> ' +this.texts.warning+ ' (Frenzy)<br>'+
				'<span id="' +identifier+ 'caution_amount"></span>'+
			'</div>'+
		'</div>';

	// Update store
	Game.RebuildUpgrades();
};

/**
 * Update a Building/Upgrade tooltip
 *
 * @param {Object} object
 * @param {Array}  colors
 *
 * @return {void}
 */
CookieMonster.updateTooltip = function(object, colors) {
	var informations = [object.getWorth(true), object.getBaseCostPerIncome(), object.getTimeLeft()];
	var deficits     = this.getLuckyAlerts(object);
	var identifier   = '#'+object.identifier();
	var $object      = $(identifier);

	// Create tooltip if it doesn't exist
	if (!object.matches(object.identifier())) {
		this.makeTooltip(object);
	}

	// Cancel if we're not in this particular tooltip at the moment
	if ($object.length !== 1 || $object.css('display') === 'none') {
		return;
	}

	// Update informations
	$object
	.attr('class', 'cm-tooltip__contents border-'+colors[0])
	.html(
		'<h4 class="text-blue">Bonus Income</h4>'+
		'<p>' + this.formatNumber(informations[0]) + '</p>'+

		'<h4 class="text-blue">Base Cost Per Income</h4>'+
		'<p class="text-' +colors[0]+ '">' + this.formatNumber(informations[1]) + '</p>'+

		'<h4 class="text-blue">Time Left</h4>'+
		'<p class="text-' +colors[1]+ '">' + this.formatTime(informations[2], true) + '</p>'
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

	// Update store counters
	var colors   = upgrade.getColors();
	var colorKey = ['blue', 'green', 'yellow', 'orange', 'red', 'purple'].indexOf(colors[0]);
	this.upgradeCounts[colorKey]++;

	// Colorize upgrade icon
	if (this.getSetting('UpgradeIcons')) {
		$('#upgrade' + Game.UpgradesInStore.indexOf(upgrade)).html('<div class="cookie-monster__upgrade background-' +colors[0]+ '"></div>');
	}

	return this.updateTooltip(upgrade, colors);
};

/**
 * Handles the creation/update of a building's tooltip
 *
 * @param {Object} building
 *
 * @return {void}
 */
CookieMonster.manageBuildingTooltip = function(building) {
	var colors = building.getColors();

	// Colorize building price
	if (this.getBooleanSetting('ColoredPrices')) {
		var color = this.getBooleanSetting('ReturnInvestment') ? colors[2] : colors[0];
		$('.price', '#product'+building.id).attr('class', 'price text-'+color);
	}

	return this.updateTooltip(building, colors);
};

//////////////////////////////////////////////////////////////////////
//////////////////////////////// HELPERS /////////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get the lucky alerts for a price
 *
 * @param {Object} object
 *
 * @return {Array}
 */
CookieMonster.getLuckyAlerts = function(object) {
	var price     = object.getPrice();
	var newIncome = Game.cookiesPs + object.getWorth();
	var rewards   = [this.getLuckyTreshold(false, newIncome), this.getLuckyTreshold('frenzy', newIncome)];
	var deficits  = [0, 0];

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
 * Get the color coding for a set of informations
 *
 * @param {Array} informations
 *
 * @return {Array}
 */
CookieMonster.computeColorCoding = function(informations) {
	var colors    = ['yellow', 'yellow', 'yellow'];
	var maxValues = this.getBestValue('max');
	var minValues = this.getBestValue('min');

	// Compute color
	for (var i = 0; i < informations.length; i++) {
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

	// As ROI only has one color, use that one
	if (informations[2] === minValues[2]) {
		colors[2] = 'cyan';
	}

	return colors;
};

CookieMonster.start();