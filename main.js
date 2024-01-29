var Interface;
(function (Interface) {
    var circle;
    var rectangles = [];
    var brokenblocks = [];
    var timer;
    var score;
    var healthbar
    var woosh = new Audio('woosh.wav');
    var gosound = new Audio('gameover_sound.mp3');
    var music;
    var animationId;
    var backgroundImage = new Image();

    window.addEventListener("load", hndLoad);

    function hndLoad() {

        document.querySelector("#start").addEventListener("click", start);
        window.addEventListener("keydown", function (event) {
            if (event.code === "Space") {
                start();
            }
        });
    }


    function start() {
        disableKeyboardInput();

        document.querySelector("#playground").setAttribute("style", "visibility: visible");
        clearInterval(timer);

        var playground = document.querySelector("#playground");
        timer = setInterval(createRectangle, 340);
        setTimeout(function () { clearInterval(timer); MoreBlocks(230); }, 12500);

        score = new Interface.score();
        healthbar = new Interface.healthbar(10);
        rectangles = [];
        brokenblocks = [];

        if (!music || music.paused) {
            music = new Audio('Helios_fadein.mp3');
            music.volume = 0.5;
            music.play()
        }

        circle = new Interface.circle(window.innerWidth / 2, window.innerHeight / 2, 0.024);
        playground.addEventListener("mousemove", moveCircle);
        startAnimation();
        animate(); // Starte die Animation
        enterFullscreen();

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


    function startAnimation() {
        animationId = requestAnimationFrame(animate);
        console.log("Start der Animation")
    }
    function stopAnimation() {
        cancelAnimationFrame(animationId);
        console.log("STOP")
    }
    function animate() {
        animationId = requestAnimationFrame(animate);
        displayBackground();
        if (healthbar.isGameOver()) {
            displayGameOverScreen();
            // fadeOutMusic();
            gamePaused = true;
        } else {
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
                    healthbar.decreaseLife();
                    score.resetCombo();
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


    }

    function MoreBlocks(_timer) {
        timer = setInterval(createRectangle, _timer);
        console.log("more blocks")
    }
    function displayGameOverScreen() {
        gosound.volume = 0.5
        gosound.play();
        document.getElementById("gameoverscore").innerHTML = "Game over" + "<br>" + "Your Score: " + score.score;
        exitFullscreen();
        music.pause();
        clearInterval(timer);
        stopAnimation();
        enableKeyboardInput();

    }

    function displayBackground() {
        backgroundImage.src = "background.jpg";
        let ctx = playground.getContext("2d");
        ctx.drawImage(backgroundImage, 0, 0, playground.width, playground.height);
    }

    function clearCanvas() {
        let ctx = playground.getContext("2d");
        ctx.clearRect(0, 0, playground.width, playground.height);
    }





    function disableKeyboardInput() {
        window.addEventListener('keydown', preventDefault);
    }
    
    function preventDefault(event) {
        event.preventDefault();
    }
    function enableKeyboardInput() {
        window.removeEventListener('keydown', preventDefault);
    }




    function enterFullscreen() {
        var playground = document.querySelector("#playground");
        if (playground.requestFullscreen) {
            playground.requestFullscreen();
        } else if (playground.msRequestFullscreen) {
            playground.msRequestFullscreen();
        } else if (playground.mozRequestFullScreen) {
            playground.mozRequestFullScreen();
        } else if (playground.webkitRequestFullscreen) {
            playground.webkitRequestFullscreen();
        }
        document.removeEventListener("fullscreenchange", exitFullscreenScaling);
        document.removeEventListener("webkitfullscreenchange", exitFullscreenScaling);
        document.removeEventListener("mozfullscreenchange", exitFullscreenScaling);
        document.removeEventListener("MSFullscreenChange", exitFullscreenScaling);

        document.addEventListener("fullscreenchange", enterFullscreenScaling);
        document.addEventListener("webkitfullscreenchange", enterFullscreenScaling);
        document.addEventListener("mozfullscreenchange", enterFullscreenScaling);
        document.addEventListener("MSFullscreenChange", enterFullscreenScaling);
    }

    function exitFullscreen() {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            document.removeEventListener("fullscreenchange", enterFullscreenScaling);
            document.removeEventListener("webkitfullscreenchange", enterFullscreenScaling);
            document.removeEventListener("mozfullscreenchange", enterFullscreenScaling);
            document.removeEventListener("MSFullscreenChange", enterFullscreenScaling);

            document.addEventListener("fullscreenchange", exitFullscreenScaling);
            document.addEventListener("webkitfullscreenchange", exitFullscreenScaling);
            document.addEventListener("mozfullscreenchange", exitFullscreenScaling);
            document.addEventListener("MSFullscreenChange", exitFullscreenScaling);
        }
    }


    function enterFullscreenScaling() {
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
    }

    function exitFullscreenScaling() {
        // Setze die Größe des Canvas auf die ursprüngliche Größe zurück
        playground.width = 0; // Passe dies an die ursprüngliche Breite an
        playground.height = 0; // Passe dies an die ursprüngliche Höhe an

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
    }
})





    (Interface || (Interface = {}));