export let elRemoveClassName = (element, classNamesToRemove) => {
    classNamesToRemove = Array.isArray(classNamesToRemove) && classNamesToRemove || [classNamesToRemove];
    classNamesToRemove.forEach(classNameToRemove => {
        let classNames = element.className.split(" ");
        let filtered = classNames.filter(className => className !== classNameToRemove);
        element.className = filtered.join(" ");
    });
    return element;
};

export let elHasClassName = (el, className) => {
    return el.className.split(" ").some(elClassName => className === elClassName);
};
