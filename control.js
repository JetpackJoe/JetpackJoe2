export class Controller {
	constructor() {
		this.mobile = false;
		this.keysDown = {};
		// Keyboard events
		window.addEventListener('keydown',	evt => this.keyEvent(evt, true));
		window.addEventListener('keyup',	evt => this.keyEvent(evt, false));
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
		document.querySelector('#dpad_left').addEventListener('touchstart', evt => this.keyEvent({
			'key': 'a',
			'preventDefault': () => evt.preventDefault()
		}, true));
		document.querySelector('#dpad_right').addEventListener('touchstart', evt => this.keyEvent({
			'key': 'd',
			'preventDefault': () => evt.preventDefault()
		}, true));
		document.querySelector('#dpad_left').addEventListener('touchend', evt => this.keyEvent({
			'key': 'a',
			'preventDefault': () => evt.preventDefault()
		}, false));
		document.querySelector('#dpad_right').addEventListener('touchend', evt => this.keyEvent({
			'key': 'd',
			'preventDefault': () => evt.preventDefault()
		}, false));
		document.querySelector('#btn_a').addEventListener('touchstart', evt => this.keyEvent({
			'key': 'w',
			'preventDefault': () => evt.preventDefault()
		}, true));
		document.querySelector('#btn_a').addEventListener('touchend', evt => this.keyEvent({
			'key': 'w',
			'preventDefault': () => evt.preventDefault()
		}, false));
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
					if(this.g.getPlayer().onGround && this.keysDown[key])
						this.g.getPlayer().vel.y = -2;
					break;
			}
		}
	}
	keyEvent(evt, down) {
		if(evt.key != 'r' && !evt.ctrlKey) evt.preventDefault();
		this.keysDown[evt.key.toUpperCase()] = down;
		switch(evt.key.toLowerCase()) {
			case 'a':
				document.querySelector('#dpad_left').classList[down?'add':'remove']('down');
				break;
			case 'd':
				document.querySelector('#dpad_right').classList[down?'add':'remove']('down');
				break;
			case 'w':
				document.querySelector('#btn_a').classList[down?'add':'remove']('down');
				break;
			case 's':
				document.querySelector('#btn_b').classList[down?'add':'remove']('down');
				break;
		};
	}
}