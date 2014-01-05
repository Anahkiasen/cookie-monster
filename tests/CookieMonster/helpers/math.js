module.exports = {

	'#formatNumber': {
		'Can convert number to human': function() {
			CookieMonster.formatNumber(123.456).should.equal('123.46');
			CookieMonster.formatNumber(123456789).should.equal('123.457 M');
			CookieMonster.formatNumber(12345678987654).should.equal('12.346 T');
			CookieMonster.formatNumber(12345678987654321).should.equal('12.346 Qa');
			CookieMonster.formatNumber(12345678987654321234).should.equal('12.346 Qi');
		},
		'Can use decimal rounding': function() {
			CookieMonster.formatNumber(10.066, true).should.equal('10');
			CookieMonster.formatNumber(10.066, false).should.equal('10.07');
		},
		'Can format negative numbers': function() {
			CookieMonster.formatNumber(-123.456).should.equal('-123.46');
			CookieMonster.formatNumber(-123456789).should.equal('-123.457 M');
			CookieMonster.formatNumber(-12345678987654).should.equal('-12.346 T');
			CookieMonster.formatNumber(-12345678987654321).should.equal('-12.346 Qa');
			CookieMonster.formatNumber(-12345678987654321234).should.equal('-12.346 Qi');
		},
	},

	'#formatNumberRounded': {
		'Can call formatNumber': function() {
			CookieMonster.formatNumberRounded(10.066).should.equal('10');
		},
	},

};