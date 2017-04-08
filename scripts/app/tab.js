/**
 * Tab
 */

// TODO(JS): replace relying on ids matching tabs to panes with data attribute

const register = (tab, { clickCallback = null } = {}) => {
    let elTab;
    elTab = typeof (tab) === "string" && document.getElementById(tab) || tab;
    if (!elTab) {
        console.log("Tab Error - expected tab to be either an element or element id");
        return;
    }
    elTab.tab = {
        clickCallback
    };
    return elTab;
};

export default register;
