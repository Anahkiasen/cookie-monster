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
CookieMonster = require('../dist/js/cookie-monster.js');
settings      = JSON.parse(JSON.stringify(CookieMonster.settings));

//////////////////////////////////////////////////////////////////////
///////////////////////////////// TESTS //////////////////////////////
//////////////////////////////////////////////////////////////////////

module.exports = {

	beforeEach: function() {
		var settingsCache = JSON.parse(JSON.stringify(settings));

		Game          = Mock.game();
		CookieMonster = require('../dist/js/cookie-monster.js');

		localStorage = {};

		CookieMonster.settings = settingsCache;
	},

	// Tests
	////////////////////////////////////////////////////////////////////

	'Game': {
		'Achievements'  : require('./game/achievements.js'),
		'Golden Cookie' : require('./game/golden-cookie.js'),
		'Heavenly'      : require('./game/heavenly.js'),
		'Lucky'         : require('./game/lucky.js'),
	},
	'Interface': {
		'Bottom Bar' : require('./interface/bottom-bar.js'),
		'Settings'   : require('./interface/settings.js'),
		'Store'      : require('./interface/store.js'),
	},
	'Helpers': {
		'Browser' : require('./helpers/browser.js'),
		'Math'    : require('./helpers/math.js'),
		'Misc'    : require('./helpers/misc.js'),
		'Time'    : require('./helpers/time.js'),
	},

};