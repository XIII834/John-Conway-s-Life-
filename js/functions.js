function buildUniverse() {
	var row = "";
	var cxId = 1;
	var long = document.getElementsByName('long')[0].value;
	var width = document.getElementsByName('width')[0].value;

	row += '<table>';
	for (i = 1; i <= width; i++) {
		row += '<tr>';
		for (j = 1; j <= long; j++) {
			row += '<td id="' + cxId + '" ' + '></td>';
			cxId++;
		}
		row += '</tr>';
	}
	row += '</table>';

	for (i = 1; i <= long * width; i++) {
		mass[i] = false;
		cxMass[i] = 0;
	}

	document.getElementById('universe').innerHTML = row;
	listener();
}

function killThemAll() {
	var long = document.getElementsByName('long')[0].value;
	var width = document.getElementsByName('width')[0].value;

	for (i = 1; i <= long * width; i++) {
		mass[i] = 0;
		cxMass[i] = 0;
		document.getElementById(i).style.backgroundColor = 'white';
	}
}

function universeRebuild() {
	for (i = 1; i <= long * width; i++) {
		if(mass[i]) {
			document.getElementById(i).style.backgroundColor = 'black';
		}
		else {
			document.getElementById(i).style.backgroundColor = 'white';
		}
	}
}

function step() {
	var long = document.getElementsByName('long')[0].value;
	var width = document.getElementsByName('width')[0].value;
	var LP = parseInt(long) + 1;
	var LM = parseInt(long) - 1;
	var LC = parseInt(long);

	for (var i = 1; i <= long * width; i++) {
		if (i % LC == 0) {
			if (mass[i - LP]) {cxMass[i]++}
			if (mass[i - LC]) {cxMass[i]++}
			if (mass[i - 1]) {cxMass[i]++}
			if (mass[i + LM]) {cxMass[i]++}
			if (mass[i + LC]) {cxMass[i]++}
		}
		else if (i % LC == 1) {
			if (mass[i - LC]) {cxMass[i]++}
			if (mass[i - LM]) {cxMass[i]++}
			if (mass[i + 1]) {cxMass[i]++}
			if (mass[i + LC]) {cxMass[i]++}
			if (mass[i + LP]) {cxMass[i]++}
		}
		else {
			if (mass[i - LP]) {cxMass[i]++}
			if (mass[i - LC]) {cxMass[i]++}
			if (mass[i - LM]) {cxMass[i]++}
			if (mass[i - 1]) {cxMass[i]++}
			if (mass[i + 1]) {cxMass[i]++}
			if (mass[i + LP]) {cxMass[i]++}
			if (mass[i + LC]) {cxMass[i]++}
			if (mass[i + LM]) {cxMass[i]++}
		}
	}


	for (var i = 1; i <= long * width; i++) {
		if (cxMass[i] == 3) {
			mass[i] = true;
			cxMass[i] = 0;
		}
		else if ((cxMass[i] > 3) || (cxMass[i] < 2)) {
			mass[i] = false;
			cxMass[i] = 0;
		}
		else {
			cxMass[i] = 0;
		}
	}

	// var row2 = "";
	// var nnn = 1;
	// for (i = 1; i <= width; i++) {
	// 	row2 += "<p>";
	// 	for (j = 1; j <= long; j++) {
	// 		row2 += mass[nnn] + " | ";
	// 		nnn++;
	// 	}
	// 	row2 += "</p>";
	// }
	// document.getElementById('test').innerHTML = row2;

	universeRebuild();
}

function run() {
	var delay = document.getElementsByName('delay')[0].value;
	var sum = document.getElementsByName('sum')[0].value;
	sum = parseInt(sum);
 	delay = parseInt(delay);
	var interval = delay;
	for (i = 1; i <= sum; i++) {
		setTimeout('step()', interval);
		interval += delay;
	}
}

function rules() {
	var a = 
	"Игра  Жизнь происходит на клеточном поле, которое, традиционно, называется  вселенная. " +
    "Каждая клетка может быть живой или мёртвой. " +
    "Поколения сменяются синхронно по простым правилам: " +
    "в пустой (мёртвой) клетке, рядом с которой ровно три живые клетки, зарождается жизнь; " +
    "если у живой клетки есть две или три живые соседки, то эта клетка продолжает жить; в противном случае (если соседей меньше двух или больше трёх) клетка умирает ( от одиночества или  от перенаселённости). ";

    alert(a);
}


function listener() {
	a = [];
	for (var t = 0; t < mass.length; t++) {
		document.getElementsByTagName('td')[t].addEventListener('mouseover', a1);
		document.getElementsByTagName('td')[t].addEventListener('mouseout', a2);
		document.getElementsByTagName('td')[t].addEventListener('mousedown', a3);

		document.getElementsByTagName('td')[t].addEventListener('mouseover', ifa);
		document.getElementsByTagName('td')[t].addEventListener('mousedown', ifa);
	}

	function a1() {
		a[0] = true;
	}

	function a2() {
		a[0] = false;
	}

	function a3() {
		if (a[1]) {
			a[1] = false;
		}
		else {
			a[1] = true;
		}
	}

	function ifa() {
		if (a[0] && a[1]) {
			this.style.backgroundColor = 'black';
			this.style.cursor = 'grabbing';
			mass[this.id] = true;
		}
		else {
			this.style.backgroundColor = 'white';
			this.style.cursor = 'grab';
			mass[this.id] = false;
		}
	}
}