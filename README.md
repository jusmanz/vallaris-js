![Vallaris Logo](https://v2k-dev.vallarismaps.com/core/api/managements/1.0/files/63f347fcb8e142c8f4b5cfd0/view)

## Vallaris JS SDK

[![npm version](https://img.shields.io/npm/v/vallaris.svg)](https://www.npmjs.com/package/vallaris) [![npm downloads](https://img.shields.io/npm/dm/vallaris.svg)](https://www.npmjs.com/package/vallaris)

A lightweight TypeScript SDK for Vallaris Maps APIs. Query and manage geospatial data following OGC API - Features with a clean, typed developer experience.

- ESM + CJS builds, TypeScript types included
- OGC API - Features aligned endpoints (Collections/Items CRUD, PATCH)
- Works with Bun, Node.js, and modern bundlers

---

### Installation

```bash
# npm
npm install vallaris
# yarn
yarn add vallaris
# pnpm
pnpm add vallaris
# bun
bun add vallaris
```

---

### Quick Start

```ts
import { createClient } from "vallaris";

const vallaris = new createClient({
  apiKey: process.env.VALLARIS_API_KEY!,
  host: "https://app.vallarismaps.com", // optional (default)
});

// List collections
const collections = await vallaris.features.get.collections({
  params: { limit: 10 },
});

// Get one collection
const buildings = await vallaris.features.get.collections({
  collectionId: "buildings",
});
```

---

### Modern Usage: FeaturesClient (recommended)

The class-based client exposes focused methods that map to OGC API - Features endpoints.

```ts
// Create a new client instance using the configured environment
const client = new vallaris.Features();

// Collections
await client.listCollections({ limit: 10, offset: 0 });
await client.getCollection("buildings");
await client.createCollection({
  title: "buildings",
  description: "Building footprints",
  itemType: "Feature",
  public: false,
});
await client.updateCollection("buildings", {
  title: "buildings-updated",
  description: "...",
  itemType: "Feature",
});
await client.deleteCollection("buildings");

// Items (Features)
await client.listItems("buildings", { limit: 20, bbox: "100,13,101,14" });
await client.getItem("buildings", "FEATURE_ID");
await client.createItems("buildings", featureCollection); // GeoJSON FeatureCollection
await client.replaceItem("buildings", "FEATURE_ID", feature); // PUT
await client.updateItem("buildings", "FEATURE_ID", {
  properties: { status: "active" },
}); // PATCH
await client.deleteItem("buildings", "FEATURE_ID");
```

---

### Legacy API (kept for compatibility)

```ts
// Collections
await vallaris.features.get.collections({ params: { limit: 10 } });
await vallaris.features.get.collections({ collectionId: "buildings" });
await vallaris.features.create.collections({
  body: { title: "...", description: "...", itemType: "Feature" },
});
await vallaris.features.update.collections({
  collectionId: "buildings",
  body: { title: "updated", description: "...", itemType: "Feature" },
});
await vallaris.features.remove.collections({ collectionId: "buildings" });

// Items
await vallaris.features.get.data({
  collectionId: "buildings",
  params: { limit: 10 },
});
await vallaris.features.get.data({
  collectionId: "buildings",
  featureId: "FEATURE_ID",
});
await vallaris.features.create.data({
  collectionId: "buildings",
  body: featureCollection,
});
await vallaris.features.update.data({
  collectionId: "buildings",
  featureId: "FEATURE_ID",
  body: feature,
});
await vallaris.features.remove.data({
  collectionId: "buildings",
  featureId: "FEATURE_ID",
});
```

---

### API Overview (OGC API - Features)

- Collections
  - list: `client.listCollections(params?)`
  - get: `client.getCollection(collectionId, params?)`
  - create: `client.createCollection(body)`
  - update: `client.updateCollection(collectionId, body)`
  - delete: `client.deleteCollection(collectionId)`
- Items
  - list: `client.listItems(collectionId, params?)`
  - get: `client.getItem(collectionId, featureId, params?)`
  - create many: `client.createItems(collectionId, featureCollection)`
  - replace one (PUT): `client.replaceItem(collectionId, featureId, feature)`
  - update one (PATCH): `client.updateItem(collectionId, featureId, partialFeature)`
  - delete one: `client.deleteItem(collectionId, featureId)`

---

### Configuration

```ts
const vallaris = new createClient({
  apiKey: "<YOUR_API_KEY>",
  host: "https://app.vallarismaps.com", // default; override if needed
});
```

- `apiKey` (required): Vallaris API key
- `host` (optional): API host; defaults to `https://app.vallarismaps.com`

---

### Environment and Bundling

- Node.js 18+ or Bun recommended
- ESM and CJS are both supported

Usage:

```ts
// ESM
import { createClient } from "vallaris";

// CJS
const { createClient } = require("vallaris");
```

---

### TypeScript

```ts
import type { Feature, FeatureCollection } from "geojson";
```

- Full types for requests and GeoJSON payloads
- `replaceItem` expects a GeoJSON `Feature`
- `createItems` expects a GeoJSON `FeatureCollection`

---

### Troubleshooting

- 401/403: verify `apiKey`
- Network/CORS: ensure your environment allows requests to `app.vallarismaps.com`
- GeoJSON shape: validate payloads (required properties for Feature/FeatureCollection)

---

### License

ISC
