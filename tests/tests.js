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
CookieMonster = require('../src/CookieMonster/cookie-monster.js').CookieMonster;
CookieObject  = require('../src/CookieMonster/cookie-monster.js').CookieObject;

require('../src/CookieMonster/core/events.js');
require('../src/CookieMonster/core/runtime.js');
require('../src/CookieMonster/core/setup.js');
require('../src/CookieMonster/core/hooks.js');
require('../src/CookieMonster/game/achievements.js');
require('../src/CookieMonster/game/buildings.js');
require('../src/CookieMonster/game/golden-cookie.js');
require('../src/CookieMonster/game/heavenly.js');
require('../src/CookieMonster/game/special.js');
require('../src/CookieMonster/game/upgrades.js');
require('../src/CookieMonster/helpers/browser.js');
require('../src/CookieMonster/helpers/cache.js');
require('../src/CookieMonster/helpers/emphasizers.js');
require('../src/CookieMonster/helpers/math.js');
require('../src/CookieMonster/helpers/time.js');
require('../src/CookieMonster/interface/bottom-bar.js');
require('../src/CookieMonster/interface/buff-bars.js');
require('../src/CookieMonster/interface/settings.js');
require('../src/CookieMonster/interface/store.js');
require('../src/CookieMonster/interface/tooltips.js');

require('../src/CookieObject/helpers.js');
require('../src/CookieObject/reflection.js');
require('../src/CookieObject/statistics.js');

require('../src/Native/math.js');

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

	'CookieMonster': {
		'Core' : {
			'Setup': require('./CookieMonster/core/setup.js'),
		},
		'Game': {
			'Achievements'  : require('./CookieMonster/game/achievements.js'),
			'Buildings'     : require('./CookieMonster/game/buildings.js'),
			'Golden Cookie' : require('./CookieMonster/game/golden-cookie.js'),
			'Heavenly'      : require('./CookieMonster/game/heavenly.js'),
			'Upgrades'      : require('./CookieMonster/game/upgrades.js'),
		},
		'Interface': {
			'Bottom Bar' : require('./CookieMonster/interface/bottom-bar.js'),
			'Buff Bars'  : require('./CookieMonster/interface/buff-bars.js'),
			'Settings'   : require('./CookieMonster/interface/settings.js'),
			'Store'      : require('./CookieMonster/interface/store.js'),
			'Tooltips'   : require('./CookieMonster/interface/tooltips.js'),
		},
		'Helpers': {
			'Browser'     : require('./CookieMonster/helpers/browser.js'),
			'Cache'       : require('./CookieMonster/helpers/cache.js'),
			'Emphasizers' : require('./CookieMonster/helpers/emphasizers.js'),
			'Math'        : require('./CookieMonster/helpers/math.js'),
			'Time'        : require('./CookieMonster/helpers/time.js'),
		},
	},
	'CookieObject': {
		'Helpers'    : require('./CookieObject/helpers.js'),
		'Reflection' : require('./CookieObject/reflection.js'),
	},
	'Native': {
		'Math': require('./Native/math.js'),
	},

};