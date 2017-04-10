/**
 * Tab
 */

const register = (tab, elTabBar, { clickCallback = null } = {}) => {
    let elTab;
    let tabBarPaneId;
    let elTabBarPane;
    let elTabBarPaneContent;
    elTab = typeof (tab) === "string" && document.getElementById(tab) || tab;
    if (!elTab) {
        console.log("Tab Error - expected tab to be either an element or element id");
        return;
    }
    tabBarPaneId = elTab.getElementsByClassName("tab__label")[0].getAttribute("href").substring(1);
    if (!tabBarPaneId) {
        console.log(`Tab Error - expected element with class "tab__label" to have "href" attribute!`);
        return;
    }
    elTabBarPane = elTabBar.querySelector(`div.tab-bar-pane[data-for-tab="${tabBarPaneId}"`);
    if (!elTabBarPane) {
        console.log(`Tab Error - expected element with class "tab-bar-pane" and  attribute "data-for-tab${tabBarPaneId}"!`);
        return;
    }
    elTabBarPaneContent = elTabBarPane.getElementsByClassName("tab-bar-pane__content")[0];
    if (!elTabBarPaneContent) {
        console.log(`Tab Error - expected element with class "tab-bar-pane__content"!`);
        return;
    }
    elTab.yadaTab = {
        elTabBarPane,
        elTabBarPaneContent,
        clickCallback
    };
    return elTab;
};

export default register;
