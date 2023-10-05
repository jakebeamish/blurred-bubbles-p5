let c1, c2;




let bubbles = [];

let colours = ['darkgray', 'slategray', 'teal', 'darkslategray', 30]

function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();

	for (let i = 0; i < 1000; i++) {
		let bubble = new Bubble(random(-100, width + 100), random(-100, height + 100));
		bubbles.push(bubble);
	}

	bubbles.sort((a, b) => a.r - b.r)
}

function draw() {
	clear();
	background(9);
	let b = color('darkblue');
	b.setAlpha(40 + sin(frameCount * 0.000777 % TAU) * 10);
	background(b);
	let b2 = color('green');
	b2.setAlpha(40 + sin(frameCount * 0.00111111 % TAU) * 20);
	background(b2);

	for (let bubble of bubbles) {
		bubble.ascend();
		bubble.update();
		bubble.wrap();
		bubble.show();
	}

	for (let i = 0; i < 1000; i++) {
		push();
		let c = color(random(colours));
		c.setAlpha(1);
		strokeWeight(10);
		stroke(c);
		point(random(width), random(height));
		pop();
	}

}

class Bubble {
	constructor(x, y) {
		this.position = createVector(x, y);
		this.acceleration = createVector();
		this.velocity = createVector();
		this.r = random();
		this.size = map(pow(this.r, 6), 0, 1, 10, (width + height) * 0.5 / 50);
		this.speed = map(this.r, 0, 1, 0.2, 1);
		this.colour = random(colours);
	}

	ascend() {
		// this.acceleration.add(0, -0.01)
		let x = map(noise(this.position.x * 0.02, this.position.y * 0.02, frameCount * 0.01), 0, 1, -1, 1) * this.speed;
		this.acceleration = createVector(x, -this.speed);
	}

	update() {
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.velocity.mult(0);
	}

	show() {
		// noStroke();
		let c = color(this.colour);
		c.setAlpha(5 + sin(((frameCount* this.r * 0.01)+this.r*TAU) % TAU) * 8);
		fill(c);
		circle(this.position.x, this.position.y, this.size);
	}

	wrap() {
		let min = -100;
		let maxWidth = width + 100;
		let maxHeight = height + 100;
		let x = this.position.x;
		let y = this.position.y;
		x = (((x - min) + (maxWidth - min)) % (maxWidth - min)) + min;
		y = (((y - min) + (maxHeight - min)) % (maxHeight - min)) + min;
		this.position = createVector(x, y);
	}
}