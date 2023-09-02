let sel_cur = 'None';
let bgm = new Audio('');
let click = new Audio('scroll/BtMouseClick.mp3');

function lplay() {
	click.play();
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
	click.play();
	if (bgm.paused) {
		bgm.play();
		bgm.loop = true;
	}
	else {
		bgm.pause();
	}
}
