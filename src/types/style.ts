interface StyleParams {
    search?: string;
    public?: boolean
    sort?: string;
    offset?: number;
    limit?: number
}


interface GetStyle {
    styleId: string,
    params?: StyleParams,
    metadata?: boolean
}

export { GetStyle }