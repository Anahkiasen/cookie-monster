module.exports = {

	'#roundDecimal': {
		'Can round a number to nearest decimal': function() {
			CookieMonster.roundDecimal(23.066).should.equal(23.07);
		},
	},

	'#toHumanNumber': {
		'Can convert number to human': function() {
			CookieMonster.toHumanNumber(123.456).should.equal('123.46');
			CookieMonster.toHumanNumber(123456789).should.equal('123.457 M');
			CookieMonster.toHumanNumber(12345678987654).should.equal('12.346 T');
			CookieMonster.toHumanNumber(12345678987654321).should.equal('12.346 Qa');
			CookieMonster.toHumanNumber(12345678987654321234).should.equal('12.346 Qi');
		},
		'Can use decimal rounding': function() {
			CookieMonster.toHumanNumber(10.066, true).should.equal('10');
			CookieMonster.toHumanNumber(10.066, false).should.equal('10.07');
		},
	},

	'#formatNumber': {
		'Can call toHumanNumber': function() {
			CookieMonster.formatNumber(10.066).should.equal('10.07');
		},
	},

	'#formatNumberRounded': {
		'Can call toHumanNumber': function() {
			CookieMonster.formatNumberRounded(10.066).should.equal('10');
		},
	},

};