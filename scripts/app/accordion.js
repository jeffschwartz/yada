import { elRemoveClassName, elHasClassName } from "./generic";

// TODO(JS): add event handlers to apis so they can be removed - done
// TODO(JS): standardize event handler function names - project-wide - done
// TODO(JS): refactor element === null guards
// TODO(JS): make the register function callable multiple times by removing event listeners and apis from the component

/**
 * Accordion
 */

const register = (accordion, { openCallback = null, closeCallback = null } = {}) => {
    let elAccordion = typeof accordion === "string" && document.getElementById(accordion) || accordion;
    if (!elAccordion) {
        console.log("Accordion Error - expected accordion to be either an element or element id");
        return;
    }
    elAccordion.accordion = {
        openCallback,
        closeCallback,
        elOpenClose: elAccordion.getElementsByClassName("accordion__open-close")[0],
        elOpenCloseGlyph: elAccordion.getElementsByClassName("accordion__open-close-glyph")[0],
        elContent: elAccordion.getElementsByClassName("accordion__content")[0],
        clickHandler
    };
    elAccordion.addEventListener("click", clickHandler, false);
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