const defaultHOST = "https://cloud.vallarismaps.com";
var config;
const initial = ({ host, apiKey }) => {
    config.host = host ? host : defaultHOST;
    if (config.apiKey) {
        config.apiKey = apiKey;
    }
    else {
        throw new Error("API Key is require please check in management > API Key");
    }
};
export { initial, config };
//# sourceMappingURL=index.js.map