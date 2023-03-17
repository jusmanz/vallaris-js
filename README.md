![Vallaris Logo](https://v2k-dev.vallarismaps.com/core/api/managements/1.0/files/63f347fcb8e142c8f4b5cfd0/view)

## Vallaris Maps

[Vallaris Maps](https://vallarismaps.com/) is Geospatial data platform that provides tools for stored, analysis and visualize spatial data with effortless. By following international standard especialy OGC API series and Open Data scheme.

## Installation

```bash
npm install vallaris-js
```

or

```bash
yarn add vallaris-js
```

## Usage

```javascript
import { visibleGroup, renderLayers } from "vallaris-js";

// Visible layers in group id airport
visibleGroup({
  map: "yourMap",
  groupId: "airport",
  type: "visible",
});
//=>  visible layers by group

// Render layers with metadata key interactive
const InteractiveLayers = renderLayers({
  styles: "yourStyle",
  metadataKey: "interactive",
});
//=>  render list of layers with metadata key interactive
```
