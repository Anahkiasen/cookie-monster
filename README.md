# Cookie Monster [![Build Status](https://travis-ci.org/Anahkiasen/cookie-monster.png?branch=master)](https://travis-ci.org/Anahkiasen/cookie-monster)

Cookie Monster is a plugin you can load into Cookie Clicker, that offers a wide range of tools and statistics to enhance the game.
It is **not** a cheat interface – although it does offer helpers for golden cookies and such, everything can be toggled off at will to only leave how much information you want.

This is a helper, and it is here to help you at _whichever_ degree you want, if you only need some help shortening long numbers, it does that. If you need to be accompanied
by hand to pick the best buildings to buy, it does that, but **everything is an option**.

### Current version

You can see the current version, and a full history of all versions and what they changed by consulting the [Releases page](https://github.com/Anahkiasen/cookie-monster/releases).

### What it does

At its core, Cookie Monster computes two indexes on both buildings and upgrades :

* **Base Cost per Income (BCI)** : which indicates how much a building is worth by comparing how much it costs compared to how much it will earn back
* **Return on investment (ROI)** : which indicates how "interesting" a building is, for example, if it reduces the time to buy a more advanced building

Cookie Monster also indicates the time left before being able to buy an upgrade or building, and takes it into consideration. It will take *everything* in consideration, meaning if buying a building also unlocks an achievement which boosts your income, which unlocks an achievement, it will know and highlight that building's value.

Each of these indexes are computed for buildings and upgrades. If the relevant option is enabled, it will color-code each of them based on their value :

* Light Blue : (upgrades) This item has a better BCI than any building
* Green      : This item has the best BCI
* Yellow     : This item is not the best, but it is closer to best than it is to worst
* Orange     : This item is not the worst, but it is closer to worst than it is to best
* Red        : This item has the worst BCI
* Purple     : (upgrades) This item has a worst BCI than any building
* Grey       : (upgrades) This item has not been calculated and/or cannot be calculated due to no definitive worth.

Note : for both these indexes, **lower is better**, meaning a building with a BCI of 1 is more interesting that one with a BCI of 3.

### What it doesn't do

Most likely you'll find items in purple like Golden Cookie upgrades, clicking upgrades – everything that doesn't earn you a direct bonus to your income will display as purple.
This means the following upgrades are **not** taken into account by Cookie Monster :

* Plastic mouse
* Iron mouse
* Titanium mouse
* Adamantium mouse
* Unobtainium mouse
* Lucky day
* Serendipity
* Get lucky
* Elder Pledge
* Sacrificial rolling pins
* **etc.**

Do note though that, although these upgrades have no direct value, if buying them earns you an achievement of some sort which in return gives you milk and income, Cookie Monster **will** display that value.

## Using

### Bookmarklet

Simply use like the previous plugin, create a bookmark and set this as the URL. Then when in the game, click on that bookmark.

```js
javascript: (function () {
  var jA = document.createElement('script');
  jA.setAttribute('type', 'text/javascript');
  jA.setAttribute('src', 'http://cookie-monster.autopergamene.eu/cookie-monster.min.js?' + new Date().getTime());
  document.body.appendChild(jA);
}());
```

If (for some reason) the above doesn't work, trying pasting everything after the `javascript:` bit into your browser's console.

### Userscript

If you'd rather use the plugin as a script via per example _Greasemonkey_ or _Tampermonkey_, you can use the following script, which will automatically load _Cookie Monster_ every time the original game loads.
You may need to specify `http://orteil.dashnet.org/cookieclicker/` when asked for a _namespace_ or _Includes_. For how to add an userscript to your browser, refer to your browser/plugin's documentation as the method changes for each one.

```js
// ==UserScript==
// @name        Cookie Monster
// @namespace   Cookie
// @include     http://orteil.dashnet.org/cookieclicker/
// @version     1
// @grant       none
// ==/UserScript==

var init  = Game.Init;
Game.Init = function() {
  init();
  (function () {
    var jA = document.createElement('script');
    jA.setAttribute('type', 'text/javascript');
    jA.setAttribute('src', 'http://cookie-monster.autopergamene.eu/cookie-monster.min.js?' + new Date().getTime());

    document.body.appendChild(jA);
  }());
}
```

## Bugs and suggestions

Any bug or suggestion should be **opened as an issue** [in the repository](https://github.com/Anahkiasen/cookie-monster/issues) for easier tracking. This allows me to close issues once they're fixed.

Before submitting a bug, make sure to give a shot at the latest version of the plugin on the `develop` branch. For this, simply replace `master` by `develop` in the bookmarklet above.
If the bug is still here, you can submit an issue for it.

All suggestions are welcome, even the smallest ones.

## Contributing

All edits need to be make to the [develop branch](https://github.com/Anahkiasen/cookie-monster/tree/develop), that's where the latest version of the code is.

To contribute to the project, you'll find the files you want to edit in `src/`, split by what the methods are related to. If you're not familiar with [Git](http://git-scm.com/), the simplest way to contribute is to go into a file, click the _Edit_ button at the top, edit the code, and click on **"Propose file change"**.

### Setup the repository

If you do are familiar with git, simply click the **"Fork"** button at the top of the page. You'll be redirected to your fork of the repository, copy its address in the right side bar. Then clone the repository and install the dependencies :

    git clone https://github.com/YOURNAME/cookie-monster.git
    cd cookie-monster
    npm install

You'll need NPM for that, if you don't have it, you can find a one-click installer on [NodeJS's website](http://nodejs.org/) or if you're more familiar with development and have per example Homebrew, you can just do `brew install node`.

### Editing

Make the edits you want in the `src/` folder.

### Compiling and sending

Then rebuild the assets by running Grunt :

    ./node_modules/.bin/grunt

Next you can commit your changes and push :

    git commit -am "Edited some stuff"
    git push origin master

Once that is done, go back on Github where your fork is, and create a pull request from there.

## Contributors

* **[Raving_Kumquat](http://cookieclicker.wikia.com/wiki/User:Raving_Kumquat)** : Original author
* **[Maxime Fabre](https://github.com/Anahkiasen)** : Current maintainer
* **Alderi Tokori** : ROI calculations
