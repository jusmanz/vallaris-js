import { get } from 'dot-prop-immutable'
import { SelectLayer } from '../types';
import { SelectLayerId } from '../types/layer';

const select = ({ styles, ids }: SelectLayerId) => {
    const { layers } = styles;

    let newRender: any[] = [];

    layers.map((l: any) => {
        if (ids.includes(l.id)) {
            newRender.push(l);
        }
    });

    return newRender;
}

const selectWithMetadata = ({ styles, metadataKey }: SelectLayer) => {
    const { layers } = styles;

    let newRender: any[] = [];

    layers.map((l: any) => {
        const newMetadata = get(l, "metadata")
            ? Object.keys(get(l, "metadata")).filter((mt) => mt === metadataKey)
            : [];

        if (newMetadata.length) {
            newRender.push(l);
        }
    });

    return newRender;
}


const layers = {
    select,
    selectWithMetadata
}

export { layers }