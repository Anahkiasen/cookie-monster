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

To contribute to the project, you'll find the files you want to edit in `src/`, splitted by what the methods are related to. If you're not familiar with [Git](http://git-scm.com/), the simplest way to contribute is to go into a file, click the _Edit_ button at the top, edit the code, and click on **"Propose file change"**.

If you do are familiar with git, simply clone the repository and install the dependencies :

```bash
git clone https://github.com/Anahkiasen/cookie-monster.git
cd cookie-monster
npm install
```

Make the edits you want, and rebuild the assets by running Grunt :

```bash
grunt
```

Then commit your changes and push :

```bash
git commit -am "Edited some stuff"
git push origin master
```