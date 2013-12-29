/* exported CookieMonster */

/**
 * The CookieMonster plugin
 *
 * @type {Object}
 */
var CookieMonster = {

	// Runtime variables
	////////////////////////////////////////////////////////////////////

	version               : 'v.1.040.01',
	emphasize             : true,
	tooltips              : [],
	buildingTooltips      : [],
	goldenCookieAvailable : '',
	loops                 : 0,
	humanNumbers          : new Array(
		[' M', ' B', ' T', ' Qa', ' Qi', ' Sx', ' Sp', ' Oc', ' No', ' Dc'],
		[' M', ' G', ' T', ' P', ' E', ' Z', ' Y', ' Oc', ' No', ' Dc']
	),

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
		'FlashScreen'    : 1,
		'CookieTimer'    : 1,
		'BuffBars'       : 1,
		'Refresh'        : 1e3,
		'CookieCD'       : 1,
		'CMBar'          : 1,
		'ColoredPrices'  : 1,
		'ShortNumbers'   : 1,
		'CookieSound'    : 0,
		'UpdateTitle'    : 1,
		'LuckyAlert'     : 1,
		'UpgradeIcons'   : 1,
		'UpgradeDisplay' : 1,
		'Colorblind'     : 0,
	},

	// Selectors
	////////////////////////////////////////////////////////////////////

	$game          : $('#game'),
	$goldenCookie  : $('#goldenCookie'),
	$goldenOverlay : $('#cookie-monster__golden-overlay'),
	$monsterBar    : $('#cookie-monster__bottom-bar'),
	$overlay       : $('#cookie-monster__overlay'),
	$timerBars     : $('#cookie-monster__buff-bars'),

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
/**
 * Get the current frenzy multiplier
 *
 * @return {integer}
 */
CookieMonster.getFrenzyMultiplier = function() {
	return (Game.frenzy > 0) ? Game.frenzyPower : 1;
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
CookieMonster.createOverlay = function() {
	$('body').append('<div id="cookie-monster__overlay"></div>');

	this.$overlay = $('#cookie-monster__overlay');
};

//////////////////////////////////////////////////////////////////////
////////////////////////////// EMPHASIZERS ///////////////////////////
//////////////////////////////////////////////////////////////////////

CookieMonster.Emphasizers = {};

/**
 * Emphasize the apparition of a Golden Cookie
 *
 * @return {void}
 */
CookieMonster.emphasizeGolden = function() {
	var $golden = this.$goldenCookie;

	if ($golden.is(':hidden') && !this.emphasize) {
		this.emphasize = true;
		this.$goldenOverlay.hide();

		this.goldenCookieAvailable = '';
	} else if ($golden.is(':visible') && this.emphasize) {
		this.emphasize = false;
		this.$goldenOverlay.show();

		this.Emphasizers.updateTitle();
		this.Emphasizers.playSound();
		this.Emphasizers.flashScreen();
	}

	if ($golden.is(':visible')) {
		this.Emphasizers.displayTimer();
	}
};

CookieMonster.Emphasizers.displayTimer = function() {
	if (!CookieMonster.getBooleanSetting('CookieTimer')) {
		return;
	}

	CookieMonster.$goldenOverlay
		.css(CookieMonster.$goldenCookie.css(['opacity', 'top', 'left', 'top']))
		.text(Math.round(Game.goldenCookie.life / Game.fps));
};

CookieMonster.Emphasizers.updateTitle = function() {
	if (!CookieMonster.getBooleanSetting('UpdateTitle')) {
		return;
	}

	CookieMonster.goldenCookieAvailable = '(G) ';
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

	if (CookieMonster.goldenCookieAvailable === '(G) ') {
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
	if (!CookieMonster.getBooleanSetting('CookieSound')) {
		return;
	}

	CookieMonster.playBell();
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

	CookieMonster.$overlay.fadeIn(100);
	CookieMonster.$overlay.fadeOut(500);
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

CookieMonster.getAchievementWorth = function(e, t, n, r) {
	var i = 0;
	var s = this.getHeavenlyMultiplier();
	if (r !== 0) {
		s = r;
	}
	var o = 0;
	var u = new Array(0, 0, 0, 0);
	var a = Game.milkProgress;
	var f = this.getFrenzyMultiplier();

	Game.UpgradesById.forEach(function (upgrade) {
		var r = upgrade.desc.replace("[Research]<br>", "");
		if (upgrade.bought && r.indexOf("Cookie production multiplier <b>+") !== -1) {
			s += r.substr(33, r.indexOf("%", 33) - 33) * 1;
		}
		if (!upgrade.bought && r.indexOf("Cookie production multiplier <b>+") !== -1 && upgrade.id === t) {
			o += r.substr(33, r.indexOf("%", 33) - 33) * 1;
		}
		if (upgrade.bought && upgrade.name === "Kitten helpers") {
			u[0] = 0.05;
		}
		if (upgrade.bought && upgrade.name === "Kitten workers") {
			u[1] = 0.1;
		}
		if (upgrade.bought && upgrade.name === "Kitten engineers") {
			u[2] = 0.2;
		}
		if (upgrade.bought && upgrade.name === "Kitten overseers") {
			u[3] = 0.2;
		}
	});
	var l = 100 + s;
	l = l * (1 + u[0] * a);
	l = l * (1 + u[1] * a);
	l = l * (1 + u[2] * a);
	l = l * (1 + u[3] * a);
	var c = n;
	var h = (Game.cookiesPs + c) / Game.globalCpsMult * (l / 100) * f;
	a += e * 0.04;
	l = 100 + s + o;
	l = l * (1 + u[0] * a);
	l = l * (1 + u[1] * a);
	l = l * (1 + u[2] * a);
	l = l * (1 + u[3] * a);
	var p = 0;
	switch (Game.UpgradesById[t].name) {
		case "Kitten helpers":
			p = 0.05;
			break;
		case "Kitten workers":
			p = 0.1;
			break;
		case "Kitten engineers":
			p = 0.2;
			break;
		case "Kitten overseers":
			p = 0.2;
			break;
	}
	l = l * (1 + p * a);
	i = (Game.cookiesPs + c) / Game.globalCpsMult * (l / 100) * f - h;
	var d = this.inc(i + h);
	if (d > 0) {
		a += d * 0.04;
		l = 100 + s + o;
		l = l * (1 + u[0] * a);
		l = l * (1 + u[1] * a);
		l = l * (1 + u[2] * a);
		l = l * (1 + u[3] * a);
		l = l * (1 + p * a);
		i = (Game.cookiesPs + c) / Game.globalCpsMult * (l / 100) * f - h;
	}
	if (r !== 0) {
		i = (Game.cookiesPs + c) / Game.globalCpsMult * (l / 100) * f;
	}
	if (Game.Has("Elder Covenant")) {
		i *= 0.95;
	}
	return i;
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
			reward = '<span style="color:#' +this.color('green')+ '; font-weight:bold;">' + this.formatNumber(reward) + "</span>";
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
CookieMonster.getUpgradeBonuses = function(building, currentNumber, n) {
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

	i += this.hasntAchievement(upgrades[building][currentNumber]);

	switch (building) {
		case "Grandma":
			r += this.getTotalGrandmaModifiers(currentNumber) * Game.globalCpsMult;
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case "Farm":
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case "Factory":
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case "Mine":
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case "Shipment":
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case "Alchemy lab":
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case "Portal":
			r += this.getTotalPortalModifiers() * Game.globalCpsMult;
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case "Time machine":
			r += this.getTotalCursorModifiers() * Game.globalCpsMult;
			break;
		case "Antimatter condenser":
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

	return r + this.getAchievementWorth(i, 0, r + n, 0);
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
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
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
CookieMonster.color = function(color, hex) {
	var colors = this.getSetting('Colorblind') ? this.colorsBlind : this.colors;
	var color = colors[color];

	return hex ? '#'+color : color;
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

CookieMonster.dhc = function(e, upgradeKey, n) {
	var upgrade = Game.UpgradesById[upgradeKey];
	var i = upgrade.desc.indexOf("<b>") + 3;
	var s = upgrade.desc.indexOf("%");
	var o = upgrade.desc.substr(i, s - i) * 1;
	var u = this.getAchievementWorth(e, upgradeKey, n, Game.prestige['Heavenly chips'] * 2 * (o / 100));

	return u - Game.cookiesPs;
};

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
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			multiplier = multiplier * 2;
		}

		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			multiplier = multiplier * 4;
		}
	});

	return Game.ObjectsById[7].amount * 0.05 * multiplier * Game.ObjectsById[1].amount * Game.globalCpsMult;
};

CookieMonster.gpg = function() {
	var multiplier = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>twice</b> as efficient.") !== -1) {
			multiplier = multiplier * 2;
		}
		if (upgrade.bought && upgrade.desc.indexOf("Grandmas are <b>4 times</b> as efficient.") !== -1) {
			multiplier = multiplier * 4;
		}
	});

	return Game.ObjectsById[1].amount * 0.02 * multiplier * Game.ObjectsById[1].amount * Game.globalCpsMult;
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

CookieMonster.bte = function(e) {
	return Game.ObjectsById[e].storedTotalCps * Game.globalCpsMult;
};

CookieMonster.fte = function(e) {
	return Game.ObjectsById[e].storedTotalCps * 3 * Game.globalCpsMult;
};

CookieMonster.bam = function(building, cookiesPerSecond, buildingKey) {
	var multiplier = 1;

	Game.UpgradesById.forEach(function (upgrade) {
		if (upgrade.bought && upgrade.desc.indexOf(building + " are <b>twice</b> as efficient.") !== -1) {
			multiplier = multiplier * 2;
		}
		if (upgrade.bought && upgrade.desc.indexOf(building + " are <b>4 times</b> as efficient.") !== -1) {
			multiplier = multiplier * 4;
		}
	});

	return cookiesPerSecond * multiplier * Game.ObjectsById[buildingKey].amount * Game.globalCpsMult;
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

CookieMonster.checkUpgrade = function(e, t, n) {
	var upgrade = Game.UpgradesById[t];
	if (upgrade.desc.indexOf("cm_up_div_") === -1 && !n) {
		return false;
	}

	var upgrades = [
		"Reinforced index finger",
		"The mouse and cursors are <b>twice</b> as efficient.",
		"The mouse and cursors gain",
		"Forwards from grandma",
		"Grandmas are <b>twice</b> as efficient.",
		"Cheap hoes",
		"Farms are <b>twice</b> as efficient.",
		"Sturdier conveyor belts",
		"Factories are <b>twice</b> as efficient.",
		"Sugar gas",
		"Mines are <b>twice</b> as efficient.",
		"Vanilla nebulae",
		"Shipments are <b>twice</b> as efficient.",
		"Antimony",
		"Alchemy labs are <b>twice</b> as efficient.",
		"Ancient tablet",
		"Portals are <b>twice</b> as efficient.",
		"Flux capacitors",
		"Time machines are <b>twice</b> as efficient.",
		"the more milk you have",
		"Cookie production multiplier <b>+",
		"for every 50 grandmas",
		"for every 20 portals",
		"Elder Pledge",
		"Elder Covenant",
		"Sacrificial rolling pins",
		"Golden cookie",
		"Clicking gains <b>+1% of your CpS</b>.",
		"Grandmas are <b>4 times</b> as efficient.",
		"Antimatter condensers are <b>twice</b> as efficient.",
		"Sugar bosons",
		"Revoke Elder Covenant",
		"heavenly chips",
	];

	// Get description and check it against current upgrade
	var description = upgrades[e];
	if (!upgrade.bought && (upgrade.name === description || upgrade.desc.indexOf(description) !== -1)) {
		return true;
	}

	return false;
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
 * Create the Bottom Bar
 *
 * @return {void}
 */
CookieMonster.createBottomBar = function() {
	$('body').append('<div id="cookie-monster__bottom-bar"></div>');

	this.$monsterBar = $('#cookie-monster__bottom-bar');
};

/**
 * Toggle the visibility of the Bottom Bar
 *
 * @return {void}
 */
CookieMonster.toggleBar = function() {
	var toggle = this.getBooleanSetting('CMBar');
	var bottom = !toggle ? 0 : 57;

	this.$monsterBar.toggle(toggle);
	this.$game.css('bottom', bottom+'px');
};

/**
 * Create the Bottom Bar
 *
 * @return {void}
 */
CookieMonster.makeTable = function() {
	var thead    = '<th align="left"  style="color:#' + this.color('yellow') + ';" width=130> ' + this.version + "</th>";
	var bonus    = '<th align="right" style="color:#' + this.color('blue')   + ';">Bonus Income</th>';
	var baseCost = '<th align="right" style="color:#' + this.color('blue')   + ';">Base Cost Per Income</th>';
	var timeLeft = '<th align="right" style="color:#' + this.color('blue')   + ';">Time Left</th>';

	// Append each building type to the bar
	Game.ObjectsById.forEach(function (building, key) {
		thead    += '<th align="middle" id="cookie_monster_item_' +key+ '" style="font-weight:bold;"></th>';
		bonus    += '<td align="middle" id="cookie_monster_is_'   +key+ '"></td>';
		baseCost += '<td align="middle" id="cookie_monster_cpi_'  +key+ '"></td>';
		timeLeft += '<td align="middle" id="cookie_monster_tc_'   +key+ '"></td>';
	});

	this.$monsterBar.html(
		'<table style="width:100%; table-layout:fixed; margin-top:2px;">'+
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
		var price = building.price;
		var owned = building.amount;
		var s = building.storedCps * Game.globalCpsMult;
		if (building.name === "Grandma") {
			s = 0;
		}

		// Compute informations
		var bonus = that.roundDecimal(s + that.getUpgradeBonuses(building.name, owned, s));
		var cpi   = that.roundDecimal(price / bonus);
		var count = '(<span style="color: #' +that.color('blue')+ ';">' + that.formatNumber(owned) + '</span>)';

		that.setBuildingInformations(key, {
			items    : building.name.split(' ')[0] + ' ' + count,
			bonus    : that.roundDecimal(bonus),
			cpi      : that.roundDecimal(cpi),
			timeLeft : Math.round(that.secondsLeft(key, "object")),
		});
	});

	// Then we loop over the created array, format the information
	// and update the DOM
	Game.ObjectsById.forEach(function (building, key) {
		var colors       = [that.color('yellow'), that.color('yellow')];
		var informations = [that.bottomBar.cpi[key], that.bottomBar.timeLeft[key]];
		var worst        = [Math.max.apply(Math, that.bottomBar.cpi), Math.max.apply(Math, that.bottomBar.timeLeft)];
		var best         = [Math.min.apply(Math, that.bottomBar.cpi), Math.min.apply(Math, that.bottomBar.timeLeft)];

		// Compute correct colors
		for (var i = 0; i < colors.length; i++) {
			if (informations[i] === best[i]) {
				colors[i] = that.color('green');
			} else if (informations[i] === worst[i]) {
				colors[i] = that.color('red');
			} else if (worst[i] - informations[i] < informations[i] - best[i]) {
				colors[i] = that.color('orange');
			}
		}

		// Update DOM
		$('#cookie_monster_item_' + key).html(that.bottomBar.items[key]);
		$('#cookie_monster_is_'   + key).html(that.formatNumber(that.bottomBar.bonus[key]));
		$('#cookie_monster_cpi_'  + key).html('<span style="color:#' + colors[0] + ';">' + that.formatNumber(informations[0]) + '</span>');
		$('#cookie_monster_tc_'   + key).html('<span style="color:#' + colors[1] + ';">' + that.formatTime(informations[1], true) + '</span>');
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
	$("#sectionLeft").append('<div id="cookie-monster__buff-bars"></div>');

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
			color      = this.color('yellow');
			break;

		case 666:
			multiplier = 6 + 6 * Game.Has('Get lucky');
			frenzyName = 'Blood Frenzy';
			color      = this.color('green');
			break;

		case 0.5:
			multiplier = 66 + 66 * Game.Has('Get lucky');
			frenzyName = 'Clot';
			color      = this.color('red');
			break;
	}

	// Remove bars if the frenzy has ended or we disabled them
	if (Game.frenzy <= 0 || !this.getBooleanSetting('BuffBars')) {
		return this.fadeOutBar(color);
	}

	this.updateBar(frenzyName, color, Game.frenzy);

	// No idea what that does
	var buffColors = [this.color('yellow'), this.color('green'), this.color('red')];
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
		return this.fadeOutBar(this.color('blue'));
	}

	this.updateBar('Click frenzy', this.color('blue'), Game.clickFrenzy);
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
	if (countdown > 0 && CookieMonster.$goldenCookie.is(':hidden')) {
		this.goldenCookieAvailable = this.getBooleanSetting('CookieCD') ? "(" + countdown + ") " : '';
	}

	// Cancel if disabled
	if (timers[0] <= 0 || CookieMonster.$goldenCookie.is(':visible') || !this.getBooleanSetting('CookieCD')) {
		return this.fadeOutBar(this.color('purple'));
	}

	this.updateBar('Next Cookie', this.color('purple'), width, width / timers[2] * 100);
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
	var secondBar = '';
	if (name === 'Next Cookie') {
		secondBar = '<div class="cm-buff-bar__bar bg-purple" id="cmt2_'+this.color('purple')+'"></div>';
	}

	this.$timerBars.append(
		'<div class="cm-buff-bar" id="cookie-monster__timer-' + color + '">'+
			'<table cellpadding="0" cellspacing="0">'+
				'<tr>' +
					'<td>' + name + "<td>" +
					'<td>'+
						'<div class="cm-buff-bar__container bg-' +color+ '" id="cmt_' + color + '">'+
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

CookieMonster.colorize = function(e, upgradeKey, returnHtml) {
	var upgrade = Game.UpgradesById[upgradeKey];
	var price   = upgrade.basePrice;
	var colors  = [this.color('yellow'), this.color('yellow')];

	var u = [this.roundDecimal(price / e), Math.round(this.secondsLeft(upgradeKey, 'upgrade'))];
	var maxValues = [Math.max.apply(Math, this.bottomBar.cpi), Math.max.apply(Math, this.bottomBar.cpi)];
	var minValues = [Math.min.apply(Math, this.bottomBar.cpi), Math.min.apply(Math, this.bottomBar.cpi)];

	for (var i = 0; i < colors.length; i++) {
		if (u[i] < minValues[i]) {
			colors[i] = this.color('blue');
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[0]++;
			}
		} else if (u[i] === minValues[i]) {
			colors[i] = this.color('green');
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[1]++;
			}
		} else if (u[i] === maxValues[i]) {
			colors[i] = this.color('red');
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[4]++;
			}
		} else if (u[i] > maxValues[i]) {
			colors[i] = this.color('purple');
			if (this.isInStore(upgrade) && i === 0) {
				this.inStore[5]++;
			}
		} else if (maxValues[i] - u[i] < u[i] - minValues[i]) {
			colors[i] = this.color('orange');
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
		$('#upgrade' + Game.UpgradesInStore.indexOf(upgrade)).html('<div style="background-color:#' + colors[0] + '; border:1px solid black; position:absolute; z-index:21; top:2px; left:2px; height:14px; width:14px; pointer-events:none;"></div>');
	}

	var $upgrade = $('#cm_up_div_'+upgradeKey);
	if ($upgrade.length === 1) {
		var rewards  = [this.luckyReward('regular'), this.luckyReward('frenzy')];
		var display  = [false, false];
		var deficits = [0, 0];

		if (Game.cookies - price < rewards[0]) {
			display[0]  = true;
			deficits[0] = this.formatNumber(rewards[0] - (Game.cookies - price));
		}
		if (Game.cookies - price < rewards[1]) {
			display[1]  = true;
			deficits[1] = this.formatNumber(rewards[1] - (Game.cookies - price));
		}

		$upgrade.css('border', '1px solid #' + colors[0]);
		$upgrade.css('display', '');
		$upgrade.html(
			'<div style="position:absolute; top:4px; left:4px; color:#' +this.color('blue')+ '; font-weight:bold;">Bonus Income</div>'+
			'<div align=right style="position:absolute; top:18px; left:4px; color:white;">' + this.formatNumber(Math.round(e * 100) / 100) + '</div>'+

			'<div style="position:absolute; top:34px; left:4px; color:#' +this.color('blue')+ '; font-weight:bold;">Base Cost Per Income</div>'+
			'<div align=right style="position:absolute; top:48px; left:4px; color:#' + colors[0] + ';">' + this.formatNumber(u[0]) + '</div>'+

			'<div style="position:absolute; top:64px; left:4px; color:#' +this.color('blue')+ '; font-weight:bold;">Time Left</div>'+
			'<div align=right style="position:absolute; top:78px; left:4px; color:#' + colors[1] + ';">' + this.formatTime(u[1], true) + '</div>'
		);

		$('#cm_up_warning_amount').text('Deficit: ' + deficits[0]);
		$('#cm_up_caution_amount').text('Deficit: ' + deficits[1]);

		if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 2) {
			$("#cm_up_lucky_div_warning").toggle(display[0]);
			$("#cm_up_lucky_div_caution").toggle(display[1]);
		} else {
			$("#cm_up_lucky_div_warning").hide();
			$("#cm_up_lucky_div_caution").hide();
		}
		if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 3) {
			$("#cm_up_note_div_warning").toggle(display[0]);
			$("#cm_up_note_div_caution").toggle(display[1]);
		} else {
			$("#cm_up_note_div_warning").hide();
			$("#cm_up_note_div_caution").hide();
		}
	}
	if (returnHtml) {
		var warning = this.getImage('warning');
		var caution = this.getImage('caution');

		return
			'<div id="cm_up_lucky_div_' +upgradeKey+ '" style="position:absolute; top:-25px; left:-12px; height:32px;">'+
				'<div id="cm_up_lucky_div_warning" style="background:url(' +warning+ '); position:relative; float:left; height:32px; width:32px; display:none;"></div>'+
				'<div id="cm_up_lucky_div_caution" style="background:url(' +caution+ '); position:relative; float:left; height:32px; width:32px; display:none;"></div>'+
			'</div>'+
			'<div id="cm_up_div_' +upgradeKey+ '" style="position:relative; height:96px; background:#' +this.color('greyTen')+ '; border:1px solid #000000; margin:6px -6px -6px -6px; display:none;"></div>'+
			'<div id="cm_up_note_div_' +upgradeKey+ '" style="position:absolute; left:0px; margin-top:10px; color:white;">'+
				'<div id="cm_up_note_div_warning" style="background:#' +this.color('greyTen')+ '; position:relative; display:none; margin-top:4px; padding:2px; border:1px solid #' +this.color('red')+ ';">'+
					'<b style="color:#' +this.color('red')+ ';">Warning:</b>'+
					'Purchase of this item will put you under the number of Cookies required for "Lucky!"<br>'+
				'<span id="cm_up_warning_amount"></span>'+
				'<div id="cm_up_lucky_div_warning" style="position:absolute; left:-10px; top:-10px; height:32px; width:32px;">'+
					'<img src="' +warning+ '" height="16px" width="16px"></div>'+
			'</div>'+
			'<div id="cm_up_note_div_caution" style="background:#' +this.color('greyTen')+ '; position:relative; display:none; margin-top:4px; padding:2px; border:1px solid #' +this.color('yellow')+ ';">'+
				'<b style="color:#' +this.color('yellow')+ ';">Caution:</b>'+
				'Purchase of this item will put you under the number of Cookies required for "Lucky!" (Frenzy)<br>'+
				'<span id="cm_up_caution_amount"></span>'+
				'<div id="cm_up_lucky_div_warning" style="position:absolute; left:-10px; top:-10px; height:32px; width:32px;">'+
					'<img src="' +caution+ '" height="16px" width="16px">'+
				'</div>'+
			'</div>'+
			'</div>';
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
		this.settings[name] = parseInt(localStorage[name], 10);
	}

	// Else save default
	else {
		localStorage[name] = this.settings[name];
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
			localStorage[setting] = this.settings[setting];
		}
	}

	this.toggleBar();
};

//////////////////////////////////////////////////////////////////////
////////////////////////// GETTERS AND SETTERS ///////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Set a setting by name
 *
 * @param {String} setting
 * @param {Mixed}  value
 */
CookieMonster.setSetting = function(setting, value) {
	this.settings[setting] = value;
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
	return this.settings[setting];
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
	return (this.settings[name] === 0) ? 'OFF' : 'ON';
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
	var $option = $(option);

	switch ($option.text()) {
		case "Colorblind ON":
			this.setSetting('Colorblind', 0);
			$option.text("Colorblind OFF");
			break;
		case "Colorblind OFF":
			this.setSetting('Colorblind', 1);
			$option.text("Colorblind ON");
			break;
		case "Flash Screen ON":
			this.setSetting('FlashScreen', 0);
			$option.text("Flash Screen OFF");
			break;
		case "Flash Screen OFF":
			this.setSetting('FlashScreen', 1);
			$option.text("Flash Screen ON");
			break;
		case "Cookie Sound ON":
			this.setSetting('CookieSound', 0);
			$option.text("Cookie Sound OFF");
			break;
		case "Cookie Sound OFF":
			this.setSetting('CookieSound', 1);
			$option.text("Cookie Sound ON");
			break;
		case "Cookie Timer ON":
			this.setSetting('CookieTimer', 0);
			$option.text("Cookie Timer OFF");
			break;
		case "Cookie Timer OFF":
			this.setSetting('CookieTimer', 1);
			$option.text("Cookie Timer ON");
			break;
		case "Next Cookie Timer ON":
			this.setSetting('CookieCD', 0);
			$option.text("Next Cookie Timer OFF");
			break;
		case "Next Cookie Timer OFF":
			this.setSetting('CookieCD', 1);
			$option.text("Next Cookie Timer ON");
			break;
		case "Update Title ON":
			this.setSetting('UpdateTitle', 0);
			$option.text("Update Title OFF");
			break;
		case "Update Title OFF":
			this.setSetting('UpdateTitle', 1);
			$option.text("Update Title ON");
			break;
		case "Buff Bars ON":
			this.setSetting('BuffBars', 0);
			$option.text("Buff Bars OFF");
			break;
		case "Buff Bars OFF":
			this.setSetting('BuffBars', 1);
			$option.text("Buff Bars ON");
			break;
		case "Bottom Bar ON":
			this.setSetting('CMBar', 0);
			$option.text("Bottom Bar OFF");
			break;
		case "Bottom Bar OFF":
			this.setSetting('CMBar', 1);
			$option.text("Bottom Bar ON");
			break;
		case "Colored Prices ON":
			this.setSetting('ColoredPrices', 0);
			$option.text("Colored Prices OFF");
			this.updateTooltips("objects");
			break;
		case "Colored Prices OFF":
			this.setSetting('ColoredPrices', 1);
			$option.text("Colored Prices ON");
			this.updateTooltips("objects");
			break;
		case "Upgrade Icons ON":
			this.setSetting('UpgradeIcons', 0);
			$option.text("Upgrade Icons OFF");
			Game.RebuildUpgrades();
			break;
		case "Upgrade Icons OFF":
			this.setSetting('UpgradeIcons', 1);
			$option.text("Upgrade Icons ON");
			Game.RebuildUpgrades();
			break;
		case "Upgrade Display (All)":
			this.setSetting('UpgradeDisplay', 0);
			$option.text("Upgrade Display (None)");
			this.updateUpgradeDisplay();
			break;
		case "Upgrade Display (None)":
			this.setSetting('UpgradeDisplay', 1);
			$option.text("Upgrade Display (Normal)");
			this.updateUpgradeDisplay();
			break;
		case "Upgrade Display (Normal)":
			this.setSetting('UpgradeDisplay', 2);
			$option.text("Upgrade Display (All)");
			this.updateUpgradeDisplay();
			break;
		case "Short Numbers ON (B)":
			this.setSetting('ShortNumbers', 0);
			$option.text("Short Numbers OFF");
			Game.RebuildStore();
			Game.RebuildUpgrades();
			this.updateTable();
			break;
		case "Short Numbers OFF":
			this.setSetting('ShortNumbers', 1);
			$option.text("Short Numbers ON (A)");
			Game.RebuildStore();
			Game.RebuildUpgrades();
			this.updateTable();
			break;
		case "Short Numbers ON (A)":
			this.setSetting('ShortNumbers', 2);
			$option.text("Short Numbers ON (B)");
			Game.RebuildStore();
			Game.RebuildUpgrades();
			this.updateTable();
			break;
		case "Lucky Alert (Both)":
			this.setSetting('LuckyAlert', 2);
			$option.text("Lucky Alert (Icons)");
			break;
		case "Lucky Alert (Icons)":
			this.setSetting('LuckyAlert', 3);
			$option.text("Lucky Alert (Notes)");
			break;
		case "Lucky Alert (Notes)":
			this.setSetting('LuckyAlert', 0);
			$option.text("Lucky Alert (Off)");
			break;
		case "Lucky Alert (Off)":
			this.setSetting('LuckyAlert', 1);
			$option.text("Lucky Alert (Both)");
			break;
		case "Refresh Rate (1 fps)":
			this.setSetting('Refresh', 500);
			$option.text("Refresh Rate (2 fps)");
			break;
		case "Refresh Rate (2 fps)":
			this.setSetting('Refresh', 250);
			$option.text("Refresh Rate (4 fps)");
			break;
		case "Refresh Rate (4 fps)":
			this.setSetting('Refresh', 100);
			$option.text("Refresh Rate (10 fps)");
			break;
		case "Refresh Rate (10 fps)":
			this.setSetting('Refresh', 33);
			$option.text("Refresh Rate (30 fps)");
			break;
		case "Refresh Rate (30 fps)":
			this.setSetting('Refresh', 1e3);
			$option.text("Refresh Rate (1 fps)");
			break;
	}

	this.saveSettings();
};

//////////////////////////////////////////////////////////////////////
///////////////////////////// OPTION VALUES //////////////////////////
//////////////////////////////////////////////////////////////////////

/**
 * Get a text version of the current short numbers option
 *
 * @return {string}
 */
CookieMonster.getShortNumbers = function() {
	switch (this.getSetting('ShortNumbers') * 1) {
		case 1:
			return 'ON (A)';
		case 2:
			return 'ON (B)';
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
CookieMonster.getRefreshRate = function() {
	switch (this.getSetting('Refresh') * 1) {
		case 1e3:
			return '1';
		case 500:
			return '2';
		case 250:
			return '4';
		case 100:
			return '10';
		case 33:
			return '30';
		default:
			return '1';
	}
};

/**
 * Get a text version of the "Upgrade display" option
 *
 * @return {string}
 */
CookieMonster.getUpgradeDisplay = function() {
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
CookieMonster.getLuckyAlert = function () {
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
			'<td align=center style="color:#' +this.color('blue')+   ';" id="cm_up_q0">0</td>' +
			'<td align=center style="color:#' +this.color('green')+  ';" id="cm_up_q1">0</td>' +
			'<td align=center style="color:#' +this.color('yellow')+ ';" id="cm_up_q2">0</td>' +
			'<td align=center style="color:#' +this.color('orange')+ ';" id="cm_up_q3">0</td>' +
			'<td align=center style="color:#' +this.color('red')+    ';" id="cm_up_q4">0</td>' +
			'<td align=center style="color:#' +this.color('purple')+ ';" id="cm_up_q5">0</td>' +
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

CookieMonster.setupTooltips = function() {
	var needsRebuild = false;

	Game.UpgradesById.forEach(function (upgrade, key) {
		for (var upgradeKey = 0; upgradeKey < CookieMonster.upgradeCount; upgradeKey++) {
			if (CookieMonster.checkUpgrade(upgradeKey, key, true)) {
				upgrade.desc = CookieMonster.manageTooltips(upgradeKey, key, true, false);
				needsRebuild = true;
				break;
			}
		}
		if (upgrade.bought && upgrade.desc !== CookieMonster.tooltips[key]) {
			upgrade.desc = CookieMonster.tooltips[key];
			needsRebuild = true;
		}
	});

	if (needsRebuild) {
		Game.RebuildUpgrades();
	}
};

/**
 * Update one or more types of tooltips
 *
 * @param {string} which [upgrades,objects,all]
 *
 * @return {void}
 */
CookieMonster.updateTooltips = function(which) {
	if (which === 'all' || which === 'upgrades') {
		this.inStore = [0, 0, 0, 0, 0, 0];

		Game.UpgradesById.forEach(function (upgrade, key) {
			for (var upgradeKey = 0; upgradeKey < CookieMonster.upgradeCount; upgradeKey++) {
				if (CookieMonster.checkUpgrade(upgradeKey, key, false)) {
					CookieMonster.manageTooltips(upgradeKey, key, false, false);
					break;
				}
			}
		});
	}
	if (which === 'all' || which === 'objects') {
		Game.ObjectsById.forEach(function (object) {
			CookieMonster.manageBuildingTooltip(object);
		});
	}
};

CookieMonster.manageTooltips = function(upgradeKey, t, n, r) {
	var i = 0;
	var s = 0;
	switch (upgradeKey) {
		case 0:
			i = this.bam('The mouse and cursors', 0.1, 0);
			break;
		case 1:
			i = this.bte(0);
			break;
		case 2:
			i = this.mcg(t);
			break;
		case 3:
			i = this.bam('Grandmas', 0.3, 1);
			break;
		case 4:
			i = this.bte(1);
			if (this.lgt(t)) {
				s++;
			}
			break;
		case 5:
			i = this.bam('Farms', 0.5, 2);
			break;
		case 6:
			i = this.bte(2);
			break;
		case 7:
			i = this.bam('Factories', 4, 3);
			break;
		case 8:
			i = this.bte(3);
			break;
		case 9:
			i = this.bam('Mines', 10, 4);
			break;
		case 10:
			i = this.bte(4);
			break;
		case 11:
			i = this.bam('Shipments', 30, 5);
			break;
		case 12:
			i = this.bte(5);
			break;
		case 13:
			i = this.bam('Alchemy labs', 100, 6);
			break;
		case 14:
			i = this.bte(6);
			break;
		case 15:
			i = this.bam('Portals', 1666, 7);
			break;
		case 16:
			i = this.bte(7);
			break;
		case 17:
			i = this.bam('Time machines', 9876, 8);
			break;
		case 18:
			i = this.bte(8);
			break;
		case 21:
			i = this.gpg();
			break;
		case 22:
			i = this.gpp();
			break;
		case 23:
			s += this.hasntAchievement("Elder nap");
			if (Game.pledges === 4) {
				s += this.hasntAchievement("Elder slumber");
			}
			break;
		case 24:
			s += this.hasntAchievement("Elder calm");
			break;
		case 28:
			i = this.fte(1);
			break;
		case 29:
			i = this.bte(9);
			break;
		case 30:
			i = this.bam('Antimatter condensers', 99999, 9);
			break;
		case 32:
			i = this.dhc(s, t, i);
			if (this.isHeavenlyKey(t)) {
				s += this.hasntAchievement("Wholesome");
			}
			break;
	}
	if (Game.UpgradesOwned === 19) {
		s += this.hasntAchievement('Enhancer');
	}
	if (Game.UpgradesOwned === 49) {
		s += this.hasntAchievement('Augmenter');
	}
	if (Game.UpgradesOwned === 99) {
		s += this.hasntAchievement('Upgrader');
	}
	i += this.getAchievementWorth(s, t, i, 0);
	if (r) {
		return i;
	}

	return this.tooltips[t] + this.colorize(i, t, n);
};

CookieMonster.manageBuildingTooltip = function(building) {
	var buildingKey = building.id;
	var rewards     = [this.luckyReward('regular'), this.luckyReward('frenzy')];
	var display     = [false, false];
	var deficits    = [0, 0];

	if (Game.cookies - building.price < rewards[0]) {
		display[0]  = true;
		deficits[0] = rewards[0] - (Game.cookies - building.price);
	}
	if (Game.cookies - building.price < rewards[1]) {
		display[1]  = true;
		deficits[1] = rewards[1] - (Game.cookies - building.price);
	}

	// Create tooltips
	if (building.desc === this.buildingTooltips[building.id]) {
		building.desc +=
			'<div class="cm-tooltip" id="cm_ob_div_' + buildingKey + '"></div>'+
			'<div id="cm_ob_lucky_div_' + buildingKey + '" style="position:absolute; top:-25px; left:-12px; height:32px;">'+
				'<div class="cm-tooltip__image" id="cm_ob_lucky_div_warning" style="background:url(' +this.getImage('warning')+ ')"></div>'+
				'<div class="cm-tooltip__image" id="cm_ob_lucky_div_caution" style="background:url(' +this.getImage('caution')+ ')"></div>'+
			'</div>'+
			'<div id="cm_ob_note_div_' + buildingKey + '" style="position:absolute; left:0px; margin-top:10px; color:white;">'+
				'<div id="cm_ob_note_div_warning" class="cm-tooltip__warning" style="border-color: #' +this.color('red')+ ';">'+
					'<b style="color:#' +this.color('red')+ ';">Warning:</b>' +this.texts.warning+ '<br>'+
					'<span id="cm_ob_warning_amount"></span>'+
					'<div id="cm_ob_lucky_div_warning"><img src="' +this.getImage('warning')+ '"></div>'+
				'</div>'+
				'<div id="cm_ob_note_div_caution" class="cm-tooltip__warning" style="border-color: #' +this.color('yellow')+ ';">'+
					'<b style="color:#' +this.color('yellow')+ ';">Caution:</b>' +this.texts.warning+ ' (Frenzy)<br>'+
					'<span id="cm_ob_caution_amount"></span>'+
					'<div id="cm_ob_lucky_div_warning"><img src="' +this.getImage('caution')+ '"></div>'+
				'</div>'+
			'</div>';

		Game.RebuildStore();
	}

	var colors       = [this.color('yellow'), this.color('yellow')];
	var informations = [this.bottomBar.cpi[buildingKey], this.bottomBar.timeLeft[buildingKey]];
	var maxValues    = [Math.max.apply(Math, this.bottomBar.cpi), Math.max.apply(Math, this.bottomBar.timeLeft)];
	var minValues    = [Math.min.apply(Math, this.bottomBar.cpi), Math.min.apply(Math, this.bottomBar.timeLeft)];

	for (var i = 0; i < colors.length; i++) {
		if (informations[i] === minValues[i]) {
			colors[i] = this.color('green');
		} else if (informations[i] === maxValues[i]) {
			colors[i] = this.color('red');
		} else if (maxValues[i] - informations[i] < informations[i] - minValues[i]) {
			colors[i] = this.color('orange');
		}
	}

	var $building = $('#cm_ob_div_' + buildingKey);
	if ($building.length === 1) {
		$building.css({
			'border'  : '1px solid #'+colors[0],
			'display' : '',
		}).html(
			'<div style="position:absolute; top:4px; left:4px; color:#' +this.color('blue')+ '; font-weight:bold;">Bonus Income</div>'+
			'<div align=right style="position:absolute; top:18px; left:4px; color:white;">' + this.formatNumber(this.bottomBar.bonus[buildingKey]) + '</div>'+
			'<div style="position:absolute; top:34px; left:4px; color:#' +this.color('blue')+ '; font-weight:bold;">Base Cost Per Income</div>'+
			'<div align=right style="position:absolute; top:48px; left:4px; color:#' + colors[0] + ';">' + this.formatNumber(informations[0]) + '</div>'+
			'<div style="position:absolute; top:64px; left:4px; color:#' +this.color('blue')+ '; font-weight:bold;">Time Left</div>'+
			'<div align=right style="position:absolute; top:78px; left:4px; color:#' + colors[1] + ';">' + this.formatTime(informations[1]) + "</div>"
		);

		$('#cm_ob_warning_amount').text('Deficit: ' + this.formatNumber(deficits[0]));
		$('#cm_ob_caution_amount').text('Deficit: ' + this.formatNumber(deficits[1]));

		if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 2) {
			$('#cm_ob_lucky_div_warning').toggle(display[0]);
			$('#cm_ob_lucky_div_caution').toggle(display[1]);
		} else {
			$('#cm_ob_lucky_div_warning').hide();
			$('#cm_ob_lucky_div_caution').hide();
		}

		if (this.getSetting('LuckyAlert') === 1 || this.getSetting('LuckyAlert') === 3) {
			$('#cm_ob_note_div_warning').toggle(display[0]);
			$('#cm_ob_note_div_caution').toggle(display[1]);
		} else {
			$('#cm_ob_note_div_warning').hide();
			$('#cm_ob_note_div_caution').hide();
		}
	}

	var color = this.getBooleanSetting('ColoredPrices') ? '#'+colors[0] : '';

	$('.price', '#product'+buildingKey).first().css('color', color);
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

	// Load stylesheet
	//$('head').append('<link rel="stylesheet" href="https://raw.github.com/Anahkiasen/cookie-monster/master/dist/cookie-monster.min.css">');
	$('head').append('<link rel="stylesheet" href="http://localhost/_github/cookie-monster/dist/cookie-monster.min.css">');

	// Add Cookie Monster elements
	this.createBottomBar();
	this.createOverlay();
	this.createGoldenOverlay();
	this.createBarsContainer();
	this.createStoreCounters();

	// Add ID to favicon
	$('link[href="favicon.ico"]').attr('id', 'cm_favicon');

	// Setup Cookie Monster
	this.makeTable();
	this.saveTooltips();
	this.update();
	this.loadSettings();
	this.setupTooltips();

	// Start the loop
	this.mainLoop();

	Game.Popup('<span style="color:#' +this.color('yellow')+ '; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black !important;">Cookie Monster ' + this.version + " Loaded!</span>");
};

/**
 * Executes the main updating loop to refrsh CookieMonster
 *
 * @return {void}
 */
CookieMonster.mainLoop = function() {
	CookieMonster.updateTable();
	CookieMonster.updateTooltips('all');
	CookieMonster.emphasizeGolden();
	CookieMonster.manageBuffs();
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
		return native.replace('.title=', '.title=CookieMonster.goldenCookieAvailable+');
	});
	this.replaceNative('UpdateMenu', function (native) {
		return native.replace("Statistics</div>'+", "Statistics</div>'+\n\n"+
			"'<div class=\"subsection\">" +
				"<div class=\"title\"><span style=\"color:#' +CookieMonster.color('blue')+ ';\">Cookie Monster Goodies</span></div>"+
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

	var cookieMonsterSettings = "\n'<div class=\"subsection\">" +
		"<div class=\"title\"><span style=\"color:#' +CookieMonster.color('blue')+ ';\">Cookie Monster Settings</span></div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Flash Screen ' + CookieMonster.getOptionState('FlashScreen') + '</a>"+
			"<label>Flashes the screen when a Golden Cookie or Red Cookie appears</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Cookie Timer ' + CookieMonster.getOptionState('CookieTimer') + '</a>"+
			"<label>Displays a timer on Golden Cookies and Red Cookies</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Cookie Sound ' + CookieMonster.getOptionState('CookieSound') + '</a>"+
			"<label>Plays a sound when a Golden Cookie or Red Cookie appears</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Next Cookie Timer ' + CookieMonster.getOptionState('CookieCD') + '</a>"+
			"<label>Displays a countdown bar and updates the Title for when the next Cookie will appear</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Update Title ' + CookieMonster.getOptionState('UpdateTitle') + '</a>"+
			"<label>Updates the Title to display if a Cookie is waiting to be clicked</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Buff Bars ' + CookieMonster.getOptionState('BuffBars') + '</a>"+
			"<label>Displays a countdown bar for each effect currently active</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Bottom Bar ' + CookieMonster.getOptionState('CMBar') + '</a>"+
			"<label>Displays a bar at the bottom of the screen that shows all Building information</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Colored Prices ' + CookieMonster.getOptionState('ColoredPrices') + '</a>"+
			"<label>Changes the colors of all Building prices to correspond with their Cost Per Income</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Upgrade Icons ' + CookieMonster.getOptionState('UpgradeIcons') + '</a>"+
			"<label>Displays a small square icon on the Upgrade to better display the Cost Per Income color value</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Short Numbers ' + CookieMonster.getShortNumbers() + '</a>"+
			"<label>Formats all numbers to be shorter when displayed</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Upgrade Display (' + CookieMonster.getUpgradeDisplay() + ')</a>"+
			"<label>Changes how the store displays Upgrades</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Lucky Alert (' + CookieMonster.getLuckyAlert() + ')</a>"+
			"<label>Changes the tooltip to display if you would be under the number of cookies required for \"Lucky!\"</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Refresh Rate (' + CookieMonster.getRefreshRate() + ' fps)</a>"+
			"<label>The rate at which Cookie Monster updates data (higher rates may slow the game)</label>"+
		"</div>"+
		'<div class="listing">'+
			"<a class=\"option\" onclick=\"CookieMonster.toggleOption(this);\">Colorblind ' + CookieMonster.getOptionState('Colorblind') + '</a>"+
			"<label>Use colorblind safe colors</label>"+
		"</div>"+
	"</div>'+";

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