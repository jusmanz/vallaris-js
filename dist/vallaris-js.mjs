import { set, get } from 'dot-prop-immutable';

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const visibleGroup = ({ map, groupId, type, options }) => {
  const { groupKey, onlyGroup, returnStyle } = options;
  const key = groupKey ? groupKey : "vallaris:group";
  const styles = map.getStyle();
  const { layers } = styles;
  let newLayers = [];
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    if (layer.metadata && layer.metadata[key] && layer.metadata[key] === groupId) {
      let input = __spreadValues({}, layer);
      const newInput = set(input, "layout.visibility", type);
      newLayers.push(newInput);
      map.setLayoutProperty(layer.id, "visibility", type);
    } else {
      newLayers.push(layer);
      if (onlyGroup && type === "visible")
        map.setLayoutProperty(layer.id, "visibility", "none");
    }
  }
  if (returnStyle) {
    let newStyle = __spreadValues({}, styles);
    newStyle.layers = newLayers;
    return newStyle;
  }
};
const renderGroup = ({ styles, groupIds, options }) => {
  const { groupKey } = options;
  const key = groupKey ? groupKey : "vallaris:group";
  let groups = [];
  const { layers } = styles;
  const filterLayers = layers.filter(
    (l) => l.metadata && l.metadata[key] && groupIds.includes(l.metadata[key])
  );
  filterLayers.map((l) => {
    const layers2 = renderLayers({ styles, metadataKey: l.metadata[key] });
    let input = { groupId: l.metadata[key], layers: layers2 };
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
    const newMetadata = get(l, "metadata") ? Object.keys(get(l, "metadata")).filter((mt) => mt === metadataKey) : [];
    if (newMetadata.length) {
      newRender.push(l);
    }
  });
  return newRender;
};

const defaultHOST = "https://cloud.vallarismaps.com";
var config;
const initial = ({ host, apiKey }) => {
  config.host = host ? host : defaultHOST;
  if (config.apiKey) ; else {
    throw new Error("API Key is require please check in management > API Key");
  }
};

export { initial, renderGroup, renderLayers, selectLayers, visibleGroup };
//# sourceMappingURL=vallaris-js.mjs.map
