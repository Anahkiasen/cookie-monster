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
	achievement: function(method, name, cases) {
		var achievements = {};

		describe('#'+method, function() {
			it('can return if achievement unlocked', function() {
				achievements[name] = true;
				Mock.achievements(achievements);
				assert.equal(false, CookieMonster[method]('Antimatter condenser'));
			});

			it('can return whether next building unlocks achievement', function() {
				achievements[name] = false;
				Mock.achievements(achievements);

				cases.forEach(function(testCase) {
					var message = 'Expected '+(testCase.result ? 'true' : 'false')+ ', got ' +(testCase.result ? 'false' : 'true')+ ' with '+testCase.amounts;

					Mock.amounts(testCase.amounts);
					assert.equal(testCase.result, CookieMonster[method]('Antimatter condenser'), message);
				});
			});
		});
	},

};

// Exports
//////////////////////////////////////////////////////////////////////

exports.achievement = TestCase.achievement;