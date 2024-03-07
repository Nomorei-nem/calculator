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

let firstNumber = null;
let secondNumber = null;
let operator = null;

// Function for Operator keys
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

// Functions for Equals key
const equalsFunction = function (e) {
	//////// Dividing by 0 ////////
	if (
		currentEquation.innerHTML.slice(-1) === '/' &&
		+screenResults.innerHTML === 0
	) {
		const hal = document.querySelector('.big--oops');
		const imAfraid = new Audio('./assets/sorry-dave-clipped.wav');
		const checkbox = document.querySelector('.checkbox');

		// Functions to call RNG at intervals
		const rngRunning1 = setInterval(function () {
			const rng1 = () =>
				Math.floor(Math.random() * (99999999999999999 - 10000000000000000 + 1));
			currentEquation.innerHTML = rng1();
		}, 70);

		const rngRunning2 = setInterval(function () {
			const rng2 = () =>
				Math.floor(Math.random() * (99999999999999 - 10000000000000 + 1));
			screenResults.innerHTML = rng2();
		}, 70);

		checkbox.checked = true;
		imAfraid.play();

		firstNumber = null;
		secondNumber = null;
		operator = null;

		hal.addEventListener('click', (e) => {
			checkbox.checked = false;
			firstNumber = null;
			secondNumber = null;
			operator = null;

			clearInterval(rngRunning1);
			clearInterval(rngRunning2);
			currentEquation.innerHTML = '';
			screenResults.innerHTML = '';
		});

		///////////////////
	} else if (
		currentEquation.innerHTML.length > 0 &&
		screenResults.innerHTML.length > 0 &&
		screenResults.innerHTML !== '-'
	) {
		operator = currentEquation.innerHTML.slice(-1);
		firstNumber = parseFloat(currentEquation.innerHTML);
		secondNumber = parseFloat(screenResults.innerHTML);

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
	}
};

// Event listener for Number keys
numbers.forEach((e) => {
	e.addEventListener('click', () => {
		if (screenResults.innerHTML.length <= 12)
			screenResults.innerHTML += e.value;
	});
});

// Event listener for Backspace key
backspace.addEventListener(
	'click',
	() => (screenResults.innerHTML = screenResults.innerHTML.slice(0, -1))
);

// Event listener for Equation-Clear key
deleteEquation.addEventListener('click', () => {
	currentEquation.innerHTML = '';
	screenResults.innerHTML = '';
	firstNumber = null;
	secondNumber = null;
	operator = null;
});

// Event listener for +/- key
positiveNegative.addEventListener('click', () => {
	if (screenResults.innerHTML[0] === '-')
		screenResults.innerHTML = screenResults.innerHTML.slice(1);
	else if (screenResults.innerHTML[0] !== '-')
		screenResults.innerHTML = `-${screenResults.innerHTML}`;
});

// Event listener for Square Root key
sqRoot.addEventListener('click', () => {
	const squared = +Math.sqrt(+screenResults.innerHTML).toString().slice(0, 12);

	if (+screenResults.innerHTML < 0) screenResults.innerHTML = 'ERROR';
	else if (screenResults.innerHTML.length > 0)
		screenResults.innerHTML = squared;
});

// Event listener for Decimal key
decimal.addEventListener('click', () => {
	if (!screenResults.innerHTML.includes('.')) screenResults.innerHTML += '.';
});

// Event listeners for Operator keys
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

// Event listener for Equals key
equals.addEventListener('click', () => equalsFunction());

// Add key stroke sound effect
keys.forEach((e) =>
	e.addEventListener('click', (e) => {
		keyStroke.play();
		if (screenResults.innerHTML === 'ERROR') {
			screenResults.innerHTML = '';
		}
		e.target.blur();
	})
);

///////////////////////// Keyboard Support /////////////////////////

const keyboardKeys = [
	'Backspace',
	'Delete',
	'9',
	'8',
	'7',
	'6',
	'5',
	'4',
	'3',
	'2',
	'1',
	'0',
	'^',
	'%',
	'/',
	'+',
	'*',
	'-',
	'=',
	'.',
];

// Event listener to push down keys on UI
document.addEventListener('keydown', (e) => {
	if (keyboardKeys.includes(e.key)) {
		keyStroke.play();
		const btn = document.querySelector(`[value="${e.key}"]`);

		btn.classList.add('active');
		btn.click();
	}
});

// Event listener to push up keys on UI
document.addEventListener('keyup', (e) => {
	if (keyboardKeys.includes(e.key)) {
		const btn = document.querySelector(`[value="${e.key}"]`);

		btn.classList.remove('active');
	}
});

const enterKey = document.querySelector('.enter');

// Event listener to push down '=' on UI
document.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		enterKey.click();

		equals.classList.add('active');
	}
});

// Event listener to push up '=' on UI
document.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		equals.classList.remove('active');
	}
});
