var Mock = require('./Mock.js');

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

		return {
			'Can return if achievement unlocked': function() {
				achievements[name] = true;
				Mock.achievements(achievements);
				CookieMonster[method]('Antimatter condenser').should.be.false;
			},

			'Can return whether next building unlocks achievement': function() {
				achievements[name] = false;
				Mock.achievements(achievements);

				cases.forEach(function(testCase) {
					Mock.amounts(testCase.amounts);
					CookieMonster[method]('Antimatter condenser').should.equal(testCase.result);
				});
			},
		};
	},

};

// Exports
//////////////////////////////////////////////////////////////////////

module.exports = TestCase;