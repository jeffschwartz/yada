/**
 * Carousel
 *
 * Displays each image whose class is className for delay ms
 * Returns a func to caller that when called stops
 * the carousel on the next iteration of play
 */

/**
 * Defer handling until the document content is loaded.
 *
 * Note: this event is triggered when the initial HTML
 * document has been completely loaded and parsed, without
 * waiting for stylesheets, images, and subframes to finish
 * loading.
 *
 * Requires IE ^9.0.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded.
 */

let getSlidesEl = carouselChildEls => {
    let carouselSlidesEl = carouselChildEls.filter(carouselChild => {
        // el.className return a string variable representing the
        // class or space- separated classes of the current element.
        let classes = carouselChild.className.split(" ");
        let slidesEl = classes.filter(clazz => {
            return clazz === "carousel__slides";
        });
        return slidesEl && slidesEl.length === 1;
    });
    return carouselSlidesEl[0];
};

let getSlideEls = (carouselSlidesEl) => {
    return [...carouselSlidesEl.children];
};

let getActiveSlideEl = slideEls => {
    let i = -1;
    for (let x = 0; x < slideEls.length; x++) {
        let classNames = slideEls[x].className.split(" ");
        for (let xx = 0; xx < classNames.length; xx++) {
            if (classNames[xx] === "active") {
                i = x;
                break;
            }
        }
        if (i !== -1) { break; }
    }
    i = i === -1 && 0 || i;
    console.log("active slide index =", i);
    return i;
};

let removeActiveClassFromSlideEl = slideEl => {
    let classNames = slideEl.className.split(" ");
    slideEl.className = classNames.reduce((prev, el) => {
        if (el !== "active") {
            return prev === "" ? el : prev + " " + el;
        } else {
            return prev;
        }
    }, "");
};

let addActiveClassToSlideEl = slideEl => {
    slideEl.className = slideEl.className + " active";
};

let elApi = (carouselEl, slideEls, duration, autoPlay) => {
    let stopped = false;
    let stop = () => { stopped = true; };
    let i = getActiveSlideEl(slideEls);
    let play = () => {
        if (!stopped) {
            // prevent adding class active when already present, which
            // will be the case when play is called for the first time
            if (slideEls[i].className.indexOf("active") === -1) {
                addActiveClassToSlideEl(slideEls[i]);
            }
            setTimeout(() => {
                removeActiveClassFromSlideEl(slideEls[i]);
                i = i === slideEls.length - 1 ? 0 : i + 1;
                play();
            }, duration);
        }
    };
    return {
        stop: stop,
        play: play
    };
};

document.addEventListener("DOMContentLoaded", function (e) {
    // get all the carousels on the page
    let carousels = [...document.getElementsByClassName("carousel")];
    carousels.forEach((el) => {
        let id = el.id;
        let slidesEl = getSlidesEl([...el.children]);
        let slides = getSlideEls(slidesEl);
        let x = 0;
        let duration = el.getAttribute("data-slide-duration");
        duration = duration && duration.length && parseInt(duration, 10) || 5000;
        if (isNaN(duration)) {
            console.log("Carousel duration is NaN.");
            throw new Error("Carousel duration is NaN");
        }
        let autoPlay = el.getAttribute("data-auto-play");
        if (autoPlay && autoPlay.length && autoPlay !== "true" && autoPlay !== "false") {
            console.log("Carousel autoPlay is invalid. Expected true or false");
            throw new Error("Carousel autoPlay is invalid. Expected true or false");
        }
        autoPlay = autoPlay === "true" && true || autoPlay === "false" && false || false;
        console.log("Carousel ${id} duration", duration);
        console.log("Carousel ${id} auto-play", autoPlay);
        el.carousel = elApi(el, slides, duration, autoPlay);
        if (autoPlay) {
            // defer auto playing until after all stylesheets,
            // images & subframes have been loaded
            window.addEventListener("load", function (e) {
                el.carousel.play();
            });
        };
    });
});