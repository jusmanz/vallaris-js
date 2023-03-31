import { FeatureCollection } from 'geojson';

interface VisibleGroup {
    map: any;
    groupId: string;
    type: "visible" | "none";
    options?: {
        groupKey?: string;
        onlyGroup?: boolean;
        returnStyle?: boolean;
    };
}
interface RenderGroup {
    styles: any;
    groupIds: string[];
    options?: {
        groupKey?: string;
    };
}
interface ReturnGroup {
    groupId: string;
    layers: any[];
}

interface SelectLayer {
    styles: any;
    metadataKey: string;
}
interface SelectLayerId {
    styles: any;
    ids: string[];
}

declare const layers: {
    select: ({ styles, ids }: SelectLayerId) => any[];
    selectWithMetadata: ({ styles, metadataKey }: SelectLayer) => any[];
};

declare const group: {
    get: ({ styles, groupIds, options }: RenderGroup) => ReturnGroup[];
    visibility: ({ map, groupId, type, options }: VisibleGroup) => any;
};

interface StyleParams {
    search?: string;
    public?: boolean;
    sort?: string;
    offset?: number;
    limit?: number;
}
interface GetStyle {
    styleId: string;
    params: StyleParams;
    metadata?: boolean;
}

interface CollectionTypes {
    search?: string;
    itemType?: "Feature" | "Coverage" | "Tile" | "CoverageTile";
    sort?: string;
    offset?: number;
    limit?: number;
}
interface FeatureTypes {
    bbox?: string;
    "bbox-crs"?: string;
    datetime?: string;
    offset?: number;
    limit?: number;
}
interface GetCollection {
    collectionId?: string;
    params?: CollectionTypes;
}
interface GetFeature {
    collectionId: string;
    featureId?: string;
    params?: FeatureTypes;
}
interface BodyCollection {
    title: string;
    description: string;
    itemType: "Feature" | "Coverage" | "Tile" | "CoverageTile";
    extent?: {
        spatial?: {
            bbox?: any;
            crs?: string;
        };
        temporal?: {
            interval?: any;
            trs?: string;
        };
    };
    crs?: any[];
    public?: boolean;
    tileConfig?: any;
    metadata?: any;
    links?: any[];
}
interface PostCollection {
    body: BodyCollection;
}
interface PostFeature {
    collectionId: string;
    body: FeatureCollection;
}
interface PutCollection {
    collectionId: string;
    body: BodyCollection;
}
interface PutFeature {
    collectionId: string;
    featureId: string;
    body: BodyCollection;
}

interface InitialProps {
    apiKey: string;
    host?: string;
}
declare class Initial {
    features: {
        create: {
            collections: ({ body }: PostCollection) => Promise<{
                status: number;
                response: any;
            } | {
                status: number;
                response: any;
            }>;
            data: ({ collectionId, body }: PostFeature) => Promise<{
                status: number;
                response: any;
            } | {
                status: number;
                response: any;
            }>;
        };
        get: {
            collections: ({ collectionId, params }: GetCollection) => Promise<{
                status: number;
                response: any;
            } | {
                status: number;
                response: any;
            }>;
            data: ({ collectionId, featureId, params }: GetFeature) => Promise<{
                status: number;
                response: any;
            } | {
                status: number;
                response: any;
            }>;
        };
        update: {
            collections: ({ collectionId, body }: PutCollection) => Promise<{
                status: number;
                response: any;
            } | {
                status: number;
                response: any;
            }>;
            data: ({ collectionId, featureId, body }: PutFeature) => Promise<{
                status: number;
                response: any;
            } | {
                status: number;
                response: any;
            }>;
        };
        remove: {
            collections: ({ collectionId, params }: GetCollection) => Promise<{
                status: number;
                response: any;
            } | {
                status: number;
                response: any;
            }>;
            data: ({ collectionId, featureId, params }: GetFeature) => Promise<{
                status: number;
                response: any;
            } | {
                status: number;
                response: any;
            }>;
        };
    };
    styles: {
        get: ({ styleId, params, metadata }: GetStyle) => Promise<{
            status: number;
            response: any;
        } | {
            status: number;
            response: any;
        }>;
    };
    constructor(source: InitialProps);
}

export { Initial, group, layers };
