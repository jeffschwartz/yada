import { elRemoveClassName, elHasClassName } from "./generic";

/**
 * Accordion Group
 */

const register = (accordionGroup, options) => {
    let elAccordionGroup;
    let elsAccordion;
    elAccordionGroup = typeof accordionGroup === "string" && document.getElementById(accordionGroup) || accordionGroup;
    if (!elAccordionGroup) {
        console.log("Accordion Group Error - expected accordionGroup to be either an element or element id");
        return;
    }
    elsAccordion = elAccordionGroup.getElementsByClassName("accordion");
    if (!elsAccordion) {
        console.log(`Accordion Group Error - expected element(s) with class "accordion"`);
        return;
    }
    elAccordionGroup.accordionGroup = {
        elsAccordion,
        clickHandler
    };
    elAccordionGroup.addEventListener("click", clickHandler, true);
    return elAccordionGroup;
};

let clickHandler = function (e) {
    let t = e.target;
    if (elHasClassName(t, ["accordion__toggle-glyph"])) {
        t = t.parentElement.parentElement.parentElement;
    } else if (elHasClassName(t, ["accordion__heading", "accordion__toggle"])) {
        t = t.parentElement.parentElement;
    } else if (elHasClassName(t, ["accordion__header"])) {
        t = t.parentElement;
    } else {
        // ignore if user clicked in accordion__content
        return;
    }
    // ignore if user clicked to close the visible accordion
    if (elHasClassName(t, "accordion--visible")) {
        return;
    } else {
        Array.prototype.forEach.call(this.accordionGroup.elsAccordion, a => elRemoveClassName(a, "accordion--visible"));
    }
};

export default register;
