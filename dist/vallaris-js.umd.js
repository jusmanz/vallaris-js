(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.vallarisJS = {}));
})(this, (function (exports) { 'use strict';

	/**
	 * Set a value by a dot path.
	 * @param obj The object to evaluate.
	 * @param prop The path to be set.
	 * @param value The value to set.
	 */

	function set(obj, prop, value) {
		prop = typeof prop === 'number' ? propToArray(prop.toString()) : typeof prop === 'string' ? propToArray(prop) : prop;

		const setPropImmutableRec = (obj, prop, value, i) => {
			let clone, head = prop[i];

			if (prop.length > i) {
				if (Array.isArray(obj)) {
					head = getArrayIndex(head, obj);
					clone = obj.slice();
				} else {
					clone = Object.assign({}, obj);
				}
				clone[head] = setPropImmutableRec(obj[head] !== undefined ? obj[head] : {}, prop, value, i + 1);
				return clone;
			}

			return typeof value === 'function' ? value(obj) : value;
		};

		return setPropImmutableRec(obj, prop, value, 0);
	}

	/**
	 * Get a value by a dot path.
	 * @param obj The object to evaluate.
	 * @param prop The path to value that should be returned.
	 * @param [value] The default value that should be returned when the target doesn't exist.
	 */
	function get$3(obj, prop, value) {
		prop = typeof prop === 'number' ? propToArray(prop.toString()) : typeof prop === 'string' ? propToArray(prop) : prop;

		for (var i = 0; i < prop.length; i++) {
			if (obj === null || typeof obj !== 'object') {
				return value;
			}
			let head = prop[i];
			if (Array.isArray(obj) && head === '$end') {
				head = obj.length - 1;
			}
			obj = obj[head];
		}

		if (typeof obj === 'undefined') {
			return value;
		}

		return obj;
	}

	/**
	 * Delete a property by a dot path.
	 * If target container is an object, the property is deleted.
	 * If target container is an array, the index is deleted.
	 * If target container is undefined, nothing is deleted.
	 * @param obj The object to evaluate.
	 * @param prop The path to the property or index that should be deleted.
	 */
	function _delete(obj, prop) {
		prop = typeof prop === 'number' ? propToArray(prop.toString()) : typeof prop === 'string' ? propToArray(prop) : prop;

		const deletePropImmutableRec = (obj, prop, i) => {
			let clone, head = prop[i];

			if (obj === null || typeof obj !== 'object' ||
				!Array.isArray(obj) && obj[head] === undefined) {

				return obj;
			}

			if (prop.length - 1 > i) {
				if (Array.isArray(obj)) {
					head = getArrayIndex(head, obj);
					clone = obj.slice();
				} else {
					clone = Object.assign({}, obj);
				}

				clone[head] = deletePropImmutableRec(obj[head], prop, i + 1);
				return clone;
			}

			if (Array.isArray(obj)) {
				head = getArrayIndex(head, obj);
				clone = [].concat(obj.slice(0, head), obj.slice(head + 1));
			} else {
				clone = Object.assign({}, obj);
				delete clone[head];
			}

			return clone;
		};

		return deletePropImmutableRec(obj, prop, 0);
	}

	/**
	 * Toggles a value.  The target value is evaluated using Boolean(currentValue).  The result will always be a JSON boolean.
	 * Be careful with strings as target value, as "true" and "false" will toggle to false, but "0" will toggle to true.
	 * Here is what Javascript considers false:  0, -0, null, false, NaN, undefined, and the empty string ("")
	 * @param obj The object to evaluate.
	 * @param prop The path to the value.
	 */
	function toggle(obj, prop) {
		const curVal = get$3(obj, prop);
		return set(obj, prop, !Boolean(curVal));
	}

	/**
	 * Merges a value.  The target value must be an object, array, null, or undefined.
	 * If target is an object, Object.assign({}, target, param) is used.
	 * If target an array, target.concat(param) is used.
	 * If target is null or undefined, the value is simply set.
	 * @param obj The object to evaluate.
	 * @param prop The path to the value.
	 * @param val The value to merge into the target value.
	 */
	function merge(obj, prop, val) {
		const curVal = get$3(obj, prop);
		if (typeof curVal === 'object') {
			if (Array.isArray(curVal)) {
				return set(obj, prop, curVal.concat(val));
			} else if (curVal === null) {
				return set(obj, prop, val);
			}
			else {
				let merged = Object.assign({}, curVal, val);
				return set(obj, prop, merged);
			}
		} else if (typeof curVal === 'undefined') {
			return set(obj, prop, val);
		}
		else {
			return obj;
		}
	}

	function getArrayIndex(head, obj) {
		if (head === '$end') {
			head = Math.max(obj.length - 1, 0);
		}
		if (!/^\+?\d+$/.test(head)) {
			throw new Error(`Array index '${head}' has to be an integer`);
		}
		return parseInt(head);
	}

	function propToArray(prop) {
		return prop.split('.').reduce((ret, el, index, list) => {
			const last = index > 0 && list[index - 1];
			if (last && /(?:^|[^\\])\\$/.test(last)) {
				const prev = ret.pop();
				ret.push(prev.slice(0, -1) + '.' + el);
			} else {
				ret.push(el);
			}
			return ret;
		}, []);
	}

	var lib = {
		set,
		get: get$3,
		delete: _delete,
		toggle,
		merge
	};

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
	    const newMetadata = lib.get(l, "metadata") ? Object.keys(lib.get(l, "metadata")).filter((mt) => mt === metadataKey) : [];
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

	var __defProp$1 = Object.defineProperty;
	var __getOwnPropSymbols$1 = Object.getOwnPropertySymbols;
	var __hasOwnProp$1 = Object.prototype.hasOwnProperty;
	var __propIsEnum$1 = Object.prototype.propertyIsEnumerable;
	var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
	var __spreadValues$1 = (a, b) => {
	  for (var prop in b || (b = {}))
	    if (__hasOwnProp$1.call(b, prop))
	      __defNormalProp$1(a, prop, b[prop]);
	  if (__getOwnPropSymbols$1)
	    for (var prop of __getOwnPropSymbols$1(b)) {
	      if (__propIsEnum$1.call(b, prop))
	        __defNormalProp$1(a, prop, b[prop]);
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
	      let input = __spreadValues$1({}, layer);
	      const newInput = lib.set(input, "layout.visibility", type);
	      newLayers.push(newInput);
	      map.setLayoutProperty(layer.id, "visibility", type);
	    } else {
	      newLayers.push(layer);
	      if ((options == null ? void 0 : options.onlyGroup) && type === "visible")
	        map.setLayoutProperty(layer.id, "visibility", "none");
	    }
	  }
	  if (options == null ? void 0 : options.returnStyle) {
	    let newStyle = __spreadValues$1({}, styles);
	    newStyle.layers = newLayers;
	    return newStyle;
	  }
	};
	const get$2 = ({ styles, groupIds, options }) => {
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
	  get: get$2,
	  visibility
	};

	var __defProp = Object.defineProperty;
	var __defProps = Object.defineProperties;
	var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
	var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
	var __async = (__this, __arguments, generator) => {
	  return new Promise((resolve, reject) => {
	    var fulfilled = (value) => {
	      try {
	        step(generator.next(value));
	      } catch (e) {
	        reject(e);
	      }
	    };
	    var rejected = (value) => {
	      try {
	        step(generator.throw(value));
	      } catch (e) {
	        reject(e);
	      }
	    };
	    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
	    step((generator = generator.apply(__this, __arguments)).next());
	  });
	};
	const core = "/core/api";
	const version = "1.0";
	const getFetch = (url, options) => __async(void 0, null, function* () {
	  return yield fetch(url, __spreadProps(__spreadValues({}, options), {
	    "headers": {
	      "API-Key": config.apiKey,
	      "Content-Type": "application/json"
	    }
	  })).then((rs) => __async(void 0, null, function* () {
	    return {
	      status: rs.status,
	      response: options.method === "DELETE" ? null : yield rs.json()
	    };
	  })).then((rs) => rs).catch((err) => {
	    return {
	      status: 500,
	      response: err
	    };
	  });
	});
	const covertParamToString = (params) => {
	  return params ? Object.keys(params).map(
	    (op, index) => `${index === 0 ? "?" : "&"}${op}=${params[op]}`
	  ).join("") : "";
	};
	const parseURL = (type, method, params, ids) => {
	  const url = config.host;
	  switch (type) {
	    case "collections":
	      switch (method) {
	        case "POST":
	          return `${url}${core}/features/${version}/collections`;
	        default:
	          if (ids.collectionId)
	            return `${url}${core}/features/${version}/collections/${ids.collectionId}`;
	          return `${url}${core}/features/${version}/collections${covertParamToString(params)}`;
	      }
	    case "items":
	      switch (method) {
	        case "POST":
	          return `${url}${core}/features/${version}/collections/${ids.collectionId}/items`;
	        default:
	          if (ids.featureId)
	            return `${url}${core}/features/${version}/collections/${ids.collectionId}/items/${ids.featureId}`;
	          return `${url}${core}/features/${version}/collections/${ids.collectionId}/items${covertParamToString(params)}`;
	      }
	    case "profile":
	      return `${url}/${core}/managements/${version}}/account/profile`;
	    case "styles":
	      switch (method) {
	        case "POST":
	          return `${url}${core}/styles/${version}-beta/styles`;
	        default:
	          if (ids.collectionId)
	            return `${url}${core}/styles/${version}-beta/styles/${ids.collectionId}`;
	          if (ids.metadata && ids.collectionId)
	            return `${url}${core}/styles/${version}-beta/styles/${ids.collectionId}/metadata`;
	          return `${url}${core}/styles/${version}-beta/styles/${ids.collectionId}${covertParamToString(params)}`;
	      }
	    default:
	      return `${url}`;
	  }
	};

	const collections$3 = ({ collectionId, params }) => {
	  const collection = getFetch(parseURL("collections", "GET", params, { collectionId }), { method: "GET" });
	  return collection;
	};
	const data$3 = ({ collectionId, featureId, params }) => {
	  const data2 = getFetch(parseURL("items", "GET", params, { collectionId, featureId }), { method: "GET" });
	  return data2;
	};
	const get$1 = {
	  collections: collections$3,
	  data: data$3
	};

	const collections$2 = ({ body }) => {
	  const collection = getFetch(parseURL("collections", "POST"), { method: "POST", body: JSON.stringify(body) });
	  return collection;
	};
	const data$2 = ({ collectionId, body }) => {
	  const data2 = getFetch(parseURL("items", "POST", { collectionId }), { method: "POST", body: JSON.stringify(body) });
	  return data2;
	};
	const create = {
	  collections: collections$2,
	  data: data$2
	};

	const collections$1 = ({ collectionId, body }) => {
	  const collection = getFetch(parseURL("collections", "PUT", body, { collectionId }), { method: "PUT", body: JSON.stringify(body) });
	  return collection;
	};
	const data$1 = ({ collectionId, featureId, body }) => {
	  const data2 = getFetch(parseURL("items", "PUT", body, { collectionId, featureId }), { method: "PUT", body: JSON.stringify(body) });
	  return data2;
	};
	const update = {
	  collections: collections$1,
	  data: data$1
	};

	const collections = ({ collectionId, params }) => {
	  const collection = getFetch(parseURL("collections", "DELETE", params, { collectionId }), { method: "DELETE" });
	  return collection;
	};
	const data = ({ collectionId, featureId, params }) => {
	  const data2 = getFetch(parseURL("items", "DELETE", params, { collectionId, featureId }), { method: "DELETE" });
	  return data2;
	};
	const remove = {
	  collections,
	  data
	};

	const features = {
	  create,
	  get: get$1,
	  update,
	  remove
	};

	const get = ({ styleId, params, metadata }) => {
	  const data = getFetch(parseURL("styles", "GET", params, { collectionId: styleId, metadata }), { method: "GET" });
	  return data;
	};

	const styles = {
	  get
	};

	const defaultHOST = "https://cloud.vallarismaps.com";
	var config = {
	  apiKey: "",
	  host: ""
	};
	class Initial {
	  constructor(source) {
	    this.features = features;
	    this.styles = styles;
	    config.host = source.host ? source.host : defaultHOST;
	    if (source.apiKey) {
	      config.apiKey = source.apiKey;
	      const profile = getFetch(parseURL("profile", "GET"), { method: "GET" });
	      profile.then((rs) => {
	        if (rs.response === 200) {
	          this.features = features;
	          this.styles = styles;
	        } else {
	          this.features = null;
	          this.styles = null;
	        }
	      });
	    } else {
	      this.features = null;
	    }
	  }
	}

	exports.Initial = Initial;
	exports.group = group;
	exports.layers = layers;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=vallaris-js.umd.js.map
