const backTorightButton = document.querySelector("#back-to-right-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
    if (window.pageYOffset > 300) { // Show backTorightButton
        if (!backTorightButton.classList.contains("btnEntrance")) {
            backTorightButton.classList.remove("btnExit");
            backTorightButton.classList.add("btnEntrance");
            backTorightButton.style.display = "block";
        }
    }
    else { // Hide backTorightButton
        if (backTorightButton.classList.contains("btnEntrance")) {
            backTorightButton.classList.remove("btnEntrance");
            backTorightButton.classList.add("btnExit");
            setTimeout(function () {
                backTorightButton.style.display = "none";
            }, 250);
        }
    }
}

backTorightButton.addEventListener("click", smoothScrollBackToright);

// function backToright() {
//   window.scrollTo(0, 0);
// }

function smoothScrollBackToright() {
    const targetPosition = 0;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 750;
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
    }
}

function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
};