var CookieMonster = {
	// Runtime variables
	version               : "v.1.038.01",
	emphasize             : true,
	tooltips              : [],
	buildingTooltips      : [],
	holdItem              : [],
	holdIs                : [],
	holdCPI               : [],
	holdTC                : [],
	goldenCookieAvailable : "",
	settings              : [],
	inStore               : new Array(0, 0, 0, 0, 0, 0),
	sellOut               : 0,
	upgradeCount          : 33,
	stsType               : new Array(
		[" M", " B", " T", " Qa", " Qi", " Sx", " Sp", " Oc", " No", " Dc"],
		[" M", " G", " T", " P", " E", " Z", " Y", " Oc", " No", " Dc"]),
	loops                 : 0,

	// Selectors
	$monsterBar           : $("#cookie_monster_bar"),
	$goldenCookie         : $("#goldenCookie"),
};