import { elRemoveClassName, elHasClassName } from "./generic";

// TODO(JS): standardize event handler function names - project-wide
// TODO(JS): make all event handlers removable - project-wide
// TODO(JS): refactor element === null guards

/**
 * Accordion
 */

const register = (accordion, options) => {
    let elAccordion = typeof accordion === "string" && document.getElementById(accordion) || accordion;
    if (!elAccordion) {
        console.log("Accordion Error - expected accordion to be either an element or element id");
        return;
    }
    elAccordion.accordion = {
        callback: options && typeof options === "function" && options || null,
        elOpenClose: elAccordion.getElementsByClassName("accordion__open-close")[0],
        elOpenCloseGlyph: elAccordion.getElementsByClassName("accordion__open-close-glyph")[0],
        elContent: elAccordion.getElementsByClassName("accordion__content")[0]
    };
    elAccordion.addEventListener("click", clickHandler, false);
};

let clickHandler = function (e) {
    e.preventDefault();
    if (e.target === this.accordion.elOpenClose || e.target === this.accordion.elOpenCloseGlyph) {
        if (elHasClassName(this, "accordion--visible")) {
            elRemoveClassName(this, "accordion--visible");
        } else {
            if (this.accordion.callback) {
                this.accordion.callback(this.accordion.elContent, (show) => {
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