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
	drawAt(ctx, x, y, w, h, scaleX = 1, scaleY = 1, animFrame = 0) {
		if(!('self_obj' in this))
			return -1;
		if(!(this.state in this.self_obj.states)) 
			return alert("404 " + this.state) || -1;
		let src = this.self_obj.states[this.state];
		if(typeof src[0] == 'number') {
			// Support for single sprite for an entity
			src[1] += src[3] * animFrame;
			ctx.save();
			ctx.translate(x + w/2, y);
			ctx.scale(scaleX, scaleY);
			ctx.drawImage(this.image, ...src, -w/2, 0, w, h);
			ctx.restore();
			src[1] -= src[3] * animFrame;
		} else {
			// Support for rendering a 3-part block to avoid stretching
			for(let i = 0; i < src.length; i++) {
				if(i == 0) 
					ctx.drawImage(this.image, ...src[i], x, y, h, h);
				else if(i == 1)
					ctx.drawImage(this.image, ...src[i], x+h, y, w-h*2, h);
				else if(i == 2)
					ctx.drawImage(this.image, ...src[i], x+w-h, y, h, h);
			}
		}
	}
}

export class Spritelist {
	constructor(list = []) {
		let self = this;
		self.sprites = {};
		for(let sprite of list) {
			self.sprites[sprite] = new Sprite(...(sprite.split(':')));
		}
	}
	draw(name, ctx, x, y, w, h) {
		ctx.imageSmoothingEnabled = false;
		if(name in this.sprites) this.sprites[name].drawAt(ctx, x, y, w, h);
	}
}