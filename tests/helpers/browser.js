module.exports = {

	'#playSound': {
		'Can play a sound': function() {
			var sound = CookieMonster.playSound('foobar.mp3');

			sound.volume.should.equal(1);
			sound.source.should.equal('foobar.mp3');
		},
	},

	'#playBell': {
		'Can play the bell sound': function() {
			var sound = CookieMonster.playBell();
			sound.source.should.equal('http://autopergamene.eu/cookie-monster/mp3/bell.mp3');
		},
	},

	'#getImage': {
		'Can get the full path to an image': function() {
			CookieMonster.getImage('test').should.equal('http://autopergamene.eu/cookie-monster/img/test.png');
		},
		'Can return image if already full path': function() {
			CookieMonster.getImage('http://google.fr/image.png').should.equal('http://google.fr/image.png');
		},
	},

	'#updateFavicon': {
		'Can update favicon': function() {
			$('body').append('<link rel="shortcut icon" id="cm_favicon">');
			CookieMonster.updateFavicon('warning');
			$('#cm_favicon').attr('href').should.equal('http://autopergamene.eu/cookie-monster/img/warning.png');
		},
	}

};