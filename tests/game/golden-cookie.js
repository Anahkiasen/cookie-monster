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

	'#emphasizeGolden': {
		'Can emphasize the apparition of a golden cookie': function() {
			$('body').append('<div id="goldenCookie"></div>');
			CookieMonster.$goldenCookie = $('#goldenCookie');
			Game.goldenCookie = {life: 30};

			CookieMonster.createFlashOverlay();
			CookieMonster.createGoldenOverlay();

			CookieMonster.emphasizeGolden();
			CookieMonster.onScreen.goldenCookie.should.equal(true);

			Game.goldenCookie.life = 0;
			CookieMonster.emphasizeGolden();
			CookieMonster.onScreen.goldenCookie.should.equal(false);
		},
	},

};