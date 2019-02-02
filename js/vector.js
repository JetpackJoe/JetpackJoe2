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
  }



