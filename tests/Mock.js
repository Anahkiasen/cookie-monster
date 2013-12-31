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
		for (var key in achievements) {
			Game.Achievements[key].won = achievements[key];
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
		var Game = {
			cookies     : 20,
			cookiesPs   : 10,
			frenzyPower : 1,

			AchievementsById : this.requireClone('achievements'),
			UpgradesById     : this.requireClone('upgrades'),
			ObjectsById      : this.requireClone('objects'),

			Achievements : {},
			prestige     : {},
			Upgrades     : [],

			RebuildStore : function() {},
			Has          : function() {},
		};

		Game.AchievementsById.forEach(function(achievement) {
			Game.Achievements[achievement.name] = achievement;
		});

		return Game;
	},

	////////////////////////////////////////////////////////////////////
	/////////////////////////////// FIXTURES ///////////////////////////
	////////////////////////////////////////////////////////////////////

	/**
	 * Require a file and return a clone of its contents
	 *
	 * @param {String} file
	 *
	 * @return {Object}
	 */
	requireClone: function(file) {
		return this.clone(require('./_fixtures/'+file+'.json'));
	},

	/**
	 * Clone an object
	 *
	 * @param {Object} object
	 *
	 * @return {Object}
	 */
	clone: function(object) {
		return JSON.parse(JSON.stringify(object));
	},

};