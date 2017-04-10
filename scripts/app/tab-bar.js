import { elRemoveClassName, elHasClassName } from "./generic";

/**
 * Tab Bar
 */

const register = (tabBar, registerTabsCallback, options) => {
    let elTabBar;
    let elTabBarTabs;
    let elsTab;
    let elActiveTab;
    let elActiveTabBarPane;
    elTabBar = typeof (tabBar) === "string" && document.getElementById(tabBar) || tabBar;
    if (!elTabBar) {
        console.log("Tab-Bar Error - expected tabBar to be either an element or element id");
        return;
    }
    if (elTabBar.yadaTabBar) {
        elTabBar.removeEventListener("click", clickHandler, false);
        elTabBar.removeEventListener("focus", focusHandler, true);
        elTabBar.removeEventListener("blur", blurHandler, true);
    }
    elTabBarTabs = elTabBar.getElementsByClassName("tab-bar__tabs")[0];
    if (!elTabBarTabs) {
        console.log(`Tab-Bar Error - expected to find element with class "tab-bar__tabs"!`);
        return;
    }
    elsTab = elTabBarTabs.getElementsByClassName("tab");
    if (!elsTab) {
        console.log(`Tab-Bar Error - expected to find elements with class "tab"!`);
        return;
    }
    registerTabsCallback(elsTab);
    elActiveTab = elTabBarTabs.getElementsByClassName("tab--active")[0];
    if (!elActiveTab) {
        console.log(`Tab-Bar Error - expected to find one element with class "tab-active"!`);
        return;
    }
    elActiveTab.yadaTab.elTabBarPane.className = elActiveTab.yadaTab.elTabBarPane.className + " tab-bar-pane--active";
    elTabBar.yadaTabBar = {
        elTabBar,
        elTabBarTabs,
        elsTab,
        elActiveTab,
        elActiveTabBarPane,
        clickHandler,
        focusHandler,
        blurHandler,
        showTab
    };
    elTabBar.addEventListener("click", clickHandler, false);
    elTabBar.addEventListener("focus", focusHandler, true);
    elTabBar.addEventListener("blur", blurHandler, true);
    elActiveTab.getElementsByClassName("tab__label")[0].click();
    return elTabBar;
};

let clickHandler = function (e) {
    if (elHasClassName(e.target.parentElement, "tab")) {
        let elTab = e.target.parentElement;
        e.preventDefault();
        if (elTab.yadaTab.clickCallback) {
            elTab.yadaTab.clickCallback(elTab, () => {
                this.yadaTabBar.showTab(elTab);
            });
        } else {
            this.yadaTabBar.showTab(elTab);
        }
    }
};

let focusHandler = e => {
    let elParent = e.target && e.target.parentElement;
    console.log("focus event handler!. e.target=", e.target);
    if (elParent && elHasClassName(elParent, "tab") && !elHasClassName(elParent, "tab--active")) {
        e.preventDefault();
        elParent.className = elParent.className + " tab--has-focus";
    }
};

let blurHandler = e => {
    let elParent = e.target && e.target.parentElement;
    console.log("blur event handler!. e.target=", e.target);
    if (elParent && elHasClassName(elParent, "tab") &&
        elHasClassName(elParent, "tab--has-focus")) {
        e.preventDefault();
        elRemoveClassName(elParent, "tab--has-focus");
    }
};

let showTab = elTab => {
    let elsTab = elTab.parentElement.getElementsByClassName("tab");
    let elTabBarPane = elTab.yadaTab.elTabBarPane;
    Array.prototype.forEach.call(elsTab, el => {
        elRemoveClassName(el, ["tab--active", "tab--has-focus"]);
    });
    elTab.className = elTab.className + " tab--active";
    let elsPane = elTab.parentElement.parentElement.getElementsByClassName("tab-bar-pane");
    Array.prototype.forEach.call(elsPane, el => {
        elRemoveClassName(el, "tab-bar-pane--active");
    });
    elTabBarPane.className = elTabBarPane.className + " tab-bar-pane--active";
    return elTabBarPane;
};

export default register;