export class Level {
	constructor(inf = {}) {
		let self = this;
		this.inf = inf;
	}
	load() {
		let self = this;
		return new Promise((acc, rej)=>{
			fetch(self.inf.file).then(res => {
				self.name = self.inf.name || 'undefined';
				res.json().then(json => {
					self.json = json;
					acc(self);
				}).catch(rej);
			}).catch(rej);
		});
	}
	drawOn(ctx, playerX = 0) {
		// todo: do this
		for(let block of this.json.blocks) {
			ctx.fillStyle = this.json.blocks[4] || '#000';
			ctx.fillRect(
				this.json.blocks[0]-playerX,
				this.json.blocks[1],
				this.json.blocks[2],
				this.json.blocks[3]
			);
		};
	}
}