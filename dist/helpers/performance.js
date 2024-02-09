"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const undefined_1 = __importDefault(require("./undefined"));
const unused_1 = __importDefault(require("./unused"));
const BASE_PERFORMANCE = {
    "top speed": null,
    acceleration: null,
};
const fixPerformanceData = (data) => {
    if (data === null || data === undefined)
        return BASE_PERFORMANCE;
    data = (0, undefined_1.default)(data, BASE_PERFORMANCE);
    data['top speed'] = fixTopSpeed(data['top speed']);
    data['acceleration'] = fixAcceleration(data['acceleration 0-62 mph (0-100 kph)']);
    data = (0, unused_1.default)(data, BASE_PERFORMANCE);
    return data;
};
const fixTopSpeed = (text) => {
    var _a, _b;
    if (text === null)
        return null;
    const kmh_regex = /\d+\ km\/h/g;
    const mph_regex = /\d+\ mph/g;
    const kmh = ((_a = text.match(kmh_regex)) === null || _a === void 0 ? void 0 : _a[0]) || '';
    const mph = ((_b = text.match(mph_regex)) === null || _b === void 0 ? void 0 : _b[0]) || '';
    const values = [mph, kmh].filter(Boolean);
    const error = !values.every((value) => value.endsWith('km/h') || value.endsWith('mph'));
    return error ? null : values;
};
const fixAcceleration = (text) => {
    if (text === null)
        return null;
    const error = !text.match(/\d.\d+\ s|\d+\ s/g);
    return error ? null : text;
};
exports.default = fixPerformanceData;
