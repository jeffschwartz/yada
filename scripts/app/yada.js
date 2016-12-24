import * as Yada from "./css";
import registerTabBar from "./tab";
import { elHasClassName } from "./generic";

window.addEventListener("load", function (e) {
    /** Carousel */

    // play the carousel - it returns a func that when called stops the carousel
    let carouselEl = document.getElementById("carousel1");
    carouselEl.carousel.play(0);

    /** Tab Bar - Static Content */

    (function () {
        // register tab bar
        let elTabBar = document.getElementById("tab-bar-static");

        // show the 1st tab
        let elTabBarTab = elTabBar.querySelector("a.tab-bar-tab__label[href='#tabbarpane1']").parentElement;
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
        // register tab bar
        let elTabBar = document.getElementById("tab-bar-dynamic");

        // show the 1st tab
        let elTabBarTab = elTabBar.querySelector("a.tab-bar-tab__label[href='#tabbarpanedc1']").parentElement;
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
        elTabBar.addEventListener("click", (e) => {
            if (elHasClassName(e.target.parentElement, "tab-bar-tab")) {
                e.preventDefault();
                let id = e.target.getAttribute("href").substring(1);
                let elTabBarPaneContent =
                    document.getElementById(id).querySelector(".tab-bar-pane__content");
                console.log("focusin event handled in yada.js");
                // simulate an asyncrhonous process to retrieve the content
                setTimeout(() => {
                    elTabBarPaneContent.textContent = `The value of Date.now() = ${Date.now().toString()}`;
                }, 10);
            }
        }, false);
    }());
});
