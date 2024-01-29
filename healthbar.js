var Interface = Interface || {};

Interface.healthbar = class {
    constructor(initialLives) {
        this.lives = initialLives;
        this.maxLives = initialLives;
        this.width = 540;
        this.height = 40;
        this.x =  30;
        this.y = 47;
      }
    
      // Verringere die Anzahl der Leben um 1
      decreaseLife() {
        this.lives--;
        if (this.lives < 0) {
          this.lives = 0;
        }
      }
    
      // Zeige die Lebensleiste oben rechts auf dem Canvas an
      display() {
        var canvas = document.getElementById("playground");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#0266E0";
        ctx.fillRect(this.x, this.y, (this.width * this.lives) / this.maxLives, this.height);
    
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
      }
    
      // Überprüfe, ob das Spiel vorbei ist (wenn keine Leben mehr übrig sind)
      isGameOver() {
        return this.lives === 0;
      }
};