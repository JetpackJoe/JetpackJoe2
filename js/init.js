import {Game} from './game.js';
window.addEventListener('DOMContentLoaded', ()=>{
	let game = new Game();
	game.init().then(canvas=>{
		document.querySelector('#noscript').style.display = 'none';
		document.body.appendChild(canvas);
		// If you are on a touch device then this might be a smart idea.
		if(navigator.userAgent.match(/(Android|webOS|i(Pod|Pad|Phone)|BlackBerry|Phone|Silk)/gi))
			controller.toggleMobileController();
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