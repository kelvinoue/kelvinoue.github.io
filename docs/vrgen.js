let input = document.getElementById('query');
input.addEventListener('keypress', 
	function(event) {
		if (event.key === 'Enter') {
    			event.preventDefault();
    			document.getElementById('generate').click();
  		}
	}
);


function copier() {
	t = document.getElementById('output').innerText;
	if (t !== '' && t !== null) {
		navigator.clipboard.writeText(t);
		document.getElementById('alert').textContent = 'Copied!';
	}
}


function gen() {
	document.getElementById('output').textContent = '';
	document.getElementById('alert').textContent = '';
	let e = 'Please enter a valid Vehicle Reg No. without the checksum letter.';
	let query = document.getElementById('query').value.toUpperCase().replace(/\s/g,'');

	let a = query.match(/[A-Z]{1,3}/g);
	let b = query.match(/[0-9]{1,4}/g);
	let s = query.match(/[^a-zA-Z0-9]/g);

	let p1;
	let p2;
	let p3;
	let p4;
	let p5;
	let p6;
	let r;
	let c = [9,4,5,4,3,2];
	let checksum = ['A','Z','Y','X','U','T','S','R','P','M','L','K','J','H','G','E','D','C','B'];
	
	if (a === null || a.length > 1 || b === null || b.length > 1 || query[0].match(/[ES]/g) === null || s !== null) {
		document.getElementById('alert').textContent = e;
		return;
	}

	a = a[0].split('');
	b = b[0].split('');

	if (a.length === 1) {
		p1 = 0;
		p2 = a[0].charCodeAt(0) - 64;
	}
	else if (a.length === 2) {
		if (a[1].match(/[^IO]/g) === null) {
			document.getElementById('alert').textContent = e;
			return;
		}
		p1 = a[0].charCodeAt(0) - 64;
		p2 = a[1].charCodeAt(0) - 64;
	}
	else if (a.length === 3 && a[0] === 'S') {
		if (a[1].match(/[^IO]/g) === null || a[2].match(/[^IO]/g) === null) {
			document.getElementById('alert').textContent = e;
			return;
		}
		p1 = a[1].charCodeAt(0) - 64;
		p2 = a[2].charCodeAt(0) - 64;
	}
	else {
		document.getElementById('alert').textContent = e;
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
		document.getElementById('alert').textContent = e;
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
	document.getElementById('output').textContent = query + r;	
}
