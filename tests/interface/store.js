module.exports = {

	'#isInStore': {
		'Can check if upgrade is in store': function() {
			Game.UpgradesInStore = ['foo'];

			CookieMonster.isInStore('foo').should.be.true;
			CookieMonster.isInStore('bar').should.be.false;
		},
	}

};