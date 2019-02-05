import {Game} from './game.js';
window.addEventListener("DOMContentLoaded", ()=>{
	let game = new Game();
	game.init().then(canvas=>{
		document.querySelector('#noscript').style.display = 'none';
		document.body.appendChild(canvas);
		// TODO: Make the following depend on screen-res
		game.start(1440, 720);
	}).catch(err => {
		alert(err);
	});
});