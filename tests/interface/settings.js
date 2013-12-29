module.exports = {

	'#loadSettings': {
		'Can load setting from localStorage': function() {
			localStorage.FlashScreen = 0;
			CookieMonster.loadSetting('FlashScreen');
			CookieMonster.settings.FlashScreen.should.equal(0);
		},
	},

	'#loadSettings': {
		'Can load all settings from localStorage': function() {
			localStorage.FlashScreen = 0;
			CookieMonster.loadSettings();
			CookieMonster.settings.FlashScreen.should.equal(0);
		},
	},

	'#saveSettings': {
		'Can save settings to localStorage': function() {
			CookieMonster.settings.FlashScreen = 0;
			CookieMonster.saveSettings();

			localStorage.FlashScreen.should.equal(0);
		},
	},

	'#setSetting': {
		'Can set a setting by name': function() {
			CookieMonster.setSetting('FlashScreen', 0);
			CookieMonster.getSetting('FlashScreen').should.equal(0);
		},
	},

	'#getSetting': {
		'Can retrieve a setting by name': function() {
			CookieMonster.settings.FlashScreen.should.equal(1);
			CookieMonster.settings.FlashScreen = 0;

			CookieMonster.getSetting('FlashScreen').should.equal(0);
		},
	},

	'#getBooleanSetting': {
		'Can get setting in boolean form': function() {
			CookieMonster.getBooleanSetting('FlashScreen').should.equal(true);
			CookieMonster.settings.FlashScreen = 0;
			CookieMonster.getBooleanSetting('FlashScreen').should.equal(false);
		},
	},

	'#getOptionState': {
		'Can get setting in text form': function() {
			CookieMonster.getOptionState('FlashScreen').should.equal('ON');
			CookieMonster.settings.FlashScreen = 0;
			CookieMonster.getOptionState('FlashScreen').should.equal('OFF');
		},
	},

	'#getShortNumbers': {
		'Can get Short Numbers option value': function() {
			CookieMonster.settings.ShortNumbers = 0;
			CookieMonster.getShortNumbers().should.equal('OFF');

			CookieMonster.settings.ShortNumbers = 1;
			CookieMonster.getShortNumbers().should.equal('ON (A)');

			CookieMonster.settings.ShortNumbers = 2;
			CookieMonster.getShortNumbers().should.equal('ON (B)');
		},
	},

};