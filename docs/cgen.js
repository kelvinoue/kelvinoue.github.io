let input = document.getElementById('query');
input.addEventListener('keypress', 
	function(event) {
		if (event.key === 'Enter') {
    			event.preventDefault();
    			document.getElementById('generate').click();
  		}
	}
);


function copy() {
	t = document.getElementById('output').innerText.replace(/ /g,'');
	if (t !== '' && t !== null && t!== 'Please enter a valid registration no. without the checksum letter.') {
		navigator.clipboard.writeText(t);
		document.getElementById('alert').textContent = 'Copied!';
	}
}


function clearmsg() {
	document.getElementById('output').textContent = '';
	document.getElementById('alert').textContent = '';
}


function emsg() {
	let e = 'Please enter a valid registration no. without the checksum letter.';
	document.getElementById('output').style = 'font-size:14px;font-weight:normal';
	document.getElementById('output').textContent = e;
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


function increment_letter(l) {
	l2 = l.split('');
	if (l2.length === 1) {
		if (l2[0] === 'E') {
			return 'EA';
		}
		else if (l2[0] === 'S') {
			return 'SB';
		}
	}
	else if (l2.length === 2) {
		if (l2[0] === 'E') {
			if (l2[1].charCodeAt(0) < 90) {
				if ([78, 72].includes(l2[1].charCodeAt(0))) {
					l2[1] = String.fromCharCode(l2[1].charCodeAt(0) + 2);
				}
				else {
					l2[1] = String.fromCharCode(l2[1].charCodeAt(0) + 1);
				}
				return l2.join('');
			}
			else {
				return l;
			}
		}
		else if (l2[0] === 'S') {
			if (l2[1].charCodeAt(0) < 89) {
				if ([78, 73].includes(l2[1].charCodeAt(0))) {
					l2[1] = String.fromCharCode(l2[1].charCodeAt(0) + 2);
				}
				else if ([72].includes(l2[1].charCodeAt(0))) {
					l2[1] = String.fromCharCode(l2[1].charCodeAt(0) + 3);
				}
				else if ([71].includes(l2[1].charCodeAt(0))) {
					l2[1] = String.fromCharCode(l2[1].charCodeAt(0) + 4);
				}
				else if ([70].includes(l2[1].charCodeAt(0))) {
					l2[1] = String.fromCharCode(l2[1].charCodeAt(0) + 5);
				}
				else {
					l2[1] = String.fromCharCode(l2[1].charCodeAt(0) + 1);
				}
				return l2.join('');
			}
			else {
				return 'SBA';
			}
		}
	}
	else if (l2.length === 3) {
		if (l2[2].charCodeAt(0) < 90) {
			if ([78, 72].includes(l2[2].charCodeAt(0))) {
				l2[2] = String.fromCharCode(l2[2].charCodeAt(0) + 2);
			}
			else {
				l2[2] = String.fromCharCode(l2[2].charCodeAt(0) + 1);
			}
			return l2.join('');
		}
		else {
			if (l2[1].charCodeAt(0) < 90) {
				if ([78, 72, 68].includes(l2[1].charCodeAt(0))) {
					l2[1] = String.fromCharCode(l2[1].charCodeAt(0) + 2);
				}
				else if ([71].includes(l2[1].charCodeAt(0))) {
					l2[1] = String.fromCharCode(l2[1].charCodeAt(0) + 3);
				}
				else {
					l2[1] = String.fromCharCode(l2[1].charCodeAt(0) + 1);
				}
				l2[2] = 'A';
				return l2.join('');
			}
			else {
				return l;
			}
		}
	}
}


function increment_num(l, n) {
	n = Number(n);
	if (n < 9999) {
		return [l, (n + 1).toString()];
	}
	else if (n === 9999 && ['EZ','SZZ'].includes(l)) {
		return [l, n.toString()];
	}
	else {
		l = increment_letter(l);
		return [l, (1).toString()];
	}
}


function increment(l, n, x) {
	if (x > 0) {
		for (let i = 0; i < x; i++) {
			[l, n] = increment_num(l, n);
		}
		return [l, n];
	}
	else if (x === 0) {
		l = increment_letter(l);
		return [l, n];
	}
	else {
		return [l, n];
	}
}


function calc(l, n) {
	let a_raw = l;
	let b_raw = n;
	let p1;
	let p2;
	let p3;
	let p4;
	let p5;
	let p6;
	let r;
	let c = [9,4,5,4,3,2];
	let checksum = ['A','Z','Y','X','U','T','S','R','P','M','L','K','J','H','G','E','D','C','B'];
	
	a = a_raw.split('');
	b = b_raw.split('');

	if (a.length === 1) {
		p1 = 0;
		p2 = a[0].charCodeAt(0) - 64;
	}
	else if (a.length === 2) {
		if (['I','O'].includes(a[1]) || (a[0] === 'S' && ['A','G','H','J','Z'].includes(a[1]))) {
			emsg();
			return;
		}
		p1 = a[0].charCodeAt(0) - 64;
		p2 = a[1].charCodeAt(0) - 64;
	}
	else if (a.length === 3 && a[0] === 'S') {
		if (['I','O'].includes(a[2]) || ['I','O','A','E','H'].includes(a[1]) || ['SBS','SCB','SCC','SCD','SCS','SCT','SDC','SKY','SLY','SMB'].includes(a_raw)) {
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
		p6 = b[0];
	}
	else if (b.length === 2) {
		p3 = 0;
		p4 = 0;
		p5 = b[0];
		p6 = b[1];
	}
	else if (b.length === 3) {
		p3 = 0;
		p4 = b[0];
		p5 = b[1];
		p6 = b[2];
	}
	else if (b.length === 4) {
		p3 = b[0];
		p4 = b[1];
		p5 = b[2];
		p6 = b[3];
	}
	else {
		emsg();
		return;
	}

	p1 = p1*c[0];
	p2 = p2*c[1];
	p3 = p3*c[2];
	p4 = p4*c[3];
	p5 = p5*c[4];
	p6 = p6*c[5];
	r = (p1+p2+p3+p4+p5+p6) % 19;
	r = checksum[r];
	document.getElementById('output').style = 'font-size:20px;font-family:CW';
	document.getElementById('output').textContent = a_raw + ' ' + b_raw + ' ' + r;
}


function gen() {
	let [a, b] = checkinput();
	calc(a, b);
}


function gen1() {
	let [a, b] = checkinput();
	[a, b] = increment(a, b, 1);
	document.getElementById('query').value = a + b;
	calc(a, b);
}


function gen5() {
	let [a, b] = checkinput();
	[a, b] = increment(a, b, 5);
	document.getElementById('query').value = a + b;
	calc(a, b);
}


function gena() {
	let [a, b] = checkinput();
	[a, b] = increment(a, b, 0);
	document.getElementById('query').value = a + b;
	calc(a, b);
}
