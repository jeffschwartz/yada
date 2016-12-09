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
    // configure the api
    let api = {};
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

let showTab = (elTab) => {
    console.log("showTab called. elTab=", elTab);
    let elsTab = elTab.parentElement.getElementsByClassName("tab-bar-tab");
    console.log("elsTab=", elsTab);
    Array.prototype.forEach.call(elsTab, el => {
        let classNames = el.className.split(" ");
        let classNamesFiltered = classNames.filter(className => {
            return className !== "tab-bar-tab--active";
        });
        el.className = classNamesFiltered;
    });
    elTab.className = elTab.className + " tab-bar-tab--active";
    let paneId = elTab.getElementsByClassName("tab-bar-tab__label")[0].getAttribute("href").substring(1);
    console.log("paneId=", paneId);
    let elsPane = elTab.parentElement.parentElement.getElementsByClassName("tab-bar-pane");
    console.log("elsPane=", elsPane);
    Array.prototype.forEach.call(elsPane, el => {
        let classNames = el.className.split(" ");
        let classNamesFiltered = classNames.filter(className => {
            return className !== "tab-bar-pane--active";
        });
        el.className = classNamesFiltered;
    });
    let activePane = document.getElementById(paneId);
    activePane.className = activePane.className + " tab-bar-pane--active";
};

export default register;