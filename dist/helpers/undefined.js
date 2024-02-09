"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fixUndefined = (data, base) => {
    for (let key of Object.keys(base))
        if (data[key] === undefined)
            data[key] = null;
    return data;
};
exports.default = fixUndefined;
