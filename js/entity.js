import {Vector} from './vector.js';
import {Sprite} from './sprite.js';
export class Entity {
	constructor(x = 0, y = 0, w = 1, h = 1) {
		this.pos = new Vector(x, y);
		this.vel = new Vector(0, 0);
		this.lastUpdate = null; // Not updated yet
		this.sprite = new Sprite('entities.enemy', 'green');
		this.size = new Vector(w, h); // Repurpose a Vector
		this.scale = new Vector(1, 1);
	}
	respawn(lvl) {
		this.vel.y = -1;
		this.pos.x = lvl.json.spawn[0];
		this.pos.y = lvl.json.spawn[1];
	}
	doUpdate() {
		throw new Error("You can't run 'doUpdate' on this entity");
	}
	renderOn(ctx, ss) {
		throw new Error("You can't run 'renderOn' on this entity");
	}
	groundType(game) {
		switch(this.onGround[5]) {
			case 'evt.bounce':
				this.vel['y'] *= -0.969;
				break;
			case 'evt.speed':
				this.vel['y'] *= -0.9;
				this.vel['x'] *= 4;
				break;
			case 'evt.jump':
				this.vel['y'] = -2;
				break;
			case 'evt.fling':
				this.vel['y'] = 0;
				for(let i in this.onGround[6]) {
					this.vel[i] = this.onGround[6][i];
				}
				break;
			case 'evt.finish':
				this.vel['y'] = 0;
				game.level ++;
				if(game.level >= game.levels.length)
					game.win();
				else
					this.respawn(game.levels[game.level]);
				break;
			default:
			case 'evt.none':
				this.vel['y'] = 0;
				break;
		}
	}
	checkCollisions(entity) {
		throw new Error("You cant run 'checkCollisions' on this entity");
	}
}
export class Player extends Entity {
	constructor(x = 10, y = 10, w = 80, h = 180) {
		super(x, y, w/10, h/10);
	}
	doUpdate(lvl, g, game) {
		// Don't allow control after a point of falling
		if(this.pos.y > 120)
			this.vel.x = 0;
		// Respawn the player
		if(this.pos.y > 300)
			this.respawn(lvl);
		// Check if on ground for physics
		this.onGround = lvl.checkForCollisions(this, false, true);
		if(this.onGround != false) {
			this.groundType(game);
		}
		if(lvl.checkForCollisions(this, true, false)) {
			this.vel['x'] = 0;
		}
		this.pos.add(this.vel);
		this.vel.add(g); // Gravity Check! :D
	}
	drawOn(ctx, s = this.sprite) {
		// Again, units are 1% height
		// Consistancy is key
		let h = ctx.canvas.height / 100;
		// Keep this up to date
		this.screenX = ctx.canvas.width / 2 - this.size.x / 2;
		this.screenX /= h; // Units!
		// Scaling
		this.scale = new Vector(
			this.vel.x < 0 ? -1 : this.vel.x > 0 ? 1 : this.scale.x,
			1
			// this.vel.y < 0 ? -1 : this.vel.y > 0 ? 1 : this.scale.y
			// Bad idea ^
		);
		s.drawAt(ctx,
			this.screenX * h,
			this.pos.y * h,
			this.size.x * h,
			this.size.y * h,
			this.scale.x,
			this.scale.y,
			this.onGround ? 0 : 1
		);
	}
}