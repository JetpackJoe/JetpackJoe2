export class Level {
	constructor(inf = {}) {
		let self = this;
		this.inf = inf;
	}
	load() {
		return new Promise((acc, rej)=>{
			let self = this;
			fetch(inf.file).then(res => {
				self.name = self.inf.name || 'undefined';
				res.json().then(json => {
					self.json = json;
					acc(self);
				}).catch(rej);
			}).catch(rej);
		});
	}
}