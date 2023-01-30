// Press any key to delete a purple thing.Click anywhere to add one more.
var particles = [];
var cnoise = 0;
var particlesNum = 100;

function setup() {
    createCanvas(windowWidth, windowHeight);
    //pixelDensity(1);
    angleMode(DEGREES);
    for (var i = 0; i < particlesNum; i++) {
        particles[i] = new Particle(random(width), 0, map(noise(cnoise + i), 0, 1, 0, 255));
    }
}


function draw() {
    background(0);
    for (var i = 0; i < particles.length; i++) {
        particles[i].applyForce();
        particles[i].update();
        particles[i].display();
        particles[i].checkEdges();
    }
}

function mousePressed() {
    particles.push(new Particle(mouseX, mouseY, map(noise(cnoise), 0, 1, 0, 255)));
    cnoise += 0.1;
}

function keyPressed() {
    particles.splice(0, 90);
}

function Particle(x, y, c) {
    this.size = 10;

    this.pos = new p5.Vector(x, y); // in processing new PVector(x, y);
    this.vel = new p5.Vector(0, 0); //
    this.acc = new p5.Vector(0, 0); //
    this.history = [];

    this.maxvel = 3;
    this.col = c || 255;

    this.update = function() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxvel);
        this.pos.add(this.vel);

        this.acc.mult(0);

        var hv = createVector(this.pos.x, this.pos.y);
        this.history.push(hv);
        if (this.history.length > 30) {
            this.history.splice(0, 1); 
        }
    }

    this.display = function() {
        noStroke();
        var ca = constrain(c + 30, 0, 250);
        fill(ca, 0, 150);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
        fill(c, 0, 150, 30);
        for (var i = 0; i < this.history.length; i++) {
            ellipse(this.history[i].x, this.history[i].y, i * 2, i * 2);
        }
    }

    this.applyForce = function() {
        var myAngle = random(-360, 360);
        this.acc = p5.Vector.fromAngle(radians(myAngle));
    }

    this.checkEdges = function() {
        if (this.pos.x > width) {
            this.pos.x = 0;
        } else if (this.pos.x < 0) {
            this.pos.x = width;
        }

        if (this.pos.y > height) {
            this.pos.y = 0;
        } else if (this.pos.y < 0) {
            this.pos.y = height;
        }
    }

}
