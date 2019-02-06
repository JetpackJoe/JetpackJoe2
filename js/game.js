import {Level} from './level.js';
import {Spritelist} from './sprite.js';
import {Entity, Player} from './entity.js';
import {Vector, gravity} from './vector.js';
export class Game {
	constructor() {
		// Copy this
		window.t = this;
		let self = this;
		// Store important things
		self.player = new Player();
		self.entities = [];
		self.levels = [];
		self.canvas = document.createElement('canvas');
		self.context = self.canvas.getContext('2d');
		// Controls
		this.keysDown = {};
	}
	getPlayer() {
		return this.player;
	}
	init() {
		// Copy this
		let self = this;
		self.fps = 'N/A';
		self.fra = 0;
		self.lfu = new Date().getTime()
		// Level 0 is a good start
		// NO NOT LEVEL 1 THAT ISWN'T A TYPO
		// I NEVE RMAKE THOSE!1!
		self.level = 0; // Seriously though, level 0
		// Starry sky
		self.stars = [];
		// I love for loops
		for(;self.stars.length<80;self.stars.push([Math.random()*100,Math.random()*100,Math.random()*2+1])) {};
		// I promise!
		return new Promise((acc, rej) => {
			fetch('assets/levels.json').then(res => {
				res.json().then(json => {
					let {levels} = json;
					for(let i = 0; i < levels.length; i++) {
						self.levels.push(new Level(levels[i]));
					}
					let arr = [];
					for(let i = 0; i < self.levels.length; i++) {
						arr.push(Promise.resolve(self.levels[i].load()));
					}
					Promise.all(arr).then(values => {
						// Spawn in the player and...
						self.getPlayer().respawn(self.levels[self.level]);
						// See? I told you! What could ever have gone wrong?!
						acc(self.canvas);
					}).catch(err => {
						// I must be too busy.. yeah that's it!
						rej(err);
					});
				}).catch(err => {
					// Ehhh fuck it
					rej(err);
				});
			}).catch(err => {
				// Haha I lied
				rej(err);
			});
		});
	}
	displayFps() {
		this.context.font = '24px Ubuntu Mono';
		this.context.fillText(this.fps + 'FPS', 16, 32);
	}
	drawStars() {
		// Set the fill colour to white
		this.context.fillStyle = 'white';
		// Loop through and draw stars
		for(let i = 0; i < this.stars.length; i++) {
			this.context.fillRect(
				// Use the modulous (%) operator along with adding 100 to ensure it's on screen
				(this.canvas.width/100*(this.stars[i][0]+100)-this.player.pos.x/2*this.stars[i][2])%this.canvas.width,
				this.canvas.height/100*this.stars[i][1],
				this.canvas.height/100*this.stars[i][2]/2,
				this.canvas.height/100*this.stars[i][2]/2
			);
		}
	}
	frame() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.fra ++;
		if(new Date().getTime() > 999 + this.lfu) {
			this.fps = this.fra;
			this.fra = 0;
			this.lfu = new Date().getTime();
		}
		this.drawStars();
		this.displayFps();
		this.levels[this.level].drawOn(
			this.context,
			this.getPlayer().pos.x - this.getPlayer().screenX
		);
		this.getPlayer().drawOn(this.context);
		setTimeout(this.frame.bind(this));
	}
	update() {
		// Do player update
		this.getPlayer().doUpdate(this.levels[this.level], gravity);
		// Unfuck the controls
		for(let key in this.keysDown) {
			switch(key) {
				case 'A':
					this.getPlayer().vel.x = this.keysDown[key] * -2;
					delete this.keysDown[key];
					break;
				case 'D':
					this.getPlayer().vel.x = this.keysDown[key] * +2;
					delete this.keysDown[key];
					break;
				case 'W':
					if(this.getPlayer().onGround)
						this.getPlayer().vel.y = this.keysDown[key] * -2;
						delete this.keysDown[key];
					break;
			}
		}
		requestAnimationFrame(this.update.bind(this));
	}
	start(w = 640, h = 360) {
		this.canvas.width = w;
		this.canvas.height = h;
		requestAnimationFrame(this.frame.bind(this));
		requestAnimationFrame(this.update.bind(this));
	}
	setSize(w = this.canvas.width, h = this.canvas.height) {
		this.canvas.width = w;
		this.canvas.height = h;
	}
	keyEvent(key, down) {
		this.keysDown[key.toUpperCase()] = down;
	}
}