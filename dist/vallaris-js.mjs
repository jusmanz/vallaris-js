import { get as get$1, set } from 'dot-prop-immutable';

const select = ({ styles, ids }) => {
  const { layers: layers2 } = styles;
  let newRender = [];
  layers2.map((l) => {
    if (ids.includes(l.id)) {
      newRender.push(l);
    }
  });
  return newRender;
};
const selectWithMetadata = ({ styles, metadataKey }) => {
  const { layers: layers2 } = styles;
  let newRender = [];
  layers2.map((l) => {
    const newMetadata = get$1(l, "metadata") ? Object.keys(get$1(l, "metadata")).filter((mt) => mt === metadataKey) : [];
    if (newMetadata.length) {
      newRender.push(l);
    }
  });
  return newRender;
};
const layers = {
  select,
  selectWithMetadata
};

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
const visibility = ({ map, groupId, type, options }) => {
  const key = (options == null ? void 0 : options.groupKey) ? options.groupKey : "vallaris:group";
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
      if ((options == null ? void 0 : options.onlyGroup) && type === "visible")
        map.setLayoutProperty(layer.id, "visibility", "none");
    }
  }
  if (options == null ? void 0 : options.returnStyle) {
    let newStyle = __spreadValues({}, styles);
    newStyle.layers = newLayers;
    return newStyle;
  }
};
const get = ({ styles, groupIds, options }) => {
  const key = (options == null ? void 0 : options.groupKey) ? options.groupKey : "vallaris:group";
  let groups = [];
  const { layers } = styles;
  const filterLayers = layers.filter(
    (l) => l.metadata && l.metadata[key] && groupIds.includes(l.metadata[key])
  );
  filterLayers.map((l) => {
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
};

const defaultHOST = "https://cloud.vallarismaps.com";
var config;
const initial = ({ host, apiKey }) => {
  config.host = host ? host : defaultHOST;
  if (config.apiKey) ; else {
    throw new Error("API Key is require please check in management > API Key");
  }
};

export { group, initial, layers };
//# sourceMappingURL=vallaris-js.mjs.map
