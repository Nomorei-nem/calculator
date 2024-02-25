'use strict';

const keys = document.querySelectorAll('.key');
const keyStroke = new Audio(
	'./assets/mixkit-single-key-press-in-a-laptop-2541.wav'
);

keys.forEach((e) => {
	e.addEventListener('click', () => keyStroke.play());
});

console.log(keys);
