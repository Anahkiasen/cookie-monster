// Mocha
var assert = require('assert');
var Mock   = require('./Mock.js');
var Test   = require('./TestCase.js');

// Browser
var jsdom    = require("jsdom").jsdom;
var document = jsdom('<html><head></head><body></body></html>');
var window   = document.createWindow();
localStorage = {};

// jQuery
jQuery = require('jquery');
$      = jQuery(window);

// Game
Game          = {};
CookieMonster = require('../src/cookie-monster.js');

// Modules
require('../src/game/achievements.js');
require('../src/game/lucky.js');
require('../src/helpers/misc.js');
require('../src/interface/bottom-bar.js');
require('../src/interface/settings.js');

//////////////////////////////////////////////////////////////////////
///////////////////////////////// TESTS //////////////////////////////
//////////////////////////////////////////////////////////////////////

describe('CookieMonster', function () {

	beforeEach(function() {
		Game         = {};
		localStorage = {};
		CookieMonster.settingsKeys = ['FlashScreen', 'CookieTimer', 'BuffBars', 'Refresh', 'CookieCD', 'CMBar', 'ColoredPrices', 'ShortNumbers', 'CookieSound', 'UpdateTitle', 'LuckyAlert', 'UpgradeIcons', 'UpgradeDisplay'];
		CookieMonster.settings = [1, 1, 1, 1e3, 1, 1, 1, 1, 0, 1, 1, 1, 1];

		Game.cookiesPs   = 10;
		Game.frenzyPower = 1;
	});

	// Settings
	////////////////////////////////////////////////////////////////////

	describe('#loadSetting', function() {
		it('Can load setting from localStorage', function() {
			localStorage.FlashScreen = 0;
			CookieMonster.loadSetting(0, 'FlashScreen');
			assert.equal(0, CookieMonster.settings[0]);
		});
	});

	describe('#loadSettings', function() {
		it('Can load all settings from localStorage', function() {
			localStorage.FlashScreen = 0;
			CookieMonster.loadSettings();
			assert.equal(0, CookieMonster.settings[0]);
		});
	});

	describe('#saveSettings', function() {
		it('Can save settings to localStorage', function() {
			CookieMonster.settings[0] = 0;
			CookieMonster.saveSettings();

			assert.equal(0, localStorage.FlashScreen);
		});
	});

	describe('#setSetting', function() {
		it('Can set a setting by name', function() {
			CookieMonster.setSetting('FlashScreen', 0);
			assert.equal(0, CookieMonster.getSetting('FlashScreen'));
		});
	});

	describe('#getSetting', function() {
		it('Can retrieve a setting by name', function() {
			assert.equal(1, CookieMonster.settings[0]);
			CookieMonster.settings[0] = 0;

			assert.equal(0, CookieMonster.getSetting('FlashScreen'));
		});
	});

	describe('#getBooleanSetting', function() {
		it('Can get setting in boolean form', function() {
			assert.equal(true, CookieMonster.getBooleanSetting('FlashScreen'));
			CookieMonster.settings[0] = 0;
			assert.equal(false, CookieMonster.getBooleanSetting('FlashScreen'));
		});
	});

	describe('#getOptionState', function() {
		it('Can get setting in text form', function() {
			assert.equal('ON', CookieMonster.getOptionState(0));
			CookieMonster.settings[0] = 0;
			assert.equal('OFF', CookieMonster.getOptionState(0));
		});
	});

	describe('#getShortNumbers', function() {
		it('Can get Short Numbers option value', function() {
			CookieMonster.settings[7] = 0;
			assert.equal('OFF', CookieMonster.getShortNumbers());

			CookieMonster.settings[7] = 1;
			assert.equal('ON (A)', CookieMonster.getShortNumbers());

			CookieMonster.settings[7] = 2;
			assert.equal('ON (B)', CookieMonster.getShortNumbers());
		});
	});

	// Lucky
	////////////////////////////////////////////////////////////////////

	describe('#getFrenzyRate', function() {

		it('Can return current multiplier', function() {
			Game.frenzy      = 1;
			Game.frenzyPower = 0.5;

			assert.equal(24013, CookieMonster.getFrenzyRate('foobar'));
		});

		it('Can return frenzy multiplier', function() {
			Game.frenzy      = 1;
			Game.frenzyPower = 2;

			assert.equal(42013, CookieMonster.getFrenzyRate('frenzy'));
		});
	});

	// Achievements
	////////////////////////////////////////////////////////////////////

	describe('#hasAchievement', function () {
		it('Can return if achievement is unlocked', function () {
			Mock.achievements({Mathematician: false, 'One with everything': true});

			assert.equal(true, CookieMonster.hasntAchievement('Mathematician'));
			assert.equal(false, CookieMonster.hasAchievement('Mathematician'));
			assert.equal(true, CookieMonster.hasAchievement('One with everything'));
		});
	});

	describe('#color', function() {
		it('Can get regular color', function () {
			assert.equal('00FF00', CookieMonster.color('green'));
		});

		it('Can get colorblind color', function () {
			CookieMonster.colorblind = true;
			assert.equal('76b7e1', CookieMonster.color('green'));
		});
	});

	Test.achievement(
		'centennial', 'Centennial', [
			{result: true, amounts: [100, 100, 100, 100, 100, 100, 100, 100, 100, 99]},
			{result: false, amounts: [100, 100, 100, 100, 100, 100, 100, 100, 100, 101]},
			{result: false, amounts: [100, 100, 100, 100, 100, 100, 100, 100, 100, 98]},
		]
	);

	Test.achievement(
		'oneWithEverything', 'One with everything', [
			{result: true, amounts: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0]},
			{result: false, amounts: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
		]
	);

	Test.achievement(
		'baseTen', 'Base 10', [
			{result: true, amounts: [100, 90, 80, 70, 60, 50, 40, 30, 20, 9]},
			{result: false, amounts: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10]},
			{result: false, amounts: [100, 90, 80, 70, 60, 50, 40, 30, 20, 11]},
		]
	);

	Test.achievement(
		'mathematician', 'Mathematician', [
			{result: true, amounts: [128, 128, 128, 64, 32, 16, 8, 4, 2, 0]},
			{result: false, amounts: [128, 128, 128, 64, 32, 16, 8, 4, 0, 1]},
		]
	);
});