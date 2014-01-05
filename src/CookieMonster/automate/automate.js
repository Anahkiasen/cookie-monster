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
		if (CookieMonster.onScreen[popup]) {
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

	setTimeout(function() {
		CookieMonster.Automate.mainLoop();
	}, 25);
};