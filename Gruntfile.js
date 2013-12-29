module.exports = function(grunt) {

	// Load modules
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-test');

	// Project configuration.
	grunt.initConfig({

		//////////////////////////////////////////////////////////////////
		/////////////////////////////// PATHS ////////////////////////////
		//////////////////////////////////////////////////////////////////

		src        : 'src',
		builds     : 'dist',
		components : 'bower_components',
		tests      : 'tests',

		paths: {
			original: {
				js: '<%= src %>',
			},
			compiled: {
				js: '<%= builds %>',
			},
		},

		//////////////////////////////////////////////////////////////////
		/////////////////////////////// TASKS ////////////////////////////
		//////////////////////////////////////////////////////////////////

		// Development
		//////////////////////////////////////////////////////////////////

		watch: {
			options: {
				interrupt : true,
			},

			grunt: {
				files: 'Gruntfile.js',
				tasks: 'default',
			},
			scripts: {
				files: ['<%= paths.original.js %>/**/*', '<%= tests %>/*.js'],
				tasks: ['js', 'uglify'],
			},
		},

		mochaTest: {
			options: {
				reporter: 'spec',
				ui: 'exports',
			},

			dest: {
				src: ['tests/tests.js'],
			},
		},

		// Assets
		//////////////////////////////////////////////////////////////////

		bower: {
			install: {
				options: {
					targetDir: '<%= components %>'
				}
			}
		},

		concat: {
			javascript: {
				files: {
					'<%= paths.compiled.js %>/js/cookie-monster.js': [
						'<%= paths.original.js %>/cookie-monster.js',
						'<%= paths.original.js %>/**/*.js',
						'<%= paths.original.js %>/upgrades.js',
						'<%= paths.original.js %>/main.js',
					],
					'<%= paths.compiled.js %>/cookie-monster.min.js': [
						'<%= components %>/jquery/jquery.min.js',
						'<%= paths.compiled.js %>/js/cookie-monster.js',
					],
				},
			}
		},

		uglify: {
			dest: {
				files: [{
					expand : true,
					cwd    : '<%= paths.compiled.js %>',
					src    : ['cookie-monster.min.js'],
					dest   : '<%= paths.compiled.js %>',
					ext    : '.min.js',
				}],
			}
		},

		// Linting
		//////////////////////////////////////////////////////////////////

		jshint: {
			options: {
				force   : true,

				boss     : true,
				browser  : true,
				bitwise  : true,
				curly    : true,
				devel    : true,
				eqeqeq   : true,
				eqnull   : true,
				immed    : true,
				indent   : 2,
				latedef  : true,
				newcap   : true,
				noarg    : true,
				noempty  : true,
				sub      : true,
				undef    : true,
				unused   : true,
				loopfunc : true,
				evil     : true,
				predef: ['Game', 'realAudio', 'module'],
				globals : {
					$             : false,
					CookieMonster : true,
					Beautify      : true,
				}
			},

			all: ['<%= paths.original.js %>/*.js'],
		},

	});

	////////////////////////////////////////////////////////////////////
	/////////////////////////////// COMMANDS ///////////////////////////
	////////////////////////////////////////////////////////////////////

	grunt.registerTask('default', 'Build assets for local', [
		'bower',
		'js',
		'uglify',
	]);

	grunt.registerTask('test', 'Run the tests', [
		'mochaTest',
	]);

	grunt.registerTask('js', 'Build scripts', [
		'concat',
		'jshint',
		'test',
	]);
};