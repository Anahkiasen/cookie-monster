module.exports = {

	'#color': {
		'Can get regular color': function () {
			CookieMonster.color('green').should.equal('00FF00');
		},

		'Can get colorblind color': function () {
			CookieMonster.setSetting('Colorblind', true);
			CookieMonster.color('green').should.equal('76b7e1');
		},
	},

};