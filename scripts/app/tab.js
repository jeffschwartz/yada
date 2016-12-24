import { elRemoveClassName, elHasClassName } from "./generic";

/**
 * Togglable Tab Bar
 */

/**
 * register - call to add togglable functionality to a tab-bar.
 * tabBar - if string then assumed to be the tab bar's id, otherwise assumed to be the html DOM element.
 * options - {}, a hash of tab bar options.
 *  tabOptions: - {}, a hash of tab options.
 *   clickHandlers: array of tab click handlers, one for each tab.
 *   Use tab click handlers when your content is dynamic (e.g. calculated, AJAX, etc.)
 *   Pass null for any tab whose content is static and provided in its associated "tab-bar__pane."
 *   Pass null for clickHandlers itslelf if all of the tabs have static content provided in their
 *   associated "tab-bar__pane"s. Define you click handlers as follows:
 *   clickHandler(elTabBarTab, elTabBarPaneContent)
 */
const register = (tabBar, options) => {
    let elTabBar = typeof (tabBar) === "string" && document.getElementById(tabBar) || tabBar;
    let api = {};
    // setup events
    elTabBar.addEventListener("focusin", focusInEventHandler, false);
    elTabBar.addEventListener("focusout", focusOutEventHandler, false);
    // configure the api
    api.showTab = showTab;
    api.elsTabBarTabs = elTabBar.getElementsByClassName("tab-bar__tabs")[0];
    api.elsTabBarPanes = elTabBar.getElementsByClassName("tab-bar__panes")[0];
    // Note: not setting a tab-bar-tab--active will break the code
    api.elActiveTabBarTab = api.elsTabBarTabs.getElementsByClassName("tab-bar-tab--active")[0];
    // set the appropriate tab-bar-pane active
    api.elActiveTabBarPaneId =
        api.elActiveTabBarTab.getElementsByClassName("tab-bar-tab__label")[0]
            .getAttribute("href").substring(1);
    api.elActiveTabBarPane = document.getElementById(api.elActiveTabBarPaneId);
    api.elActiveTabBarPane.className = api.elActiveTabBarPane.className + " tab-bar-pane--active";
    // attach the api directly to the tab bar element
    elTabBar.tabBar = api;
    // return the tab-bar element for chaining
    return elTabBar;
};

let focusInEventHandler = (e) => {
    let elParent = e.target && e.target.parentElement;
    console.log("focusin event handler!. e.target=", e.target);
    if (elParent && elHasClassName(elParent, "tab-bar-tab") && !elHasClassName(elParent, "tab-bar-tab--active")) {
        e.preventDefault();
        elParent.className = elParent.className + " tab-bar-tab--has-focus";
    }
};

let focusOutEventHandler = (e) => {
    let elParent = e.target && e.target.parentElement;
    console.log("focusout event handler!. e.target=", e.target);
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
        elRemoveClassName(el, "tab-bar-tab--active");
        elRemoveClassName(el, "tab-bar-tab--has-focus");
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
};

export default register;