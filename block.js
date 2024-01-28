var Interface = Interface || {};

Interface.Rectangle = class {

    static Swidth = 50;
    static Sheigth = 30;

    constructor(canvas) {
        this.canvas = canvas;
        this.width = Interface.Rectangle.Swidth;
        this.height = Interface.Rectangle.Sheigth;
        this.x = Math.random() < 0.5 ? -this.width : this.canvas.width;
        this.y = Math.random() * (0.7 * this.canvas.height) + 0.15 * this.canvas.height;
        this.maxSpeed = 4.5; // Maximaler Speed
        this.minSpeed = 3; // Minimaler Speed
        this.speed = Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed;
        this.vx = Math.random() < 0.5 ? this.speed : -this.speed;
        this.vy = Math.random() * 2 - 1;
        this.broken = false;
        this.initialSpawned = false;
    }

    move() {
        if (this.broken == false) {
            this.x += this.vx;
            this.y += this.vy;
        }

        if (this.broken == true) {
            this.x;
            this.y += 5;
        }
    }


    hasCrossedCanvas() {
        if (this.x > 0 && this.x < this.canvas.width) {
            this.initialSpawned = true;
        }
        if (this.initialSpawned == true) {
            return (
                this.x > this.canvas.width ||
                this.x + this.width < 0 ||
                this.y > this.canvas.height ||
                this.y + this.height < 0
            );
        }


    }

    breakBlock() {
        this.broken = true;
    }


    display() {
        var ctx = this.canvas.getContext("2d");
        if (this.broken == false) {
            ctx.fillStyle = "#8C1788";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if (this.broken == true) {
            var part1 = { x: this.x, y: this.y, width: this.width / 2, height: this.height };
            var part2 = { x: this.x + this.width / 2, y: this.y, width: this.width / 2, height: this.height };
            if (part1.width > 0) {
                part1.width -= 5;
                part1.x += -30;
                part1.y -= -30;
                ctx.fillStyle = "#8C1788";
                ctx.fillRect(part1.x, part1.y, part1.width, part1.height);
            }
            if (part2.width > 0) {
                part2.width -= 5;
                part2.x += 30;
                part2.y -= 30;
                ctx.fillStyle = "#8C1788";
                ctx.fillRect(part2.x, part2.y, part2.width, part2.height);
            }
        }

    }
};