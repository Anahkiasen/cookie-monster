// Mocha
var Mock = require('./Mock.js');
var Test = require('./TestCase.js');
var chai = require('chai').should();

require('blanket')({
	pattern: 'cookie-monster/src/',
});

// Browser
var html  = '<html><head></head><body><div id="sectionLeft"></div><div id="upgrades"></div></body></html>';
var jsdom = require('jsdom');
document  = jsdom.jsdom(html);
window    = document.createWindow();

realAudio    = require('./Audio.js');
localStorage = {};

// jQuery
jQuery = require('jquery');
$      = jQuery(window);

// Modules
Game          = Mock.game();
CookieMonster = require('../src/cookie-monster.js');
require('../src/core/decorators.js');
require('../src/core/events.js');
require('../src/core/runtime.js');
require('../src/core/setup.js');
require('../src/core/hooks.js');
require('../src/game/achievements.js');
require('../src/game/buildings.js');
require('../src/game/golden-cookie.js');
require('../src/game/heavenly.js');
require('../src/game/special.js');
require('../src/game/upgrades.js');
require('../src/helpers/browser.js');
require('../src/helpers/cache.js');
require('../src/helpers/emphasizers.js');
require('../src/helpers/math.js');
require('../src/helpers/time.js');
require('../src/interface/bottom-bar.js');
require('../src/interface/buff-bars.js');
require('../src/interface/settings.js');
require('../src/interface/store.js');
require('../src/interface/tooltips.js');
require('../src/main.js');

// Cache settings
settings = Mock.clone(CookieMonster.settings);

//////////////////////////////////////////////////////////////////////
///////////////////////////////// TESTS //////////////////////////////
//////////////////////////////////////////////////////////////////////

module.exports = {

	beforeEach: function() {
		var settingsCache = Mock.clone(settings);

		// Restore DOM
		document = jsdom.jsdom(html);
		window   = document.createWindow();
		$        = jQuery(window);

		// Restore storage
		localStorage = {};

		// Restore game
		Game = Mock.game();
		CookieMonster.settings   = settingsCache;
		CookieMonster.cacheStore = {};
	},

	// Tests
	////////////////////////////////////////////////////////////////////

	'Main' : require('./main.js'),
	'Game': {
		'Achievements'  : require('./game/achievements.js'),
		'Buildings'     : require('./game/buildings.js'),
		'Golden Cookie' : require('./game/golden-cookie.js'),
		'Heavenly'      : require('./game/heavenly.js'),
		'Upgrades'      : require('./game/upgrades.js'),
	},
	'Interface': {
		'Bottom Bar' : require('./interface/bottom-bar.js'),
		'Buff Bars'  : require('./interface/buff-bars.js'),
		'Settings'   : require('./interface/settings.js'),
		'Store'      : require('./interface/store.js'),
		'Tooltips'   : require('./interface/tooltips.js'),
	},
	'Helpers': {
		'Browser'     : require('./helpers/browser.js'),
		'Cache'       : require('./helpers/cache.js'),
		'Emphasizers' : require('./helpers/emphasizers.js'),
		'Math'        : require('./helpers/math.js'),
		'Time'        : require('./helpers/time.js'),
	},

};