var assert = require('assert');
var Mock   = require('./Mock.js');

var TestCase = {

	/**
	 * Test a basic achievement checker
	 *
	 * @param {String} method
	 * @param {String} name
	 * @param {Array}  yep
	 * @param {Array}  nope
	 *
	 * @return {Void}
	 */
	achievement: function(method, name, yep, nope) {
		var achievements = {};

		describe('#'+method, function() {
			it('Should return false if achievement unlocked', function() {
				achievements[name] = true;
				Mock.achievements(achievements);
				assert.equal(false, CookieMonster[method]('Antimatter condenser'));
			});

			it('Should return true when next building unlocks', function() {
				achievements[name] = false;
				Mock.achievements(achievements);
				Mock.amounts(yep);
				assert.equal(true, CookieMonster[method]('Antimatter condenser'));
			});

			it('Should return false when next building doesnt unlock', function() {
				Mock.amounts(nope);
				assert.equal(false, CookieMonster[method]('Antimatter condenser'));
			});
		});
	},

};

// Exports
//////////////////////////////////////////////////////////////////////

exports.achievement = TestCase.achievement;