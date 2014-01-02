// Hook CookieObject into the game's own objects
//////////////////////////////////////////////////////////////////////

Game.Achievement.prototype.getDescribedInteger = CookieObject.getDescribedInteger;
Game.Achievement.prototype.matches             = CookieObject.matches;

Game.Object.prototype.getBaseCostPerIncome  = CookieObject.getBaseCostPerIncome;
Game.Object.prototype.getColors             = CookieObject.getColors;
Game.Object.prototype.getComparativeInfos   = CookieObject.getComparativeInfos;
Game.Object.prototype.getPrice              = CookieObject.getPriceOf;
Game.Object.prototype.getReturnInvestment   = CookieObject.getReturnInvestment;
Game.Object.prototype.getTimeLeft           = CookieObject.getTimeLeft;
Game.Object.prototype.getType               = CookieObject.getTypeOf;
Game.Object.prototype.getWorth              = CookieObject.getWorthOf;
Game.Object.prototype.identifier            = CookieObject.identifier;
Game.Object.prototype.matches               = CookieObject.matches;

Game.Upgrade.prototype.getBaseCostPerIncome = CookieObject.getBaseCostPerIncome;
Game.Upgrade.prototype.getColors            = CookieObject.getColors;
Game.Upgrade.prototype.getComparativeInfos  = CookieObject.getComparativeInfos;
Game.Upgrade.prototype.getDescribedInteger  = CookieObject.getDescribedInteger;
Game.Upgrade.prototype.getPrice             = CookieObject.getPriceOf;
Game.Upgrade.prototype.getReturnInvestment  = CookieObject.getReturnInvestment;
Game.Upgrade.prototype.getTimeLeft          = CookieObject.getTimeLeft;
Game.Upgrade.prototype.getType              = CookieObject.getTypeOf;
Game.Upgrade.prototype.getWorth             = CookieObject.getWorthOf;
Game.Upgrade.prototype.identifier           = CookieObject.identifier;
Game.Upgrade.prototype.matches              = CookieObject.matches;

// Start Cookie Monster
//////////////////////////////////////////////////////////////////////

CookieMonster.start();