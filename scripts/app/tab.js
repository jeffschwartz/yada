import { elRemoveClassName, elHasClassName } from "./generic";

/**
 * Togglable Tab Bar
 */

const register = (tabBar, options) => {
    let elTabBar;
    let elsTabBarTabs;
    let elActiveTabBarTab;
    let elActiveTabBarPane;
    let activeTabBarPaneId;
    elTabBar = typeof (tabBar) === "string" && document.getElementById(tabBar) || tabBar;
    if (!elTabBar) {
        console.log("Tab-Bar Error - expected tabBar to be either an element or element id");
        return;
    }
    if (elTabBar.tabBar) {
        elTabBar.removeEventListener("focus", focusHandler, true);
        elTabBar.removeEventListener("blur", blurHandler, true);
    }
    elsTabBarTabs = elTabBar.getElementsByClassName("tab-bar__tabs")[0];
    if (!elsTabBarTabs) {
        console.log(`Tab-Bar Error - expected to find element with class "tab-bar__tabs"!`);
        return;
    }
    elActiveTabBarTab = elsTabBarTabs.getElementsByClassName("tab-bar-tab--active")[0];
    if (elActiveTabBarTab) {
        // set the appropriate tab-bar-pane active
        activeTabBarPaneId = elActiveTabBarTab.getElementsByClassName("tab-bar-tab__label")[0]
            .getAttribute("href").substring(1);
        if (!activeTabBarPaneId) {
            console.log(`Tab-Bar Error - expected element with class "tab-bar-tab__label" to have "href" attribute!`);
            return;
        }
        elActiveTabBarPane = document.getElementById(activeTabBarPaneId);
        elActiveTabBarPane.className = elActiveTabBarPane.className + " tab-bar-pane--active";
    }
    elTabBar.tabBar = {
        focusHandler,
        blurHandler,
        showTab: showTab
    };
    // setup events
    elTabBar.addEventListener("focus", focusHandler, true);
    elTabBar.addEventListener("blur", blurHandler, true);
    return elTabBar;
};

let focusHandler = (e) => {
    let elParent = e.target && e.target.parentElement;
    console.log("focus event handler!. e.target=", e.target);
    if (elParent && elHasClassName(elParent, "tab-bar-tab") && !elHasClassName(elParent, "tab-bar-tab--active")) {
        e.preventDefault();
        elParent.className = elParent.className + " tab-bar-tab--has-focus";
    }
};

let blurHandler = (e) => {
    let elParent = e.target && e.target.parentElement;
    console.log("blur event handler!. e.target=", e.target);
    if (elParent && elHasClassName(elParent, "tab-bar-tab") &&
        elHasClassName(elParent, "tab-bar-tab--has-focus")) {
        e.preventDefault();
        elRemoveClassName(elParent, "tab-bar-tab--has-focus");
    }
};

let showTab = (elTab) => {
    console.log("showTab called. elTab=", elTab);
    let elsTab = elTab.parentElement.getElementsByClassName("tab-bar-tab");
    console.log("elsTab=", elsTab);
    Array.prototype.forEach.call(elsTab, el => {
        elRemoveClassName(el, ["tab-bar-tab--active", "tab-bar-tab--has-focus"]);
    });
    elTab.className = elTab.className + " tab-bar-tab--active";
    let paneId = elTab.getElementsByClassName("tab-bar-tab__label")[0].getAttribute("href").substring(1);
    console.log("paneId=", paneId);
    let elsPane = elTab.parentElement.parentElement.getElementsByClassName("tab-bar-pane");
    console.log("elsPane=", elsPane);
    Array.prototype.forEach.call(elsPane, el => {
        elRemoveClassName(el, "tab-bar-pane--active");
    });
    let activePane = document.getElementById(paneId);
    activePane.className = activePane.className + " tab-bar-pane--active";
    return activePane;
};

export default register;