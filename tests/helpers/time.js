module.exports = {

	'#secondsLeft': {
		'Can get time left to a building': function() {
			Game.cookiesPs = 5;
			Game.cookies   = 0;

			CookieMonster.secondsLeft(Game.ObjectsById[0]).should.equal(3);
		},
		'Can return 0 if buyable': function() {
			Game.cookies = 200;
			CookieMonster.secondsLeft(Game.ObjectsById[0]).should.equal(0);
		},
	},

	'#formatTime': {
		'Can format special cases': function() {
			CookieMonster.formatTime(0).should.equal('Done!');
			CookieMonster.formatTime(99999999999999999999999999).should.equal('> 1,000 days');
			CookieMonster.formatTime(Infinity).should.equal('Never');
		},
		'Can format time': function() {
			CookieMonster.formatTime(366666).should.equal('4 days, 5 hours, 51 minutes, 6 seconds');
			CookieMonster.formatTime(3666).should.equal('1 hour, 1 minute, 6 seconds');
			CookieMonster.formatTime(166621).should.equal('1 day, 22 hours, 17 minutes, 1 second');
		},
		'Can format time to minified format': function() {
			CookieMonster.formatTime(366666, true).should.equal('4d, 5h, 51m, 6s');
			CookieMonster.formatTime(3666, true).should.equal('1h, 1m, 6s');
		},
	},

};