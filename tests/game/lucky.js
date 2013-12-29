module.exports = {

	'#getFrenzyRate': {
		'Can return current multiplier': function() {
			Game.frenzy      = 1;
			Game.frenzyPower = 0.5;

			CookieMonster.getFrenzyRate('foobar').should.equal(24013);
		},

		'Can return frenzy multiplier': function() {
			Game.frenzy      = 1;
			Game.frenzyPower = 2;

			CookieMonster.getFrenzyRate('frenzy').should.equal(42013);
		},
	},

};