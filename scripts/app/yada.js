import * as Yada from "./css";
import registerTabBar from "./tab";

window.addEventListener("load", function (e) {
    // play the carousel - it returns a func that when called stops the carousel
    let carouselEl = document.getElementById("carousel1");
    carouselEl.carousel.play(0);

    // register tab bar
    let elTabBar = document.getElementsByClassName("tab-bar")[0];
    console.log("elTabBar=", elTabBar);
    let elTabBarTab = elTabBar.querySelector("a.tab-bar-tab__label[href='#tabbarpane1']").parentElement;
    console.log("elTabBarTab =", elTabBarTab);
    registerTabBar(elTabBar).tabBar.showTab(elTabBarTab);
    let elsTab = elTabBar.getElementsByClassName("tab-bar-tab");
    Array.prototype.forEach.call(elsTab, (elTab) => {
        elTab.addEventListener("click", (e) => {
            e.preventDefault();
            elTab.parentElement.parentElement.tabBar.showTab(elTab);
        }, false);
    });
});
