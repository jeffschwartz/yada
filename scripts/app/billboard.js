import { elRemoveClassName } from "./generic";

/**
 * Billboard
 */

const register = (billboard, { cycleDelay = 3000 } = {}) => {
    let elBillboard;
    let currentSlide;
    let elActiveSlide;
    let totalSlides;
    elBillboard = typeof (billboard) === "string" && document.getElementById(billboard) || billboard;
    if (!elBillboard) {
        console.log("Billboard Error - expected billboard to be either an element or element id");
        return;
    }
    totalSlides = elBillboard.getElementsByClassName("billboard__slide").length;
    if (!totalSlides) {
        console.log("Billboard Error -- billboard has no slides");
        return;
    }
    elActiveSlide = elBillboard.querySelector("div.billboard__slide.billboard__slide--active");
    if (!elActiveSlide) {
        console.log("Billboard Error - no active slide found!");
        return;
    }
    currentSlide = parseInt(elActiveSlide.getAttribute("data-billboard-slide"));
    if (!currentSlide) {
        console.log("Billboard Error - all slides must have a \"data-billboard-slide\" attribute");
        return;
    }
    elBillboard.yadaBillboard = {
        currentSlide,
        elActiveSlide,
        totalSlides,
        cycleDelay
    };
    cycleSlides(elBillboard);
    return elBillboard;
};

/**
 * Handle cycling slides
 */

let handleBillboardCycle = function () {
    // remove "billboard__slide--active" from class names
    elRemoveClassName(this.yadaBillboard.elActiveSlide, "billboard__slide--active");
    // increment current slide accordingly
    this.yadaBillboard.currentSlide =
        this.yadaBillboard.currentSlide === (this.yadaBillboard.totalSlides) ? 1 : this.yadaBillboard.currentSlide + 1;
    // note the active slide
    this.yadaBillboard.elActiveSlide =
        this.querySelector(`div.billboard__slide[data-billboard-slide="${this.yadaBillboard.currentSlide}"]`);
    // add class "billboard__slide--active" to the active slide
    this.yadaBillboard.elActiveSlide.className += " billboard__slide--active";
    return;
};

let cycleSlides = function (elBillboard) {
    setInterval(function () {
        handleBillboardCycle.call(elBillboard);
    }, elBillboard.yadaBillboard.cycleDelay);
};

export default register;
