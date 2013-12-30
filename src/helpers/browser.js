/**
 * Play a sound
 *
 * @param {String} sound
 *
 * @return {void}
 */
CookieMonster.playSound = function(sound) {
	sound = new realAudio(sound);

	// Play sound
	sound.volume = 1;
	sound.play();

	return sound;
};

/**
 * Shortcut for playing the bell sound
 *
 * @return {void}
 */
CookieMonster.playBell = function() {
	return this.playSound('http://autopergamene.eu/cookie-monster/mp3/bell.mp3');
};

/**
 * Get the full path to an image
 *
 * @param {String} image
 *
 * @return {String}
 */
CookieMonster.getImage = function(image) {
	if (image.indexOf('http') === -1) {
		image = 'http://autopergamene.eu/cookie-monster/img/'+image+'.png';
	}

	return image;
};

/**
 * Update the favicon
 *
 * @param {String} favicon
 *
 * @return {void}
 */
CookieMonster.updateFavicon = function (favicon) {
	favicon = this.getImage(favicon);

	$('#cm_favicon').attr('href', favicon);
};