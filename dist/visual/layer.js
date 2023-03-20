"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderLayers = exports.selectLayers = exports.renderGroup = exports.visibleGroup = void 0;
const dot_prop_immutable_1 = require("dot-prop-immutable");
const visibleGroup = ({ map, groupId, type, options }) => {
    const { groupKey, onlyGroup, returnStyle } = options;
    const key = groupKey ? groupKey : "vallaris:group";
    const styles = map.getStyle();
    const { layers } = styles;
    let newLayers = [];
    for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        if (layer.metadata && layer.metadata[key] && layer.metadata[key] === groupId) {
            let input = Object.assign({}, layer);
            const newInput = (0, dot_prop_immutable_1.set)(input, "layout.visibility", type);
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
        let newStyle = Object.assign({}, styles);
        newStyle.layers = newLayers;
        return newStyle;
    }
};
exports.visibleGroup = visibleGroup;
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
exports.renderGroup = renderGroup;
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
exports.selectLayers = selectLayers;
const renderLayers = ({ styles, metadataKey }) => {
    const { layers } = styles;
    let newRender = [];
    layers.map((l) => {
        const newMetadata = (0, dot_prop_immutable_1.get)(l, "metadata")
            ? Object.keys((0, dot_prop_immutable_1.get)(l, "metadata")).filter((mt) => mt === metadataKey)
            : [];
        if (newMetadata.length) {
            newRender.push(l);
        }
    });
    return newRender;
};
exports.renderLayers = renderLayers;
//# sourceMappingURL=layer.js.map