module.exports = {

	'#cache': {
		'Can cache a closure': function() {
			var i = 0;
			var test = function() { i++; return i; };

			CookieMonster.cache([], test).should.equal(1);
			CookieMonster.cache([], test).should.equal(1);
			i.should.equal(1);
		},
		'Can cache a closure with specific salts': function() {
			var i = 0;
			var test = function() { i++; return i; };

			CookieMonster.cache([], test).should.equal(1);
			CookieMonster.cache(['foo'], test).should.equal(2);
			i.should.equal(2);
		},
		'Can pass arguments to closure': function() {
			var i = 0;
			var test = function(text) { i++; return text; };

			CookieMonster.cache([], test, ['foobar']).should.equal('foobar');
			CookieMonster.cache([], test, ['foobar']).should.equal('foobar');
			i.should.equal(1);
		},
	},

	'#refreshCache': {
		'Can empty cache': function() {
			CookieMonster.cacheStore = {foo: 'bar'};

			CookieMonster.refreshCache();
			CookieMonster.cacheStore.should.be.empty;
		},
	},

	'#callCached': {
		'Can call CM method and cache it': function() {
			CookieMonster.callCached('formatTime', [123456]).should.equal('1 day, 10 hours, 17 minutes, 36 seconds');
			CookieMonster.cacheStore['--']['formatTime-123456'].should.exists;
		},
	},

	'#computeSalts': {
		'Can compute basic salts': function() {
			CookieMonster.computeSalts(['foo'], ['bar']).should.equal('foo-bar');
		},
		'Can compute deep objects': function() {
			CookieMonster.computeSalts(['foo'], [{identifier: function() { return 'foobar'; }}]).should.equal('foo-foobar');
		},
	}

};