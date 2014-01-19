module.exports = {
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
		predef: ['Game', 'realAudio', 'Notification'],
		globals : {CookieMonster: true, CookieObject: true, Beautify: true},
	},

	all: ['<%= paths.original.js %>/**/*.js'],
};