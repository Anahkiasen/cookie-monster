module.exports = {

	'#identifier': {
		'Can get identifier of object': function() {
			Game.ObjectsById[0].identifier().should.equal('cookie-monster__object--0');
			Game.UpgradesById[0].identifier().should.equal('cookie-monster__upgrade--0');
		},
	},

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

	'#getDescribedInteger': {
		'Can get integer in description': function() {
			new Game.Upgrade({desc: 'Cookie production <b>+5%</b> multiplier'}).getDescribedInteger().should.equal(5);
			new Game.Upgrade({desc: 'The mouse and cursors gain <b>+0.1</b> cookies'}).getDescribedInteger().should.equal(0.1);
		},
	},

};