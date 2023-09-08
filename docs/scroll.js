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
const delay_select = 250;
const delay_scroll = 750;
const buffer = [0,0,0,0,13,30,47,64];

let item_sel = 'None';
let stat_str = 0;
let stat_dex = 0;
let stat_int = 0;
let stat_luk = 0;
let watk = 0;
let matk = 0;
let slots = 0;
let upgrades = 0;

let itemnames = [
 'Zakum Helmet'
,'Blue Sauna Robe'
,'Red Sauna Robe'
,'Brown Work Gloves'
,'Pumpkin Spear'
,'Sake Bottle'
,'Maple Impaler'
,'Japanese Map'
,'Maple Soul Searcher'
,'Maple Lama Staff'
,'Hinomaru Fan'
,'Maple Kandayo'
,'Shinobi Bracer'
,'Korean Fan'
,'Maple Wagner'
,'Diamond Dagger'
];

let items = [
 ['Zakum Helmet', 'scroll/static/zakumhelmet.png', [15,15,15,15,0,0,10,0], [15,15,15,15,0,0,10,0], [3,3,3,3,0,0], [2,2,2,2,0,0], 0, -1, '']
,['Blue Sauna Robe', 'scroll/static/bluesaunarobe.png', [0,0,0,0,0,0,10,0], [0,0,0,0,0,0,10,0], [5,5,5,5,0,0], [2,2,2,2,0,0], 0, -1, 'M']
,['Red Sauna Robe', 'scroll/static/redsaunarobe.png', [0,0,0,0,0,0,10,0], [0,0,0,0,0,0,10,0], [5,5,5,5,0,0], [2,2,2,2,0,0], 0, -1, 'F']
,['Brown Work Gloves', 'scroll/static/bwg.png', [0,0,0,0,0,0,7,0], [0,0,0,0,0,0,7,0], [0,0,0,0,3,0], [0,0,0,0,2,0], 4, 0, '']
,['Pumpkin Spear', 'scroll/static/pumpkinspear.png', [1,0,0,0,47,0,7,0], [1,0,0,0,47,0,7,0], [3,0,0,0,5,0], [1,0,0,0,2,0], 4, 0, '']
,['Sake Bottle', 'scroll/static/sakebottle.png', [0,0,0,0,100,0,7,0], [0,0,0,0,100,0,7,0], [3,0,0,0,5,0], [1,0,0,0,2,0], 4, 0, '']
,['Maple Impaler', 'scroll/static/impaler.png', [1,0,0,0,65,0,7,0], [1,0,0,0,65,0,7,0], [3,0,0,0,5,0], [1,0,0,0,2,0], 4, 0, '']
,['Japanese Map', 'scroll/static/japanesemap.png', [2,2,0,0,68,0,7,0], [2,2,0,0,68,0,7,0], [3,0,0,0,5,0], [1,0,0,0,2,0], 4, 0, '']
,['Maple Soul Searcher', 'scroll/static/soulsearcher.png', [0,0,0,0,58,0,7,0], [0,0,0,0,58,0,7,0], [0,1,0,0,5,0], [0,0,0,0,2,0], 4, 0, '']
,['Maple Lama Staff', 'scroll/static/lamastaff.png', [0,0,0,0,39,58,7,0], [0,0,0,0,39,58,7,0], [0,0,3,0,0,5], [0,0,1,0,0,2], 5, 0, '']
,['Hinomaru Fan', 'scroll/static/hinomarufan.png', [0,0,0,0,50,75,7,0], [0,0,0,0,50,75,7,0], [0,0,3,0,0,5], [0,0,1,0,0,2], 5, 0, '']
,['Maple Kandayo', 'scroll/static/kandayo.png', [0,0,0,0,23,0,7,0], [0,0,0,0,23,0,7,0], [0,0,0,1,5,0], [0,0,0,0,2,0], 4, 0, '']
,['Shinobi Bracer', 'scroll/static/shinobibracer.png', [0,0,0,5,28,0,7,0], [0,0,0,5,28,0,7,0], [0,0,0,1,5,0], [0,0,0,0,2,0], 4, 0, '']
,['Korean Fan', 'scroll/static/koreanfan.png', [0,0,0,0,50,0,7,0], [0,0,0,0,50,0,7,0], [0,0,0,1,5,0], [0,0,0,0,2,0], 4, 0, '']
,['Maple Wagner', 'scroll/static/wagner.png', [0,0,0,0,58,0,7,0], [0,0,0,0,58,0,7,0], [0,0,0,1,5,0], [0,0,0,0,2,0], 4, 0, '']
,['Diamond Dagger', 'scroll/static/diamonddagger.png', [0,3,0,0,62,0,7,0], [0,3,0,0,62,0,7,0], [0,0,0,1,5,0], [0,0,0,0,2,0], 4, 0, '']
];

//,['', 'scroll/static/', [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0], 0, -1, '']


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
		else if (sel_cur === 'L Forest') {
			bgm = new Audio('scroll/BlueSky.mp3');
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
		itemupdater.push('(+' + l_upgrades.toString() + items[itemnames.indexOf(item_sel)][8] + ')');
	}
	else {
		if (['M','F'].includes(items[itemnames.indexOf(item_sel)][8])) {
			itemupdater.push('(' + items[itemnames.indexOf(item_sel)][8] + ')');
		}
		else {
			itemupdater.push('');
		}
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
	else if (l_upgrades >= 7) {
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

	document.getElementById('itembox').style = 'height:' + (93 + buffer[itemupdater.length]).toString();
	document.getElementById('itemwin1').style = 'display:block;height:' + (75 + buffer[itemupdater.length]).toString();
	document.getElementById('itemwin2').style = 'display:block;height:' + (71 + buffer[itemupdater.length]).toString();
	document.getElementById('itemwin3').style = 'display:block';
}


function itemselect() {
	qplay(click);
	document.getElementById('notice').textContent = '';
	item_sel = document.getElementById('itemlist').options[document.getElementById('itemlist').selectedIndex].text;

	if (item_sel === '- Select Item -') {
		document.getElementById('eq').src = '';
		for (let i = 0; i < 9; i++) {
			document.getElementById('stat' + (i+1).toString()).textContent = '';
		}
		document.getElementById('itembox').style = 'height:20';
		document.getElementById('itemwin1').style = 'display:none';
		document.getElementById('itemwin2').style = 'display:none';
		document.getElementById('itemwin3').style = 'display:none';
		return;
	}

	let temp = items[itemnames.indexOf(item_sel)];

	let roll_0 = Number(Math.floor((Math.random() * (6 - 1) + 1))) - 3;
	let roll_1 = Number(Math.floor((Math.random() * (6 - 1) + 1))) - 3;
	let roll_2 = Number(Math.floor((Math.random() * (6 - 1) + 1))) - 3;
	let roll_3 = Number(Math.floor((Math.random() * (6 - 1) + 1))) - 3;
	let roll_4 = Number(Math.floor((Math.random() * (6 - 1) + 1))) - 3;
	let roll_5 = Number(Math.floor((Math.random() * (6 - 1) + 1))) - 3;
	let roll_lucky = Number(Math.floor((Math.random() * 100) + 1));

	if (roll_lucky <= 10) {
		roll_0 += 1;
		roll_1 += 1;
		roll_2 += 1;
		roll_3 += 1;
		roll_4 += 1;
		roll_5 += 1;
	}

	let temp_str = temp[2][0];
	let temp_dex = temp[2][1];
	let temp_int = temp[2][2];
	let temp_luk = temp[2][3];
	let temp_watk = temp[2][4];
	let temp_matk = temp[2][5];

	if (temp_str >= 2) {
		temp_str += roll_0;
	}
	if (temp_dex >= 2) {
		temp_dex += roll_1;
	}
	if (temp_int >= 2) {
		temp_int += roll_2;
	}
	if (temp_luk >= 2) {
		temp_luk += roll_3;
	}
	if (temp_watk >= 2) {
		temp_watk += roll_4;
	}
	if (temp_matk >= 2) {
		temp_matk += roll_5;
	}

	document.getElementById('stat1').textContent = temp[0];
	document.getElementById('eq').src = temp[1];
	stat_str = temp_str;
	stat_dex = temp_dex;
	stat_int = temp_int;
	stat_luk = temp_luk;
	watk = temp_watk;
	matk = temp_matk;
	slots = temp[2][6];
	upgrades = temp[2][7];
	itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
}


function itemselect_c() {
	if (lastclick >= (Date.now() - delay_select)) {
		return;
	}
	lastclick = Date.now();
	itemselect();
}


function itembest() {
	qplay(click);
	document.getElementById('notice').textContent = '';
	item_sel = document.getElementById('itemlist').options[document.getElementById('itemlist').selectedIndex].text;

	if (item_sel === '- Select Item -') {
		document.getElementById('eq').src = '';
		for (let i = 0; i < 9; i++) {
			document.getElementById('stat' + (i+1).toString()).textContent = '';
		}
		document.getElementById('itembox').style = 'height:20';
		document.getElementById('itemwin1').style = 'display:none';
		document.getElementById('itemwin2').style = 'display:none';
		document.getElementById('itemwin3').style = 'display:none';
		return;
	}

	let temp = items[itemnames.indexOf(item_sel)][3];
	itemupdate(temp[0],temp[1],temp[2],temp[3],temp[4],temp[5],temp[6],temp[7]);
	stat_str = temp[0];
	stat_dex = temp[1];
	stat_int = temp[2];
	stat_luk = temp[3];
	watk = temp[4];
	matk = temp[5];
	slots = temp[6];
	upgrades = temp[7];
}


function rng(x, white) {
	if (item_sel === '- Select Item -' || item_sel === 'None') {
		return;
	}
	if (lastclick >= (Date.now() - delay_scroll)) {
		return;
	}
	lastclick = Date.now();

	let chance = Number(x);
	let roll = Number(Math.floor((Math.random() * 100) + 1));
	let roll2 = Number(Math.floor((Math.random() * 100) + 1));
	document.getElementById('notice').textContent = '';

	let temp = items[itemnames.indexOf(item_sel)];

	if (white === 1) {
		if (slots < (temp[2][6] - upgrades)) {
			if (roll <= chance) {
				enchant_s();
				slots += 1;
				itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			}
			else {
				enchant_f();
			}
		}
		return;
	}
	else if (slots === 0) {
		return;
	}

	if (roll <= chance) {
		enchant_s();
		if (chance === 10 || chance === 30) {
			stat_str += temp[4][0];
			stat_dex += temp[4][1];
			stat_int += temp[4][2];
			stat_luk += temp[4][3];
			watk += temp[4][4];
			matk += temp[4][5];
			slots -= 1;
			upgrades += 1;
			itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
		}
		else if (chance === 60 || chance === 70) {
			stat_str += temp[5][0];
			stat_dex += temp[5][1];
			stat_int += temp[5][2];
			stat_luk += temp[5][3];
			watk += temp[5][4];
			matk += temp[5][5];
			slots -= 1;
			upgrades += 1;
			itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
		}
	}
	else {
		enchant_f();
		if (roll2 <= 50 && (chance === 30 || chance === 70)) {
			itemselect();
			document.getElementById('notice').textContent = 'Item destroyed!';
		}
		else {
			slots -= 1;
			itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
		}
	}

	let beststat = temp[6];
	let temp2 = [stat_str, stat_dex, stat_int, stat_luk, watk, matk];

	if (slots === 0 && ((temp[7] === -1 && (Math.max(stat_str, stat_dex, stat_int, stat_luk) > Math.max(temp[3][0],temp[3][1],temp[3][2],temp[3][3]))) || (temp2[beststat] > temp[3][beststat]))) {
		items[itemnames.indexOf(item_sel)][3] = [stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades];
	}
}
