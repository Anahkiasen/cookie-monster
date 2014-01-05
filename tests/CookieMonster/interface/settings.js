module.exports = {

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
			CookieMonster.getSetting('FlashScreen').should.equal(false);
		},
	},

	'#getSetting': {
		'Can retrieve a setting by name': function() {
			CookieMonster.getSetting('FlashScreen').should.equal(true);
			CookieMonster.setSetting('FlashScreen', 0);

			CookieMonster.getSetting('FlashScreen').should.equal(false);
		},
	},

	'#getOptionState': {
		'Can get setting in text form': function() {
			CookieMonster.getOptionState('FlashScreen').should.equal('ON');
			CookieMonster.setSetting('FlashScreen', 0);
			CookieMonster.getOptionState('FlashScreen').should.equal('OFF');
		},
		'Can call custom presenters': function() {
			CookieMonster.setSetting('ShortNumbers', 1);
			CookieMonster.getOptionState('ShortNumbers').should.equal('ON [A]');
		},
	},

	// Toggles
	////////////////////////////////////////////////////////////////////

	'#toggleSetting': {
		'Can toggle boolean setting': function() {
			CookieMonster.getSetting('FlashScreen').should.equal(true);
			CookieMonster.toggleSetting('FlashScreen');
			CookieMonster.getSetting('FlashScreen').should.equal(false);
		},
		'Can toggle state setting': function() {
			CookieMonster.getSetting('Refresh').should.equal(1e3);
			CookieMonster.toggleSetting('Refresh');
			CookieMonster.getSetting('Refresh').should.equal(500);
		},
	},

	'#toggleOption': {
		'Can toggle an option by clicking on it': function() {
			var option = '<div data-option="FlashScreen">Flash Screen (ON)</div>';
			CookieMonster.toggleOption(option).html().should.equal('Flash Screen (OFF)');
		},
	},

	// Option states
	////////////////////////////////////////////////////////////////////

	'#getLabel': {
		'Can get full label of an option': function() {
			CookieMonster.getLabel('ShortNumbers').should.equal('Short Numbers (ON [A])');
			CookieMonster.getLabel('FlashScreen').should.equal('Flash Screen (ON)');
		},
	},

	'#getDescription': {
		'Can get description of option': function() {
			CookieMonster.getDescription('FlashScreen').should.equal('Flashes the screen when a Red/Golden Cookie or Reindeer appears');
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

	'#getLuckyAlertState': {
		'Can get LuckyAlert Rate option value': function() {
			CookieMonster.setSetting('LuckyAlert', 1);
			CookieMonster.getLuckyAlertState().should.equal('Both');

			CookieMonster.toggleSetting('LuckyAlert');
			CookieMonster.getLuckyAlertState().should.equal('Icons');

			CookieMonster.toggleSetting('LuckyAlert');
			CookieMonster.getLuckyAlertState().should.equal('Notes');

			CookieMonster.toggleSetting('LuckyAlert');
			CookieMonster.getLuckyAlertState().should.equal('Off');
		},
	},

	'#getRefreshState': {
		'Can get Refresh Rate option value': function() {
			CookieMonster.setSetting('Refresh', 1e3);
			CookieMonster.getRefreshState().should.equal('1 fps');

			CookieMonster.toggleSetting('Refresh');
			CookieMonster.getRefreshState().should.equal('2 fps');

			CookieMonster.toggleSetting('Refresh');
			CookieMonster.getRefreshState().should.equal('4 fps');

			CookieMonster.toggleSetting('Refresh');
			CookieMonster.getRefreshState().should.equal('10 fps');

			CookieMonster.toggleSetting('Refresh');
			CookieMonster.getRefreshState().should.equal('30 fps');
		},
	},

	'#getEstimatesTimeState': {
		'Can get Estimates Time option value': function() {
			CookieMonster.setSetting('EstimatesTime', 30);
			CookieMonster.getEstimatesTimeState().should.equal('30mn');

			CookieMonster.toggleSetting('EstimatesTime');
			CookieMonster.getEstimatesTimeState().should.equal('1h');

			CookieMonster.toggleSetting('EstimatesTime');
			CookieMonster.getEstimatesTimeState().should.equal('2h');

			CookieMonster.toggleSetting('EstimatesTime');
			CookieMonster.getEstimatesTimeState().should.equal('3h');
		},
	},

};