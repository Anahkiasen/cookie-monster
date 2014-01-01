CookieMonster.Events = {};

/**
 * Event when the user clicks on a golden cookie
 *
 * @return {void}
 */
CookieMonster.Events.onGoldenClick = function() {
	CookieMonster.$goldenCookie.click(function() {
		var frenzy = CookieMonster.frenzies[Game.frenzyPower];
		if (frenzy) {
			CookieMonster.fadeOutBar(frenzy.name.replace(' ', ''));
			CookieMonster.manageFrenzyBars();
		}
	});
};
