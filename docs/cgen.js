
let a_raw;
let b_raw;
let p1;
let p2;
let p3;
let p4;
let p5;
let p6;
let p7 = '';
const check = [9,4,5,4,3,2];
const checksum = ['A','Z','Y','X','U','T','S','R','P','M','L','K','J','H','G','E','D','C','B'];
const e = 'Please enter a valid Vehicle Registration No. (E.g. S1, E1, SNA9999)';

let dir = 1;
const dir_index = {'1':'+', '-1':'-'};
const dir_index2 = {'1':'Next ', '-1':'Prev '};

const next_list = {
	 'E':'EA'
	,'EZ':'EZ'
	,'S':'SB'
	,'SY':'SBA'
	,'SZ':'SBA'
	,'SZZ':'SZZ'
};

const prev_list = {
	 'E':'E'
	,'EA':'E'
	,'S':'S'
	,'SB':'S'
	,'SBA':'SY'
};

const ban_list_c2 = ['I','O','A','E','H'];
const ban_list_c3 = ['I','O'];
const ban_list_full = ['SA','SG','SH','SJ','SZ','SBS','SCB','SCC','SCD','SCS','SCT','SDC','SKY','SLY','SMB'];

const style_base = document.getElementById('output').style.cssText;
const style_base_s2a = document.getElementById('s2a').style.cssText;
let style_state = 1;








let input = document.getElementById('query');
input.addEventListener('keypress', 
	function(event) {
		if (event.key === 'Enter') {
    			event.preventDefault();
    			document.getElementById('generate').click();
  		}
	}
);








function clearmsg() {
	document.getElementById('output').textContent = '';
	document.getElementById('alert').textContent = '';
}


function emsg() {
	document.getElementById('alert').textContent = e;
	document.getElementById('s2a').style = style_base_s2a;
}


function copy() {
	if (a_raw) {
		navigator.clipboard.writeText(a_raw + b_raw + p7);
		document.getElementById('alert').textContent = 'Copied!';
	}
	else {
		emsg();
	}
}


function checkinput() {
	clearmsg();
	let query = document.getElementById('query').value.toUpperCase().replace(/\s/g,'');

	let a = query.match(/[A-Z]{1,3}/g);
	let b = query.match(/[0-9]{1,4}/g);
	let s = query.match(/[^a-zA-Z0-9]/g);

	if (a === null || a.length > 1 || b === null || b.length > 1 || query[0].match(/[ES]/g) === null || s !== null) {
		emsg();
		return;
	}
	else {
		return [a[0], Number(b[0]).toString()];
	}
}


function style(x) {
	if (x === 1) {
		document.getElementById('output').style = style_base + 'color:ffffff;';
		document.getElementById('s2a').style = style_base_s2a + 'background-color:000000;';
	}
	else if (x === 2) {
		document.getElementById('output').style = style_base + 'color:000000;';
		document.getElementById('s2a').style = style_base_s2a + 'background-color:ffffff;';
	}
	else if (x === 3) {
		document.getElementById('output').style = style_base + 'color:000000;';
		document.getElementById('s2a').style = style_base_s2a + 'background-color:ffdd00;';
	}
	else if (x === 4) {
		document.getElementById('output').style = style_base + 'color:ffffff;';
		document.getElementById('s2a').style = style_base_s2a;
	}
}








function update_l(l, l_x) {

	l2 = l.split('');
	
	if ((l2[0] === 'E' && l2.length <= 2) || (l2[0] === 'S' && l2.length <= 3)) {

		let l_end;
		let l_start;
		let l_change;

		if (l_x === 1) {
			l_end = 'Z';
			l_start = 'A';
			l_change = 1;
			if (l in next_list) {
				return next_list[l];
			}
		}
		else if (l_x === -1) {
			l_end = 'A';
			l_start = 'Z';
			l_change = -1;
			if (l in prev_list) {
				return prev_list[l];
			}
		}

		do {
			if (l2[l2.length-1] === l_end) {
				l2[l2.length-1] = l_start;
				l2[l2.length-2] = String.fromCharCode(l2[l2.length-2].charCodeAt(0) + l_change);
			}
			else {
				l2[l2.length-1] = String.fromCharCode(l2[l2.length-1].charCodeAt(0) + l_change);
			}
		}
		while (ban_list_full.includes(l2.join('')) || ban_list_c3.includes(l2[l2.length-1]) || (l2[0] === 'S' && l2.length === 3 && ban_list_c2.includes(l2[l2.length-2])));
		return l2.join(''); 
	}

	else {
		return l;
	}
}


function update_n(l, n, n_x) {

	n = Number(n);
	
	if (n_x > 0) {
		if (['EZ','SZZ'].includes(l) && n + n_x > 9999) {
			return([l, '9999']);
		}

		else {
			n = n + n_x;
			n2 = Math.floor((n-1)/9999);
			if (n2 > 0) {
				n = n % 9999;
			}
			for (let i = 0; i < n2; i++) {
				l = update_l(l, 1);
			}
		}
	}

	else if (n_x < 0) {
		if (['E','S'].includes(l) && n + n_x < 1) {
			return([l, '1']);
		}
		
		else if (n + n_x === 0) {
			l = update_l(l, -1);
			return([l, '9999']);
		}

		else {
			n = n + n_x;
			n2 = Math.floor(n/9999) * -1;
			n = n + (9999 * n2);
			for (let i = 0; i < n2; i++) {
				l = update_l(l, -1);
			}
		}
	}

	return([l, n.toString()])
}


function update(l, l_x, n, n_x) {
	if (l_x != 0) {
		l = update_l(l, l_x);
	}
	if (n_x != 0) {
		[l, n] = update_n(l, n, n_x);
	}
	return [l, n];
}








function calc(l, n) {
	a_raw = l;
	b_raw = n;

	a = a_raw.split('');
	b = b_raw.split('');

	if (a.length === 1) {
		p1 = 0;
		p2 = a[0].charCodeAt(0) - 64;
	}
	else if (a.length === 2) {
		if (ban_list_c3.includes(a[1]) || ban_list_full.includes(a_raw)) {
			emsg();
			return;
		}
		p1 = a[0].charCodeAt(0) - 64;
		p2 = a[1].charCodeAt(0) - 64;
	}
	else if (a.length === 3 && a[0] === 'S') {
		if (ban_list_c3.includes(a[2]) || ban_list_c2.includes(a[1]) || ban_list_full.includes(a_raw)) {
			emsg();
			return;
		}
		p1 = a[1].charCodeAt(0) - 64;
		p2 = a[2].charCodeAt(0) - 64;
	}
	else {
		emsg();
		return;
	}

	if (b.length === 1) {
		p3 = 0;
		p4 = 0;
		p5 = 0;
		p6 = Number(b[0]);
	}
	else if (b.length === 2) {
		p3 = 0;
		p4 = 0;
		p5 = Number(b[0]);
		p6 = Number(b[1]);
	}
	else if (b.length === 3) {
		p3 = 0;
		p4 = Number(b[0]);
		p5 = Number(b[1]);
		p6 = Number(b[2]);
	}
	else if (b.length === 4) {
		p3 = Number(b[0]);
		p4 = Number(b[1]);
		p5 = Number(b[2]);
		p6 = Number(b[3]);
	}
	else {
		emsg();
		return;
	}

	p1 = p1 * check[0];
	p2 = p2 * check[1];
	p3 = p3 * check[2];
	p4 = p4 * check[3];
	p5 = p5 * check[4];
	p6 = p6 * check[5];
	p7 = (p1+p2+p3+p4+p5+p6) % 19;
	p7 = checksum[p7];

	style(style_state);
	document.getElementById('output').textContent = a_raw + ' ' + b_raw + ' ' + p7;
}








function updatefinda() {
	document.getElementById('finda').textContent = dir_index2[dir.toString()] + p7;
}


function gen() {
	let [a, b] = checkinput();
	calc(a, b);
	updatefinda();
}


function gen1() {
	let [a, b] = checkinput();
	[a, b] = update(a, 0, b, dir*1);
	document.getElementById('query').value = a + b;
	calc(a, b);
	updatefinda();
}


function gen10() {
	let [a, b] = checkinput();
	[a, b] = update(a, 0, b, dir*10);
	document.getElementById('query').value = a + b;
	calc(a, b);
	updatefinda();
}


function gena() {
	let [a, b] = checkinput();
	[a, b] = update(a, dir*1, b, 0);
	document.getElementById('query').value = a + b;
	calc(a, b);
	updatefinda();
}


function gens() {
	if (dir === 1) {
		dir = -1;
	}
	else {
		dir = 1;
	}
	document.getElementById('gen1').textContent = dir_index[dir.toString()] + '1';
	document.getElementById('gen10').textContent = dir_index[dir.toString()] + '10';
	document.getElementById('gena').textContent = dir_index[dir.toString()] + 'A';
	updatefinda();
}


function finda() {
	let p7_2 = p7;
	let [a, b] = checkinput();

	if (p7 != '') {
		do {
			gen1();
		}
		while (p7 != p7_2);
	}
}


function reset() {
	let [a, b] = checkinput();
	[a, b] = update(a, 0, b, (-(Number(b_raw))+1));
	document.getElementById('query').value = a + b;
	calc(a, b);
}


function style_toggle() {
	if (p7 != '') {
		if (style_state < 4) {
			style_state++;
		}
		else {
			style_state = 1;
		}
		style(style_state);
	}
}
