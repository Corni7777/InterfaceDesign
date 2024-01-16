var Interface;
(function (Interface) {
    var circle;
    var rectangles = [];
    var brokenblocks = []
    var timer;
    var score;
    var healthbar
    var woosh = new Audio('woosh.wav');
    var music = new Audio('Helios_fadein.mp3');

    window.addEventListener("load", hndLoad);

    function hndLoad() {
        document.querySelector("#start").addEventListener("click", start);
        window.addEventListener("keydown", function(event) {
            if (event.code === "Space") {
              start();
            }
          });
    }


    function start() {
        
        document.querySelector("#playground").setAttribute("style", "visibility: visible");
        
        var playground = document.querySelector("#playground");
        timer = setInterval(createRectangle, 370);
        setTimeout(function () { clearInterval(timer); MoreBlocks(230);}, 12500);
        

        score = new Interface.score();
        healthbar = new Interface.healthbar(10);

        circle = new Interface.circle(window.innerWidth / 2, window.innerHeight / 2, 0.05);
        playground.addEventListener("mousemove", moveCircle);
        animate(); // Starte die Animation
        // music.play();
        toggleFullScreen();
        
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

            var hitted = circle.hit(rectangles[i])
            if (hitted == true) {
                console.log("hit")
                rectangles[i].breakBlock();
                brokenblocks.push(rectangles[i])
                rectangles.splice(i, 1);
                i--;
                score.increaseCombo();
                score.increaseScore();
                break;
            }

            if (rectangles[i].hasCrossedCanvas()) {
                rectangles.splice(i, 1);
                i--;
                break;
            }
        }
        for (var i = 0; i < brokenblocks.length; i++) {
            brokenblocks[i].move();
            brokenblocks[i].display();
        }
        circle.display();
        score.display();
        healthbar.display();

    }

    function MoreBlocks(_timer) {
        timer = setInterval(createRectangle, _timer);
        console.log("more blocks")
    }



    function clearCanvas() {
        let ctx = playground.getContext("2d");
        ctx.clearRect(0, 0, playground.width, playground.height);
    }









    var isFullScreen = false;
    function toggleFullScreen() {
        if (!isFullScreen) {
            if (playground.requestFullscreen) {
                playground.requestFullscreen();
            } else if (playground.msRequestFullscreen) {
                playground.msRequestFullscreen();
            } else if (playground.mozRequestFullScreen) {
                playground.mozRequestFullScreen();
            } else if (playground.webkitRequestFullscreen) {
                playground.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);
    function handleFullScreenChange() {
        isFullScreen = !isFullScreen;

        if (isFullScreen) {
            // Setze die Größe des Canvas auf die Bildschirmgröße
            playground.width = window.innerWidth;
            playground.height = window.innerHeight;

            circle.radius = 33 * (playground.width / (890 + playground.width / 4)); 

            Interface.Rectangle.Swidth = Interface.Rectangle.Swidth *= (playground.width / (890 + playground.width / 4));
            Interface.Rectangle.Sheigth = Interface.Rectangle.Sheigth *= (playground.height / (500 + playground.height / 4));

            rectangles.forEach(block => {
                block.width *= (playground.width / (890 + playground.width / 4)); 
                block.height *= (playground.height / (500 + playground.height / 4)); 
            });
            brokenblocks.forEach(block => {
                block.width *= (playground.width / (890 + playground.width / 4)); 
                block.height *= (playground.height / (500 + playground.height / 4)); 
            });

            document.addEventListener("mousemove", lockMouse);
        } else {
            // Setze die Größe des Canvas auf die ursprüngliche Größe zurück
            playground.width = 890; // Passe dies an die ursprüngliche Breite an
            playground.height = 560; // Passe dies an die ursprüngliche Höhe an

            circle.radius = 33

            Interface.Rectangle.Swidth = 50
            Interface.Rectangle.Sheigth = 30

            rectangles.forEach(block => {
                block.width = 50
                block.height = 30
            });
            brokenblocks.forEach(block => {
                block.width = 50
                block.height = 30
            });

            document.removeEventListener("mousemove", lockMouse);
        }
    }
    function lockMouse(e) {
        var rect = playground.getBoundingClientRect();
        var mouseX = e.clientX - rect.left;
        var mouseY = e.clientY - rect.top;

        // Prüfe, ob sich der Mauszeiger außerhalb des Canvas befindet
        if (mouseX < 0 || mouseY < 0 || mouseX > rect.width || mouseY > rect.height) {
            // Setze den Mauszeiger innerhalb des Canvas zurück
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            window.dispatchEvent(new MouseEvent('mousemove', { clientX: centerX + rect.left, clientY: centerY + rect.top }));
        }
    }})





    (Interface || (Interface = {}));