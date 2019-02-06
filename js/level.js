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
			// Only render if onscreen
			// Not going to affect preformance now
			// But it might in the case of a bigger level
			// be safe rather than sorry
			if(drawAt[0] + drawAt[2] > 0 && drawAt[0] < ctx.canvas.width) {
				if(block[4].includes(':')) {
					// Uncommenting the following lines adds a shadow
					// However, the shadow will cause a lot of lag :/
					// let shadowAt = [
					// 	h * (block[0] - playerX + 0.75) / 100,
					// 	h * (block[1] + 0.75) / 100,
					// 	h * (block[2]) / 100,
					// 	h * (block[3]) / 100
					// ];
					// ctx.filter = 'brightness(30%) blur(8px)';
					// ss.draw(block[4], ctx, ...shadowAt);
					// ctx.filter = 'none';
					ss.draw(block[4], ctx, ...drawAt);
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
	}
	checkForCollisions(entity, addX = false, addY = true, padX = 0) {
		for(let plat of this.json.blocks) {
			if((entity.pos.x + (addX ? entity.vel.x : 0)) + (entity.size.x / 2 + padX) < plat[0] + plat[2] && 
				(entity.pos.x + (addX ? entity.vel.x : 0)) + (entity.size.x / 2 + padX) > plat[0]) {
				// then it's within the same X-general-area
				if((entity.pos.y + (addY ? entity.vel.y : 0)) + entity.size.y > plat[1] &&
					(entity.pos.y + (addY ? entity.vel.y : 0)) < plat[1] + plat[3]) {
					// Collision
					// We're all gonna die
					return true;
				}
			}
		}
		return false;
	}
}