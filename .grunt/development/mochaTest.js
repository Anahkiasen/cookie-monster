module.exports = {
	options: {
		reporter : 'spec',
		ui       : 'exports'
	},

	dist: {
		src: ['tests/tests.js'],
	},
	coverage: {
		options: {
			reporter    : 'html-cov',
			quiet       : true,
			captureFile : './tests/coverage.html',
		},
		src: ['tests/tests.js'],
	}
};