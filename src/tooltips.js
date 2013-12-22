function Save_Tooltips() {
	Game.UpgradesById.forEach(function (e, t) {
		tooltips[t] = e.desc
	});
	Game.ObjectsById.forEach(function (e, t) {
		building_tooltips[t] = e.desc
	})
}

function Set_Up_Tooltips() {
	var e = false;
	Game.UpgradesById.forEach(function (t, n) {
		for (var r = 0; r < upgrade_count; r++) {
			if (_cup(r, n, true)) {
				t.desc = Manage_Tooltip(r, n, true, false);
				e = true;
				break
			}
		}
		if (t.bought && t.desc != tooltips[n]) {
			t.desc = tooltips[n];
			e = true
		}
	});
	if (e) {
		Game.RebuildUpgrades()
	}
}

function Update_Tooltips(e) {
	if (e == "all" || e == "up") {
		in_store = new Array(0, 0, 0, 0, 0, 0);
		Game.UpgradesById.forEach(function (e, t) {
			for (var n = 0; n < upgrade_count; n++) {
				if (_cup(n, t, false)) {
					Manage_Tooltip(n, t, false, false);
					break
				}
			}
		})
	}
	if (e == "all" || e == "ob") {
		Game.ObjectsById.forEach(function (e, t) {
			Manage_Building_Tooltip(e)
		})
	}
}