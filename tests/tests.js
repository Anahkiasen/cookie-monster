// Mocha
var assert = require('assert');
var Mock   = require('./Mock.js');
var Test   = require('./TestCase.js');

// Game
Game          = {};
CookieMonster = {};
require('../src/game/achievements.js');

//////////////////////////////////////////////////////////////////////
///////////////////////////////// TESTS //////////////////////////////
//////////////////////////////////////////////////////////////////////

describe('CookieMonster', function () {
	describe('#hasAchievement', function () {
		it('Should return if achievement is unlocked', function () {
			Mock.achievements({Mathematician: false, 'One with everything': true});

			assert.equal(false, CookieMonster.hasAchievement('Mathematician'));
			assert.equal(true, CookieMonster.hasAchievement('One with everything'));
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