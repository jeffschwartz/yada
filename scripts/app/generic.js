export let elRemoveClassName = (element, classNamesToRemove) => {
    classNamesToRemove = Array.isArray(classNamesToRemove) && classNamesToRemove || [classNamesToRemove];
    classNamesToRemove.forEach(classNameToRemove => {
        let classNames = element.className.split(" ");
        let filtered = classNames.filter(className => className !== classNameToRemove);
        element.className = filtered.join(" ");
    });
    return element;
};

export let elHasClassName = (el, classNames) => {
    classNames = Array.isArray(classNames) && classNames || [classNames];
    return el.className.split(" ").some(elClassName => {
        return classNames.some(elClassName2 => elClassName === elClassName2);
    });
};

export let objEquals = (el, els) => {
    return els.some(element => {
        return el === element;
    });
};
