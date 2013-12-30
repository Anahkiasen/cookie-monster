module.exports = {

	'#getFrenzyMultiplier': {
		'Can get current frenzy multiplier': function() {
			CookieMonster.getFrenzyMultiplier().should.equal(1);

			Game.frenzy      = 1;
			Game.frenzyPower = 2;
			CookieMonster.getFrenzyMultiplier().should.equal(2);
		},
	},

	'#createOverlay': {
		'Can create flashing overlay': function() {
			CookieMonster.$goldenOverlay.should.have.length(0);
			CookieMonster.createFlashOverlay();

			CookieMonster.$goldenOverlay.should.have.length(1);
		},
	},

};