import { set, get } from 'dot-prop-immutable';
const visibleGroup = ({ map, groupId, type, options }) => {
    const { groupKey, onlyGroup, returnStyle } = options;
    const key = groupKey ? groupKey : "vallaris:group";
    const styles = map.getStyle();
    const { layers } = styles;
    let newLayers = [];
    for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        if (layer.metadata && layer.metadata[key] && layer.metadata[key] === groupId) {
            let input = { ...layer };
            const newInput = set(input, "layout.visibility", type);
            newLayers.push(newInput);
            map.setLayoutProperty(layer.id, 'visibility', type);
        }
        else {
            newLayers.push(layer);
            if (onlyGroup && type === 'visible')
                map.setLayoutProperty(layer.id, 'visibility', 'none');
        }
    }
    if (returnStyle) {
        let newStyle = { ...styles };
        newStyle.layers = newLayers;
        return newStyle;
    }
};
const renderGroup = ({ styles, groupIds, options }) => {
    const { groupKey } = options;
    const key = groupKey ? groupKey : "vallaris:group";
    let groups = [];
    const { layers } = styles;
    const filterLayers = layers.filter((l) => l.metadata && l.metadata[key] && groupIds.includes(l.metadata[key]));
    filterLayers.map((l) => {
        const layers = renderLayers({ styles: styles, metadataKey: l.metadata[key] });
        let input = { groupId: l.metadata[key], layers: layers };
        groups.push(input);
    });
    return groups;
};
const selectLayers = ({ styles, args }) => {
    const { layers } = styles;
    let newRender = [];
    layers.map((l) => {
        if (args.includes(l.id)) {
            newRender.push(l);
        }
    });
    return newRender;
};
const renderLayers = ({ styles, metadataKey }) => {
    const { layers } = styles;
    let newRender = [];
    layers.map((l) => {
        const newMetadata = get(l, "metadata")
            ? Object.keys(get(l, "metadata")).filter((mt) => mt === metadataKey)
            : [];
        if (newMetadata.length) {
            newRender.push(l);
        }
    });
    return newRender;
};
export { visibleGroup, renderGroup, selectLayers, renderLayers };
//# sourceMappingURL=index.js.map