import {Vector} from './vector.js';
import {Sprite} from './sprite.js';
export class Entity {
	constructor(x = 0, y = 0, w = 1, h = 1) {
		this.pos = new Vector(x, y);
		this.vel = new Vector(0, 0);
		this.lastUpdate = null; // Not updated yet
		this.sprite = new Sprite('entities.enemy', 'blue');
		this.size = new Vector(w, h); // Repurpose a Vector
		this.scale = new Vector(1, 1);
	}
	respawn(lvl) {
		this.vel.y = -1;
		this.pos.y = lvl.json.spawn[0];
		this.pos.x = lvl.json.spawn[0];
	}
	doUpdate() {
		throw new Error("You can't run 'doUpdate' on this entity");
	}
	renderOn(ctx, ss)  {
		throw new Error("You can't run 'renderOn' on this entity");
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
		// Respawn the player
		if(this.pos.y > 300)
			this.respawn(lvl);
		// Don't allow control after a point of falling
		if(this.pos.y > 120)
			this.vel.x = 0;
		// Check if on ground for physics
		this.onGround = lvl.checkForCollisions(this, false, true, 0 * this.screenX);
		if(this.onGround != false) {
			switch(this.onGround) {
				case 'evt.finish';
					this.vel['y'] = 0;
					game.level ++;
					break;
				case true:
					this.vel['y'] = 0;
					break;
			}
		}
		if(lvl.checkForCollisions(this, true, false, 0 * this.screenX)) {
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