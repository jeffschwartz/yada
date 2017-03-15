import { elRemoveClassName, elHasClassName } from "./generic";

/**
 * Accordion
 */

const register = (accordion, { openCallback = null, closeCallback = null } = {}) => {
    let elAccordion;
    let elOpenClose;
    let elOpenCloseGlyph;
    let elContent;
    elAccordion = typeof accordion === "string" && document.getElementById(accordion) || accordion;
    if (!elAccordion) {
        console.log("Accordion Error - expected accordion to be either an element or element id");
        return;
    }
    elOpenClose = elAccordion.getElementsByClassName("accordion__open-close")[0];
    if (!elOpenClose) {
        console.log(`Accordion Error - expected element with class "accordion__open-close"`);
        return;
    }
    elOpenCloseGlyph = elAccordion.getElementsByClassName("accordion__open-close-glyph")[0];
    if (!elOpenCloseGlyph) {
        console.log(`Accordion Error - expected element with class "accordion__open-close-glyph"`);
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
        elOpenClose,
        elOpenCloseGlyph,
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
    if (e.target === this.accordion.elOpenClose ||
        e.target === this.accordion.elOpenCloseGlyph) {
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