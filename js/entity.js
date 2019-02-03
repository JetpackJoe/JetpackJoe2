import {Vector} from './vector.js';
export class Entity {
	constructor(x = 0, y = 0) {
		this.pos = new Vector(x, y);
	}
	doUpdate(date) {
		throw new Error("You can't run 'doUpdate' on this entity");
	}
	renderOn(ctx)  {
		throw new Error("You can't run 'renderOn' on this entity");
	}
	checkCollisions(entity) {
		throw new Error("You cant run 'checkCollisions' on this entity");
	}
}
export class Player extends Entity {
	constructor() {
		super(0, 0);
	}
}