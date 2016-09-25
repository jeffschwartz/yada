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

let elApi = (id, slides, duration, autoPlay) => {
    let stopped = false;
    let stop = () => { stopped = true; };
    let play = (i) => {
        if (!stopped) {
            slides[i].style.display = "block";
            setTimeout(() => {
                slides[i].style.display = "none";
                i = i === slides.length - 1 ? 0 : i + 1;
                play(i);
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
        slides.forEach(img => {
            img.style.display = "none";
        });
        el.carousel = elApi(id, slides, duration, autoPlay);
        if (autoPlay) {
            // defer auto playing until after all stylesheets,
            // images & subframes have been loaded
            window.addEventListener("load", function (e) {
                el.carousel.play(x);
            });
        };
    });
});