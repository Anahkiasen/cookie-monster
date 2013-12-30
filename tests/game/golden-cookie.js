module.exports = {

	'#getFrenzyMultiplier': {
		'Can get current frenzy multiplier': function() {
			CookieMonster.getFrenzyMultiplier().should.equal(1);

			Game.frenzy      = 1;
			Game.frenzyPower = 2;
			CookieMonster.getFrenzyMultiplier().should.equal(2);
		},
	},

	'#createGoldenOverlay': {
		'Can create flashing overlay': function() {
			CookieMonster.$goldenOverlay.should.have.length(0);
			CookieMonster.createGoldenOverlay();

			CookieMonster.$goldenOverlay.should.have.length(1);
		},
	},

	'#createFlashOverlay': {
		'Can create flashing overlay': function() {
			CookieMonster.$flashOverlay.should.have.length(0);
			CookieMonster.createFlashOverlay();

			CookieMonster.$flashOverlay.should.have.length(1);
		},
	},

};