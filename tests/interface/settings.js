module.exports = {

	'#loadSetting': {
		'Can load setting from localStorage': function() {
			localStorage.FlashScreen = 0;
			CookieMonster.loadSetting('FlashScreen');
			CookieMonster.settings.FlashScreen.value.should.equal(0);
		},
	},

	'#loadSettings': {
		'Can load all settings from localStorage': function() {
			localStorage.FlashScreen = 0;
			CookieMonster.loadSettings();
			CookieMonster.settings.FlashScreen.value.should.equal(0);
		},
	},

	'#saveSettings': {
		'Can save settings to localStorage': function() {
			CookieMonster.settings.FlashScreen.value = 0;
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
			CookieMonster.getSetting('FlashScreen').should.equal(1);
			CookieMonster.setSetting('FlashScreen', 0);

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
			CookieMonster.setSetting('FlashScreen', 0);
			CookieMonster.getOptionState('FlashScreen').should.equal('OFF');
		},
	},

	'#toggleSetting': {
		'Can toggle boolean setting': function() {
			CookieMonster.getSetting('FlashScreen').should.equal(1);
			CookieMonster.toggleSetting('FlashScreen');
			CookieMonster.getSetting('FlashScreen').should.equal(0);
		},
		'Can toggle state setting': function() {
			CookieMonster.getSetting('Refresh').should.equal(1e3);
			CookieMonster.toggleSetting('Refresh');
			CookieMonster.getSetting('Refresh').should.equal(500);
		},
	},

	'#getShortNumbersState': {
		'Can get Short Numbers option value': function() {
			CookieMonster.setSetting('ShortNumbers', 0);
			CookieMonster.getShortNumbersState().should.equal('OFF');

			CookieMonster.setSetting('ShortNumbers', 1);
			CookieMonster.getShortNumbersState().should.equal('ON [A]');

			CookieMonster.setSetting('ShortNumbers', 2);
			CookieMonster.getShortNumbersState().should.equal('ON [B]');
		},
	},

};