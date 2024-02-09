"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteUnused = (data, base) => {
    for (let key of Object.keys(data)) {
        if (base[key] === undefined)
            delete data[key];
    }
    return data;
};
exports.default = deleteUnused;
