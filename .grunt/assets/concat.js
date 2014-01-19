module.exports = {
	css: {
		files: {
			'<%= builds %>/cookie-monster-colorblind.min.css': '<%= paths.original.css %>/colorblind.css',
			'<%= builds %>/cookie-monster.min.css': '<%= paths.original.css %>/styles.css',
		}
	},
	js: {
		files: {
			'<%= paths.compiled.js %>/js/cookie-monster.js': [
				'<%= paths.original.js %>/CookieMonster/cookie-monster.js',
				'<%= paths.original.js %>/**/*.js',
				'<%= paths.original.js %>/main.js',
			],
			'<%= paths.compiled.js %>/cookie-monster.js': [
				'<%= components %>/jquery/jquery.min.js',
				'<%= components %>/classlist/classList.js',
				'<%= paths.compiled.js %>/js/cookie-monster.js',
			],
		},
	}
};