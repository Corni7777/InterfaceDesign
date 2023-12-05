var Interface = Interface || {};

Interface.Rectangle = class {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = 50;
        this.height = 30;
        this.x = Math.random() < 0.5 ? -this.width : this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.speed = Math.random() * 7 + 3;
        this.vx = Math.random() < 0.5 ? this.speed : -this.speed;
        this.vy = Math.random() * 2 - 1;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
    }

    hasCrossedCanvas() {
        return (
            this.x > this.canvas.width ||
            this.x + this.width < 0 ||
            this.y > this.canvas.height ||
            this.y + this.height < 0
        );
    }



    display() {
        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};