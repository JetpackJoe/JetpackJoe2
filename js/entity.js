import {Vector} from './vector.js';
import {Sprite} from './sprite.js';
export class Entity {
	constructor(x = 0, y = 0, w = 1, h = 1) {
		this.pos = new Vector(x, y);
		this.vel = new Vector(0, 0);
		this.lastUpdate = null; // Not updated yet
		this.sprite = new Sprite('entities.enemy', 'blue');
		this.size = new Vector(w, h); // Repurpose a Vector
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
	doUpdate(lvl, g) {
		if(this.lastUpdate == null) this.lastUpdate = new Date().getTime();
		let ms = new Date().getTime() - this.lastUpdate;
		this.onGround = lvl.checkForCollisions(this, this.screenX);
		if(this.onGround) {
			// this.vel['x'] = 0;
			this.vel['y'] = 0;
		}
		this.vel.add(g.div(20).mult(ms));
		this.pos.add(this.vel.div(20).mult(ms));
		this.lastUpdate += ms;
	}
	drawOn(ctx, s = this.sprite) {
		// Again, units are 1% height
		// Consistancy is key
		let h = ctx.canvas.height / 100;
		// Keep this up to date
		this.screenX = ctx.canvas.width / 2 - this.size.x / 2;
		this.screenX /= h; // Units!
		s.drawAt(ctx,
			this.screenX * h,
			this.pos.y * h,
			this.size.x * h,
			this.size.y * h
		);
	}
}