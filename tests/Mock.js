/**
 * Mock the amounts of buildings
 *
 * @param {Array} amounts
 *
 * @return {Void}
 */
exports.amounts = function(amounts) {
	Game.ObjectsById = [];
	var names = ['Cursor', 'Grandma', 'Farm', 'Factory', 'Mine', 'Shipment', 'Alchemy lab', 'Portal', 'Time machine', 'Antimatter condenser'];

	for (var i = 0; i < amounts.length; i++) {
		Game.ObjectsById[i] = {name: names[i], amount: amounts[i]};
	}
};

/**
 * Mock the available achievements
 *
 * @param {Array} achievements
 *
 * @return {Void}
 */
exports.achievements = function(achievements) {
	Game.AchievementsById = [];

	for (var key in achievements) {
		Game.AchievementsById.push({name: key, won: achievements[key]});
	}
};