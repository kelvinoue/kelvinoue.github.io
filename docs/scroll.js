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
const upgradecolor = [
 'font-weight:bold;font-size:13;color:adacac'
,'font-weight:bold;font-size:13'
,'font-weight:bold;font-size:13;color:0388fc'
,'font-weight:bold;font-size:13;color:ba03fc'
,'font-weight:bold;font-size:13;color:d99502'
,'font-weight:bold;font-size:13;color:5bc900'
,'font-weight:bold;font-size:13;color:fc0356'
];
const scrollinfo = [-1, 10, 30, 60, 70];
let best_flag = 0;

let item_sel = 'None';
let stat_str = 0;
let stat_dex = 0;
let stat_int = 0;
let stat_luk = 0;
let watk = 0;
let matk = 0;
let slots = 0;
let upgrades = 0;
let mesos = 0;

let itemnames = [
 'Zakum Helmet'
,'Blue Sauna Robe'
,'Red Sauna Robe'
,'Pink Adventurer Cape'
,'Brown Work Gloves'
,'Pumpkin Spear'
,'Sake Bottle'
,'Maple Impaler'
,'Japanese Map'
,'Maple Soul Searcher'
,'Maple Lama Staff'
,'Hinomaru Fan'
,'Pyogo Mushroom'
,'Maple Kandayo'
,'Shinobi Bracer'
,'Korean Fan'
,'Maple Wagner'
,'Diamond Dagger'
,'Fan'
,'Kebob'
];

let items = [
 ['Zakum Helmet', 'scroll/static/zakumhelmet.png', [15,15,15,15,0,0,10,0], [15,15,15,15,0,0,10,0], [3,3,3,3,0,0], [2,2,2,2,0,0], 0, -1, '', [0, 1, 3, 4.5, 3, 0]]
,['Blue Sauna Robe', 'scroll/static/bluesaunarobe.png', [0,0,0,0,0,0,10,0], [0,0,0,0,0,0,10,0], [5,5,5,5,0,0], [2,2,2,2,0,0], 0, -1, 'M', [0, 4, 16, 2.5, 2.5, 0]]
,['Red Sauna Robe', 'scroll/static/redsaunarobe.png', [0,0,0,0,0,0,10,0], [0,0,0,0,0,0,10,0], [5,5,5,5,0,0], [2,2,2,2,0,0], 0, -1, 'F', [0, 4, 16, 2.5, 2.5, 0]]
,['Pink Adventurer Cape', 'scroll/static/pinkadventurer.png', [0,0,0,0,2,0,5,0], [0,0,0,0,2,0,5,0], [3,3,3,3,0,0], [2,2,2,2,0,0], 4, 0, '', [10, 0.1, 1, 1, 3, 10]]
,['Brown Work Gloves', 'scroll/static/bwg.png', [0,0,0,0,0,0,7,0], [0,0,0,0,0,0,7,0], [0,0,0,0,3,0], [0,0,0,0,2,0], 4, 0, '', [250, 0.25, 9, 0.25, 1.5, 250]]
,['Pumpkin Spear', 'scroll/static/pumpkinspear.png', [1,0,0,0,47,0,7,0], [1,0,0,0,47,0,7,0], [3,0,0,0,5,0], [1,0,0,0,2,0], 4, 0, '', [0, 0.1, 6, 0.5, 0.75, 0]]
,['Sake Bottle', 'scroll/static/sakebottle.png', [0,0,0,0,100,0,7,0], [0,0,0,0,100,0,7,0], [3,0,0,0,5,0], [1,0,0,0,2,0], 4, 0, '', [0.1, 0.1, 6, 0.5, 0.75, 0.1]]
,['Maple Impaler', 'scroll/static/impaler.png', [1,0,0,0,65,0,7,0], [1,0,0,0,65,0,7,0], [3,0,0,0,5,0], [1,0,0,0,2,0], 4, 0, '', [0, 0.1, 6, 0.5, 0.75, 0]]
,['Japanese Map', 'scroll/static/japanesemap.png', [2,2,0,0,68,0,7,0], [2,2,0,0,68,0,7,0], [3,0,0,0,5,0], [1,0,0,0,2,0], 4, 0, '', [0.1, 0.1, 6, 0.5, 0.75, 0.1]]
,['Maple Soul Searcher', 'scroll/static/soulsearcher.png', [0,0,0,0,58,0,7,0], [0,0,0,0,58,0,7,0], [0,1,0,0,5,0], [0,0,0,0,2,0], 4, 0, '', [0, 1.25, 7, 0.5, 0.75, 0]]
,['Maple Lama Staff', 'scroll/static/lamastaff.png', [0,0,0,0,39,58,7,0], [0,0,0,0,39,58,7,0], [0,0,3,0,0,5], [0,0,1,0,0,2], 5, 0, '', [0, 0.1, 4.5, 0.75, 0.1, 0]]
,['Hinomaru Fan', 'scroll/static/hinomarufan.png', [0,0,0,0,50,75,7,0], [0,0,0,0,50,75,7,0], [0,0,3,0,0,5], [0,0,1,0,0,2], 5, 0, '', [0.1, 0.1, 4.5, 0.75, 0.1, 0.1]]
,['Pyogo Mushroom', 'scroll/static/pyogomushroom.png', [0,0,4,0,66,108,7,0], [0,0,4,0,66,108,7,0], [0,0,3,0,0,5], [0,0,1,0,0,2], 5, 0, '', [0.1, 0.1, 4.5, 0.75, 0.1, 0.1]]
,['Maple Kandayo', 'scroll/static/kandayo.png', [0,0,0,0,23,0,7,0], [0,0,0,0,23,0,7,0], [0,0,0,1,5,0], [0,0,0,0,2,0], 4, 0, '', [0, 0.1, 13.5, 1, 0.75, 0]]
,['Shinobi Bracer', 'scroll/static/shinobibracer.png', [0,0,0,5,28,0,7,0], [0,0,0,5,28,0,7,0], [0,0,0,1,5,0], [0,0,0,0,2,0], 4, 0, '', [0.1, 0.1, 13.5, 1, 0.75, 0.1]]
,['Korean Fan', 'scroll/static/koreanfan.png', [0,0,0,0,50,0,7,0], [0,0,0,0,50,0,7,0], [0,0,0,1,5,0], [0,0,0,0,2,0], 4, 0, '', [0, 0.5, 5.5, 0.1, 0.1, 0]]
,['Maple Wagner', 'scroll/static/wagner.png', [0,0,0,0,58,0,7,0], [0,0,0,0,58,0,7,0], [0,0,0,1,5,0], [0,0,0,0,2,0], 4, 0, '', [0, 0.5, 5.5, 0.1, 0.1, 0]]
,['Diamond Dagger', 'scroll/static/diamonddagger.png', [0,3,0,0,62,0,7,0], [0,3,0,0,62,0,7,0], [0,0,0,1,5,0], [0,0,0,0,2,0], 4, 0, '', [0.1, 0.5, 5.5, 0.1, 0.1, 0.1]]
,['Fan', 'scroll/static/fan.png', [0,0,0,0,78,0,7,0], [0,0,0,0,78,0,7,0], [0,0,0,1,5,0], [0,0,0,0,2,0], 4, 0, '', [0.1, 0.5, 5.5, 0.1, 0.1, 0.1]]
,['Kebob', 'scroll/static/kebob.png', [0,0,0,0,82,90,7,0], [0,0,0,0,82,90,7,0], [0,0,0,1,5,0], [0,0,0,0,2,0], 4, 0, '', [0.1, 0.5, 5.5, 0.1, 0.1, 0.1]]
];

//,['', 'scroll/static/', [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0], [0,0,0,0,0,0], 0, -1, '', [0, 0, 0, 0, 0, 0]]
//[name, dir, defaultstats, beststats, 1030scrollstat, 6070scrollstat, beststatindex, beststatexceptionflag, genderflag, scrollinfo]


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
		else if (sel_cur === 'Ellinia Forest') {
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
	img.style = 'position:absolute;z-index:1;top:-80px;left:-49px;display:block'

	function animate() {
		img.src = imgsrc_s[i];
		i++;
		if (i === imgsrc_s.length) {
			clearInterval(animation);
			img.src = '';
			img.style = 'position:absolute;z-index:1;top:-80px;left:-49px;display:none'
		}
	}
	let animation = setInterval(animate, 50);
}


function enchant_f() {
	qplay(click);
	qplay(enchant_f_mp3);
	let i = 0;
	let img = document.getElementById('enchant');
	img.style = 'position:absolute;z-index:1;top:-80px;left:-49px;display:block'

	function animate() {
		img.src = imgsrc_f[i];
		i++;
		if (i === imgsrc_f.length) {
			clearInterval(animation);
			img.src = '';
			img.style = 'position:absolute;z-index:1;top:-80px;left:-49px;display:none'
		}
	}
	let animation = setInterval(animate, 50);
}


function itemupdate(l_str, l_dex, l_int, l_luk, l_watk, l_matk, l_slots, l_upgrades, l_mesos) {
	let itemupdater = [];

	let bestscroll = items[itemnames.indexOf(item_sel)][4];
	let mainstat = items[itemnames.indexOf(item_sel)][6];
	let maxupgrades = items[itemnames.indexOf(item_sel)][2][6];
	let maxquality = bestscroll[mainstat] * maxupgrades;
	let avgquality = items[itemnames.indexOf(item_sel)][2][mainstat];
	let curitem = [l_str, l_dex, l_int, l_luk, l_watk, l_matk];
	let curquality = curitem[mainstat];
	let quality = 1;
	let quality_ratio = 0;

	if (items[itemnames.indexOf(item_sel)][7] === -1) {
		curquality = Math.max(l_str, l_dex, l_int, l_luk);
	}
	if (item_sel === 'Pink Adventurer Cape') {
		maxquality = 25;
	}
	if ((curquality - avgquality) > 0) {
		quality_ratio = (curquality - avgquality) / maxquality;
	}
	else if ((curquality - avgquality) <= -2) {
		quality_ratio = -1;
	}

	if (quality_ratio >= 0.9) {
		quality = 6;
	}
	else if (quality_ratio >= 0.74) {
		quality = 5;
	}
	else if (quality_ratio >= 0.6) {
		quality = 4;
	}
	else if (quality_ratio >= 0.4) {
		quality = 3;
	}
	else if (curquality - avgquality >= 2) {
		quality = 2;
	}
	else if (quality_ratio === -1 || (l_upgrades > 0 && (curquality - avgquality < 2))) {
		if (item_sel === 'Pink Adventurer Cape' && (l_upgrades > 0 && Math.max(l_str, l_dex, l_int, l_luk) > 0) || (curquality >= avgquality)) {
			quality = 2;
		}
		else {
			quality = 0;
		}
	}

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

	document.getElementById('stat1').style = upgradecolor[quality];
	document.getElementById('stat2').style = upgradecolor[quality];

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
	document.getElementById('mesoamt').textContent = (mesos*1000000).toLocaleString() + ' spent';
}


function itemselect() {
	best_flag = 0;
	qplay(click);
	document.getElementById('notice').textContent = 'Select a scroll to upgrade your item.';
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
		document.getElementById('notice').textContent = 'Select an item and start scrolling!';
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
	mesos = temp[9][0];
	itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades, mesos);
}


function itemselect_c() {
	if (lastclick >= (Date.now() - delay_select)) {
		return;
	}
	lastclick = Date.now();
	itemselect();
}


function itembest() {
	best_flag = 1;
	qplay(click);
	document.getElementById('notice').textContent = 'Showing current best item.';
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
		document.getElementById('notice').textContent = 'Select an item and start scrolling!';
		return;
	}

	let temp = items[itemnames.indexOf(item_sel)][3];
	stat_str = temp[0];
	stat_dex = temp[1];
	stat_int = temp[2];
	stat_luk = temp[3];
	watk = temp[4];
	matk = temp[5];
	slots = temp[6];
	upgrades = temp[7];
	mesos = items[itemnames.indexOf(item_sel)][9][5];
	itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades, mesos);
}


function rng(x, type) {
	if (item_sel === '- Select Item -' || item_sel === 'None') {
		document.getElementById('notice').textContent = 'Please select an item.';
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

	if (type === 1) {
		if (slots < (temp[2][6] - upgrades)) {
			if (roll <= chance) {
				enchant_s();
				slots += 1;
				itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
				document.getElementById('notice').textContent = '1 upgrade slot recovered.';

				if (best_flag === 1) {
					items[itemnames.indexOf(item_sel)][3][6] = slots;
				}
			}
			else {
				enchant_f();
				document.getElementById('notice').textContent = 'Scroll failed.';
			}
			mesos += 100;
			document.getElementById('mesoamt').textContent = (mesos*1000000).toLocaleString() + ' spent';

			if (best_flag === 1) {
				items[itemnames.indexOf(item_sel)][9][5] = mesos;
			}
			return;
		}
		document.getElementById('notice').textContent = 'No upgrade slots to recover.';
		return;
	}

	if (slots === 0) {
		document.getElementById('notice').textContent = 'No upgrade slots available.';
		return;
	}

	if (type === 2) {
		if (stat_str + stat_dex + stat_int + stat_luk + watk + matk === 0) {
			document.getElementById('notice').textContent = 'No stats to alter.';
			return;
		}

		if (roll <= chance) {
			enchant_s();
			let roll3;
			let chaos_temp = [stat_str, stat_dex, stat_int, stat_luk, watk, matk];
			let chaos_temp2 = [];

			for (let i = 0; i < 6; i++) {
				roll3 = Number(Math.floor((Math.random() * 10000) + 1) / 100);

				if (roll3 <= 4.94) {
					chaos_temp2.push(-5);
				}
				else if (roll3 <= 7.91) {
					chaos_temp2.push(-4);
				}
				else if (roll3 <= 11.56) {
					chaos_temp2.push(-3);
				}
				else if (roll3 <= 19.56) {
					chaos_temp2.push(-2);
				}
				else if (roll3 <= 33.26) {
					chaos_temp2.push(-1);
				}
				else if (roll3 <= 51.64) {
					chaos_temp2.push(0);
				}
				else if (roll3 <= 70.95) {
					chaos_temp2.push(1);
				}
				else if (roll3 <= 86.82) {
					chaos_temp2.push(2);
				}
				else if (roll3 <= 97.03) {
					chaos_temp2.push(3);
				}
				else if (roll3 <= 99.01) {
					chaos_temp2.push(4);
				}
				else {
					chaos_temp2.push(5);
				}
			}

			for (let i = 0; i < 6; i++) {
				if (chaos_temp[i] > 0) {
					chaos_temp[i] += chaos_temp2[i];
					chaos_temp[i] = Math.max(chaos_temp[i], 0);
				}
			}

			stat_str = chaos_temp[0];
			stat_dex = chaos_temp[1];
			stat_int = chaos_temp[2];
			stat_luk = chaos_temp[3];
			watk = chaos_temp[4];
			matk = chaos_temp[5];
			slots -= 1;
			upgrades += 1;
			itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			document.getElementById('notice').textContent = 'Stats randomly altered.';
		}
		else {
			enchant_f();
			slots -= 1;
			itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			document.getElementById('notice').textContent = 'Scroll failed.';
		}
		mesos += 100;
		document.getElementById('mesoamt').textContent = (mesos*1000000).toLocaleString() + ' spent';
	}

	else if (roll <= chance) {
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
			let notif = [];
			if (Math.max(temp[4][0],temp[4][1],temp[4][2],temp[4][3]) > 0) {
				notif.push('Stats:+' + Math.max(temp[4][0],temp[4][1],temp[4][2],temp[4][3]));
			}
			if (temp[4][4] > 0) {
				notif.push('WATK:+' + temp[4][4]);
			}
			if (temp[4][5] > 0) {
				notif.push('MATK:+' + temp[4][5]);
			}
			document.getElementById('notice').textContent = notif.join(', ') + '.';
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
			let notif = [];
			if (Math.max(temp[5][0],temp[5][1],temp[5][2],temp[5][3]) > 0) {
				notif.push('Stats:+' + Math.max(temp[5][0],temp[5][1],temp[5][2],temp[5][3]));
			}
			if (temp[5][4] > 0) {
				notif.push('WATK:+' + temp[5][4]);
			}
			if (temp[5][5] > 0) {
				notif.push('MATK:+' + temp[5][5]);
			}
			document.getElementById('notice').textContent = notif.join(', ') + '.';
		}
		mesos += temp[9][scrollinfo.indexOf(chance)];
		document.getElementById('mesoamt').textContent = (mesos*1000000).toLocaleString() + ' spent';
	}
	else {
		enchant_f();
		if (roll2 <= 50 && (chance === 30 || chance === 70)) {
			if (best_flag === 1) {
				items[itemnames.indexOf(item_sel)][3] = temp[2];
				items[itemnames.indexOf(item_sel)][9][5] = temp[9][0];
			}
			itemselect();
			document.getElementById('notice').textContent = 'Item destroyed!';
		}
		else {
			slots -= 1;
			itemupdate(stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades);
			document.getElementById('notice').textContent = 'Scroll failed.';
			mesos += temp[9][scrollinfo.indexOf(chance)];
			document.getElementById('mesoamt').textContent = (mesos*1000000).toLocaleString() + ' spent';
		}
	}

	let beststat = temp[6];
	let temp2 = [stat_str, stat_dex, stat_int, stat_luk, watk, matk];

	if (slots === 0 && ((temp[7] === -1 && (Math.max(stat_str, stat_dex, stat_int, stat_luk) > Math.max(temp[3][0],temp[3][1],temp[3][2],temp[3][3]))) || (temp2[beststat] > temp[3][beststat]) || (item_sel === 'Pink Adventurer Cape' && temp[3][beststat] <= 2 && Math.max(stat_str, stat_dex, stat_int, stat_luk) > Math.max(temp[3][0],temp[3][1],temp[3][2],temp[3][3])))) {
		items[itemnames.indexOf(item_sel)][3] = [stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades];
		items[itemnames.indexOf(item_sel)][9][5] = mesos;
		best_flag = 1;
	}
	else if (slots === 0 && mesos < items[itemnames.indexOf(item_sel)][9][5] && ((temp[7] === -1 && (Math.max(stat_str, stat_dex, stat_int, stat_luk) === Math.max(temp[3][0],temp[3][1],temp[3][2],temp[3][3]))) || (temp2[beststat] === temp[3][beststat]))) {
		items[itemnames.indexOf(item_sel)][3] = [stat_str, stat_dex, stat_int, stat_luk, watk, matk, slots, upgrades];
		items[itemnames.indexOf(item_sel)][9][5] = mesos;
		best_flag = 1;
	}
}
