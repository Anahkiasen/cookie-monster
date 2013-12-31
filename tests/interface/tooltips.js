module.exports = {

	'#identifier': {
		'Can get identifier for a tooltip': function() {
			CookieMonster.identifier('ob', 1).should.equal('cm_ob_1_');
			CookieMonster.identifier('up', 2).should.equal('cm_up_2_');
		},
	},

};