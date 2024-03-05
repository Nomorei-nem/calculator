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
const operators = document.querySelectorAll('.operators');

const operationFunction = function (operator, firstNumber, secondNumber, e) {
	switch (operator) {
		case '+': {
			currentEquation.innerHTML = firstNumber + secondNumber + e.value;
			screenResults.innerHTML = '';
			break;
		}
		case '-': {
			currentEquation.innerHTML = firstNumber - secondNumber + e.value;
			screenResults.innerHTML = '';
			break;
		}
		case '*': {
			currentEquation.innerHTML = firstNumber * secondNumber + e.value;
			screenResults.innerHTML = '';
			break;
		}
		case '/': {
			currentEquation.innerHTML = firstNumber / secondNumber + e.value;
			screenResults.innerHTML = '';
			break;
		}
		case '^': {
			currentEquation.innerHTML = firstNumber ** secondNumber + e.value;
			screenResults.innerHTML = '';
			break;
		}
		case '%': {
			currentEquation.innerHTML = (firstNumber * (secondNumber / 100))
				.toString()
				.slice(0, 12);
			+e.value;
			screenResults.innerHTML = '';
			break;
		}
	}
};

const equalsFunction = function (operator, firstNumber, secondNumber) {
	switch (operator) {
		case '+': {
			screenResults.innerHTML = firstNumber + secondNumber;
			currentEquation.innerHTML = '';
			break;
		}
		case '-': {
			screenResults.innerHTML = firstNumber - secondNumber;
			currentEquation.innerHTML = '';
			break;
		}
		case '*': {
			screenResults.innerHTML = firstNumber * secondNumber;
			currentEquation.innerHTML = '';
			break;
		}
		case '/': {
			screenResults.innerHTML = firstNumber / secondNumber;
			currentEquation.innerHTML = '';
			break;
		}
		case '^': {
			screenResults.innerHTML = firstNumber ** secondNumber;
			currentEquation.innerHTML = '';
			break;
		}
		case '%': {
			screenResults.innerHTML = (firstNumber * (secondNumber / 100))
				.toString()
				.slice(0, 12);
			currentEquation.innerHTML = '';
			break;
		}
	}
};

const operatorSigns = ['^', '%', '/', '+', '*', '-'];

let firstNumber = null;
let secondNumber = null;
let operator = null;

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
	else if (screenResults.innerHTML.length > 0)
		screenResults.innerHTML = squared;
});

decimal.addEventListener('click', () => {
	if (!screenResults.innerHTML.includes('.')) screenResults.innerHTML += '.';
});

operators.forEach((e) => {
	e.addEventListener('click', () => {
		operator = currentEquation.innerHTML.slice(-1);

		if (
			currentEquation.innerHTML.length > 0 &&
			screenResults.innerHTML.length > 0 &&
			screenResults.innerHTML !== '-'
		) {
			firstNumber = parseFloat(currentEquation.innerHTML);
			secondNumber = parseFloat(screenResults.innerHTML);

			operationFunction(operator, firstNumber, secondNumber, e);
		} else if (
			screenResults.innerHTML.length > 0 &&
			screenResults.innerHTML !== '-'
		) {
			currentEquation.innerHTML = screenResults.innerHTML + e.value;
			screenResults.innerHTML = '';
		} else if (
			currentEquation.innerHTML.length > 0 &&
			screenResults.innerHTML.length === 0
		) {
			currentEquation.innerHTML =
				currentEquation.innerHTML.slice(0, -1) + e.value;
		}
	});
});

equals.addEventListener('click', (e) => {
	if (
		currentEquation.innerHTML.length > 0 &&
		screenResults.innerHTML.length > 0 &&
		screenResults.innerHTML !== '-'
	) {
		operator = currentEquation.innerHTML.slice(-1);
		firstNumber = parseFloat(currentEquation.innerHTML);
		secondNumber = parseFloat(screenResults.innerHTML);

		equalsFunction(operator, firstNumber, secondNumber);
		console.log(operator, firstNumber, secondNumber, e);
	}
});

// Keyboard Support
