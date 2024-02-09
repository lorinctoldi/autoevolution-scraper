"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const undefined_1 = __importDefault(require("./undefined"));
const BASE_ENGINE = {
    cylinders: null,
    displacement: null,
    power: null,
    torque: null,
    'fuel system': null,
    fuel: null,
    'fuel capacity': null
};
const fixEngineData = (data) => {
    if (data === null || data === undefined)
        return BASE_ENGINE;
    data = (0, undefined_1.default)(data, BASE_ENGINE);
    data["power"] = fixPower(data["power"]);
    data["torque"] = fixTorque(data["torque"]);
    data["fuel capacity"] = fixFuelCapacity(data["fuel capacity"]);
    return data;
};
const fixPower = (text) => {
    if (text === null)
        return null;
    const regex = / @ - rpm|@ -? ?\d+(?:-\d+)? rpm/gi;
    const values = text
        .split(regex)
        .map((value) => value.trim())
        .filter(Boolean);
    const error = !(values === null || values === void 0 ? void 0 : values.every((value) => value.endsWith(" kw") || value.endsWith(" hp") || value.endsWith(" bhp")));
    return error ? null : values;
};
const fixTorque = (text) => {
    if (text === null)
        return null;
    const regex = / @ - rpm|@ -? ?\d+(?:-\d+)? rpm/gi;
    const values = text
        .split(regex)
        .map((value) => value.trim())
        .filter(Boolean);
    const error = !(values === null || values === void 0 ? void 0 : values.every((value) => value.endsWith(" lb-ft") || value.endsWith(" nm")));
    return error ? null : values;
};
const fixFuelCapacity = (text) => {
    var _a, _b;
    if (text === null)
        return null;
    const litre = ((_a = text.match(/(\d+\.\d+ l)/g)) === null || _a === void 0 ? void 0 : _a[0].replace("l", "litre")) || "";
    const gallon = ((_b = text.match(/\d+\.\d gallons/g)) === null || _b === void 0 ? void 0 : _b[0]) || "";
    const values = [gallon, litre].filter(Boolean);
    const error = !(values === null || values === void 0 ? void 0 : values.every((value) => value.endsWith(" litre") || value.endsWith(" gallons")));
    return error ? null : values;
};
exports.default = fixEngineData;
