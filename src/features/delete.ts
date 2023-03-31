import { getFetch, parseURL } from "../config/fetch"
import { GetCollection, GetFeature } from "../types/collection";

const collections = ({ collectionId, params }: GetCollection) => {
    const collection = getFetch(parseURL('collections', 'DELETE', params, { collectionId }), { method: 'DELETE' });
    return collection
}

const data = ({ collectionId, featureId, params }: GetFeature) => {
    const data = getFetch(parseURL('items', 'DELETE', params, { collectionId, featureId }), { method: 'DELETE' });
    return data
}

const remove = {
    collections,
    data
}

export { remove }