export let elRemoveClassName = (element, classNameToRemove) => {
    let classNames = element.className.split(" ");
    let filtered;
    filtered = classNames.filter(className => className !== classNameToRemove);
    element.className = filtered.join(" ");
};

export let elHasClassName = (el, className) => {
    return el.className.split(" ").some(elClassName => className === elClassName);
};
