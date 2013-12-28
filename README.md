# CookieMonster [![Build Status](https://travis-ci.org/Anahkiasen/cookie-monster.png?branch=master)](https://travis-ci.org/Anahkiasen/cookie-monster)

A rehosted, cleaned up and updated version of the CookieMonster plugin.

## Contributors

- **Original author : [Raving_Kumquat](http://cookieclicker.wikia.com/wiki/User:Raving_Kumquat)**
- **Maintainer : [Maxime Fabre](https://github.com/Anahkiasen)**

## Using

Simply use like the previous plugin, create a bookmark and set this as the URL. Then when in the game, click on that bookmark.

```js
javascript: (function () {
  var jA = document.createElement('script');
  jA.setAttribute('type', 'text/javascript');
  jA.setAttribute('src', 'https://raw.github.com/Anahkiasen/cookie-monster/master/dist/cookie-monster.js?' + new Date().getTime());

  document.body.appendChild(jA);
}());
```

## Bugs and suggestions

Any bug or suggestion should be opened as an issue [in the repository](https://github.com/Anahkiasen/cookie-monster/issues) for easier tracking. This allows me to close issues once they're fixed.

## Contributing

To contribute to the project, you'll find the files you want to edit in `src/`, split by what the methods are related to. If you're not familiar with [Git](http://git-scm.com/), the simplest way to contribute is to go into a file, click the _Edit_ button at the top, edit the code, and click on **"Propose file change"**.

### Setup the repository

If you do are familiar with git, simply clone the repository and install the dependencies :

```bash
git clone https://github.com/Anahkiasen/cookie-monster.git
cd cookie-monster
npm install
```

You'll need NPM for that, if you don't have it, you can find a one-click installed on [NodeJS's website](http://nodejs.org/) or if you're more familiar with development and have per example Homebrew, you can just do `brew install node`.

### Editing

Make the edits you want in the `src/` folder.

### Compiling and sending

Then rebuild the assets by running Grunt :

```bash
./node_modules/.bin/grunt
```

Then commit your changes and push :

```bash
git commit -am "Edited some stuff"
git push origin master
```