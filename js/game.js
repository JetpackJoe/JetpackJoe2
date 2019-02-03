import {Level} from './level.js';
export class Game {
	constructor() {
		// Copy this
		let self = this;
		// Store important things
		self.entities = [];
		self.levels = [];
		self.canvas = document.createElement('canvas');
		self.context = self.canvas.getContext('2d');
	}
	init() {
		// Copy this
		let self = this;
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
						// See? I told you!
						acc(self);
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
}