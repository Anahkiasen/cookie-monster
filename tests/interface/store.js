module.exports = {

	'#isInStore': {
		'Can check if upgrade is in store': function() {
			Game.UpgradesInStore = ['foo'];

			CookieMonster.isInStore('foo').should.be.true;
			CookieMonster.isInStore('bar').should.be.false;
		},
	},

	'#updateUpgradeDisplay': {
		'Can change upgrades display height': function() {
			CookieMonster.setSetting('UpgradeDisplay', 0);
			CookieMonster.updateUpgradeDisplay();
			$('#upgrades').css('height').should.equal('0px');

			CookieMonster.setSetting('UpgradeDisplay', 1);
			CookieMonster.updateUpgradeDisplay();
			$('#upgrades').attr('style').should.equal('');
		},
	}

};