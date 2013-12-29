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

	'#luckyReward': {
		'Can get lucky reward': function() {
			Game.frenzy      = 1;
			Game.frenzyPower = 0.5;

			CookieMonster.luckyReward('frenzy').should.equal(1680130);
			CookieMonster.luckyReward('current').should.equal(120130);
		},
		'Can get formatted reward': function() {
			Game.frenzy      = 1;
			Game.frenzyPower = 0.5;

			CookieMonster.luckyReward('frenzy', true).should.equal('1.680 M');
			CookieMonster.luckyReward('current', true).should.equal('120,130');
		},
		'Can get formatted reward if inferior to current': function() {
			Game.cookies     = 16801301;
			Game.frenzy      = 1;
			Game.frenzyPower = 0.5;

			CookieMonster.luckyReward('frenzy', true).should.equal('<span style="color:#00FF00; font-weight:bold;">1.680 M</span>');
			CookieMonster.luckyReward('current', true).should.equal('<span style="color:#00FF00; font-weight:bold;">120,130</span>');
		},
	},

	'#maxluckyReward': {
		'Can get max lucky reward': function() {
			Game.frenzy      = 1;
			Game.frenzyPower = 0.5;

			CookieMonster.maxLuckyReward('max_frenzy').should.equal('15');
			CookieMonster.maxLuckyReward('frenzy').should.equal('168,013');
			CookieMonster.maxLuckyReward('current').should.equal('15');
		},
	},

};