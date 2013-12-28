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
		'centennial', 'Centennial',
		[100, 100, 100, 100, 100, 100, 100, 100, 100, 99],
		[100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
	);

	Test.achievement(
		'oneWithEverything', 'One with everything',
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	);

	Test.achievement(
		'mathematician', 'Mathematician',
		[128, 128, 128, 64, 32, 16, 8, 4, 2, 0],
		[128, 128, 128, 64, 32, 16, 8, 4, 0, 1]
	);
});