module.exports = {

	'#createBottomBar': {
		'Can create bottom bar': function() {
			CookieMonster.$monsterBar.should.have.length(0);
			CookieMonster.createBottomBar();
			CookieMonster.$monsterBar.should.have.length(1);
		},
	},

	'#toggleBar': {
		'Can toggle visibility of the bottom bar': function() {
			CookieMonster.setSetting('CMBar', 1);
			CookieMonster.toggleBar();
			console.log(CookieMonster.$monsterBar.html());
		},
	},

};