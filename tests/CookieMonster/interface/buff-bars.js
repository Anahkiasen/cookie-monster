module.exports = {

	'#createBarsContainer': {
		'Can create BuffBars container': function() {
			CookieMonster.$timerBars.should.have.length(0);
			CookieMonster.createBarsContainer();
			CookieMonster.$timerBars.should.have.length(1);
		},
	},

	'#getBarsWidth': {
		'Can get width to dedicate to bars': function() {
			window.innerWidth = 100;
			CookieMonster.getBarsWidth().should.equal(30);
		},
	},

};