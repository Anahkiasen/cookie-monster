module.exports = {

	'#computeColorCoding': {
		'Can compute BCI colors': function() {
			CookieMonster.informations = {
				bci : [1, 2, 3, 4, 5],
			};

			CookieMonster.computeColorCoding([200, 0, 0])[0].should.equal('purple');
			CookieMonster.computeColorCoding([5, 0, 0])[0].should.equal('red');
			CookieMonster.computeColorCoding([4, 0, 0])[0].should.equal('orange');
			CookieMonster.computeColorCoding([3, 0, 0])[0].should.equal('yellow');
			CookieMonster.computeColorCoding([2, 0, 0])[0].should.equal('yellow');
			CookieMonster.computeColorCoding([1, 0, 0])[0].should.equal('green');
			CookieMonster.computeColorCoding([-200, 0, 0])[0].should.equal('blue');
		},
	},

};