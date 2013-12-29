var assert = require('assert');

module.exports = {

	'#getFrenzyRate': {
		'Can return current multiplier': function() {
			Game.frenzy      = 1;
			Game.frenzyPower = 0.5;

			assert.equal(24013, CookieMonster.getFrenzyRate('foobar'));
		},

		'Can return frenzy multiplier': function() {
			Game.frenzy      = 1;
			Game.frenzyPower = 2;

			assert.equal(42013, CookieMonster.getFrenzyRate('frenzy'));
		},
	},

};