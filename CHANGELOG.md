## 1.040 Versions

### 1.040.12

* Added scientific notations for numbers
* Added "Bonus to Clicking income" stat on clicking upgrades' tooltips

### 1.040.11 _(2014-01-05)_

* Tweak formula for computing the "grey bars"'s width
* Add time left next to unattained lucky tresholds in Statistics
* Add a new "Estimates" section in Statistics, time estimates are computed for can be set in options
* Slight fix to computed pledge costs
* Fixed "Lucky Reward (CUR)" not updating during frenzies

### 1.040.10 _(2014-01-02)_

* Added timer next to the Lucky Alert deficits to show time before the deficit is filled
* Fixed Reindeer value in statistics
* Added statistics about whether it's better to buy pledge or make a covenant
* Added a _grey_ color for upgrades, to differentiate items with low BCI/no BCI
* Added support for multiple title modifiers (and Reindeer title modifier added with it)

### 1.040.09 _(2014-01-02)_

* Finally fix BCI going crazy during frenzies
* Moved all assets to private server (you need to update your bookmarklet)
* Upgrades that impact negatively the income (eg. Elder Covenant) now appear in purple
* Fixed some bars-related bugs
* Wrinklers statistics are now hidden if no Wrinklers active

### 1.040.08 _(2014-01-01)_

* Take into account how an object/upgrade will affect the income to compute the Lucky Cookies deficit alerts
* Fix frenzies not affecting BCI
* Take into account some more upgrades like Elder Covenant
* Also fixed the BCI of some upgrades that displayed NaN or an inferior number

### 1.040.07 _(2014-01-01)_

* Fixed a bug where some tooltips weren't being displayed on newly unlocked upgrades
* Added **ROI** (Return on Investment) option as an alternative to **BCI** (Base Cose per Income) for buildings
* Loading a save or resetting the game now properly refreshes Cookie Monster
* Fixed BCI going crazy during frenzies
* Small tweak to the wrinklers revenues formula

### 1.040.06 _(2013-12-31)_

* Added Wrinklers statistics
* Changed Reindeer notification sound
* Fixed timer bars (reindeers, etc.) width being miscalculated
* Fixed a bug where having twice the same frenzy would mess with the bars

### 1.040.05 _(2013-12-31)_

* Add some upgrades that were still not taken into account
* Added back the "grey timeout" for Next Cookie/Reindeed bars
* Huge performances work, CM should run a lot smoother now (ie. more than the original)
* Fix tooltips displaying full time instead of compressed time

### 1.040.04 _(2013-12-30)_

* Take into account new upgrades
* Fixed a bug where the bottom bar would appear even if disabled
* Fixed a bug where some buff bars would appears as uncolored

### 1.040.03 _(2013-12-30)_

* Add Reindeer timer bars and sound (linked to Golden Cookie options for now)

### 1.040.02 _(2013-12-29)_

* Added back colorblind mode as an option
* Fixed a miscalculation in Bonus Income

### 1.040.01 _(2013-12-23)_

* Fixed some bugs related to the Grandmapocalypse
* Fixed a bug where the Golden Cookie sound would crash the application

## 1.038 Versions

### 1.038.01 _(2013-10-15)_

* Updated the buff timers to have a width relative to that of the Cookie Timer Bar
* Added the calculations for the new Upgrades for Heavenly Chips
* Added the calculation for the new Heavenly Chips Achievement "Wholesome"
* Added the missing calculations for the Grandma Achievements "Friend of the ancients" and "Ruler of the ancients"
* Fixed an issue that was causing 9 additional Buildings to be bought on the first purchase made after loading Cookie Monster _~ "don't even ask..."_
* Fixed "Session started" format to display as "days, hours, minutes, seconds" again
* Fixed and updated the "Next Cookie Timer"
	* Added a Grey part to the timer bar to depict the time left before a cookie has a chance of spawning
	* Note that, with the new update to the game, golden cookies now have a minimum and maximum time before they spawn (this makes cookie spawns unpredictable between the 2 values)

## 1.037 Versions

### 1.037.01 _(2013-10-02)_

* **Lucky Alert** will now tell you if you are currently under the required amount
* Updated the Kitten Overseers calculation that was changed in v.1.037
* Fixed "Game started" format to display as "days, hours, minutes, seconds" again
* Fixed an issue that was causing NaN values after the "Sextillion Fingers" upgrade

## 1.036 Versions

### 1.036.08 _(2013-09-24)_

* Added a new setting to the "**Cookie Monster Settings**" section on the Menu page
	* **Upgrade Display** - _"Changes how the store displays Upgrades"_
		* **Normal **- The default display
		* **All **- Expands the store to show all Upgrades
		* **None **- Collapses the store to hide all Upgrades
* Changed the options for the **Short Numbers** setting
	* **Short Numbers ON (A)** - Progression: _M, B, T, Qa, Qi, Sx, Sp, Oc, No, Dc_
	* **Short Numbers ON (B)** - Progression: _M, G, T, P, E, Z, Y, Oc, No, Dc_
	* **Short Numbers OFF** - No progression.
* Updated the display of "days, hours, minutes, seconds" to only show significant values
	* **i.e.** "0 days, 0 hours, 2 minutes, 0 seconds" will now be displayed as "2 minutes, 0 seconds"
* Fixed a hosting issue for Cookie Monster images and sounds _(you may have already noticed this change)_
* Fixed an issue that was causing Cookie Monster to think "Enhancer", "Augmenter", and "Upgrader" were never Achieved
* Fixed an issue that was causing Lucky Alerts for Upgrades to show a Deficit of "NaN"

### 1.036.07 _(2013-09-20)_

* Added a new setting to the "**Cookie Monster Settings**" section on the Menu page
	* ​**Upgrade Icons _- Displays a small square icon on the Upgrade to better display the Cost Per Income color value_

### 1.036.06 _(2013-09-20)_

* Re-enabled Cookie Sound and Favicon changes _~"hooray!"_
* Added a little square in the upper left of all Upgrades to better display thier Cost Per Income color value
* Added a new setting to the "**Cookie Monster Settings**" section on the Menu page
	* **​Lucky Alert _- Changes the tooltip to display if you would be under the number of cookies required for "Lucky!"_
		* ​**Both** - Displays both the Warning/Cautions Icons and the Notes
		* **Icons **- Displays Warning/Cautions Icons only
		* **Notes** - Displays Warning/Cautions Notes only
		* **Off** - Does not display anything
* Fixed an issue that was causing the colored numbers in the store area to have red and orange values reversed
**Note:** I am aware that the Lucky Alert Notes may go off the bottom of the page and not be visible for the Antimatter condenser, I'll figure something out in the near future

### 1.036.05 _(2013-09-17)_

* When a Golden Cookie or Red Cookie spawns, the Favicon will change
* Added a Timer to the Title to show how many seconds until the next Cookie appears
* Added new settings to the "**Cookie Monster Settings**" section on the Menu page
	* **Cookie Sound**_ - "Plays a sound when a Golden Cookie or Red Cookie appears"_
	* **Update Title**_ - "Updates the Title to display when a Cookie will appear and if one is waiting to be clicked_"
* Fixed an issue that was causing Upgrades for the Antimatter condenser to be calculated incorrectly
* Fixed an issue that was causing Timer Bars to get "stuck" when loading or resetting a game
* Fixed an issue that was causing Refresh Rate to have a value of "undefined fps"

### 1.036.04 _(2013-09-16)_

* Fixed a pretty big gosh darn issue that was causing Firefox to not display tooltips _~"Sorry!"_
* Added some more **Short Numbers** because why not
	* 1000000000000000 = 1.000 Qa (was Q)
	* 1000000000000000000 = 1.000 Qi
	* 1000000000000000000000 = 1.000 Sx
	* 1000000000000000000000000 = 1.000 Sp
	* 1000000000000000000000000000 = 1.000 Oc
	* 1000000000000000000000000000000 = 1.000 No
	* 1000000000000000000000000000000000 = 1.000 Dc
* Changed "Seconds Left" to "Time Left" on the bottom bar and Upgrade tooltips that had a minified version of days, hours, minutes, seconds so it can fit

### 1.036.03 _(2013-09-16)_

* Added new settings to the "**Cookie Monster Settings**" section on the Menu page
	* ​**Bottom Bar** - _"Displays a bar at the bottom of the screen that shows all Building information"_
	* **Colored Prices** - _"Changes the colors of all Building prices to correspond with their Cost Per Income"_
	* **Short Numbers** - _"Formats all numbers to be shorter when displayed"_
		* _​_1000000 = 1.000 M
		* 1000000000 = 1.000 B
		* 1000000000000 = 1.000 T
		* 1000000000000000 = 1.000 Q
* Added tooltips to Buildings
* Modified the function for displaying "Game started" to show days, hours, minutes, seconds
* Modified the function for Building tooltips to offset upwards when half way down the list so the tooltip does not go off the screen

### 1.036.02 _(2013-09-16)_

* ​Updated the calculations for the Achievements "Mathematician" and "Base 10" to factor-in the Antimatter Condenser

### 1.036.01 _(2013-09-16)_

* Added a store indicator to let you know the number of each Upgrade value available
* Removed decimals from all timers and countdowns
* Removed the "Sell Out" button from the Menu page (as selling buildings no longer provides additional cookies to the all-time baked cookies amount, so this feature became meaningless)
* Removed all of the "Sell Out" information from the Stats page
* Fixed an issue that caused certain Buff Bar timers to get stuck when the game was reset
**_~I'm trying as hard as I can to keep up with you guys, I promise!_**

### 1.036.00 _(2013-09-15)_

* Updated the calculations for [[Heavenly Chips]] that were changed in v.1.036
* Added calculations for the Upgrades that were added in v.1.036
* Fixed an error that was causing certain items to not calculate "Elder Covenant"
* Fixed an error that was causing **"Lucky!" Reward (MAX) (Frenzy)** to display the same value as **"Lucky!" Reward (CUR)**
* Fixed an error that was causing Time To Next Chip to display incorrectly _~(I hope)_
* Changed the names of some buildings displayed on the bottom bar to save a little bit of space

## 1.035 Versions

### 1.035.04 _(2013-09-11)_

* Added the **Next Cookie Bar** which shows how much time you have until a new Cookie spawns
* Added a new setting to the "**Cookie Monster Settings**" section on the Menu page
	* **Next Cookie Bar** - _"Displays a countdown bar for when the next Cookie will appear"_
* Added more information to the "**Cookie Monster Goodies**" section to the Stats page
	* **"Lucky!" Cookies Required (Frenzy)** - The number of unspent cookies you need to get the maximum benefit from "Lucky!" while Frenzy is active
	* **"Lucky!" Reward (MAX) (Frenzy)** - The maximum reward you can get from "Lucky!" while Frenzy is active
	* **Heavenly Chips (MAX) (Sell Out)** - The total number of Heavenly Chips you would have if you "Sell Out" and then reset your game
	* **Cookies To Next Chip (Sell Out)** - The number of cookies you need to earn your next Heavenly Chip after you "Sell Out"
	* **Sell Out Value** - The number of cookies that would be added to your Cookies Baked total if you chose to "Sell Out"

### 1.035.03 _(2013-09-11)_

* Changed the refresh rate to 4 times per second, down from 30
* Changed how the "Time To Next Chip" text display is formatted

### 1.035.02 _(2013-09-11)_

* Added a "Seconds Left" row on the bottom bar that shows how many seconds it will take before you can afford to purchase it (without clicking or selling buildings)
* Added "Seconds Left" to Upgrade tooltips that shows how many seconds it will take before you can afford to purchase it (without clicking or selling buildings)
* Added "**Cookie Monster Goodies**" section to the Stats page
	* **"Lucky!" Cookies Required** - The number of unspent cookies you need to get the maximum benefit from "Lucky!"
	* **"Lucky!" Reward (MAX)** - The maximum reward you can get from "Lucky!"
	* **"Lucky!" Reward (CUR)** - The current reward you would get from "Lucky!"
	* **Heavenly Chips (MAX)** - The total number of Heavenly Chips you would have if you reset your game
	* **Heavenly Chips (CUR)** - The number of Heavenly Chips you have right now
	* **Cookies To Next Chip** - The number of cookies you need to earn your next Heavenly Chip
	* **Time To Next Chip** - The amount of time it will take to earn your next Heavenly Chip (without clicking or selling buildings)
* Added "**Cookie Monster Settings**" section to the Menu page. These setting are saved locally and will not carry-over when you load the game in a different browser or on another computer
	* **Flash Screen** - _"Flashes the screen when a Golden Cookie or Red Cookie appears"_
	* **Cookie Timer** - _"Displays a timer on Golden Cookies and Red Cookies"_
	* **Buff Bars** - _"Displays a countdown bar for each effect currently active"_
	* **Sell Out** - _"Sells and buys buildings until you are out of cookies (use this before resetting your game to maximize your heavenly chips)"_
* Added 2 new colors to Upgrade tooltips (yea, I know, sorry)
	* **Light Blue =** This item has a better Cost Per Income than any building
	* **Fuchsia =** This item has a worse Cost Per Income than any building
* Modified Upgrade tooltips to allow for live-updating and to fit a bit more information on them

### 1.035.01 _(2013-09-09)_

* Fixed an issue that was causing cookie production multipliers to not be calculated properly while a frenzy was active
* Source code is no longer obfuscated, but is now compressed to save space

### 1.035.00 _(2013-09-08)_

* Added the indicator "(G)" that appears in the Title when a Golden Cookie or Red Cookie appears
* Added a timer to Golden Cookies and Red Cookies when they appear
* Added "Buff Timer Bars" for effects from Golden Cookies and Red Cookies
* Added the calculations for [[Heavenly Chips]] that were added in v.1.035
* Fixed tooltips and calculations for all cookie production modifiers that were changed in v.1.035
* The Donate button and Advertisements are no longer hidden

## 1.034 Versions

### 1.034.02 _(2013-09-06)_

* Fixed an issue that was causing the "Bingo center/Research facility" Upgrade to not be calculated.

### 1.034.01 _(2013-09-06)_

* Added a number of "Overlooked Calculations"

### 1.034.00 _(2013-09-05)_

* Made Cookie Monster public