export class level {
	constructor(url) {
		let self = this;
		fetch(url, {}).then(response => {
			self.level = response.json();
		});
	}
}