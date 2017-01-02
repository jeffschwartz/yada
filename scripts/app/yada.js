import * as Yada from "./css";
import registerTabBar from "./tab";
import { elHasClassName, elRemoveClassName } from "./generic";

window.addEventListener("load", function (e) {
    /** Carousel */

    // play the carousel - it returns a func that when called stops the carousel
    let carouselEl = document.getElementById("carousel1");
    carouselEl.carousel.play(0);

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

        // handle focusout events
        elTabBar.addEventListener("focusout", (e) => {
            if (elHasClassName(e.target.parentElement, "tab-bar-tab")) {
                e.preventDefault();
                console.log("focusout event handled in yada.js");
            }
        }, false);

        // handle focusin events
        elTabBar.addEventListener("focusin", (e) => {
            if (elHasClassName(e.target.parentElement, "tab-bar-tab")) {
                e.preventDefault();
                console.log("focusin event handled in yada.js");
            }
        }, false);
    }());

    /** Tab Bar - Dynamic Content */

    (function () {
        let elTabBar = document.getElementById("tab-bar-dynamic");

        // the 3rd tab's lablel element will receive the click event
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

                // simulate an asyncrhonous process to retrieve the content
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
