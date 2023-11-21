var Interface;
(function (Interface) {
    var circle;

    window.addEventListener("load", hndLoad);

    function hndLoad() {

        var playground = document.querySelector("#playground");
        circle = new Interface.circle(window.innerWidth / 2, window.innerHeight / 2, 0.05);

        playground.addEventListener("mousemove", moveCircle);
        animate(); // Starte die Animation

    }

    function moveCircle(event) {
        var canvas = document.getElementById("playground");
        var canvasRect = canvas.getBoundingClientRect();

        // Berechne die Mauskoordinaten relativ zum Canvas
        var mouseX = event.clientX - canvasRect.left;
        var mouseY = event.clientY - canvasRect.top;

        // Rufe die update-Funktion mit den relativierten Mauskoordinaten auf
        circle.update(mouseX, mouseY);

    }

    function animate() {

        requestAnimationFrame(animate);
        circle.display();
    }

})(Interface || (Interface = {}));