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
				files: '<%= src %>/**/*',
				tasks: 'js',
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
						'<%= src %>/cookie-monster.js',
						'<%= src %>/buy-sell.js',
						'<%= src %>/cpi.js',
						'<%= src %>/golden-cookie.js',
						'<%= src %>/heavenly.js',
						'<%= src %>/helpers.js',
						'<%= src %>/interface.js',
						'<%= src %>/lucky.js',
						'<%= src %>/settings.js',
						'<%= src %>/time.js',
						'<%= src %>/tooltips.js',
						'<%= src %>/upgrades.js',
						'<%= src %>/main.js',
					],
				},
			}
		},

		uglify: {
			dest: {
				files: [{
					expand : true,
					cwd    : '<%= builds %>',
					src    : ['*.js'],
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
				predef: ['Game', 'usr_clk'],
				globals : {
					$             : false,
					CookieMonster : true,
					Beautify      : true,
				}
			},

			all: ['<%= src %>/*.js'],
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