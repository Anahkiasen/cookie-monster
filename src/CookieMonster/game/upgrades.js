/**
 * Get how much buying an upgrade would boost clicking CPS
 *
 * @param {Object} upgrade
 *
 * @return {Integer}
 */
CookieMonster.getClickingUpgradeWorth = function(upgrade) {
	return this.simulateBuy(upgrade, 'computedMouseCps');
};

/**
 * Get how much buying an upgrade would earn
 *
 * @param {Object} upgrade
 *
 * @return {Integer}
 */
CookieMonster.getProductionUpgradeWorth = function(upgrade) {
	return this.simulateBuy(upgrade, 'cookiesPs');
};