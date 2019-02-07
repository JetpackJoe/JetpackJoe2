export class Controller {
	constructor() {
		this.mobile = false;
		this.keysDown = {};
		// Keyboard events
		window.addEventListener('keydown',	evt => this.keyEvent(evt.key, true));
		window.addEventListener('keyup',	evt => this.keyEvent(evt.key, false));
	}
	setGame(g) {
		this.g = g;
	}
	toggleMobileController(on = !this.mobile) {
		// This will hide/unhide all `mobile`-class elements
		// This assumes that someone has made a controller
		// Which would be a valid assumption
		// if any other dev was leading the project
		this.mobile = on;
		document.querySelectorAll('.mobile').forEach(elem => {
			elem.style.display = this.mobile ? 'inline-block' : 'none';
		});
	}
	unfuck() {
		// Unfuck the controls
		for(let key in this.keysDown) {
			switch(key) {
				case 'A':
					this.g.getPlayer().vel.x = this.keysDown[key] * -2;
					delete this.keysDown[key];
					break;
				case 'D':
					this.g.getPlayer().vel.x = this.keysDown[key] * +2;
					delete this.keysDown[key];
					break;
				case 'W':
					if(this.g.getPlayer().onGround)
						this.g.getPlayer().vel.y = this.keysDown[key] * -2;
						delete this.keysDown[key];
					break;
			}
		}
	}
	keyEvent(key, down) {
		this.keysDown[key.toUpperCase()] = down;
	}
}