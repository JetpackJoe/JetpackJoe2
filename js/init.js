import {Game} from './game.js';
window.addEventListener("DOMContentLoaded", ()=>{
	let game = new Game();
	game.init().then(canvas=>{
		document.querySelector('#noscript').style.display = 'none';
		document.body.appendChild(canvas);
		game.start(960, 720);
	}).catch(err => {
		alert(err);
	});
});