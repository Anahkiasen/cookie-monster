module.exports = {

	'#getTotalGrandmaModifiers': {
		'Base result': function() {
			CookieMonster.getTotalGrandmaModifiers(20).should.equal(0.5);
		},
		'Upgraded result': function() {
			Game.UpgradesById[60].bought = true;
			Game.UpgradesById[64].bought = true;
			Game.UpgradesById[69].bought = true;
			Game.UpgradesById[73].bought = true;
			Game.UpgradesById[7].bought = true;
			Game.UpgradesById[8].bought = true;
			Game.ObjectsById[7].amount = 50;

			CookieMonster.getTotalGrandmaModifiers(20).should.equal(16.48);
		},
	},

	'#getTotalPortalModifiers': {
		'Base result': function() {
			CookieMonster.getTotalPortalModifiers().should.equal(0);
		},
		'Upgraded result': function() {
			Game.UpgradesById[60].bought = true;
			Game.UpgradesById[64].bought = true;
			Game.UpgradesById[73].bought = true;
			Game.ObjectsById[1].amount = 50;
			Game.ObjectsById[7].amount = 50;

			CookieMonster.getTotalPortalModifiers().should.equal(20);
		},
	},

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
				items    : 'foobar',
				bonus    : 'foobar',
				bci      : 'foobar',
				timeLeft : 'foobar',
			});

			CookieMonster.informations.items[0].should.equal('foobar');
			CookieMonster.informations.bonus[0].should.equal('foobar');
			CookieMonster.informations.bci[0].should.equal('foobar');
			CookieMonster.informations.timeLeft[0].should.equal('foobar');
		},
	},

};