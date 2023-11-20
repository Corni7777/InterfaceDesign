var Interface;
(function (Interface) {
    var circle;

    window.addEventListener("load", hndLoad);

    function hndLoad() {
        circle = new Interface.circle(window.innerWidth / 2, window.innerHeight / 2, 0.05);
        var playground = document.querySelector("#playground");
        playground.addEventListener("mousemove", moveCircle);
        animate(); // Starte die Animation
    }

    function moveCircle(event) {
        circle.update(event.clientX, event.clientY);
    }

    function animate() {
        
        requestAnimationFrame(animate);
        circle.update(circle.targetX, circle.targetY);
        circle.display();
    }

})(Interface || (Interface = {}));