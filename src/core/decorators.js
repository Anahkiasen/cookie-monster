/**
 * Get the price of an object
 *
 * @return {Integer}
 */
CookieMonster.getPriceOf = function() {
	return this instanceof Game.Upgrade ? this.basePrice : this.price;
};

Game.Object.prototype.getPrice  = CookieMonster.getPriceOf;
Game.Upgrade.prototype.getPrice = CookieMonster.getPriceOf;