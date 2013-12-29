/* exported CookieMonster */

/**
 * The CookieMonster plugin
 *
 * @type {Object}
 */
var CookieMonster = {

	// Runtime variables
	////////////////////////////////////////////////////////////////////

	version : 'v.1.040.01',
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
	onScreen      : {
		golden : false,
		season : false
	},

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
		'Sounds'         : 0,
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
	$flashOverlay : $('#cookie-monster__golden-overlay'),
	$monsterBar    : $('#cookie-monster__bottom-bar'),
	$overlay       : $('#cookie-monster__overlay'),
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