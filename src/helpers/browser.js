/**
 * Play a sound
 *
 * @param {String} sound
 *
 * @return {void}
 */
CookieMonster.playSound = function(sound) {
	var sound = new realAudio(sound);
	sound.volume = 1;
	sound.play();
};

/**
 * Update the favicon
 *
 * @param {String} favicon
 *
 * @return {void}
 */
CookieMonster.updateFavicon = function (favicon) {
	$('#cm_favicon').attr('href', favicon);
};