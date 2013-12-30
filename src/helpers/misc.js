/**
 * Get a color for regular or colorblind people
 *
 * @param {String} color
 *
 * @return {String}
 */
CookieMonster.color = function(color) {
	var colors = this.getSetting('Colorblind') ? this.colorsBlind : this.colors;

	return colors[color];
};

//////////////////////////////////////////////////////////////////////
//////////// THE "I HAVE NO FUCKING IDEA WHAT THESE DO" LAND /////////
//////////////////////////////////////////////////////////////////////

CookieMonster.inc = function(e) {
	var t = 0;

	Game.AchievementsById.forEach(function (achievement) {
		var i = achievement.desc.replace(/,/g, "");
		if (!achievement.won && i.indexOf(" per second.") !== -1) {
			if (e >= i.substr(8, i.indexOf("</b>", 8) - 8) * 1) {
				t++;
			}
		}
	});

	return t;
};