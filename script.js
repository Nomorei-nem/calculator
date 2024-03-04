'use strict';

const keys = document.querySelectorAll('.key');
const keyStroke = new Audio(
	'./assets/mixkit-single-key-press-in-a-laptop-2541.wav'
);

const currentEquation = document.querySelector('.current-equation');
const screenResults = document.querySelector('.results');
const equals = document.querySelector('.key--equals');
const numbers = document.querySelectorAll('.number');
const backspace = document.querySelector('.backspace');
const deleteEquation = document.querySelector('.delete');
const positiveNegative = document.querySelector('.positive-negative');
const sqRoot = document.querySelector('.square-root');
const decimal = document.querySelector('.decimal');

const operators = ['^', '%', '/', '+', '*', '-'];

let firstNumber = null;
let secondNumber = null;

keys.forEach((e) =>
	e.addEventListener('click', () => {
		keyStroke.play();
		if (screenResults.innerHTML === 'ERROR') screenResults.innerHTML = '';
	})
);

numbers.forEach((e) => {
	e.addEventListener('click', () => {
		if (screenResults.innerHTML.length <= 12)
			screenResults.innerHTML += e.value;
	});
});

backspace.addEventListener(
	'click',
	() => (screenResults.innerHTML = screenResults.innerHTML.slice(0, -1))
);

deleteEquation.addEventListener('click', () => {
	currentEquation.innerHTML = '';
	screenResults.innerHTML = '';
});

positiveNegative.addEventListener('click', () => {
	if (screenResults.innerHTML[0] === '-')
		screenResults.innerHTML = screenResults.innerHTML.slice(1);
	else if (screenResults.innerHTML[0] !== '-')
		screenResults.innerHTML = `-${screenResults.innerHTML}`;
});

sqRoot.addEventListener('click', () => {
	const squared = +Math.sqrt(+screenResults.innerHTML).toString().slice(0, 12);

	if (+screenResults.innerHTML < 0) screenResults.innerHTML = 'ERROR';
	else screenResults.innerHTML = squared;
});

decimal.addEventListener('click', () => {
	console.log(!screenResults.innerHTML.includes('.'));
	if (!screenResults.innerHTML.includes('.')) screenResults.innerHTML += '.';
});

document.addEventListener('keydown', (e) => {
	console.log(e);

	if (operators.includes(e.key)) {
		keyStroke.play();
		screenResults.innerHTML += e.key;
	}

	if (Number.isInteger(+e.key)) {
		keyStroke.play();
		screenResults.innerHTML += +e.key;
	}
});

equals.addEventListener('click', () => {
	console.log('sada');
});
