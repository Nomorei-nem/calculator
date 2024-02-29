'use strict';

const keys = document.querySelectorAll('.key');
const keyStroke = new Audio(
	'./assets/mixkit-single-key-press-in-a-laptop-2541.wav'
);

const currentEquation = document.querySelector('.current-equation');
const screenResults = document.querySelector('.results');

keys.forEach((e) => {
	e.addEventListener('click', () => {
		keyStroke.play();

		if (Number.isInteger(+e.value)) {
			screenResults.innerHTML += e.value;
		}

		switch (e.value) {
			case '^': {
				console.log(e);
				screenResults.innerHTML += e.value;
				break;
			}
			case '%': {
				screenResults.innerHTML += e.value;
				break;
			}
			case '/': {
				screenResults.innerHTML += e.value;
				break;
			}
			case '+': {
				screenResults.innerHTML += e.value;
				break;
			}
			case '*': {
				screenResults.innerHTML += e.value;
				break;
			}
			case '-': {
				screenResults.innerHTML += e.value;
				break;
			}
			case '=': {
				screenResults.innerHTML += e.value;
				break;
			}
			case 'backspace': {
				screenResults.innerHTML = screenResults.innerHTML.slice(0, -1);
				break;
			}
			case 'delete': {
				currentEquation.innerHTML = '';
				screenResults.innerHTML = '';
				break;
			}
			case 'enter': {
				screenResults.innerHTML += e.value;
				break;
			}
			case 'square-root': {
				screenResults.innerHTML += '√';
				break;
			}
			case '+/-': {
				screenResults.innerHTML += '±';
				break;
			}
			case '.': {
				screenResults.innerHTML += '.';
				break;
			}
		}

		// if (e.value === 'delete') currentEquation.innerHTML = '';

		// if (e.value === )

		// console.log(e.value);
	});
});

document.addEventListener('keydown', (e) => {
	console.log(e);

	const operators = [
		'^',
		'%',
		'/',
		'+',
		'*',
		'-',
		'=',
		'Backspace',
		'Delete',
		'Enter',
	];

	if (operators.includes(e.key)) {
		keyStroke.play();
		screenResults.innerHTML += e.key;
	}

	if (Number.isInteger(+e.key)) {
		keyStroke.play();
		screenResults.innerHTML += +e.key;
	}
});
