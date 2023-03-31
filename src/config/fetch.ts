import { config } from "./initial";

const core = '/core/api';
const version = '1.0'


const getFetch = async (url: string, options: RequestInit) => {
    return await fetch(url, {
        ...options,
        "headers": {
            "API-Key": config.apiKey,
            "Content-Type": "application/json",
        }
    })
        .then(async (rs) => {
            return {
                status: rs.status,
                response: options.method === 'DELETE' ? null : await rs.json()
            }
        })
        .then(rs => rs)
        .catch((err) => {
            return {
                status: 500,
                response: err
            }
        });
}

const covertParamToString = (params: Object) => {
    return params
        ? Object.keys(params)
            .map(
                (op, index) =>
                    `${index === 0 ? "?" : "&"}${op}=${params[op]}`
            )
            .join("")
        : ""
}

const parseURL = (type: "collections" | "items" | "profile" | "styles", method: RequestInit['method'], params?: any, ids?: {
    collectionId?: string
    featureId?: string
    metadata?: boolean
}) => {
    const url = config.host
    switch (type) {
        case 'collections':
            switch (method) {
                case 'POST':
                    return `${url}${core}/features/${version}/collections`
                default:
                    if (ids.collectionId) return `${url}${core}/features/${version}/collections/${ids.collectionId}`
                    return `${url}${core}/features/${version}/collections${covertParamToString(params)}`
            }
        case 'items':
            switch (method) {
                case 'POST':
                    return `${url}${core}/features/${version}/collections/${ids.collectionId}/items`
                default:
                    if (ids.featureId) return `${url}${core}/features/${version}/collections/${ids.collectionId}/items/${ids.featureId}`
                    return `${url}${core}/features/${version}/collections/${ids.collectionId}/items${covertParamToString(params)}`
            }
        case 'profile':
            return `${url}${core}/managements/${version}/account/profile`
        case 'styles':
            switch (method) {
                case 'POST':
                    return `${url}${core}/styles/${version}-beta/styles`
                default:
                    if (ids.collectionId) return `${url}${core}/styles/${version}-beta/styles/${ids.collectionId}`
                    if (ids.metadata && ids.collectionId) return `${url}${core}/styles/${version}-beta/styles/${ids.collectionId}/metadata`
                    return `${url}${core}/styles/${version}-beta/styles/${ids.collectionId}${covertParamToString(params)}`
            }
        default:
            return `${url}`
    }
}

export { getFetch, parseURL }