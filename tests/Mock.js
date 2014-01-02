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

			Achievement : this.object,
			Object      : this.object,
			Upgrade     : this.object,

			RebuildStore : function() {},
			Has          : function() {},
		};

		// Create instances
		Game.AchievementsById.forEach(function(achievement, key) {
			Game.Achievements[achievement.name] = achievement;
			Game.AchievementsById[key] = new Game.Achievement(achievement);
		});
		Game.UpgradesById.forEach(function(upgrade, key) {
			Game.UpgradesById[key] = new Game.Upgrade(upgrade);
		});
		Game.ObjectsById.forEach(function(object, key) {
			Game.ObjectsById[key] = new Game.Object(object);
		});

		return Game;
	},

	/**
	 * A dummy model
	 *
	 * @param {Object} attributes
	 *
	 * @return {Object}
	 */
	object: function(attributes) {
		for (var attribute in attributes) {
			this[attribute] = attributes[attribute];
		}
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