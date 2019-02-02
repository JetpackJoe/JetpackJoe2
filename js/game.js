class Game {
	constructor() {
		// Copy this
		let self = this;
		// Store important things
		self.entities = [];
		self.levels = [];
		fetch('assets/levels.json').then(res => {
			res.json().then(json => {
				console.log(json);
			});
		});
	}
	init() {}
}