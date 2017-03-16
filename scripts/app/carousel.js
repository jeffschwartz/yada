import { elRemoveClassName, elHasClassName } from "./generic";

/**
 * Carousel
 */

/**
 * Register a carousel.
 */

const register = (carousel, { cycleDelay = 0, loopNTimes = 0 } = {}) => {
    let elCarousel;
    let currentSlide;
    let elActiveSlide;
    let elActiveIndicator;
    let totalSlides;
    let forIndicator;
    elCarousel = typeof (carousel) === "string" && document.getElementById(carousel) || carousel;
    if (!elCarousel) {
        console.log("Carousel Error - expected carousel to be either an element or element id");
        return;
    }
    totalSlides = elCarousel.getElementsByClassName("carousel__slide").length;
    if (!totalSlides) {
        console.log("Carousel Error -- carousel has no slides");
        return;
    }
    elActiveSlide = elCarousel.querySelector("div.carousel__slide.carousel__slide--active");
    if (!elActiveSlide) {
        console.log("Carousel Error - no active slide found!");
        return;
    }
    forIndicator = currentSlide = parseInt(elActiveSlide.getAttribute("data-carousel-slide"));
    if (!forIndicator) {
        console.log(`Carousel Error - all slides must have a "data-carousel-slide" attribute`);
        return;
    }
    elActiveIndicator = elCarousel.querySelector(`li.carousel__indicator[data-for-slide="${forIndicator}"]`);
    if (!elActiveIndicator) {
        console.log(`Carousel Error - all carousel indicators must have a "data-for-slide" attribute`);
        return;
    }
    elActiveIndicator.className += " carousel__indicator--active";
    elCarousel.carousel = {
        currentSlide,
        elActiveSlide,
        elActiveIndicator,
        totalSlides,
        cycleDelay,
        cycleIntervalID: 0,
        cycleCount: 0,
        loopNTimes,
        loopNTimesCount: 0,
        clickHandler
    };
    elCarousel.addEventListener("click", clickHandler, false);
    cycleSlides(elCarousel);
    return elCarousel;
};

/**
 * Handle all click events via delegation through the carousel element.
 */

let clickHandler = function (e) {
    console.log("click event handler!. e.target=", e.target);
    // cancel cycling through slides when user clicks anywhere in the carousel
    clearInterval(this.carousel.cycleIntervalID);
    if (elHasClassName(e.target, [
        "carousel__control--left",
        "carousel__control-glyph--left",
        "carousel__control--right",
        "carousel__control-glyph--right"
    ])) {
        handleCarouselControlClick.call(this, e);
    } else if (elHasClassName(e.target, ["carousel__indicator-glyph", "carousel__indicator-glyph-inner"])) {
        handleCarouselIndicatorClick.call(this, e);
    }
};

/**
 * Handle carousel control click events.
 * Note: handleCarouselControlClick is called when a user clicks on
 * either of the carousel controls as well as programmatically by the
 * cycleSlides function to force the advance to the next slide. When
 * called programmatically by the cycleSlides function, there is no
 * event object passed, but when called in response to a click
 * event, there is an event object passed.
 */

let handleCarouselControlClick = function (e) {
    if (e) {
        e.preventDefault();
    }
    // remove "carousel__slide--active" from class names
    elRemoveClassName(this.carousel.elActiveSlide, "carousel__slide--active");
    // remove "carousel__indicator--active" from class names
    elRemoveClassName(this.carousel.elActiveIndicator, "carousel__indicator--active");
    // increment or decrement current slide accordingly
    if (e && elHasClassName(e.target, ["carousel__control--left", "carousel__control-glyph--left"])) {
        this.carousel.currentSlide =
            this.carousel.currentSlide === 1 && this.carousel.totalSlides || this.carousel.currentSlide - 1;
    } else {
        this.carousel.currentSlide =
            this.carousel.currentSlide === (this.carousel.totalSlides) ? 1 : this.carousel.currentSlide + 1;
    }
    // note the active slide
    this.carousel.elActiveSlide =
        this.querySelector(`div.carousel__slide[data-carousel-slide="${this.carousel.currentSlide}"]`);
    // add class "carousel__slide--active" to the active slide
    this.carousel.elActiveSlide.className += " carousel__slide--active";
    // get the slide's "data-carousel-slide" attribute value
    let forIndicator = this.carousel.elActiveSlide.getAttribute("data-carousel-slide");
    // abort if slide missing "data-carousel-slide" attribute
    if (!forIndicator) {
        console.log("Carousel Error - all slides must have a \"data-carousel-slide\" attribute");
        return;
    }
    // set the appropriate indicator active
    this.carousel.elActiveIndicator =
        this.querySelector(`li.carousel__indicator[data-for-slide="${forIndicator}"]`);
    this.carousel.elActiveIndicator.className += " carousel__indicator--active";
    return;
};

/**
 * Handle carousel indicator click events.
 */

let handleCarouselIndicatorClick = function (e) {
    let elCarouselIndicator;
    e.preventDefault();
    // remove "carousel__slide--active" from class names
    elRemoveClassName(this.carousel.elActiveSlide, "carousel__slide--active");
    // remove "carousel__indicator--active" from class names
    elRemoveClassName(this.carousel.elActiveIndicator, "carousel__indicator--active");
    // get the carousel indicator associated with this click event
    elCarouselIndicator = elHasClassName(e.target, "carousel__indicator-glyph-inner") &&
        e.target.parentElement.parentElement || e.target.parentElement;
    // get the indicator's "data-for-slide" attribute value
    let forIndicator = this.carousel.currentSlide =
        parseInt(elCarouselIndicator.getAttribute("data-for-slide"));
    // abort if slide missing "data-carousel-slide" attribute
    if (!forIndicator) {
        console.log("Carousel Error - all indicators must have a \"data-for-slide\" attribute");
        return;
    }
    // note the active slide
    this.carousel.elActiveSlide =
        this.querySelector(`div.carousel__slide[data-carousel-slide="${this.carousel.currentSlide}"]`);
    // add class "carousel__slide--active" to the active slide
    this.carousel.elActiveSlide.className += " carousel__slide--active";
    // note the active indicator
    this.carousel.elActiveIndicator =
        this.querySelector(`li.carousel__indicator[data-for-slide="${forIndicator}"]`);
    // add class "carousel__indicator--active" to the active indicator
    this.carousel.elActiveIndicator.className += " carousel__indicator--active";
    return;
};

/**
 * Handle cycling slides
 */

let cycleSlides = function (elCarousel) {
    let api = elCarousel.carousel;
    api.cycleIntervalID = setInterval(function () {
        if (api.loopNTimes) {
            api.cycleCount += 1;
            api.loopNTimesCount =
                api.cycleCount === api.totalSlides ? api.loopNTimesCount + 1 : api.loopNTimesCount;
            api.cycleCount = api.cycleCount === api.totalSlides ? 0 : api.cycleCount;
            if (api.loopNTimes === api.loopNTimesCount) {
                clearInterval(api.cycleIntervalID);
                api.cycleCount = 0;
            }
        }
        handleCarouselControlClick.call(elCarousel);
    }, api.cycleDelay);
};

export default register;