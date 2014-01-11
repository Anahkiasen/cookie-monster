/**
 * Checks if we're running in local or not
 *
 * @return {Boolean}
 */
CookieMonster.runningInLocal = function() {
	var $script = $('script[src]').last();
	if (!$script.length) {
		return true;
	}

	return $script.attr('src').indexOf('localhost') !== -1;
};

/**
 * Checks if CookieMonster should run
 *
 * @return {Boolean}
 */
CookieMonster.shouldRun = function() {
	// Check if we're in Cookie Clicker
	if (document.title.indexOf('Cookie Clicker') === -1 || this.$game.length === 0) {
		return this.displayError('These aren\'t the droids you\'re looking for.');
	}

	// Cancel if already loaded
	if (this.$monsterBar) {
		return this.displayError('Cookie Monster is already loaded, silly!');
	}

	return true;
};

/**
 * Display an error as an alert
 *
 * @param {String} error
 *
 * @return {Void}
 */
CookieMonster.displayError = function(error) {
	if (typeof alert !== 'undefined') {
		alert('Cookie Monster ' +this.version+ "\n\n" + error);
	}

	return false;
};