module.exports = function(grunt) {

	// Load modules
	require('load-grunt-tasks')(grunt);

	/**
	 * Loads all available tasks options
	 *
	 * @param {String} folder
	 *
	 * @return {Object}
	 */
	function loadConfig(folder) {
		var glob   = require('glob');
		var path   = require('path');
		var key;

		glob.sync('**/*.js', {cwd: folder}).forEach(function(option) {
			key = path.basename(option, '.js');
			config[key] = require(folder + option);
		});
	}

	////////////////////////////////////////////////////////////////////
	//////////////////////////// CONFIGURATION /////////////////////////
	////////////////////////////////////////////////////////////////////

	var config = {
		src        : 'src',
		builds     : 'dist',
		components : 'bower_components',
		tests      : 'tests',

		paths: {
			original: {
				css  : '<%= builds %>/css',
				img  : '<%= builds %>/img',
				js   : '<%= src %>',
				sass : '<%= builds %>/sass',
			},
			compiled: {
				js  : '<%= builds %>',
				css : '<%= builds %>/css',
			},
		},
	};

	// Load all tasks
	loadConfig('./.grunt/');
	grunt.initConfig(config);

	////////////////////////////////////////////////////////////////////
	/////////////////////////////// COMMANDS ///////////////////////////
	////////////////////////////////////////////////////////////////////

	grunt.registerTask('default', 'Build assets for local', [
		'css', 'js', 'connect', 'watch',
	]);

	grunt.registerTask('test', 'Run the tests', [
		'mochaTest:dist',
	]);

	// Asset types
	////////////////////////////////////////////////////////////////////

	grunt.registerTask('css', 'Build stylesheets', [
		'compass:compile',
		'concat:css',
		'csslint',
		'cssmin',
	]);

	grunt.registerTask('js', 'Build scripts', [
		'jshint',
		'concat:js',
		'uglify',
	]);
};
