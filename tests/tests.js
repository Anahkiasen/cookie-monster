// Mocha
var assert = require('assert');
var Mock   = require('./Mock.js');
var Test   = require('./TestCase.js');

// Browser
var jsdom    = require("jsdom").jsdom;
var document = jsdom('<html><head></head><body></body></html>');
var window   = document.createWindow();

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

//////////////////////////////////////////////////////////////////////
///////////////////////////////// TESTS //////////////////////////////
//////////////////////////////////////////////////////////////////////

describe('CookieMonster', function () {

	beforeEach(function() {
		Game.cookiesPs   = 10;
		Game.frenzyPower = 1;
	});

	// Lucky
	////////////////////////////////////////////////////////////////////

	describe('#getFrenzyRate', function() {
		Game.frenzy = 1;

		it('Can return current multiplier', function() {
			Game.frenzyPower = 0.5;
			assert.equal(24013, CookieMonster.getFrenzyRate('foobar'));
		});

		it('Can return frenzy multiplier', function() {
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