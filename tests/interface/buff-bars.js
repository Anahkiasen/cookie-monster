module.exports = {

	'#createBarsContainer': {
		'Can create BuffBars container': function() {
			CookieMonster.$timerBars.should.have.length(0);
			CookieMonster.createBarsContainer();
			CookieMonster.$timerBars.should.have.length(1);
		},
	}

};