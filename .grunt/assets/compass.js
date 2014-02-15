module.exports = {
	options: {
		appDir             : '<%= builds %>',
		cssDir             : 'css',
		generatedImagesDir : 'img/sprite/generated',
		imagesDir          : 'img',
		outputStyle        : 'nested',
		noLineComments     : true,
		relativeAssets     : true,
		require            : ['sass-globbing'],
	},

	/**
	 * Cleans the created files and rebuilds them
	 */
	clean: {
		options: {
			clean: true,
		}
	},

	/**
	 * Compile Sass files
	 */
	compile: {},
};