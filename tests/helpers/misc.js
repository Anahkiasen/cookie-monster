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

	'#isHeavenlyKey': {
		'Can check if upgrade is Heavenly Key': function() {
			Game.UpgradesById = [{name: 'Foobar'}, {name: 'Heavenly key'}];
			CookieMonster.isHeavenlyKey(0).should.be.false;
			CookieMonster.isHeavenlyKey(1).should.be.true;
		},
	}

};