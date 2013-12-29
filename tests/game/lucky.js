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

	'#lucky': {
		'Can get lucky reward': function() {
			Game.frenzy      = 1;
			Game.frenzyPower = 0.5;

			CookieMonster.lucky('frenzy').should.equal(1680130);
			CookieMonster.lucky('foobar').should.equal(240130);
		},
		'Can get formatted reward': function() {
			Game.frenzy      = 1;
			Game.frenzyPower = 0.5;

			CookieMonster.lucky('frenzy', true).should.equal('1.680 M');
			CookieMonster.lucky('foobar', true).should.equal('240,130');
		},
		'Can get formatted reward if inferior to current': function() {
			Game.cookies = 16801301;
			Game.frenzy = 1;
			Game.frenzyPower = 0.5;

			CookieMonster.lucky('frenzy', true).should.equal('<span style="color:#00FF00; font-weight:bold;">1.680 M</span>');
			CookieMonster.lucky('foobar', true).should.equal('<span style="color:#00FF00; font-weight:bold;">240,130</span>');
		},
	},

};