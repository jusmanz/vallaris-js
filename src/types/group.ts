interface VisibleGroup {
    map: any;
    groupId: string;
    type: "visible" | "none";
    options?: {
        groupKey?: string;
        onlyGroup?: boolean;
        returnStyle?: boolean
    }
}

interface RenderGroup {
    styles: any;
    groupIds: string[]
    options?: {
        groupKey?: string;
    }
}

interface ReturnGroup {
    groupId: string;
    layers: any[]
}

export { VisibleGroup, RenderGroup, ReturnGroup }