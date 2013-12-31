module.exports = {

	'#playSound': {
		'Can play the bell sound if configured': function() {
			CookieMonster.setSetting('Sounds', 0);
			CookieMonster.Emphasizers.playSound().should.equal(false);

			CookieMonster.setSetting('Sounds', 1);
			CookieMonster.Emphasizers.playSound().source.should.equal('http://autopergamene.eu/cookie-monster/mp3/bell.mp3');
		},
	},

	'#whileOnScreen': {
		'Can check when an popup appears on screen': function() {
			Game.goldenCookie = {life: 30};
			CookieMonster.whileOnScreen('goldenCookie', function(){}, function() {}).should.equal(true);
			CookieMonster.onScreen.goldenCookie.should.equal(true);

			Game.goldenCookie = {life: 0};
			CookieMonster.whileOnScreen('goldenCookie', function(){}, function() {}).should.equal(false);
			CookieMonster.onScreen.goldenCookie.should.equal(false);
		},
	},

};