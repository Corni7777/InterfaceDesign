var Interface = Interface || {};

Interface.score = class {
    constructor() {
        this.score = 0;
        this.combo = 0;
      }
    
      // Erhöhe den Score basierend auf der aktuellen Combo
      increaseScore() {
        this.score += this.combo;
      }
    
      // Erhöhe die Combo um 1
      increaseCombo() {
        this.combo++;
      }
    
      // Setze die Combo zurück
      resetCombo() {
        this.combo = 0;
      }
    
      // Zeige den Score oben rechts auf dem Canvas an
      display() {
        var canvas = document.getElementById("playground");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.font = "20px Arial";
        ctx.textAlign = "right";
        ctx.fillText(`Score: ${this.score} Combo: ${this.combo}`, canvas.width - 10, 30);
      }


};