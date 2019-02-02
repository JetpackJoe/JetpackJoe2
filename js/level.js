export class Level {
	constructor(inf = {}) {
		let self = this;
		this.inf = inf;
	}
	load() {
		return new Promise((acc, rej)=>{
			fetch(inf.file).then(res => {
				res.json().then(json => {
					self.json = json;
				});
				this.name = this.inf.name || 'undefined';
			});
		});
	}
}