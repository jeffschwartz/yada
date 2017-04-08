import { elRemoveClassName, elHasClassName } from "./generic";

/**
 * Tab Bar
 */

// TODO(JS): replace relying on ids matching tabs to panes with data attribute
// TODO(JS): check if tab should be called prior to making it active and check callback return value to determine if tab should be made active.

const register = (tabBar, registerTabsCallback, options) => {
    let elTabBar;
    let elTabBarTabs;
    let elsTab;
    let elActiveTab;
    let elActiveTabBarPane;
    let activeTabBarPaneId;
    elTabBar = typeof (tabBar) === "string" && document.getElementById(tabBar) || tabBar;
    if (!elTabBar) {
        console.log("Tab-Bar Error - expected tabBar to be either an element or element id");
        return;
    }
    if (elTabBar.tabBar) {
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
    elActiveTab = elTabBarTabs.getElementsByClassName("tab--active")[0];
    if (!elActiveTab) {
        console.log(`Tab-Bar Error - expected to find one element with class "tab-active"!`);
        return;
    }
    // set the appropriate tab-bar-pane active
    activeTabBarPaneId = elActiveTab.getElementsByClassName("tab__label")[0]
        .getAttribute("href").substring(1);
    if (!activeTabBarPaneId) {
        console.log(`Tab-Bar Error - expected element with class "tab__label" to have "href" attribute!`);
        return;
    }
    elActiveTabBarPane = document.getElementById(activeTabBarPaneId);
    if (!elActiveTabBarPane) {
        console.log(`Tab-Bar Error - expected element with class "tab-bar-pane" to have "id" of ${activeTabBarPaneId}!`);
        return;
    }
    elActiveTabBarPane.className = elActiveTabBarPane.className + " tab-bar-pane--active";
    elTabBar.tabBar = {
        elTabBarTabs,
        elsTab,
        elActiveTab,
        elActiveTabBarPane,
        activeTabBarPaneId,
        clickHandler,
        focusHandler,
        blurHandler,
        showTab: showTab
    };
    // setup events
    elTabBar.addEventListener("click", clickHandler, false);
    elTabBar.addEventListener("focus", focusHandler, true);
    elTabBar.addEventListener("blur", blurHandler, true);
    // register tabs
    registerTabsCallback(elsTab);
    // show the active tab pane
    elActiveTab.getElementsByClassName("tab__label")[0].click();
    return elTabBar;
};

let clickHandler = function (e) {
    if (elHasClassName(e.target.parentElement, "tab")) {
        let elTab = e.target.parentElement;
        e.preventDefault();
        if (elTab.tab.clickCallback) {
            elTab.tab.clickCallback(elTab, () => {
                this.tabBar.showTab(elTab);
            });
        } else {
            this.tabBar.showTab(elTab);
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
    let tabBarPaneId = elTab.getElementsByClassName("tab__label")[0].getAttribute("href").substring(1);
    let elTabBarPane = document.getElementById(tabBarPaneId);
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