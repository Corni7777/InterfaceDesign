var Interface = Interface || {};

Interface.Rectangle = class {

    static Swidth = 50;
    static Sheigth = 30;
    static textureImage = new Image();

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
    
        // Setze die Farbe für die Umrandung
        ctx.strokeStyle = "white";
    
        if (this.broken == false) {
            // Zeichne die Textur auf den Block
            ctx.drawImage(Interface.Rectangle.textureImage, this.x, this.y, this.width, this.height);
            // Zeichne die Umrandung
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    
        if (this.broken == true) {
            var part1 = { x: this.x, y: this.y, width: this.width / 2, height: this.height };
            var part2 = { x: this.x + this.width / 2, y: this.y, width: this.width / 2, height: this.height };
    
            if (part1.width > 0) {
                part1.width -= 5;
                part1.x += -30;
                part1.y -= -30;
                // Zeichne die Textur auf den ersten Teil des gebrochenen Blocks
                ctx.drawImage(Interface.Rectangle.textureImage, part1.x, part1.y, part1.width, part1.height);
                // Zeichne die Umrandung
                ctx.strokeRect(part1.x, part1.y, part1.width, part1.height);
            }
    
            if (part2.width > 0) {
                part2.width -= 5;
                part2.x += 30;
                part2.y -= 30;
                // Zeichne die Textur auf den zweiten Teil des gebrochenen Blocks
                ctx.drawImage(Interface.Rectangle.textureImage, part2.x, part2.y, part2.width, part2.height);
                // Zeichne die Umrandung
                ctx.strokeRect(part2.x, part2.y, part2.width, part2.height);
            }
        }
    }
};

Interface.Rectangle.textureImage.src = "texture_bw.jpg"; // Aufruf außerhalb der Klasse, um das Bild zu laden
