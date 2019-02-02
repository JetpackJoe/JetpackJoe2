window.addEventListener("DOMContentLoaded", ()=>{
	let game = new Game();
	game.init();
	document.querySelectorAll('#noscript').forEach(e=>e.style.display='none')
});