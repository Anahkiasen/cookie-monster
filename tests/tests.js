// Mocha
var assert = require('assert');
var Mock   = require('./Mock.js');

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

	describe('#oneWithEverything', function() {
		it('Should return false if achievement unlocked', function() {
			Mock.achievements({'One with everything': true});
			assert.equal(false, CookieMonster.oneWithEverything('Antimatter condenser'));
		});

		it('Should return true when next building unlocks', function() {
			Mock.achievements({'One with everything': false});
			Mock.amounts([1, 1, 1, 1, 1, 1, 1, 1, 1, 0]);
			assert.equal(true, CookieMonster.oneWithEverything('Antimatter condenser'));
		});

		it('Should return false when next building doesnt unlock', function() {
			Mock.amounts([1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
			assert.equal(false, CookieMonster.oneWithEverything('Antimatter condenser'));
		});
	});

	describe('#mathematician', function() {
		it('Should return false if achievement unlocked', function() {
			Mock.achievements({Mathematician: true});
			assert.equal(false, CookieMonster.mathematician('Antimatter condenser'));
		});

		it('Should return true when next building unlocks', function() {
			Mock.achievements({Mathematician: false});
			Mock.amounts([128, 128, 128, 64, 32, 16, 8, 4, 2, 0]);
			assert.equal(true, CookieMonster.mathematician('Antimatter condenser'));
		});

		it('Should return false when next building doesnt unlock', function() {
			Mock.amounts([128, 128, 128, 64, 32, 16, 8, 4, 0, 1]);
			assert.equal(false, CookieMonster.mathematician('Antimatter condenser'));
		});
	});
});