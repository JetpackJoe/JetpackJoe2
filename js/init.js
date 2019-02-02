import {Game} from './game.js';
window.addEventListener("DOMContentLoaded", ()=>{
	let game = new Game();
	game.init().then(g=>{
		document.querySelector('#noscript').style.display='none';
		document.body.innerText = JSON.stringify(game.levels);
	}).catch(err => {
		alert(err);
	});
});