export class Sprite {
	constructor(data) {
		this.image = new Image();
		this.image.src = data.file;
		this.frame = 0;
	}
	drawAt(ctx, x, y, w, h) {
		ctx.drawImage(this.image, x, y, w, h);
	}
}