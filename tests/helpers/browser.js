var assert = require('assert');

module.exports = {

	'#playSound': {
		'Can play a sound': function() {
			var sound = CookieMonster.playSound('foobar.mp3');

			assert.equal(1, sound.volume);
			assert.equal('foobar.mp3', sound.source);
		},
	},

	'#playBell': {
		'Can play the bell sound': function() {
			var sound = CookieMonster.playBell();
			assert.equal('http://autopergamene.eu/cookie-monster/mp3/bell.mp3', sound.source);
		},
	},

	'#getImage': {
		'Can get the full path to an image': function() {
			assert.equal('http://autopergamene.eu/cookie-monster/img/test.png', CookieMonster.getImage('test'));
		},
		'Can return image if already full path': function() {
			assert.equal('http://google.fr/image.png', CookieMonster.getImage('http://google.fr/image.png'));
		},
	},

};