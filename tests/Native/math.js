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

};