export class Entity {
    doUpdate(date) {
        throw new Error("you can't run 'doUpdate' on this entity");
    }
    renderOn(ctx)  {
        throw new Error("you can't run 'renderOn' on this entity");
    }
    checkCollisions(entity) {
        throw new Error("you cant run 'checkCollisions' on this entity");
    }


}