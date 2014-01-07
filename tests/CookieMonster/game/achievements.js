var Mock = require('../../Mock.js');

module.exports = {

	'#hasAchievement': {
		'Can return if achievement is unlocked': function () {
			Mock.achievements({Mathematician: false, 'One with everything': true});

			CookieMonster.hasntAchievement('Mathematician').should.equal(true);
			CookieMonster.hasAchievement('Mathematician').should.equal(false);
			CookieMonster.hasAchievement('One with everything').should.equal(true);
		},
	},

};