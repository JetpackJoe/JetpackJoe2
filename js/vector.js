// Vector to store position
export class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	add(vector) {
		if(vector instanceof Vector) {
			this.x += vector.x;
			this.y += vector.y;
		} else {
			throw new Error("Vector.add( ... ) needs a Vector object to add");
		}
	}
	div(num) {
		let v = new Vector(this.x, this.y);
		v.x /= num;
		v.y /= num;
		return v;
	}
	mult(num) {
		let v = new Vector(this.x, this.y);
		v.x *= num;
		v.y *= num;
		return v;
	}
}
// Gravity should be a constant!
const gravity = new Vector(0, 0.1);
export {gravity};