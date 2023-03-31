import { getFetch, parseURL } from "../config/fetch"
import { PostCollection, PostFeature } from "../types/collection";

const collections = ({ body }: PostCollection) => {
    const collection = getFetch(parseURL('collections', 'POST'), { method: 'POST', body: JSON.stringify(body) });
    return collection
}

const data = ({ collectionId, body }: PostFeature) => {
    const data = getFetch(parseURL('items', 'POST', { collectionId }), { method: 'POST', body: JSON.stringify(body) });
    return data
}

const create = {
    collections,
    data
}

export { create }