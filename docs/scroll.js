let sel_cur = 'None';
let bgm = new Audio('');
let click = new Audio('scroll/BtMouseClick.mp3');

let enchant_s_mp3 = new Audio('scroll/EnchantSuccess.mp3');
let enchant_f_mp3 = new Audio('scroll/EnchantFailure.mp3');
let ani_dir_s = 'scroll/ani/succ/';
let ani_dir_f = 'scroll/ani/fail/';
let imgsrc_s = [];
let imgsrc_f = [];

for (let i = 0; i <= 20; i++) {
	imgsrc_s.push(ani_dir_s + 'img' + i.toString() + '.png');
};

for (let i = 0; i <= 15; i++) {
	imgsrc_f.push(ani_dir_f + 'img' + i.toString() + '.png');
};


let lastclick = 0;
let delay = 750;
let item_sel = 'None';
let stat_str = 0;
let stat_dex = 0;
let stat_int = 0;
let stat_luk = 0;
let watk = 0;
let matk = 0;
let slots = 0;
let upgrades = 0;
let bestitem = [[0,0,0,0,0,0,7,0],[0,0,0,0,58,0,7,0],[0,0,0,0,0,58,7,0],[1,0,0,0,65,0,7,0],[0,0,0,0,23,0,7,0]];
let mesos = 0;
let buffer = [0,0,0,0,13,33,53,73];


function qplay(audio) {
	audio.currentTime = 0;
	audio.play();
}


function lplay() {
	qplay(click);
	let sel_new = document.getElementById('bgmlist').options[document.getElementById('bgmlist').selectedIndex].text;

	if (sel_cur !== sel_new) {
		bgm.pause();
		sel_cur = sel_new;

		if (sel_cur === '- Select BGM -') {
			bgm = new Audio('');
		}
		else if (sel_cur === 'Lith Harbor') {
			bgm = new Audio('scroll/AboveTheTreetops.mp3');
		}
		else if (sel_cur === 'Henesys') {
			bgm = new Audio('scroll/FloralLife.mp3');
		}
		else if (sel_cur === 'Ellinia') {
			bgm = new Audio('scroll/MissingYou.mp3');
		}
		else if (sel_cur === 'Perion') {
			bgm = new Audio('scroll/Nightmare.mp3');
		}
		else if (sel_cur === 'Kerning City') {
			bgm = new Audio('scroll/BadGuys.mp3');
		}
		else if (sel_cur === 'Sleepywood') {
			bgm = new Audio('scroll/SleepyWood.mp3');
		}
		else if (sel_cur === 'Orbis PQ') {
			bgm = new Audio('scroll/TowerOfGoddess.mp3');
		}
		else if (sel_cur === 'Aquarium') {
			bgm = new Audio('scroll/Aquarium.mp3');
		}
		else if (sel_cur === 'Ludibrium Ship') {
			bgm = new Audio('scroll/FlyingInABlueDream.mp3');
		}
		else if (sel_cur === 'Mushroom Shrine') {
			bgm = new Audio('scroll/Feeling.mp3');
		}
		else if (sel_cur === 'Cemetery') {
			bgm = new Audio('scroll/BizarreForest.mp3');
		}
		else if (sel_cur === 'Showa Town') {
			bgm = new Audio('scroll/Yume.mp3');
		}
		else if (sel_cur === 'Ninja Castle') {
			bgm = new Audio('scroll/CastleOutSide.mp3');
		}
		else if (sel_cur === 'CBD') {
			bgm = new Audio('scroll/CBD_field.mp3');
		}
		else if (sel_cur === 'MP3') {
			bgm = new Audio('scroll/BoatQuay_field.mp3');
		}
		else if (sel_cur === 'Newtro Kingdom') {
			bgm = new Audio('scroll/Newtro_Kingdom.mp3');
		}
		bgm.play();
		bgm.loop = true;
	}
}


function play() {
	qplay(click);
	if (bgm.paused) {
		bgm.play();
		bgm.loop = true;
	}
	else {
		bgm.pause();
	}
}


function enchant_s() {
	qplay(click);
	qplay(enchant_s_mp3);
	let i = 0;
	let img = document.getElementById('enchant');

	function animate() {
		img.src = imgsrc_s[i];
		i++;
		if (i === imgsrc_s.length) {
			clearInterval(animation);
			img.src = '';
		}
	}
	let animation = setInterval(animate, 50);
}


function enchant_f() {
	qplay(click);
	qplay(enchant_f_mp3);
	let i = 0;
	let img = document.getElementById('enchant');

	function animate() {
		img.src = imgsrc_f[i];
		i++;
		if (i === imgsrc_f.length) {
			clearInterval(animation);
			img.src = '';
		}
	}
	let animation = setInterval(animate, 50);
}


function itemupdate(l_str, l_dex, l_int, l_luk, l_watk, l_matk, l_slots, l_upgrades) {
	let itemupdater = [];

	if (l_upgrades > 0) {
		itemupdater.push('(+' + l_upgrades.toString() + ')');
	}
	else {
		itemupdater.push('');
	}

	if (l_str > 0) {
		itemupdater.push('STR : +' + l_str.toString());
	}
	if (l_dex > 0) {
		itemupdater.push('DEX : +' + l_dex.toString());
	}
	if (l_int > 0) {
		itemupdater.push('INT : +' + l_int.toString());
	}
	if (l_luk > 0) {
		itemupdater.push('LUK : +' + l_luk.toString());
	}
	if (l_watk > 0) {
		itemupdater.push('WEAPON ATTACK : ' + l_watk.toString());
	}
	if (l_matk > 0) {
		itemupdater.push('MAGIC ATTACK : ' + l_matk.toString());
	}

	itemupdater.push('UPGRADES AVAILABLE : ' + l_slots.toString());

	if (l_upgrades === 0) {
		document.getElementById('stat1').style = 'font-weight:bold;font-size:13';
		document.getElementById('stat2').style = 'font-weight:bold;font-size:13';
	}
	else if (l_upgrades === 1) {
		document.getElementById('stat1').style = 'font-weight:bold;font-size:13;color:0388fc';
		document.getElementById('stat2').style = 'font-weight:bold;font-size:13;color:0388fc';
	}
	else if (l_upgrades === 2) {
		document.getElementById('stat1').style = 'font-weight:bold;font-size:13;color:0388fc';
		document.getElementById('stat2').style = 'font-weight:bold;font-size:13;color:0388fc';
	}
	else if (l_upgrades === 3) {
		document.getElementById('stat1').style = 'font-weight:bold;font-size:13;color:ba03fc';
		document.getElementById('stat2').style = 'font-weight:bold;font-size:13;color:ba03fc';
	}
	else if (l_upgrades === 4) {
		document.getElementById('stat1').style = 'font-weight:bold;font-size:13;color:ba03fc';
		document.getElementById('stat2').style = 'font-weight:bold;font-size:13;color:ba03fc';
	}
	else if (l_upgrades === 5) {
		document.getElementById('stat1').style = 'font-weight:bold;font-size:13;color:d99502';
		document.getElementById('stat2').style = 'font-weight:bold;font-size:13;color:d99502';
	}
	else if (l_upgrades === 6) {
		document.getElementById('stat1').style = 'font-weight:bold;font-size:13;color:5bc900';
		document.getElementById('stat2').style = 'font-weight:bold;font-size:13;color:5bc900';
	}
	else if (l_upgrades === 7) {
		document.getElementById('stat1').style = 'font-weight:bold;font-size:13;color:fc0356';
		document.getElementById('stat2').style = 'font-weight:bold;font-size:13;color:fc0356';
	}

	for (let i = 0; i < 8; i++) {
		if (i < itemupdater.length) {
			document.getElementById('stat' + (i+2).toString()).textContent = itemupdater[i];
		}
		else {
			document.getElementById('stat' + (i+2).toString()).textContent = '';
		}
	}

	document.getElementById('eqbox0').style = 'display:block;height:' + (75 + buffer[itemupdater.length]).toString();
	document.getElementById('eqbox1').style = 'display:block;height:' + (75 + buffer[itemupdater.length]).toString();
	document.getElementById('eqbox2').style = 'display:block;height:' + (79 + buffer[itemupdater.length]).toString();
	document.getElementById('eqbox3').style = 'display:block';
}


function itemselect() {
	qplay(click);
	document.getElementById('notice2').textContent = '';
	item_sel = document.getElementById('itemlist').options[document.getElementById('itemlist').selectedIndex].text;

	if (item_sel === '- Select Item -') {
		document.getElementById('eq').src = '';
		for (let i = 0; i < 9; i++) {
			document.getElementById('stat' + (i+1).toString()).textContent = '';
		}
		document.getElementById('eqbox0').style = 'display:none';
		document.getElementById('eqbox1').style = 'display:none';
		document.getElementById('eqbox2').style = 'display:none';
		document.getElementById('eqbox3').style = 'display:none';
	}
	else if (item_sel === 'Brown Work Gloves') {
		stat_str = 0;
		stat_dex = 0;
		stat_int = 0;
		stat_luk = 0;
		watk = 0;
		matk = 0;
		slots = 7;
		upgrades = 0;
		document.getElementById('eq').src = 'scroll/static/bwg.png';
		document.getElementById('stat1').textContent = 'Brown Work Gloves';
		itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
	}
	else if (item_sel === 'Maple Soul Searcher') {
		stat_str = 0;
		stat_dex = 0;
		stat_int = 0;
		stat_luk = 0;
		watk = 58;
		matk = 0;
		slots = 7;
		upgrades = 0;
		document.getElementById('eq').src = 'scroll/static/soulsearcher.png';
		document.getElementById('stat1').textContent = 'Maple Soul Searcher';
		itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
	}
	else if (item_sel === 'Maple Lama Staff') {
		stat_str = 0;
		stat_dex = 0;
		stat_int = 0;
		stat_luk = 0;
		watk = 0;
		matk = 58;
		slots = 7;
		upgrades = 0;
		document.getElementById('eq').src = 'scroll/static/lamastaff.png';
		document.getElementById('stat1').textContent = 'Maple Lama Staff';
		itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
	}
	else if (item_sel === 'Maple Impaler') {
		stat_str = 1;
		stat_dex = 0;
		stat_int = 0;
		stat_luk = 0;
		watk = 65;
		matk = 0;
		slots = 7;
		upgrades = 0;
		document.getElementById('eq').src = 'scroll/static/impaler.png';
		document.getElementById('stat1').textContent = 'Maple Impaler';
		itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
	}
	else if (item_sel === 'Maple Kandayo') {
		stat_str = 0;
		stat_dex = 0;
		stat_int = 0;
		stat_luk = 0;
		watk = 23;
		matk = 0;
		slots = 7;
		upgrades = 0;
		document.getElementById('eq').src = 'scroll/static/kandayo.png';
		document.getElementById('stat1').textContent = 'Maple Kandayo';
		itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
	}
}


function itembest() {
	qplay(click);
	document.getElementById('notice2').textContent = '';
	item_sel = document.getElementById('itemlist').options[document.getElementById('itemlist').selectedIndex].text;
	let temp;

	if (item_sel === '- Select Item -') {
		document.getElementById('eq').src = '';
		for (let i = 0; i < 9; i++) {
			document.getElementById('stat' + (i+1).toString()).textContent = '';
		}
		document.getElementById('eqbox0').style = 'display:none';
		document.getElementById('eqbox1').style = 'display:none';
		document.getElementById('eqbox2').style = 'display:none';
		document.getElementById('eqbox3').style = 'display:none';
	}
	else if (item_sel === 'Brown Work Gloves') {
		temp = bestitem[0];
		itemupdate(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],temp[6],temp[7]);
		slots = temp[6];
	}
	else if (item_sel === 'Maple Soul Searcher') {
		temp = bestitem[1];
		itemupdate(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],temp[6],temp[7]);
		slots = temp[6];
	}
	else if (item_sel === 'Maple Lama Staff') {
		temp = bestitem[2];
		itemupdate(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],temp[6],temp[7]);
		slots = temp[6];
	}
	else if (item_sel === 'Maple Impaler') {
		temp = bestitem[3];
		itemupdate(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],temp[6],temp[7]);
		slots = temp[6];
	}
	else if (item_sel === 'Maple Kandayo') {
		temp = bestitem[4];
		itemupdate(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],temp[6],temp[7]);
		slots = temp[6];
	}
}


function rng(x) {
	if (lastclick >= (Date.now() - delay)) {
		return;
	}
	lastclick = Date.now();

	let chance = Number(x);
	let roll = Number(Math.floor((Math.random() * 100) + 1));
	let roll2 = Number(Math.floor((Math.random() * 100) + 1));

	if (item_sel === '- Select Item -' || item_sel === 'None') {
		return;
	}

	document.getElementById('notice2').textContent = '';

	if (item_sel === 'Brown Work Gloves') {
		if (slots === 0) {
			return;
		}
		if (roll <= chance) {
			enchant_s();
			if (chance === 10 || chance === 30) {
				watk += 3;
				slots -= 1;
				upgrades += 1;
				itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			}
			else if (chance === 60 || chance === 70) {
				watk += 2;
				slots -= 1;
				upgrades += 1;
				itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			}
		}
		else {
			enchant_f();
			if (roll2 <= 50 && (chance === 30 || chance === 70)) {
				itemselect();
				document.getElementById('notice2').textContent = 'Item destroyed!';
			}
			else {
				slots -= 1;
				itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			}
		}

		if (slots === 0 && watk > bestitem[0][4]) {
			bestitem[0] = [stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades];
		}
	}
	else if (item_sel === 'Maple Soul Searcher') {
		if (slots === 0) {
			return;
		}
		if (roll <= chance) {
			enchant_s();
			if (chance === 10 || chance === 30) {
				stat_dex += 1;
				watk += 5;
				slots -= 1;
				upgrades += 1;
				itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			}
			else if (chance === 60 || chance === 70) {
				watk += 2;
				slots -= 1;
				upgrades += 1;
				itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			}
		}
		else {
			enchant_f();
			if (roll2 <= 50 && (chance === 30 || chance === 70)) {
				itemselect();
				document.getElementById('notice2').textContent = 'Item destroyed!';
			}
			else {
				slots -= 1;
				itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			}
		}

		if (slots === 0 && watk > bestitem[1][4]) {
			bestitem[1] = [stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades];
		}
	}
	else if (item_sel === 'Maple Lama Staff') {
		if (slots === 0) {
			return;
		}
		if (roll <= chance) {
			enchant_s();
			if (chance === 10 || chance === 30) {
				stat_int += 3;
				matk += 5;
				slots -= 1;
				upgrades += 1;
				itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			}
			else if (chance === 60 || chance === 70) {
				stat_int += 1;
				matk += 2;
				slots -= 1;
				upgrades += 1;
				itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			}
		}
		else {
			enchant_f();
			if (roll2 <= 50 && (chance === 30 || chance === 70)) {
				itemselect();
				document.getElementById('notice2').textContent = 'Item destroyed!';
			}
			else {
				slots -= 1;
				itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			}
		}

		if (slots === 0 && matk > bestitem[2][5]) {
			bestitem[2] = [stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades];
		}
	}
	else if (item_sel === 'Maple Impaler') {
		if (slots === 0) {
			return;
		}
		if (roll <= chance) {
			enchant_s();
			if (chance === 10 || chance === 30) {
				stat_str += 3;
				watk += 5;
				slots -= 1;
				upgrades += 1;
				itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			}
			else if (chance === 60 || chance === 70) {
				stat_str += 1;
				watk += 2;
				slots -= 1;
				upgrades += 1;
				itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			}
		}
		else {
			enchant_f();
			if (roll2 <= 50 && (chance === 30 || chance === 70)) {
				itemselect();
				document.getElementById('notice2').textContent = 'Item destroyed!';
			}
			else {
				slots -= 1;
				itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			}
		}

		if (slots === 0 && watk > bestitem[3][4]) {
			bestitem[3] = [stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades];
		}
	}
	else if (item_sel === 'Maple Kandayo') {
		if (slots === 0) {
			return;
		}
		if (roll <= chance) {
			enchant_s();
			if (chance === 10 || chance === 30) {
				stat_luk += 1;
				watk += 5;
				slots -= 1;
				upgrades += 1;
				itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			}
			else if (chance === 60 || chance === 70) {
				watk += 2;
				slots -= 1;
				upgrades += 1;
				itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			}
		}
		else {
			enchant_f();
			if (roll2 <= 50 && (chance === 30 || chance === 70)) {
				itemselect();
				document.getElementById('notice2').textContent = 'Item destroyed!';
			}
			else {
				slots -= 1;
				itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			}
		}

		if (slots === 0 && watk > bestitem[4][4]) {
			bestitem[4] = [stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades];
		}
	}
}
