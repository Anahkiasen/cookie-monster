var assert = require('assert');

module.exports = {

	'#secondsLeft': {
		'Can get time left to a building': function() {
			Game.ObjectsById[0].price = 100;
			assert.equal(8, CookieMonster.secondsLeft(0, 'object'));
		},
		'Can return 0 if buyable': function() {
			assert.equal(0, CookieMonster.secondsLeft(0, 'object'));
		},
		'Can get time left to an upgrade': function() {
			Game.UpgradesById[0].basePrice = 100;
			assert.equal(8, CookieMonster.secondsLeft(0, 'upgrade'));
		},
	},

	'#formatTime': {
		'Can format special cases': function() {
			assert.equal('Done!', CookieMonster.formatTime(0));
			assert.equal('> 1,000 days', CookieMonster.formatTime(99999999999999999999999999));
			assert.equal('Never', CookieMonster.formatTime(Infinity));
		},
		'Can format time': function() {
			assert.equal('4 days, 5 hours, 51 minutes, 6 seconds', CookieMonster.formatTime(366666));
			assert.equal('1 hour, 1 minute, 6 seconds', CookieMonster.formatTime(3666));
		},
		'Can format time to minified format': function() {
			assert.equal('4d, 5h, 51m, 6s', CookieMonster.formatTime(366666, true));
			assert.equal('1h, 1m, 6s', CookieMonster.formatTime(3666, true));
		},
	},

};