const backToleftButton = document.querySelector("#back-to-left-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
    if (window.pageYOffset > 300) { // Show backToleftButton
        if (!backToleftButton.classList.contains("btnEntrance")) {
            backToleftButton.classList.remove("btnExit");
            backToleftButton.classList.add("btnEntrance");
            backToleftButton.style.display = "block";
        }
    }
    else { // Hide backToleftButton
        if (backToleftButton.classList.contains("btnEntrance")) {
            backToleftButton.classList.remove("btnEntrance");
            backToleftButton.classList.add("btnExit");
            setTimeout(function () {
                backToleftButton.style.display = "none";
            }, 250);
        }
    }
}

// backToleftButton.addEventListener("click", smoothScrollBackToleft);

// // function backToleft() {
// //   window.scrollTo(0, 0);
// // }

// function smoothScrollBackToleft() {
//     const targetPosition = 0;
//     const startPosition = window.pageYOffset;
//     const distance = targetPosition - startPosition;
//     const duration = 750;
//     let start = null;

//     window.requestAnimationFrame(step);

//     function step(timestamp) {
//         if (!start) start = timestamp;
//         const progress = timestamp - start;
//         window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
//         if (progress < duration) window.requestAnimationFrame(step);
//     }
// }

function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
};