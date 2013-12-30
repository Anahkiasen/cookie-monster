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