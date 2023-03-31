import { FeatureCollection } from "geojson";

interface CollectionTypes {
    search?: string;
    itemType?: "Feature" | "Coverage" | "Tile" | "CoverageTile";
    sort?: string;
    offset?: number;
    limit?: number
}

interface FeatureTypes {
    bbox?: string;
    "bbox-crs"?: string;
    datetime?: string;
    offset?: number;
    limit?: number
}

interface GetCollection {
    collectionId?: string
    params?: CollectionTypes
}

interface GetFeature {
    collectionId: string
    featureId?: string
    params?: FeatureTypes
}


interface BodyCollection {
    title: string,
    description: string,
    itemType: "Feature" | "Coverage" | "Tile" | "CoverageTile",
    extent?: {
        spatial?: {
            bbox?: any,
            crs?: string
        },
        temporal?: {
            interval?: any,
            trs?: string
        }
    },
    crs?: any[],
    public?: boolean,
    tileConfig?: any,
    metadata?: any,
    links?: any[]
}

interface PostCollection {
    body: BodyCollection
}

interface PostFeature {
    collectionId: string;
    body: FeatureCollection
}

interface PutCollection {
    collectionId: string;
    body: BodyCollection
}

interface PutFeature {
    collectionId: string;
    featureId: string;
    body: BodyCollection
}

export { CollectionTypes, FeatureTypes, GetCollection, GetFeature, PostCollection, PostFeature, PutCollection, PutFeature }