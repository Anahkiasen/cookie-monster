module.exports = {

	'#matches': {
		'Can match by description': function() {
			var upgrade = new Game.Upgrade({name: '', desc: 'foo bar'});
			upgrade.matches('bar').should.equal(true);
		},
		'Can match case insensitive': function() {
			var upgrade = new Game.Upgrade({name: '', desc: 'foo BAR'});
			upgrade.matches('bar').should.equal(true);
		},
	},

};