import { set } from 'dot-prop-immutable';
import { RenderGroup, VisibleGroup, ReturnGroup } from '../types';


const visibility = ({ map, groupId, type, options }: VisibleGroup) => {
    const key = options?.groupKey ? options.groupKey : "vallaris:group";
    const styles = map.getStyle()
    const { layers } = styles
    let newLayers: any[] = [];

    for (let i = 0; i < layers.length; i++) {
        const layer = layers[i]
        if (layer.metadata && layer.metadata[key] && layer.metadata[key] === groupId) {
            let input = { ...layer };
            const newInput = set(input, "layout.visibility", type);

            newLayers.push(newInput);

            map.setLayoutProperty(layer.id, 'visibility', type)
        } else {
            newLayers.push(layer);

            if (options?.onlyGroup && type === 'visible') map.setLayoutProperty(layer.id, 'visibility', 'none')
        }
    }

    if (options?.returnStyle) {
        let newStyle = { ...styles };
        newStyle.layers = newLayers;

        return newStyle;
    }

}


const get = ({ styles, groupIds, options }: RenderGroup) => {
    const key = options?.groupKey ? options.groupKey : "vallaris:group";
    let groups: ReturnGroup[] = [];
    const { layers } = styles;

    const filterLayers = layers.filter(
        (l: any) =>
            l.metadata && l.metadata[key] && groupIds.includes(l.metadata[key])
    );

    filterLayers.map((l: any) => {
        if (groups.filter((g) => g.groupId === l.metadata[key]).length) {
            const index = groups.map((g) => g.groupId).indexOf(l.metadata[key]);
            groups[index].layers.push(l);
        } else {
            let input = { groupId: l.metadata[key], layers: [l] };
            groups.push(input);
        }
    });

    return groups;
};


const group = {
    get,
    visibility
}

export { group }