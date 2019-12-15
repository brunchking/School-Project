const tp101 = document.querySelector('.tp101');
const slider = document.querySelector('.slider');
// const logo = document.querySelector('#logo');
// const hamburger = document.querySelector('.hamburger');
// const headline = document.querySelector('.headline');

const tl = new TimelineMax();


tl.fromTo(tp101, 2, { height: "0%" }, { height: '100%', ease: Power2.easeInOut })
    .fromTo(slider, 2, { x: "-100%" }, { x: '0%', ease: Power2.easeInOut }, "-=1.4")
    .fromTo(tp101, 2, { width: '75%' }, { width: '100%', ease: Power2.easeInOut }, "-=0.9")
    // .fromTo(logo, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-0.5")
    .fromTo(hambuger, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-0.5");

