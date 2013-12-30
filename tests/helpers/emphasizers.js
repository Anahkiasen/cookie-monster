module.exports = {

	'#playSound': {
		'Can play the bell sound if configured': function() {
			CookieMonster.setSetting('Sounds', 0);
			CookieMonster.Emphasizers.playSound().should.be.false;

			CookieMonster.setSetting('Sounds', 1);
			CookieMonster.Emphasizers.playSound().source.should.equal('http://autopergamene.eu/cookie-monster/mp3/bell.mp3');
		},
	},

};