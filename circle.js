var Interface = Interface || {};

Interface.circle = class {
    constructor(x, y, easing) {
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
        this.easing = easing;
    }

    update(_targetX, _targetY) {
        // Setze die Zielposition auf die Mausposition
        this.targetX = _targetX;
        this.targetY = _targetY;
    }

    display() {
        var canvas = document.getElementById("playground");
        var ctx = canvas.getContext("2d");
        // Berechne die Easing-Position basierend auf der aktuellen Position der Ellipse
        let dx = this.targetX - this.x;
        this.x += dx * this.easing;
    
        let dy = this.targetY - this.y;
        this.y += dy * this.easing;
    
        ctx.beginPath();
        ctx.arc(this.x, this.y, 33, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();

    }
};