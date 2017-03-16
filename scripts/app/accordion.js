import { elRemoveClassName, elHasClassName } from "./generic";

/**
 * Accordion
 */

const register = (accordion, { openCallback = null, closeCallback = null } = {}) => {
    let elAccordion;
    let elToggle;
    let elToggleGlyph;
    let elContent;
    elAccordion = typeof accordion === "string" && document.getElementById(accordion) || accordion;
    if (!elAccordion) {
        console.log("Accordion Error - expected accordion to be either an element or element id");
        return;
    }
    elToggle = elAccordion.getElementsByClassName("accordion__toggle")[0];
    if (!elToggle) {
        console.log(`Accordion Error - expected element with class "accordion__toggle"`);
        return;
    }
    elToggleGlyph = elAccordion.getElementsByClassName("accordion__toggle-glyph")[0];
    if (!elToggleGlyph) {
        console.log(`Accordion Error - expected element with class "accordion__toggle-glyph"`);
        return;
    }
    elContent = elAccordion.getElementsByClassName("accordion__content")[0];
    if (!elContent) {
        console.log(`Accordion Error - expected element with class "accordion__content"`);
        return;
    }
    elAccordion.accordion = {
        openCallback,
        closeCallback,
        elToggle,
        elToggleGlyph,
        elContent,
        clickHandler
    };
    elAccordion.addEventListener("click", clickHandler, false);
    return elAccordion;
};

let clickHandler = function (e) {
    e.preventDefault();
    if (elHasClassName(this, "accordion--disabled")) {
        return;
    }
    if (e.target === this.accordion.elToggle ||
        e.target === this.accordion.elToggleGlyph) {
        if (elHasClassName(this, "accordion--visible")) {
            if (this.accordion.closeCallback) {
                this.accordion.closeCallback(this.accordion.elContent, (close) => {
                    if (close) {
                        elRemoveClassName(this, "accordion--visible");
                    }
                });
            } else {
                elRemoveClassName(this, "accordion--visible");
            }
        } else {
            if (this.accordion.openCallback) {
                this.accordion.openCallback(this.accordion.elContent, (show) => {
                    if (show) {
                        this.className += " accordion--visible";
                    }
                });
            } else {
                this.className += " accordion--visible";
            }
        }
    }
};

export default register;