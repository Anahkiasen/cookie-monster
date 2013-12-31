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
	},

	'#createStoreCounters': {
		'Can create the store counters': function() {
			$('body').append('<div id="storeTitle"></div>');
			CookieMonster.createStoreCounters();

			$('#cm_up_q0').should.have.length(1);
			$('#cm_up_q1').should.have.length(1);
			$('#cm_up_q2').should.have.length(1);
			$('#cm_up_q3').should.have.length(1);
			$('#cm_up_q4').should.have.length(1);
			$('#cm_up_q5').should.have.length(1);
		},
	},

	'#updateStoreCounters': {
		'Can update the store counters': function() {
			$('body').append('<div id="storeTitle"></div>');
			CookieMonster.upgradeCounts = [1, 2, 3, 4, 5, 6];

			CookieMonster.createStoreCounters();
			CookieMonster.updateStoreCounters();

			$('#cm_up_q0').text().should.equal('1');
			$('#cm_up_q1').text().should.equal('2');
			$('#cm_up_q2').text().should.equal('3');
			$('#cm_up_q3').text().should.equal('4');
			$('#cm_up_q4').text().should.equal('5');
			$('#cm_up_q5').text().should.equal('6');
		},
	},

};