module.exports = {

	'#getTypeOf': {
		'Can get type of object': function() {
			Game.ObjectsById[0].getType().should.equal('object');
			Game.UpgradesById[0].getType().should.equal('upgrade');
		},
	},

};