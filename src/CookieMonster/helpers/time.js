/**
 * Computes the time (s) required to buy a building/upgrade
 *
 * @param {Object} object
 *
 * @return {Integer}
 */
CookieMonster.secondsLeft = function(object) {
	// Get the price of the object we want and how much we need
	var realPrice = Game.cookies - object.getPrice();

	// If we're not making any cookies, or have
	// enough already, return 0
	if (Game.cookiesPs === 0 || realPrice > 0) {
		return 0;
	}

	return Math.round(Math.abs(realPrice) / Game.cookiesPs);
};

/**
 * Compute the time left to have a certain amount of cookies
 *
 * @param {Integer} cookies
 *
 * @return {Integer}
 */
CookieMonster.getTimeToCookies = function(cookies) {
	return this.getTimeForCookies(cookies - Game.cookies);
};

/**
 * Compute the time left to gain a certain amount of cookies
 *
 * @param {Integer} cookies
 *
 * @return {String}
 */
CookieMonster.getTimeForCookies = function(cookies) {
	return this.formatTime(cookies / Game.cookiesPs, true);
};

/**
 * Format a time (s) to an human-readable format
 *
 * @param {Integer} time
 * @param {String}  compressed  Compressed output (minutes => m, etc.)
 *
 * @return {String}
 */
CookieMonster.formatTime = function(time, compressed) {
	time = Math.round(time);
	if (typeof compressed === 'undefined') {
		compressed = false;
	}

	// Take care of special cases
	if (time === Infinity) {
		return 'Never';
	} else if (time === 0) {
		return 'Done!';
	} else if (time / 86400 > 1e3) {
		return '> 1,000 days';
	}

	// Compute each units separately
	var days    = parseInt(time / 86400) % 999;
	var hours   = parseInt(time / 3600) % 24;
	var minutes = parseInt(time / 60) % 60;
	var seconds = time % 60;

	// Format units
	var units = [' days, ', ' hours, ', ' minutes, ', ' seconds'];
	if (!compressed) {
		if (days === 1) {
			units[0] = ' day, ';
		}
		if (hours === 1) {
			units[1] = ' hour, ';
		}
		if (minutes === 1) {
			units[2] = ' minute, ';
		}
		if (seconds === 1) {
			units[3] = ' second';
		}
	} else {
		units = ['d, ', 'h, ', 'm, ', 's'];
	}

	// Create final string
	var formated = '';
	if (days > 0) {
		formated += days + units[0];
	}
	if (days > 0 || hours > 0) {
		formated += hours + units[1];
	}
	if (days > 0 || hours > 0 || minutes > 0) {
		formated += minutes + units[2];
	}
	if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
		formated += seconds + units[3];
	}

	return formated;
};