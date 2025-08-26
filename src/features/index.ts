
import type { BodyCollection, CollectionTypes, FeatureTypes, GetCollection, GetFeature, PostCollection, PostFeature, PutCollection, PutFeature } from "../types/collection";
import type { Feature, FeatureCollection } from "geojson";
import { getFetch, parseURL } from "../config/fetch";

class FeaturesClient {
    constructor() {
        this.create = {
            collections: ({ body }: PostCollection) => this.createCollection(body),
            data: ({ collectionId, body }: PostFeature) => this.createItems(collectionId, body)
        };

        this.get = {
            collections: ({ collectionId, params }: GetCollection) => {
                if (collectionId) return this.getCollection(collectionId, params);
                return this.listCollections(params);
            },
            data: ({ collectionId, featureId, params }: GetFeature) => {
                if (featureId) return this.getItem(collectionId, featureId, params);
                return this.listItems(collectionId, params);
            }
        };

        this.update = {
            collections: ({ collectionId, body }: PutCollection) => this.updateCollection(collectionId, body),
            data: ({ collectionId, featureId, body }: PutFeature) => this.replaceItem(collectionId, featureId, body)
        };

        this.remove = {
            collections: ({ collectionId }: GetCollection) => this.deleteCollection(collectionId as string),
            data: ({ collectionId, featureId }: GetFeature) => this.deleteItem(collectionId, featureId as string)
        };
    }

    // Collections (OGC API - Features Part 1: Core)
    async listCollections(params?: CollectionTypes) {
        return await getFetch(parseURL('collections', 'GET', params), { method: 'GET' });
    }

    async getCollection(collectionId: string, params?: CollectionTypes) {
        return await getFetch(parseURL('collections', 'GET', params, { collectionId }), { method: 'GET' });
    }

    async createCollection(body: BodyCollection) {
        return await getFetch(parseURL('collections', 'POST'), { method: 'POST', body: JSON.stringify(body) });
    }

    async updateCollection(collectionId: string, body: BodyCollection) {
        return await getFetch(parseURL('collections', 'PUT', body, { collectionId }), { method: 'PUT', body: JSON.stringify(body) });
    }

    async deleteCollection(collectionId: string) {
        return await getFetch(parseURL('collections', 'DELETE', undefined, { collectionId }), { method: 'DELETE' });
    }

    // Items (Features)
    async listItems(collectionId: string, params?: FeatureTypes) {
        return await getFetch(parseURL('items', 'GET', params, { collectionId }), { method: 'GET' });
    }

    async getItem(collectionId: string, featureId: string, params?: FeatureTypes) {
        return await getFetch(parseURL('items', 'GET', params, { collectionId, featureId }), { method: 'GET' });
    }

    async createItems(collectionId: string, body: FeatureCollection) {
        return await getFetch(parseURL('items', 'POST', undefined, { collectionId }), { method: 'POST', body: JSON.stringify(body) });
    }

    async replaceItem(collectionId: string, featureId: string, body: Feature) {
        return await getFetch(parseURL('items', 'PUT', body, { collectionId, featureId }), { method: 'PUT', body: JSON.stringify(body) });
    }

    async updateItem(collectionId: string, featureId: string, body: Partial<Feature>) {
        return await getFetch(parseURL('items', 'PATCH', body, { collectionId, featureId }), { method: 'PATCH', body: JSON.stringify(body) });
    }

    async deleteItem(collectionId: string, featureId: string) {
        return await getFetch(parseURL('items', 'DELETE', undefined, { collectionId, featureId }), { method: 'DELETE' });
    }

    create: {
        collections: (args: PostCollection) => Promise<any>,
        data: (args: PostFeature) => Promise<any>
    };

    get: {
        collections: (args: GetCollection) => Promise<any>,
        data: (args: GetFeature) => Promise<any>
    };

    update: {
        collections: (args: PutCollection) => Promise<any>,
        data: (args: PutFeature) => Promise<any>
    };

    remove: {
        collections: (args: GetCollection) => Promise<any>,
        data: (args: GetFeature) => Promise<any>
    };
}

const features = new FeaturesClient();

export { FeaturesClient, features } 