module.exports = function(grunt) {

	// Load modules
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Project configuration.
	grunt.initConfig({

		//////////////////////////////////////////////////////////////////
		/////////////////////////////// PATHS ////////////////////////////
		//////////////////////////////////////////////////////////////////

		src        : 'src',
		builds     : 'dist',
		components : 'bower_components',

		paths: {
			original: {
				js: '<%= src %>/js',
			}
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
				files: '<%= paths.original.js %>/**/*',
				tasks: ['js', 'uglify'],
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
					'<%= builds %>/cookie-monster.js': [
						'<%= components %>/jquery/jquery.min.js',
						'<%= paths.original.js %>/cookie-monster.js',
						'<%= paths.original.js %>/**/*.js',
						'<%= paths.original.js %>/upgrades.js',
						'<%= paths.original.js %>/main.js',
					],
				},
			}
		},

		uglify: {
			dest: {
				files: [{
					expand : true,
					cwd    : '<%= builds %>',
					src    : ['cookie-monster.js'],
					dest   : '<%= builds %>',
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
				predef: ['Game', 'realAudio'],
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

	grunt.registerTask('js', 'Build scripts', [
		'jshint',
		'concat',
	]);
};