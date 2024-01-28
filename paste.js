var isFullScreen = false;

function toggleFullScreen() {
    if (!isFullScreen) {
        enterFullscreen();
    } else {
        exitFullscreen();
    }
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