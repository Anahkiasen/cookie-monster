module.exports = {

	'#cookiesToHeavenly': {
		'Can get number of HC for a number of cookies': function() {
			CookieMonster.cookiesToHeavenly(1000000000).should.equal(0);
			CookieMonster.cookiesToHeavenly(1000000000000).should.equal(1);
			CookieMonster.cookiesToHeavenly(1000000000000000).should.equal(44);
		},
	},

	'#heavenlyToCookies': {
		'Can get number of cookies for a number of HC': function() {
			CookieMonster.heavenlyToCookies(0).should.equal(0);
			CookieMonster.heavenlyToCookies(1).should.equal(1000000000000);
			CookieMonster.heavenlyToCookies(44).should.equal(990000000000000);
		},
	},

	'#getHeavenlyMultiplier': {
		'Can get current potential of heavenly chips': function() {
			Game.prestige['Heavenly chips'] = 0;
			CookieMonster.getHeavenlyMultiplier().should.equal(0);

			Game.prestige['Heavenly chips'] = 2080;
			Game.Has = function(upgrade) { return true; };
			CookieMonster.getHeavenlyMultiplier().should.equal(4160);
		},
	},

};