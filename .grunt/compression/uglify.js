module.exports = {
	dist: {
		expand : true,
		cwd    : '<%= paths.compiled.js %>',
		src    : ['cookie-monster.js'],
		dest   : '<%= paths.compiled.js %>',
		ext    : '.min.js',
	}
};