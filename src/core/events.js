CookieMonster.Events = {};

/**
 * Event when the user clicks on a golden cookie
 *
 * @return {void}
 */
CookieMonster.Events.onGoldenClick = function() {
	CookieMonster.$goldenCookie.click(function() {
		if (Game.frenzyPower === 7) {
			CookieMonster.fadeOutBar('Frenzy');
			CookieMonster.manageFrenzyBars();
		}
	});
};
