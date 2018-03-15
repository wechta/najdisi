'use strict';

const PREFIX = 'ns';
const hasOwn = {}.hasOwnProp;

function addGens(prefix, classes, result) {
    if (classes) {
        var type = typeof classes;

        if (type === 'string' || type === 'number') {
            result.push(prefix + classes);

        } else if (Array.isArray(classes)) {
            for (var i = 0, l = classes.length; i < l; i++) {
                classes[i] && result.push(prefix + classes[i]);
            }
        } else if (type === 'object') {
            for (var key in classes) {
                if (hasOwn.call(classes, key) && classes[key]) {
                    result.push(prefix + key);
                }
            }
        }
    }
}

const addMods = addGens.bind(undefined, `${PREFIX}mod-`);

export default function classPrefixer(componentName) {
    const componentClass = `${PREFIX}-${componentName}`;
    const addElem = addGens.bind(undefined, `${componentClass}__`);

    return function(elements, modifiers) {
        if (!(elements || modifiers)) {
            return componentClass;
        }

        let result = [];

        elements && addElem(elements, result);
        modifiers && addMods(modifiers, result);

        return result.join(' ');
    };
}
