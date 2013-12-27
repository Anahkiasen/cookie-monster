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

	settingsKeys : ['FlashScreen', 'CookieTimer', 'BuffBars', 'Refresh', 'CookieCD', 'CMBar', 'ColoredPrices', 'ShortNumbers', 'CookieSound', 'UpdateTitle', 'LuckyAlert', 'UpgradeIcons', 'UpgradeDisplay'],
	settings     : [1, 1, 1, 1e3, 1, 1, 1, 1, 0, 1, 1, 1, 1],

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

	colors: {
		blue   : '4BB8F0',
		green  : '00FF00',
		orange : 'FF7F00',
		purple : 'FF00FF',
		red    : 'FF0000',
		yellow : 'FFFF00',
	}

};