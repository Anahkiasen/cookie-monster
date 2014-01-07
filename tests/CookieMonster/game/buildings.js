module.exports = {

	'#getBestValue': {
		'Can get max value': function() {
			CookieMonster.informations.bci      = [0, 1, 2, 3, 4, 5];
			CookieMonster.informations.roi      = [0, 1, 2, 3, 4, 5];
			CookieMonster.informations.timeLeft = [0, 1, 2, 3, 4, 5];

			CookieMonster.getBestValue('max').should.eql([5, 5, 5]);
		},
		'Can get min value': function() {
			CookieMonster.informations.bci      = [0, 1, 2, 3, 4, 5];
			CookieMonster.informations.roi      = [0, 1, 2, 3, 4, 5];
			CookieMonster.informations.timeLeft = [0, 1, 2, 3, 4, 5];

			CookieMonster.getBestValue('min').should.eql([0, 0, 0]);
		},
	},

	'#setBuildingInformations': {
		'Can store informations about a building': function() {
			CookieMonster.setBuildingInformations(0, {
				names    : 'foobar',
				bonus    : 'foobar',
				bci      : 'foobar',
				timeLeft : 'foobar',
			});

			CookieMonster.informations.names[0].should.equal('foobar');
			CookieMonster.informations.bonus[0].should.equal('foobar');
			CookieMonster.informations.bci[0].should.equal('foobar');
			CookieMonster.informations.timeLeft[0].should.equal('foobar');
		},
	},

};