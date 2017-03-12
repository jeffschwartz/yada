import { elRemoveClassName, elHasClassName } from "./generic";

/**
 * Carousel
 */

/**
 * Register a carousel.
 */

const register = (carousel, { cycleDelay = 0, loopNTimes = 0 } = {}) => {
    let elCarousel = typeof (carousel) === "string" && document.getElementById(carousel) || carousel;
    // attach the api to the carousel element
    let api = elCarousel.carousel = {
        currentSlide: null,
        elActiveSlide: null,
        elActiveIndicator: null,
        totalSlides: elCarousel.getElementsByClassName("carousel__slide").length,
        cycleDelay, // cycle delay between slides expressed in milliseconds, defaults to 0
        cycleIntervalID: 0,
        cycleCount: 0,
        loopNTimes,
        loopNTimesCount: 0,
        clickHandler
    };
    // abort if there are no slides
    if (!api.totalSlides) {
        console.log("Carousel Error -- carousel has no slides");
        return;
    }
    // setup events which are all delegated through the carousel element
    elCarousel.addEventListener("click", clickHandler, false);
    // note the current active slide
    api.elActiveSlide = elCarousel.querySelector("div.carousel__slide.carousel__slide--active");
    // abort if there is no active slide
    if (!api.elActiveSlide) {
        console.log("Carousel Error - no active slide found!");
        return;
    }
    // get the slide's "data-carousel-slide" attribute value
    let forIndicator = api.currentSlide = parseInt(api.elActiveSlide.getAttribute("data-carousel-slide"));
    // abort if slide missing "data-carousel-slide" attribute
    if (!forIndicator) {
        console.log("Carousel Error - all slides must have a \"data-carousel-slide\" attribute");
        return;
    }
    // set the appropriate indicator active
    api.elActiveIndicator = elCarousel.querySelector(`li.carousel__indicator[data-for-slide="${forIndicator}"]`);
    api.elActiveIndicator.className += " carousel__indicator--active";
    // initiate slide cycling if indicated
    if (api.cycleDelay) {
        cycleSlides(elCarousel);
    }
    // return the carousel element for chaining
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