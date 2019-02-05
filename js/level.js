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
		// use 1% screheight as a unit
		let h = ctx.canvas.height;
		for(let block of this.json.blocks) {
			let drawAt = [
				h * (block[0] - playerX) / 100,
				h * (block[1]) / 100,
				h * (block[2]) / 100,
				h * (block[3]) / 100
			];
			if(block[4].includes(':')) {
				ss.draw(block[4], ctx, ...drawAt)
			} else {
				let colour = new Color(block[4] || '#000');
				ctx.fillStyle = colour.darken(0x0F);
				ctx.strokeStyle = colour.lighten(0x1F);
				ctx.lineWidth = h * 0.005;
				ctx.rect(...drawAt);
				ctx.fill(); // fill it with colour
				ctx.stroke(); // uhh well you see.. it's having a stroke
			}
		}
	}
	checkForCollisions(entity) {
		for(let plat of this.json.blocks) {
			if(entity.pos.x < this.json.blocks[0] + this.json.blocks[2] && 
				entity.pos.x > this.json.blocks[0]) {
				// then it's within the same X-general-area
				if(entity.pos.y > this.json.blocks[1] &&
					entity.pos.y < this.json.blocks[1]+this.json.blocks[3]) {
					// MAY DAY!!
					// may the day.. come when you'll crash?
					// sure
					return true;
				}
			}
		}
		return false;
	}
}