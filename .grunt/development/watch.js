module.exports = {
	options: {
		livereload : true,
		interrupt  : true,
	},

	grunt: {
		files: 'Gruntfile.js',
		tasks: 'default',
	},
	stylesheets: {
		files: '<%= paths.original.sass %>/**/*',
		tasks: 'css',
	},
	scripts: {
		files: ['<%= paths.original.js %>/**/*', '<%= tests %>/**/**/*.js'],
		tasks: ['js', 'uglify'],
	},
};