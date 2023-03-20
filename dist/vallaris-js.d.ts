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

interface InitialProps {
    apiKey: string;
    host?: string;
}
declare const initial: ({ host, apiKey }: InitialProps) => void;

export { group, initial, layers };
