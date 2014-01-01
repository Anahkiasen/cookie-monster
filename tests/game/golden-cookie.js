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

	'#luckyRequired': {
		'Can get cookies required': function() {
			Game.frenzy      = 1;
			Game.frenzyPower = 0.5;

			CookieMonster.luckyRequired('frenzy').should.equal(1680130);
			CookieMonster.luckyRequired('max').should.equal(240130);
			CookieMonster.luckyRequired('current').should.equal(120130);
		},
		'Can get formatted required': function() {
			Game.frenzy      = 1;
			Game.frenzyPower = 0.5;

			CookieMonster.luckyRequired('frenzy', true).should.equal('<strong class="text-red">1.680 M</strong>');
			CookieMonster.luckyRequired('max', true).should.equal('<strong class="text-red">240,130</strong>');
			CookieMonster.luckyRequired('current', true).should.equal('<strong class="text-red">120,130</strong>');
		},
		'Can get formatted required if inferior to current': function() {
			Game.cookies     = 16801301;
			Game.frenzy      = 1;
			Game.frenzyPower = 0.5;

			CookieMonster.luckyRequired('frenzy', true).should.equal('<strong class="text-green">1.680 M</strong>');
			CookieMonster.luckyRequired('current', true).should.equal('<strong class="text-green">120,130</strong>');
		},
	},

	'#maxluckyRequired': {
		'Can get max lucky reward': function() {
			Game.frenzy      = 1;
			Game.frenzyPower = 0.5;

			CookieMonster.maxLuckyReward('max').should.equal('24,013');
			CookieMonster.maxLuckyReward('frenzy').should.equal('168,013');
			CookieMonster.maxLuckyReward('current').should.equal('15');
		},
	},

};