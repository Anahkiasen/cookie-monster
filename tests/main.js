module.exports = {

	'#loadStyles': {
		'Can load regular styles': function() {
			CookieMonster.loadStyles();
			$('#cookie-monster__styles').attr('href').should.equal('http://localhost/_github/cookie-monster/dist/cookie-monster.min.css');
		},
		'Can load colorblind styles': function() {
			CookieMonster.setSetting('Colorblind', 1);
			CookieMonster.loadStyles();
			$('#cookie-monster__styles').attr('href').should.equal('http://localhost/_github/cookie-monster/dist/cookie-monster-colorblind.min.css');
		},
	},

};