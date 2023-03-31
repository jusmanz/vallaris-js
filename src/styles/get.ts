import { getFetch, parseURL } from "../config/fetch";
import { GetStyle } from "../types/style";


const get = ({ styleId, params, metadata }: GetStyle) => {
    const data = getFetch(parseURL('styles', 'GET', params, { collectionId: styleId, metadata }), { method: 'GET' });
    return data
}

export { get }