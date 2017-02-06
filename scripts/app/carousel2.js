import { elRemoveClassName, elHasClassName } from "./generic";

/**
 * Carousel
 */

const register = (carousel, { cycleDelay = 0 }) => {
    let elCarousel = typeof (carousel) === "string" && document.getElementById(carousel) || carousel;
    // attach the api to the carousel element
    let api = elCarousel.carousel = {
        currentSlide: null,
        elActiveSlide: null,
        elActiveIndicator: null,
        totalSlides: elCarousel.getElementsByClassName("carousel__slide").length,
        cycleDelay: cycleDelay, // cycle delay between slides expressed in milliseconds, defaults to 0
        cycleIntervalID: 0
    };
    // abort if there are no slides
    if (!api.totalSlides) {
        console.log("Carousel Error -- carousel has no slides");
        return;
    }
    // setup events which are all delegated through the carousel element
    elCarousel.addEventListener("click", clickEventHandler, false);
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

let clickEventHandler = function (e) {
    console.log("click event handler!. e.target=", e.target);
    if (elHasClassName(e.target, [
        "carousel__control--left",
        "carousel__control-glyph--left",
        "carousel__control--right",
        "carousel__control-glyph--right"
    ])) {
        handleCarouselControlClick.call(this, e);
    } else if (elHasClassName(e.target, "carousel__indicator-glyph")) {
        handleCarouselIndicatorClick.call(this, e);
    }
};

/**
 * Handle carousel control click events.
 */

let handleCarouselControlClick = function (e) {
    e.preventDefault();
    // terminate slide cycling if indicated
    if (this.carousel.cycleIntervalID) {
        clearInterval(this.carousel.cycleIntervalID);
    }
    // remove "carousel__slide--active" from class names
    elRemoveClassName(this.carousel.elActiveSlide, "carousel__slide--active");
    // remove "carousel__indicator--active" from class names
    elRemoveClassName(this.carousel.elActiveIndicator, "carousel__indicator--active");
    // increment or decrement current slide accordingly
    if (elHasClassName(e.target, ["carousel__control--left", "carousel__control-glyph--left"])) {
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
    // restart slide cycling if indicated
    if (this.carousel.cycleDelay) {
        cycleSlides(this);
    }
    return;
};

/**
 * Handle carousel indicator click events.
 */

let handleCarouselIndicatorClick = function (e) {
    e.preventDefault();
    // terminate slide cycling if indicated
    if (this.carousel.cycleIntervalID) {
        clearInterval(this.carousel.cycleIntervalID);
    }
    // remove "carousel__slide--active" from class names
    elRemoveClassName(this.carousel.elActiveSlide, "carousel__slide--active");
    // remove "carousel__indicator--active" from class names
    elRemoveClassName(this.carousel.elActiveIndicator, "carousel__indicator--active");
    // get the indicator's "data-for-slide" attribute value
    let forIndicator = this.carousel.currentSlide =
        parseInt(e.target.parentElement.getAttribute("data-for-slide"));
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
    // restart slide cycling if indicated
    if (this.carousel.cycleDelay) {
        cycleSlides(this);
    }
    return;
};

let cycleSlides = (elCarousel) => {
    elCarousel.carousel.cycleIntervalID = setInterval(function () {
        // alert("Cycle timer callback fired");
        elCarousel.getElementsByClassName("carousel__control-glyph--right")[0].click();
    }, elCarousel.carousel.cycleDelay);
};

export default register;