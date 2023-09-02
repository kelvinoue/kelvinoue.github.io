let sel_cur = 'None';
let bgm = new Audio('');

function lplay() {
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
		bgm.play();
		bgm.loop = true;
	}
}


function play() {
	if (bgm.paused) {
		bgm.play();
		bgm.loop = true;
	}
	else {
		bgm.pause();
	}
}
