export class Level {
	constructor(inf = {}) {
		let self = this;
		fetch('assets/levels.json').then(res => {
			res.json().then(json => {
				self.json = json;
			});
		});
		this.name = inf.name || 'undefined';
	}
}