module.exports = {

	/**
	 * Mock the amounts of buildings
	 *
	 * @param {Array} amounts
	 *
	 * @return {Void}
	 */
	amounts: function(amounts) {
		Game.ObjectsById = [];
		var names = ['Cursor', 'Grandma', 'Farm', 'Factory', 'Mine', 'Shipment', 'Alchemy lab', 'Portal', 'Time machine', 'Antimatter condenser'];

		for (var i = 0; i < amounts.length; i++) {
			Game.ObjectsById[i] = {name: names[i], amount: amounts[i]};
		}
	},

	/**
	 * Mock the available achievements
	 *
	 * @param {Array} achievements
	 *
	 * @return {Void}
	 */
	achievements: function(achievements) {
		Game.Achievements = {};

		for (var key in achievements) {
			Game.Achievements[key] = {name: key, won: achievements[key]};
		}
	},

	////////////////////////////////////////////////////////////////////
	////////////////////////////// INSTANCES ///////////////////////////
	////////////////////////////////////////////////////////////////////

	/**
	 * Create a mocked instance of the Game
	 *
	 * @return {Array}
	 */
	game: function() {
		return {
			cookies     : 20,
			cookiesPs   : 10,
			frenzyPower : 1,

			prestige     : {},
			Upgrades     : [{}],
			UpgradesById : [{}],
			ObjectsById  : [{name: 'Cursor', price: 15}],

			RebuildStore : function() {},
			Has          : function() {},
		};
	},

};