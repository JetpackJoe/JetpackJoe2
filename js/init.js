import {Game} from './game.js';
window.addEventListener('DOMContentLoaded', ()=>{
	let game = new Game();
	game.init().then(canvas=>{
		document.querySelector('#noscript').style.display = 'none';
		document.body.appendChild(canvas);
		// Keyboard events
		window.addEventListener('keydown',	evt => game.keyEvent(evt.key, true));
		window.addEventListener('keyup',	evt => game.keyEvent(evt.key, false));
		// Make the following depend on screen-res
		game.start(
			window.innerWidth, 
			window.innerHeight
		);
		// Window Resize Event
		window.addEventListener('resize',
			evt => game.setSize(window.innerWidth, window.innerHeight)
		);
	}).catch(err => {
		alert(err);
	});
});