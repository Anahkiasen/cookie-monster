module.exports = function(grunt) {

	// Load modules
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
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
				css  : '<%= builds %>/css',
				js   : '<%= src %>',
				sass : '<%= builds %>/sass',
			},
			compiled: {
				js  : '<%= builds %>',
				css : '<%= builds %>/css',
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
			stylesheets: {
				files: '<%= paths.original.sass %>/**/*',
				tasks: 'css',
			},
			scripts: {
				files: ['<%= paths.original.js %>/**/*', '<%= tests %>/**/*.js'],
				tasks: ['js', 'uglify'],
			},
		},

		mochaTest: {
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
			css: {
				files: {
					'<%= builds %>/cookie-monster-colorblind.min.css': '<%= paths.original.css %>/colorblind.css',
					'<%= builds %>/cookie-monster.min.css': '<%= paths.original.css %>/styles.css',
				}
			},
			js: {
				files: {
					'<%= paths.compiled.js %>/js/cookie-monster.js': [
						'<%= paths.original.js %>/cookie-monster.js',
						'<%= paths.original.js %>/**/*.js',
						'<%= paths.original.js %>/main.js',
					],
					'<%= paths.compiled.js %>/cookie-monster.js': [
						'<%= components %>/jquery/jquery.min.js',
						'<%= paths.compiled.js %>/js/cookie-monster.js',
					],
				},
			}
		},

		cssmin: {
			minify: {
				expand : true,
				cwd    : '<%= builds %>',
				src    : '*.css',
				dest   : '<%= builds %>',
				ext    : '.min.css'
			}
		},

		uglify: {
			dist: {
				files: [{
					expand : true,
					cwd    : '<%= paths.compiled.js %>',
					src    : ['cookie-monster.js'],
					dest   : '<%= paths.compiled.js %>',
					ext    : '.min.js',
				}],
			}
		},

		// Linting
		//////////////////////////////////////////////////////////////////

		csslint: {
			dist: {
				options: {
					'box-model'          : false,
					'gradients'          : false,
					'ids'                : false,
					'important'          : false,
					'fallback-colors'    : false,
					'star-property-hack' : false,
					'qualified-headings' : false,
					'unique-headings'    : false,
				},
				src: ['<%= paths.original.css %>/*']
			},
		},

		jshint: {
			options: {
				browser : true,
				jquery  : true,
				devel   : true,
				node    : true,

				//maxcomplexity: 21,
				//maxstatements: 35,
				bitwise   : true,
				camelcase : true,
				curly     : true,
				eqeqeq    : true,
				freeze    : true,
				immed     : true,
				indent    : true,
				latedef   : true,
				maxdepth  : 3,
				maxparams : 4,
				newcap    : true,
				noarg     : true,
				noempty   : true,
				nonew     : true,
				trailing  : true,
				undef     : true,
				unused    : true,

				force   : true,
				predef: ['Game', 'realAudio'],
				globals : {CookieMonster: true, Beautify: true},
			},

			all: ['<%= paths.original.js %>/**/*.js'],
		},

		// Preprocessors
		//////////////////////////////////////////////////////////////////

		compass: {
			options: {
				appDir             : '<%= builds %>',
				cssDir             : 'css',
				generatedImagesDir : 'img/sprite/generated',
				imagesDir          : 'img',
				outputStyle        : 'nested',
				noLineComments     : true,
				relativeAssets     : true,
			},

			clean: {
				options: {
					clean: true,
				}
			},
			compile: {},
		}

	});

	////////////////////////////////////////////////////////////////////
	/////////////////////////////// COMMANDS ///////////////////////////
	////////////////////////////////////////////////////////////////////

	grunt.registerTask('default', 'Build assets for local', [
		'bower',
		'js',
	]);

	grunt.registerTask('rebuild', 'Rebuild all assets', [
		'js', 'css',
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
		'test',
	]);
};