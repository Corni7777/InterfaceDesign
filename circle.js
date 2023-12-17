var Interface = Interface || {};

Interface.circle = class {


    constructor(x, y, easing) {
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
        this.easing = easing;
        this.radius = 33
    }

    update(_targetX, _targetY) {
        // Setze die Zielposition auf die Mausposition
        this.targetX = _targetX;
        this.targetY = _targetY;
    }
    hit(rectangle) {
        // Berechne den Abstand zwischen dem Mittelpunkt des Kreises und dem Mittelpunkt des Rechtecks
        let dx = Math.abs(this.x - (rectangle.x + rectangle.width / 2));
        let dy = Math.abs(this.y - (rectangle.y + rectangle.height / 2));
    
        // Wenn der Abstand in x kleiner ist als die Summe von radius und halber Rechteckbreite 
        // und der Abstand in y kleiner ist als die Summe von radius und halber Rechteckhöhe,
        // dann gibt es eine Kollision
        if (dx < (rectangle.width / 2 + this.radius) && dy < (rectangle.height / 2 + this.radius)) {
          return true;
        }
    
        return false;
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
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();

    }
};