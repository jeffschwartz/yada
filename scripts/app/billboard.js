import { elRemoveClassName } from "./generic";

/**
 * Billboard
 */

/**
 * Register a billboard.
 */

const register = (billboard, { cycleDelay = 3000 } = {}) => {
    let elBillboard = typeof (billboard) === "string" && document.getElementById(billboard) || billboard;
    // attach the api to the billboard element
    let api = elBillboard.billboard = {
        currentSlide: null,
        elActiveSlide: null,
        elActiveIndicator: null,
        totalSlides: elBillboard.getElementsByClassName("billboard__slide").length,
        cycleDelay, // cycle delay between slides expressed in milliseconds, defaults to 3 seconds
        cycleCount: 0
    };
    // abort if there are no slides
    if (!api.totalSlides) {
        console.log("Billboard Error -- billboard has no slides");
        return;
    }
    // note the current active slide
    api.elActiveSlide = elBillboard.querySelector("div.billboard__slide.billboard__slide--active");
    // abort if there is no active slide
    if (!api.elActiveSlide) {
        console.log("Billboard Error - no active slide found!");
        return;
    }
    // get the slide's "data-billboard-slide" attribute value
    api.currentSlide = parseInt(api.elActiveSlide.getAttribute("data-billboard-slide"));
    // abort if slide missing "data-billboard-slide" attribute
    if (!api.currentSlide) {
        console.log("Billboard Error - all slides must have a \"data-billboard-slide\" attribute");
        return;
    }
    if (api.cycleDelay) {
        cycleSlides(elBillboard);
    }
    // return the billboard element for chaining
    return elBillboard;
};

/**
 * Handle cycling slides
 */

let handleBillboardCycle = function () {
    // remove "billboard__slide--active" from class names
    elRemoveClassName(this.billboard.elActiveSlide, "billboard__slide--active");
    // increment current slide accordingly
    this.billboard.currentSlide =
        this.billboard.currentSlide === (this.billboard.totalSlides) ? 1 : this.billboard.currentSlide + 1;
    // note the active slide
    this.billboard.elActiveSlide =
        this.querySelector(`div.billboard__slide[data-billboard-slide="${this.billboard.currentSlide}"]`);
    // add class "billboard__slide--active" to the active slide
    this.billboard.elActiveSlide.className += " billboard__slide--active";
    return;
};

let cycleSlides = function (elBillboard) {
    setInterval(function () {
        handleBillboardCycle.call(elBillboard);
    }, elBillboard.billboard.cycleDelay);
};

export default register;
