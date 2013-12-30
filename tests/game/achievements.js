var Mock = require('../Mock.js');
var Test = require('../TestCase.js');

module.exports = {

	'#hasAchievement': {
		'Can return if achievement is unlocked': function () {
			Mock.achievements({Mathematician: false, 'One with everything': true}),

			CookieMonster.hasntAchievement('Mathematician').should.equal(true);
			CookieMonster.hasAchievement('Mathematician').should.equal(false);
			CookieMonster.hasAchievement('One with everything').should.equal(true);
		},
	},

	'#centennial': Test.achievement(
		'centennial', 'Centennial', [
			{result: true,  amounts: [100, 100, 100, 100, 100, 100, 100, 100, 100, 99]},
			{result: false, amounts: [100, 100, 100, 100, 100, 100, 100, 100, 100, 101]},
			{result: false, amounts: [100, 100, 100, 100, 100, 100, 100, 100, 100, 98]},
		]
	),

	'#oneWithEverything': Test.achievement(
		'oneWithEverything', 'One with everything', [
			{result: true,  amounts: [1, 1, 1, 1, 1, 1, 1, 1, 1, 0]},
			{result: false, amounts: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]},
		]
	),

	'#baseTen': Test.achievement(
		'baseTen', 'Base 10', [
			{result: true,  amounts: [100, 90, 80, 70, 60, 50, 40, 30, 20, 9]},
			{result: false, amounts: [100, 90, 80, 70, 60, 50, 40, 30, 20, 10]},
			{result: false, amounts: [100, 90, 80, 70, 60, 50, 40, 30, 20, 11]},
		]
	),

	'#mathematician': Test.achievement(
		'mathematician', 'Mathematician', [
			{result: true,  amounts: [128, 128, 128, 64, 32, 16, 8, 4, 2, 0]},
			{result: false, amounts: [128, 128, 128, 64, 32, 16, 8, 4, 0, 1]},
		]
	),

};