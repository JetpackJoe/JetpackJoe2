import {Game} from './game.js';
window.addEventListener("DOMContentLoaded", ()=>{
	let game = new Game();
	game.init().then(()=>{
		document.querySelector('#noscript').style.display='none';
		document.body.innerText = JSON.stringify(game.levels);
	});
});