// Mocha
var Mock = require('./Mock.js');
var Test = require('./TestCase.js');
var chai = require('chai').should();

// Browser
var jsdom = require('jsdom');
document  = jsdom.jsdom('<html><head></head><body></body></html>');
window    = document.createWindow();

realAudio    = require('./Audio.js');
localStorage = {};

// jQuery
jQuery = require('jquery');
$      = jQuery(window);

// Modules
Game          = '';
CookieMonster = '';

//////////////////////////////////////////////////////////////////////
///////////////////////////////// TESTS //////////////////////////////
//////////////////////////////////////////////////////////////////////

module.exports = {

	beforeEach: function() {
		Game          = Mock.game();
		CookieMonster = require('../dist/js/cookie-monster.js');

		localStorage = {};

		CookieMonster.settings = {
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
		};
	},

	// Tests
	////////////////////////////////////////////////////////////////////

	'Game': {
		'Achievements' : require('./game/achievements.js'),
		'Heavenly'     : require('./game/heavenly.js'),
		'Lucky'        : require('./game/lucky.js'),
	},
	'Interface': {
		// 'Bottom Bar' : require('./interface/bottom-bar.js'),
		'Settings'   : require('./interface/settings.js'),
	},
	'Helpers': {
		'Browser' : require('./helpers/browser.js'),
		'Math'    : require('./helpers/math.js'),
		'Misc'    : require('./helpers/misc.js'),
		'Time'    : require('./helpers/time.js'),
	},

};