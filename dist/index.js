"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const engine_1 = __importDefault(require("./helpers/engine"));
const performance_1 = __importDefault(require("./helpers/performance"));
const getData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.get(url);
        const html = res.data;
        const $ = cheerio_1.default.load(html);
        const firstDiv = $('div.enginedata.engine-inline').first();
        const extractedData = {};
        const description = $('div.fl.newstext p').map((index, element) => $(element).text().trim()).get().filter(Boolean);
        extractedData['description'] = description;
        firstDiv.find('table').each((index, tableElement) => {
            const title = $(tableElement).find('.title div').text().split(' - ')[0].replace('SPECS', '').trim().toLowerCase();
            const tableData = {};
            if (title == 'engine specs')
                tableData['type'] = $(tableElement).find('.title div').text().split(' - ')[1].trim();
            $(tableElement).find('tr').each((rowIndex, rowElement) => {
                const leftColumn = $(rowElement).find('.left').text().trim().replace(':', '').toLowerCase(); // Get the text content of the left column
                const rightColumn = $(rowElement).find('.right').text().trim().toLowerCase(); // Get the text content of the right column
                if (leftColumn)
                    tableData[leftColumn] = rightColumn;
            });
            extractedData[title] = tableData;
        });
        return extractedData;
    }
    catch (error) {
        console.error('Error:', error);
    }
});
const scrape = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getData(url);
    data['engine'] = (0, engine_1.default)(data['engine']);
    data['performance'] = (0, performance_1.default)(data['performance']);
    data['description'] = null;
    console.log(data);
});
scrape('https://www.autoevolution.com/cars/volkswagen-touareg-2023.html#aeng_volkswagen-touareg-2023-30l-v6-4motion-8at-awd-340-hp');
scrape('https://www.autoevolution.com/cars/pagani-huayra-2012.html#aeng_pagani-huayra-2012-60-v12-7at-730-hp');
scrape('https://www.autoevolution.com/cars/audi-a4-2019.html#aeng_audi-a4-2019-35-tsfi-s-tronic-7at-150-hp');
