const btn = document.querySelector('.ghost-button-border-color-left');

btn.addEventListener('mouseenter', grayScaleOff);

function grayScaleOff() {
    const bg = document.querySelector('.sky');
    bg.style.filter = 'grayscale(0%)';
    bg.style.transition = 'filter 2s';
}

btn.addEventListener('mouseleave', grayScaleOn);

function grayScaleOn() {
    const bg = document.querySelector('.sky');
    bg.style.filter = 'grayscale(100%)';
}

const btn2 = document.querySelector('.ghost-button-border-color-right');

// btn2.addEventListener('mouseenter', invertOff);

// function invertOff() {
//     const bg = document.querySelector('.sky');
//     bg.style.filter = 'invert(1)';
//     bg.style.transition = 'filter 1s';
// }

btn2.addEventListener('mouseenter', grayScaleOff);
btn2.addEventListener('mouseleave', grayScaleOn);

// btn.addEventListener('mouseleave', invertOn);

// function invertOn() {
//     const bg = document.querySelector('.sky');
//     bg.style.filter = 'invert(0)';
// }



