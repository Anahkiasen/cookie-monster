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

};