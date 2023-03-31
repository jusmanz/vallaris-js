import { getFetch, parseURL } from "../config/fetch"
import { GetCollection, GetFeature } from "../types/collection";

const collections = ({ collectionId, params }: GetCollection) => {
    const collection = getFetch(parseURL('collections', 'GET', params, { collectionId }), { method: 'GET' });
    return collection
}

const data = ({ collectionId, featureId, params }: GetFeature) => {
    const data = getFetch(parseURL('items', 'GET', params, { collectionId, featureId }), { method: 'GET' });
    return data
}

const get = {
    collections,
    data
}

export { get }