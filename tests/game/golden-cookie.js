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

	// Lucky cookies
	////////////////////////////////////////////////////////////////////

	'#getLuckyTreshold': {
		'Can return current treshold': function() {
			Game.cookiesPs = 100;

			CookieMonster.getLuckyTreshold().should.equal(1200130);
		},
		'Can return frenzy treshold': function() {
			Game.cookiesPs   = 700;
			Game.frenzy      = 1;
			Game.frenzyPower = 7;

			CookieMonster.getLuckyTreshold('frenzy').should.equal(8400130);
			CookieMonster.getLuckyTreshold().should.equal(1200130);
		},
		'Can simulate treshold for a context': function() {
			CookieMonster.getLuckyTreshold('', 1).should.equal(12130);
		},
	},

	'#luckyRequiredFormatted': {
		'Can get formatted required': function() {
			Game.frenzy      = 1;
			Game.frenzyPower = 0.5;

			CookieMonster.luckyRequiredFormatted('frenzy').should.equal('<strong class="text-red">1.680 M</strong>');
			CookieMonster.luckyRequiredFormatted().should.equal('<strong class="text-red">240,130</strong>');
		},
		'Can get formatted required if inferior to current': function() {
			Game.cookies     = 16801301;
			Game.frenzy      = 1;
			Game.frenzyPower = 0.5;

			CookieMonster.luckyRequiredFormatted('frenzy').should.equal('<strong class="text-green">1.680 M</strong>');
			CookieMonster.luckyRequiredFormatted().should.equal('<strong class="text-green">240,130</strong>');
		},
	},

	'#luckyReward': {
		'Can get lucky reward for all contexts': function() {
			Game.cookies     = 100;
			Game.cookiesPs   = 5;

			CookieMonster.luckyReward('max').should.equal('6,013');
			CookieMonster.luckyReward('frenzy').should.equal('42,013');
			CookieMonster.luckyReward().should.equal('23');
		},
		'Can get lowest of two lucky rewards': function() {
			Game.cookies     = 100;
			Game.cookiesPs   = 5;

			CookieMonster.luckyReward().should.equal('23');

			Game.cookies = CookieMonster.getLuckyTreshold() + 200;
			CookieMonster.luckyReward().should.equal('6,013');
		},
	},

};