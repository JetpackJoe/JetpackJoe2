import {Game} from './game.js';
window.addEventListener('DOMContentLoaded', ()=>{
	let game = new Game();
	game.init().then(canvas=>{
		document.querySelector('#noscript').style.display = 'none';
		document.body.appendChild(canvas);
		// Make the following depend on screen-res
		game.start(
			window.innerWidth, 
			window.innerHeight
		);
		// Window Resize Event
		window.addEventListener('resize',
			evt => game.setSize(window.innerWidth, window.innerHeight)
		);
		// The best part is how well it scales ^
		// Not one issue :D
		//	EDIT: Not one issue AFAIK D:
	}).catch(err => {
		alert(err);
	});
});