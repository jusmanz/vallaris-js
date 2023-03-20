"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.initial = void 0;
const defaultHOST = "https://cloud.vallarismaps.com";
var config;
exports.config = config;
const initial = ({ host, apiKey }) => {
    config.host = host ? host : defaultHOST;
    if (config.apiKey) {
        config.apiKey = apiKey;
    }
    else {
        throw new Error("API Key is require please check in management > API Key");
    }
};
exports.initial = initial;
//# sourceMappingURL=initial.js.map