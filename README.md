# CookieMonster

## Authors

**Original author : [Raving_Kumquat](http://cookieclicker.wikia.com/wiki/User:Raving_Kumquat)**

## Using

Rehost of the Cookie Monster add-on

```
javascript: (function () {
	var jA = document.createElement('script');
	jA.setAttribute('type', 'text/javascript');
	jA.setAttribute('src', 'https://raw.github.com/Anahkiasen/cookie-monster/master/dist/cookie-monster.js?' + new Date().getTime());

	document.body.appendChild(jA);
}());
```

## Contributing

First install the dependencies :

```
npm install
```

Make an edit, then :

```
grunt
```