/**
 * Carousel
 *
 * Displays each image whose class is className for delay ms
 * Returns a func to caller that when called stops
 * the carousel on the next iteration of play
 */

const Carousel = (className, delay) => {
    let images = [...document.getElementsByClassName(className)];
    let x = 0;
    let stoped = false;

    images.forEach(ic => {
        ic.style.display = "none";
    });
    let play = i => {
        if (stoped) { return; }
        images[i].style.display = "inline";
        setTimeout(() => {
            images[i].style.display = "none";
            x = x === images.length - 1 ? 0 : x + 1;
            play(x);
        }, delay);
    };
    play(0);
    return () => { stoped = true; };
};

export default Carousel;