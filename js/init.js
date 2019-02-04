import {Game} from './game.js';
window.addEventListener("DOMContentLoaded", ()=>{
	let game = new Game(960, 720);
	game.init().then(canvas=>{
		document.querySelector('#noscript').style.display = 'none';
		document.body.appendChild(canvas);
		game.start();
	}).catch(err => {
		alert(err);
	});
});