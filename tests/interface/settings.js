var assert = require('assert');

module.exports = {
	'#loadSettings': {
		'Can load setting from localStorage': function() {
			localStorage.FlashScreen = 0;
			CookieMonster.loadSetting('FlashScreen');
			assert.equal(0, CookieMonster.settings.FlashScreen);
		},
	},

	'#loadSettings': {
		'Can load all settings from localStorage': function() {
			localStorage.FlashScreen = 0;
			CookieMonster.loadSettings();
			assert.equal(0, CookieMonster.settings.FlashScreen);
		},
	},

	'#saveSettings': {
		'Can save settings to localStorage': function() {
			CookieMonster.settings.FlashScreen = 0;
			CookieMonster.saveSettings();

			assert.equal(0, localStorage.FlashScreen);
		},
	},

	'#setSetting': {
		'Can set a setting by name': function() {
			CookieMonster.setSetting('FlashScreen', 0);
			assert.equal(0, CookieMonster.getSetting('FlashScreen'));
		},
	},

	'#getSetting': {
		'Can retrieve a setting by name': function() {
			assert.equal(1, CookieMonster.settings.FlashScreen);
			CookieMonster.settings.FlashScreen = 0;

			assert.equal(0, CookieMonster.getSetting('FlashScreen'));
		},
	},

	'#getBooleanSetting': {
		'Can get setting in boolean form': function() {
			assert.equal(true, CookieMonster.getBooleanSetting('FlashScreen'));
			CookieMonster.settings.FlashScreen = 0;
			assert.equal(false, CookieMonster.getBooleanSetting('FlashScreen'));
		},
	},

	'#getOptionState': {
		'Can get setting in text form': function() {
			assert.equal('ON', CookieMonster.getOptionState('FlashScreen'));
			CookieMonster.settings.FlashScreen = 0;
			assert.equal('OFF', CookieMonster.getOptionState('FlashScreen'));
		},
	},

	'#getShortNumbers': {
		'Can get Short Numbers option value': function() {
			CookieMonster.settings.ShortNumbers = 0;
			assert.equal('OFF', CookieMonster.getShortNumbers());

			CookieMonster.settings.ShortNumbers = 1;
			assert.equal('ON (A)', CookieMonster.getShortNumbers());

			CookieMonster.settings.ShortNumbers = 2;
			assert.equal('ON (B)', CookieMonster.getShortNumbers());
		},
	},
};