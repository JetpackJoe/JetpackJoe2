export class Color {
	constructor() {
		if(arguments.length == 3 || arguments.length == 4) {
			this.r = arguments[0];
			this.g = arguments[1];
			this.b = arguments[2];
			this.a = arguments[3] || 0xFF;
		} else if(arguments.length == 1 && typeof arguments[0] == 'string') {
			let color = arguments[0].toUpperCase().match(/[0-9a-f]/gi);
			if(color.length == 3 || color.length == 4) {
				this.r = parseInt('0x' + (color[0].repeat(2)));
				this.g = parseInt('0x' + (color[1].repeat(2)));
				this.b = parseInt('0x' + (color[2].repeat(2)));
				this.a = parseInt('0x' + ((color[3] || 'F').repeat(2)));
			} else {
				this.r = parseInt('0x' + (color[0]));
				this.g = parseInt('0x' + (color[1]));
				this.b = parseInt('0x' + (color[2]));
				this.a = parseInt('0x' + ((color[3] || 'FF')));
			}
		}
	}
	toString(num = 10) {
		switch(num) {
			default:
			case 10:
				return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
			case 16:
				return `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(16)}`;
		}
	}
	lighten(num = 0) {
		this.r += num;
		this.g += num;
		this.b += num;
		return this;
	}
	darken(num = 0) {
		this.r -= num;
		this.g -= num;
		this.b -= num;
		return this;
	}
}
Color.RED = new Color(0xFF, 0x00, 0x00);
Color.ORANGE = new Color(0xFF, 0x88, 0x00);
Color.YELLOW = new Color(0xFF, 0xFF, 0x00);
Color.GREEN = new Color(0x00, 0x00, 0xFF);
Color.PURPLE = new Color(0x70, 0x00, 0x70);
Color.WHITE = new Color(0xFF, 0xFF, 0xFF);
Color.BLACK = new Color(0x00, 0x00, 0x00);