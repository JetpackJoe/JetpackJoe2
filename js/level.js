import {Spritelist} from './sprite.js';
import {Color} from './color.js';
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
					self.ss = new Spritelist(self.json.sprites);
					acc(self);
				}).catch(rej);
			}).catch(rej);
		});
	}
	drawOn(ctx, playerX = 0, ss = this.ss) {
		for(let block of this.json.blocks) {
			let drawAt = [
				ctx.canvas.width*(block[0]-playerX)/100,
				ctx.canvas.height*(block[1])/100,
				ctx.canvas.width*(block[2])/100,
				ctx.canvas.height*(block[3])/100
			];
			if(block[4].includes(':')) {
				ss.draw(block[4], ctx, ...drawAt)
			} else {
				let colour = new Color(block[4] || '#000');
				ctx.fillStyle = colour.darken(0x0F);
				ctx.strokeStyle = colour.lighten(0x1F);
				ctx.lineWidth = ctx.canvas.height * 0.005;
				ctx.rect(...drawAt);
				ctx.fill(); // fill it up
				ctx.stroke(); // uhh well you see.. it's having a stroke
			}
		}
	}
}