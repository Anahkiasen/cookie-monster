/* exported CookieMonster */

/**
 * The CookieMonster plugin
 *
 * @type {Object}
 */
var CookieMonster = {

	// Runtime variables
	////////////////////////////////////////////////////////////////////

	version               : "v.1.040.01",
	emphasize             : true,
	tooltips              : [],
	buildingTooltips      : [],
	holdItem              : [],
	holdIs                : [],
	holdCPI               : [],
	holdTC                : [],
	goldenCookieAvailable : "",
	loops                 : 0,
	stsType               : new Array(
		[" M", " B", " T", " Qa", " Qi", " Sx", " Sp", " Oc", " No", " Dc"],
		[" M", " G", " T", " P", " E", " Z", " Y", " Oc", " No", " Dc"]),

	// Upgrades
	////////////////////////////////////////////////////////////////////

	inStore      : new Array(0, 0, 0, 0, 0, 0),
	upgradeCount : 33,

	// Settings
	////////////////////////////////////////////////////////////////////

	settingsKeys : ['FlashScreen', 'CookieTimer', 'BuffBars', 'Refresh', 'CookieCD', 'CMBar', 'ColoredPrices', 'ShortNumbers', 'CookieSound', 'UpdateTitle', 'LuckyAlert', 'UpgradeIcons', 'UpgradeDisplay'],
	settings     : [1, 1, 1, 1e3, 1, 1, 1, 1, 0, 1, 1, 1, 1],

	// Selectors
	////////////////////////////////////////////////////////////////////

	$monsterBar   : $("#cookie_monster_bar"),
	$goldenCookie : $("#goldenCookie"),

	// Colors
	////////////////////////////////////////////////////////////////////

	colors: {
		yellow : 'FFFF00',
		green  : '00FF00',
		red    : 'FF0000',
		blue   : '4BB8F0',
		purple : 'FF00FF',
		orange : 'FF7F00',
	}

};