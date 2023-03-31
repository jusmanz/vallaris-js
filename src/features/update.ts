import { getFetch, parseURL } from "../config/fetch"
import { PutCollection, PutFeature } from "../types/collection";

const collections = ({ collectionId, body }: PutCollection) => {
    const collection = getFetch(parseURL('collections', 'PUT', body, { collectionId }), { method: 'PUT', body: JSON.stringify(body) });
    return collection
}

const data = ({ collectionId, featureId, body }: PutFeature) => {
    const data = getFetch(parseURL('items', 'PUT', body, { collectionId, featureId }), { method: 'PUT', body: JSON.stringify(body) });
    return data
}

const update = {
    collections,
    data
}

export { update }