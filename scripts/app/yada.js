import registerAccordion from "./accordion";
import registerModalImage from "./modal-image";
import registerTabBar from "./tab";
import registerCarousel from "./carousel";
import registerBillboard from "./billboard";
import { elHasClassName, elRemoveClassName } from "./generic";

window.addEventListener("load", function (e) {
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
        registerCarousel(elsCarousel[1], {
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
        // register tab bar
        let elTabBar = document.getElementById("tab-bar-static");

        // show the active tab
        let elTabBarTab = elTabBar.querySelector("li.tab-bar-tab--active");
        registerTabBar(elTabBar).tabBar.showTab(elTabBarTab);

        //
        // tab bar event handling via delegation
        //

        // call showTab whenever a "click" event bubbles up to a tab-bar-tab element
        elTabBar.addEventListener("click", (e) => {
            if (elHasClassName(e.target.parentElement, "tab-bar-tab")) {
                e.preventDefault();
                elTabBar.tabBar.showTab(e.target.parentElement);
            }
        }, false);
    }());

    /** Tab Bar - Dynamic Content */

    (function () {
        let elTabBar = document.getElementById("tab-bar-dynamic");

        // the 3rd tab's label element will receive the click event
        let elTabBarTabLabel = elTabBar.getElementsByClassName("tab-bar__tabs")[0]
            .getElementsByClassName("tab-bar-tab__label")[2];

        // register tab bar
        registerTabBar(elTabBar);

        //
        // tab bar event handling via delegation
        //

        // call showTab whenever a "click" event bubbles up to a tab-bar-tab element
        elTabBar.addEventListener("click", (e) => {
            let elTabBarTab = e.target.parentElement;
            e.preventDefault();
            // only respond to clicks on tabs that aren't already active
            if (elHasClassName(elTabBarTab, "tab-bar-tab") &&
                !elHasClassName(elTabBarTab, "tab-bar-tab--active")) {
                elTabBar.tabBar.showTab(elTabBarTab);
                let id = e.target.getAttribute("href").substring(1);
                let elTabBarPaneContent =
                    document.getElementById(id).querySelector("div.tab-bar-pane__content");
                elTabBarPaneContent.textContent = "Getting content. Please wait...";
                let elTabBarPane = elTabBarPaneContent.parentElement;
                elTabBarPane.className = elTabBarPane.className + " tab-bar-pane--pending";

                // simulate an asynchronous process to retrieve the content
                setTimeout(() => {
                    elTabBarPaneContent.textContent = `The current date and time is: ${Date()}`;
                    elRemoveClassName(elTabBarPane, "tab-bar-pane--pending");
                    elTabBarPane.className += " tab-bar-pane--fulfilled";
                    setTimeout(() => elRemoveClassName(elTabBarPane, "tab-bar-pane--fulfilled"), 500);
                }, 1000);
            }
        }, false);

        // fire a "click" event on the tab label
        elTabBarTabLabel.click();
    }());
});
