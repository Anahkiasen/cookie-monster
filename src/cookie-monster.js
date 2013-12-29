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
	},

	// Selectors
	////////////////////////////////////////////////////////////////////

	$game          : $('#game'),
	$goldenCookie  : $('#goldenCookie'),
	$goldenOverlay : $('#cookie_monster_golden_overlay'),
	$monsterBar    : $('#cookie_monster_bar'),
	$overlay       : $('#cookie_monster_overlay'),
	$timerBars     : $('#cookie_monster_timer_bars_div'),

	// Colors
	////////////////////////////////////////////////////////////////////

	colorblind: false,

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