import { config } from "./initial";

const core = '/core/api';
const version = '1.0'


const getFetch = async (url: string, options: RequestInit) => {
    return await fetch(url, {
        ...options,
        "headers": {
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
    const api_key = `api_key=${config.apiKey}`
    const withParams = params ? `${covertParamToString(params)}&${api_key}` : `?${api_key}`
    switch (type) {
        case 'collections':
            switch (method) {
                case 'POST':
                    return `${url}${core}/features/${version}/collections?${api_key}`
                default:
                    if (ids && ids.collectionId) return `${url}${core}/features/${version}/collections/${ids.collectionId}?${api_key}`
                    return `${url}${core}/features/${version}/collections${withParams}`
            }
        case 'items':
            switch (method) {
                case 'POST':
                    return `${url}${core}/features/${version}/collections/${ids?.collectionId}?${api_key}`
                case 'PATCH':
                    return `${url}${core}/features/${version}/collections/${ids?.collectionId}/items/${ids?.featureId}?${api_key}`
                default:
                    if (ids?.featureId) return `${url}${core}/features/${version}/collections/${ids?.collectionId}/items/${ids?.featureId}?${api_key}`
                    return `${url}${core}/features/${version}/collections/${ids?.collectionId}/items${withParams}`
            }
        case 'profile':
            return `${url}${core}/managements/${version}/account/profile?${api_key}`
        case 'styles':
            switch (method) {
                case 'POST':
                    return `${url}${core}/styles/${version}-beta/styles?${api_key}`
                default:
                    if (ids?.collectionId) return `${url}${core}/styles/${version}-beta/styles/${ids.collectionId}?${api_key}`
                    if (ids?.metadata && ids?.collectionId) return `${url}${core}/styles/${version}-beta/styles/${ids.collectionId}/metadata?${api_key}`
                    return `${url}${core}/styles/${version}-beta/styles/${ids?.collectionId}${withParams}`
            }
        default:
            return `${url}`
    }
}

export { getFetch, parseURL }