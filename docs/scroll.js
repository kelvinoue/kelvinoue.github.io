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


function qplay(audio) {
	audio.currentTime = 0;
	audio.play();
}


function lplay() {
	qplay(click);
	sel_new = document.getElementById('bgmlist').options[document.getElementById('bgmlist').selectedIndex].text;

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
	let img = document.getElementById('enchantment');

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
	let img = document.getElementById('enchantment');

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


function rng(x) {
	let chance = Number(x);
	let roll = Number(Math.floor((Math.random() * 100) + 1));

	if (roll <= chance) {
		enchant_s();
	}
	else {
		enchant_f();
	}
}
