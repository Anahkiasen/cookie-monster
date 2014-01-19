module.exports = {
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
};