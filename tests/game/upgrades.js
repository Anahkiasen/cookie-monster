module.exports = {

	'#matches': {
		'Can match by name': function() {
			CookieMonster.matches({name: 'foo bar', desc:''}, 'bar').should.equal(true);
		},
		'Can match by description': function() {
			CookieMonster.matches({name: '', desc: 'foo bar'}, 'bar').should.equal(true);
		},
		'Can match case insensitive': function() {
			CookieMonster.matches({name: '', desc: 'foo BAR'}, 'bar').should.equal(true);
		},
	},

};