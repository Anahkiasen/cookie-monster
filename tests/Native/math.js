module.exports = {

	'#sum': {
		'Can compute sum of arguments': function() {
			Math.sum(1, 2, 3).should.equal(6);
		},
	},

	'#average': {
		'Can compute average of arguments': function() {
			Math.average(0, 10).should.equal(5);
		},
	},

	'#roundDecimal': {
		'Can round a number to nearest decimal': function() {
			Math.roundDecimal(23.066).should.equal(23.07);
		},
	},

};