export class Entity {
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