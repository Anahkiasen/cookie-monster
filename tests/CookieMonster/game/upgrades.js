module.exports = {

	'#getBuildingUpgradeOutcome': {
		'Can get income of building': function() {
			CookieMonster.getBuildingUpgradeOutcome(0).should.equal(3.2);
		},
	},

	'#getNonObjectsGainOutcome': {
		'Can get outcome of a "Non-object" upgrade': function() {
			CookieMonster.getNonObjectsGainOutcome(Game.UpgradesById[3]).should.equal(22.4);
		},
	},

	'#getFourTimesEfficientOutcome': {
		'Can get outcome of four times as efficient': function() {
			CookieMonster.getFourTimesEfficientOutcome(0).should.equal(9.6);
		},
	},

};