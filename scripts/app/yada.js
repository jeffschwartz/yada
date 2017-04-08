import registerAccordionGroup from "./accordion-group";
import registerAccordion from "./accordion";
import registerModalImage from "./modal-image";
import registerTabBar from "./tab-bar";
import registerTab from "./tab";
import registerCarousel from "./carousel";
import registerBillboard from "./billboard";
import { elRemoveClassName } from "./generic";

window.addEventListener("load", function (e) {
    /** Accordion Group */
    (function () {
        let elsAG = document.getElementsByClassName("accordion-group");

        // Accordion Group
        registerAccordionGroup(elsAG[0]);
        registerAccordion(elsAG[0].accordionGroup.elsAccordion[0]);
        registerAccordion(elsAG[0].accordionGroup.elsAccordion[1]);
        registerAccordion(elsAG[0].accordionGroup.elsAccordion[2]);

        // Accordion Group List
        let agl = registerAccordionGroup(elsAG[1]);
        registerAccordion(agl.accordionGroup.elsAccordion[0]);
        registerAccordion(agl.accordionGroup.elsAccordion[1]);
        registerAccordion(agl.accordionGroup.elsAccordion[2]);
    }());

    /** Accordion */

    (function () {
        let elsAccordion = document.getElementsByClassName("accordion");

        // Enabled
        registerAccordion(elsAccordion[0]);

        // Disabled
        registerAccordion(elsAccordion[1]);

        // Pass openCallback option to register, which Accordion will call when user clicks
        // to display the content. Return true to show content and false to not show content.

        let openCallback = (elContent, cb) => {
            // simulate an async process
            setTimeout(function () {
                elContent.textContent = "Content displayed dynamically via accordion's openCallback option.";
                cb(true); // show the content
            }, 1);
        };
        registerAccordion(elsAccordion[2], {openCallback: openCallback});

        // Pass closeCallback option to register, which Accordion will call when user clicks
        // to close the content. Return true to close content and false to not close content.

        let closeCallback = (elContent, cb) => {
            // simulate an async process
            setTimeout(function () {
                cb(false); // don't allow the accordion to close
            }, 1);
        };
        registerAccordion(elsAccordion[3], {closeCallback: closeCallback});
    }());

    /** Modal Image */

    (function () {
        let elsDemoModalImage = document.getElementsByClassName("demo-modal-image");
        registerModalImage(elsDemoModalImage[0]);
        registerModalImage(elsDemoModalImage[1]);
        registerModalImage(elsDemoModalImage[2]);
        registerModalImage(elsDemoModalImage[3]);
    }());

    /** Carousel */

    (function () {
        let elsCarousel = document.getElementsByClassName("carousel");
        registerCarousel(elsCarousel[0], {
            cycleDelay: 2000,
            loopNTimes: 1
        });
    }());

    /** Billboard */

    (function () {
        let elBillboard = document.getElementsByClassName("billboard")[0];
        registerBillboard(elBillboard);
    }());

    /** Tab Bar - Static Content */

    (function () {
        let elTabBar = document.getElementById("tab-bar-static");
        registerTabBar(elTabBar, elsTab => {
            Array.prototype.forEach.call(elsTab,
                elTab => registerTab(elTab));
        });
    }());

    /** Tab Bar - Dynamic Content */

    (function () {
        let elTabBar = document.getElementById("tab-bar-dynamic");
        let clickCallback = function (elTab, cb) {
            let tabPaneId = elTab.getElementsByClassName("tab__label")[0].getAttribute("href").substring(1);
            let elTabPane = document.getElementById(tabPaneId);
            let elTabPaneContent = elTabPane.getElementsByClassName("tab-bar-pane__content")[0];
            elTabPaneContent.textContent = "Getting content. Please wait...";
            elTabPane.className = elTabPane.className + " tab-bar-pane--pending";
            // simulate an asynchronous process to retrieve the content
            setTimeout(() => {
                elTabPaneContent.textContent = `The current date and time is: ${Date()}`;
                elRemoveClassName(elTabPane, "tab-bar-pane--pending");
                elTabPane.className += " tab-bar-pane--fulfilled";
                setTimeout(() => elRemoveClassName(elTabPane, "tab-bar-pane--fulfilled"), 500);
            }, 1000);
            cb();
        };
        registerTabBar(elTabBar, elsTab => {
            Array.prototype.forEach.call(elsTab,
                elTab => registerTab(elTab, {clickCallback}));
        });
    }());
});
