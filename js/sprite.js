export class Sprite {
	constructor(name, state) {
		let self = this;
		self.state = state;
		self.image = new Image();
		fetch('assets/textures.json').then(response => {
			return response.json();
		}).then(json => {
			self.self_obj = json;
			for(let key of name.split('.'))
				self.self_obj = self.self_obj[key];
			self.image.src = self.self_obj.sprite;
		});
	}
	drawAt(ctx, x, y, w, h, sx = 0, sy = 0, sw = 0, sh = 0) {
		if(!('self_obj' in this))
			return -1;
		let src = this.self_obj.states[this.state];
		src[0] += sx;
		src[1] += sy;
		src[2] += sw;
		src[3] += sh;
		ctx.drawImage(this.image, ...src, x, y, w, h);
	}
}

export class Spritelist {
	constructor(list) {
		let self = this;
		self.sprites = {};
		for(let sprite of list) {
			self.sprites[sprite] = new Sprite(...(sprite.split(':')));
		};
	}
	draw(name, ctx, x, y, w, h) {
		this.sprites[name].drawAt(ctx, x, y, w, h);
	}
}