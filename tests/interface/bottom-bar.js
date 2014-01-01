module.exports = {

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

};