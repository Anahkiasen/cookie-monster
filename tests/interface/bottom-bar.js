module.exports = {

	'#getBestValue': {
		'Can get max value': function() {
			CookieMonster.informations.cpi      = [0, 1, 2, 3, 4, 5];
			CookieMonster.informations.roi      = [0, 1, 2, 3, 4, 5];
			CookieMonster.informations.timeLeft = [0, 1, 2, 3, 4, 5];

			CookieMonster.getBestValue('max').should.eql([5, 5, 5]);
		},
		'Can get min value': function() {
			CookieMonster.informations.cpi      = [0, 1, 2, 3, 4, 5];
			CookieMonster.informations.roi      = [0, 1, 2, 3, 4, 5];
			CookieMonster.informations.timeLeft = [0, 1, 2, 3, 4, 5];

			CookieMonster.getBestValue('min').should.eql([0, 0, 0]);
		},
	},

	'#setBuildingInformations': {
		'Can store informations about a building': function() {
			CookieMonster.setBuildingInformations(0, {
				items    : 'foobar',
				bonus    : 'foobar',
				cpi      : 'foobar',
				timeLeft : 'foobar',
			});

			CookieMonster.informations.items[0].should.equal('foobar');
			CookieMonster.informations.bonus[0].should.equal('foobar');
			CookieMonster.informations.cpi[0].should.equal('foobar');
			CookieMonster.informations.timeLeft[0].should.equal('foobar');
		},
	},

	'#createBottomBar': {
		'Can create bottom bar': function() {
			CookieMonster.$monsterBar.should.have.length(0);
			CookieMonster.createBottomBar();
			CookieMonster.$monsterBar.should.have.length(1);

			$('table', CookieMonster.$monsterBar).should.have.length(1);
			$('td', CookieMonster.$monsterBar).should.have.length(3);
			$('tr', CookieMonster.$monsterBar).should.have.length(4);
			$('th', CookieMonster.$monsterBar).should.have.length(5);
		},
	},

	'#toggleBar': {
		'Can toggle visibility of the bottom bar': function() {
			CookieMonster.toggleBar();
			CookieMonster.$monsterBar.css('display').should.equal('');

			CookieMonster.setSetting('BottomBar', 0);
			CookieMonster.toggleBar();
			CookieMonster.$monsterBar.css('display').should.equal('none');
		},
	},

	'#updateTable': {
		'Can update the informations in the bottom bar': function() {
			CookieMonster.createBottomBar();
			CookieMonster.updateTable();

			var html = $('table').html();

			html.should.contain('Cursor (<span class="text-blue">8</span>)');
		},
	}

};