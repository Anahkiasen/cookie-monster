module.exports = {
	dist: {
		files: [
			{
				expand : true,
				src    : ['**'],
				cwd    : '<%= components %>/bootstrap/dist/fonts',
				dest   : '<%= builds %>/fonts/'
			},
			{
				expand : true,
				src    : ['**'],
				cwd    : '<%= components %>/icomoon/fonts',
				dest   : '<%= paths.compiled.css %>/fonts/'
			},
			{
				expand : true,
				src    : ['**'],
				cwd    : '<%= paths.original.img %>',
				dest   : '<%= paths.compiled.img %>'
			},
			{
				expand : true,
				src    : ['**'],
				cwd    : '<%= paths.original.svg %>',
				dest   : '<%= paths.compiled.svg %>'
			},
			{
				expand : true,
				src    : ['*.png'],
				cwd    : '<%= components %>/chosen/',
				dest   : '<%= paths.compiled.css %>'
			}
		]
	}
};