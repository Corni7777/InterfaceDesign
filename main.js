var Interface;
(function (Interface) {
    var circle;
    var rectangles = [];
    var timer;

    window.addEventListener("load", hndLoad);

    function hndLoad() {

        var playground = document.querySelector("#playground");
        timer = setInterval(createRectangle, 500);

        circle = new Interface.circle(window.innerWidth / 2, window.innerHeight / 2, 0.05);
        playground.addEventListener("mousemove", moveCircle);
        animate(); // Starte die Animation
    }

    function moveCircle(event) {
        var canvas = document.getElementById("playground");
        var canvasRect = canvas.getBoundingClientRect();
        // Mauskoordinaten relativ zum Canvas
        var mouseX = event.clientX - canvasRect.left;
        var mouseY = event.clientY - canvasRect.top;
        // update-Funktion mit den relativen Mauskoordinaten
        circle.update(mouseX, mouseY);
    }
    function createRectangle() {
        var rectangle = new Interface.Rectangle(playground);
        rectangles.push(rectangle);
    }

    function animate() {
        requestAnimationFrame(animate);
        clearCanvas();
        for (var i = 0; i < rectangles.length; i++) {
            rectangles[i].move();
            rectangles[i].display();
            if (rectangles[i].hasCrossedCanvas()) {
                rectangles.splice(i, 1);
                i--;
            }
        }
        circle.display();
    }
    function clearCanvas() {
        let ctx = playground.getContext("2d");
        ctx.clearRect(0, 0, playground.width, playground.height);
    }


})(Interface || (Interface = {}));