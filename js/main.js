var long, width;
document.addEventListener("DOMContentLoaded", setSize);

function getInt(x) {
	return x - x % 1;
}

function setSize() {
	long = window.innerWidth / 13 - 31;
	long = getInt(long);
	width = window.innerHeight / 13 - 24;
	width = getInt(width);
	document.getElementsByName('long')[0].value = long;
	document.getElementsByName('long')[0].placeholder = long;
	document.getElementsByName('width')[0].value = width;
	document.getElementsByName('width')[0].placeholder = width;
}
// var delay = document.getElementsByName('delay')[0]