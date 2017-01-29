import { elRemoveClassName, elHasClassName } from "./generic";

/**
 * Carousel
 */

const register = (carousel, options) => {
    let elCarousel = typeof (carousel) === "string" && document.getElementById(carousel) || carousel;
    let api = {
        currentSlide: 0,
        totalSlides: 0
    };
    // setup events
    elCarousel.addEventListener("click", clickEventHandler, false);
    // note the current active slide
    let elsCarouselSlide = elCarousel.getElementsByClassName("carousel__slide");
    for (let x = 0; x < elsCarouselSlide.length; x++) {
        let elCarouselSlide = elsCarouselSlide[x];
        if (elHasClassName(elCarouselSlide, "carousel__slide--active")) {
            api.currentSlide = x;
            break;
        }
    }
    // note the total number of slides
    api.totalSlides = elsCarouselSlide.length;
    // attach the api directly to the carousel element
    elCarousel.carousel = api;
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
        e.preventDefault();
        // remove "carousel__slide--active" from class names
        console.log("this", this);
        elRemoveClassName(
            this.getElementsByClassName("carousel__slide--active")[0],
            "carousel__slide--active"
        );
        if (elHasClassName(e.target, ["carousel__control--left", "carousel__control-glyph--left"])) {
            this.carousel.currentSlide = this.carousel.currentSlide === 0 && this.carousel.totalSlides - 1 || this.carousel.currentSlide - 1;
            let elCurrentSlide = this.getElementsByClassName("carousel__slide")[this.carousel.currentSlide];
            elCurrentSlide.className += " carousel__slide--active";
            return;
        }
        if (elHasClassName(e.target, ["carousel__control--right", "carousel__control-glyph--right"])) {
            this.carousel.currentSlide =
                this.carousel.currentSlide === (this.carousel.totalSlides - 1) ? 0 : this.carousel.currentSlide + 1;
            let elCurrentSlide = this.getElementsByClassName("carousel__slide")[this.carousel.currentSlide];
            elCurrentSlide.className += " carousel__slide--active";
            return;
        }
    }
};

export default register;