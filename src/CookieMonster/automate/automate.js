/**
 * An automated played for Cookie Clicker
 *
 * @type {Object}
 */
CookieMonster.Automate = {
	index    : 'getReturnInvestment',
	priority : [
		'Lucky day',
		'Serendipity',
	],
};

/**
 * Clicks on available popups
 *
 * @return {void}
 */
CookieMonster.Automate.clickOnPopups = function() {
	for (var popup in CookieMonster.onScreen) {
		if (CookieMonster.onScreen[popup] && (typeof Game[popup].wrath === 'undefined' || Game[popup].wrath === 0)) {
			Game[popup].click();
		}
	}
};

/**
 * Click on the big cookie
 *
 * @return {void}
 */
CookieMonster.Automate.clickOnCookie = function() {
	Game.ClickCookie();
};

/**
 * Buy Pledges or Covenant
 *
 * @return {void}
 */
CookieMonster.Automate.buyPledgesOrCovenant = function() {
	var pledgeUpgrade   = Game.Upgrades['Elder Pledge'];
	var covenantUpgrade = Game.Upgrades['Elder Covenant'];

	// Cancel if everything is cool
	if (!Game.elderWrath || (!pledgeUpgrade.isInStore() && !covenantUpgrade.isInStore())) {
		return;
	}

	// Get the cost of each path
	var covenantCost = CookieMonster.estimateCovenantCost();
	var pledgesCost  = CookieMonster.estimatePledgeCost();

	// Buy correct one
	if (pledgesCost > covenantCost) {
		covenantUpgrade.buy();
	} else {
		pledgeUpgrade.buy();
	}
};

/**
 * Buy the next best item
 *
 * @return {void}
 */
CookieMonster.Automate.buyItems = function() {
	var upgrade  = this.getNextBestUpgrade();
	var building = this.getNextBestBuilding();

	// Buy next building
	if (building.buy) {
		building.buy();
	}

	// Buy next upgrade
	if (upgrade.buy) {
		upgrade.buy();
	}
};

/**
 * The main loop for Automate
 *
 * @return {void}
 */
CookieMonster.Automate.mainLoop = function() {
	this.buyItems();
	this.clickOnPopups();
	this.clickOnCookie();
	this.buyPledgesOrCovenant();

	setTimeout(function() {
		CookieMonster.Automate.mainLoop();
	}, 25);
};