import { elRemoveClassName, elHasClassName, objEquals } from "./generic";

/**
 * Accordion
 */

const register = (accordion, { openCallback = null, closeCallback = null } = {}) => {
    let elAccordion;
    let elHeader;
    let elHeading;
    let elToggle;
    let elToggleGlyph;
    let elContent;
    elAccordion = typeof accordion === "string" && document.getElementById(accordion) || accordion;
    if (!elAccordion) {
        console.log("Accordion Error - expected accordion to be either an element or element id");
        return;
    }
    if (elAccordion.accordion) {
        elAccordion.removeEventListener("click", clickHandler, false);
    }
    elHeader = elAccordion.getElementsByClassName("accordion__header")[0];
    if (!elHeader) {
        console.log(`Accordion Error - expected element with class "accordion__header"`);
        return;
    }
    elHeading = elAccordion.getElementsByClassName("accordion__heading")[0];
    if (!elHeading) {
        console.log(`Accordion Error - expected element with class "accordion__heading"`);
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
        elHeader,
        elHeading,
        elToggle,
        elToggleGlyph,
        elContent,
        clickHandler
    };
    elAccordion.addEventListener("click", clickHandler, false);
    return elAccordion;
};

let clickHandler = function (e) {
    if (objEquals(e.target, [
        this.accordion.elHeader,
        this.accordion.elHeading,
        this.accordion.elToggle,
        this.accordion.elToggleGlyph
    ])) {
        e.preventDefault();
        if (elHasClassName(this, "accordion--disabled")) {
            return;
        }
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