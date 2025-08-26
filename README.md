![Vallaris Logo](https://v2k-dev.vallarismaps.com/core/api/managements/1.0/files/63f347fcb8e142c8f4b5cfd0/view)

## Vallaris JS SDK

A lightweight TypeScript SDK for Vallaris Maps APIs. Query and manage geospatial data following OGC API - Features standards with a clean, typed developer experience.

- ESM + CJS builds, TypeScript types included
- OGC API - Features aligned endpoints (Collections/Items CRUD, PATCH)
- Works with Bun, Node.js, and modern bundlers

References: [OGC API - Features](https://github.com/opengeospatial/ogcapi-features), [tsdown](https://tsdown.dev/)

---

### Installation

```bash
# npm	npm install vallaris-js
# yarn	yarn add vallaris-js
# pnpm	pnpm add vallaris-js
# bun	bun add vallaris-js
```

---

### Quick Start

```ts
import Initial from "vallaris-js";

const vallaris = new Initial({
  apiKey: process.env.VALLARIS_API_KEY!,
  host: "https://app.vallarismaps.com", // optional (default)
});

// Legacy grouped API (still supported)
const collection = await vallaris.features.get.collections({
  collectionId: "<COLLECTION_ID>",
});
```

Thai (สรุป): ติดตั้งแพ็กเกจ แล้วสร้าง `Initial` ด้วย `apiKey` ของคุณ จากนั้นเรียกใช้งานเมธอดตามตัวอย่างได้ทันที

---

### Modern Usage: FeaturesClient (recommended)

The new class-style client provides focused, typed methods that map to OGC API - Features endpoints.

```ts
const client = new vallaris.Features();

// Collections
await client.listCollections({ limit: 10, offset: 0 });
await client.getCollection("<COLLECTION_ID>");
await client.createCollection({
  title: "buildings",
  description: "Building footprints",
  itemType: "Feature",
  public: false,
});
await client.updateCollection("<COLLECTION_ID>", {
  title: "buildings-updated",
  description: "...",
  itemType: "Feature",
});
await client.deleteCollection("<COLLECTION_ID>");

// Items (Features)
await client.listItems("<COLLECTION_ID>", { limit: 20, bbox: "100,13,101,14" });
await client.getItem("<COLLECTION_ID>", "<FEATURE_ID>");
await client.createItems("<COLLECTION_ID>", featureCollection); // GeoJSON FeatureCollection
await client.replaceItem("<COLLECTION_ID>", "<FEATURE_ID>", feature); // GeoJSON Feature (PUT)
await client.updateItem("<COLLECTION_ID>", "<FEATURE_ID>", {
  properties: { status: "active" },
}); // PATCH (partial)
await client.deleteItem("<COLLECTION_ID>", "<FEATURE_ID>");
```

Thai (สรุป): ใช้ `vallaris.Features()` เพื่อทำงานกับ Collections และ Items ได้ครบ (GET/POST/PUT/PATCH/DELETE) แบบตรงตามมาตรฐาน OGC

---

### Legacy API (kept for compatibility)

```ts
// Collections
await vallaris.features.get.collections({ params: { limit: 10 } });
await vallaris.features.get.collections({ collectionId: "<COLLECTION_ID>" });
await vallaris.features.create.collections({
  body: { title: "...", description: "...", itemType: "Feature" },
});
await vallaris.features.update.collections({
  collectionId: "<COLLECTION_ID>",
  body: { title: "updated", description: "...", itemType: "Feature" },
});
await vallaris.features.remove.collections({ collectionId: "<COLLECTION_ID>" });

// Items
await vallaris.features.get.data({
  collectionId: "<COLLECTION_ID>",
  params: { limit: 10 },
});
await vallaris.features.get.data({
  collectionId: "<COLLECTION_ID>",
  featureId: "<FEATURE_ID>",
});
await vallaris.features.create.data({
  collectionId: "<COLLECTION_ID>",
  body: featureCollection,
});
await vallaris.features.update.data({
  collectionId: "<COLLECTION_ID>",
  featureId: "<FEATURE_ID>",
  body: feature,
});
await vallaris.features.remove.data({
  collectionId: "<COLLECTION_ID>",
  featureId: "<FEATURE_ID>",
});
```

---

### OGC API Compliance

- Endpoints follow OGC API - Features Part 1: Core (Collections, Items)
- Replace item uses PUT; partial update uses PATCH (aligned with Part 4 draft Transactions)
- Query params like `bbox`, `datetime`, `limit`, `offset` are supported on listing endpoints

See: [OGC API - Features](https://github.com/opengeospatial/ogcapi-features)

Thai (สรุป): รองรับมาตรฐาน OGC API - Features โดยตรง ทั้งโครงสร้าง URL และเมธอด CRUD

---

### TypeScript

- Full types for requests and GeoJSON payloads
- `replaceItem` expects a GeoJSON `Feature`
- `createItems` expects a GeoJSON `FeatureCollection`

```ts
import type { Feature, FeatureCollection } from "geojson";
```

---

### Styles and Map helpers (optional)

You can continue using the existing Style/Map helpers if needed.

```ts
// Example (existing API surface)
import { group, layers } from "vallaris-js";

// Visible layers by group
group.visibility({ map: "yourMap", groupId: "airport", type: "visible" });

// Select layers with metadata
const interactiveLayers = layers.selectWithMetadata({
  styles: "yourStyle",
  metadataKey: "interactive",
});
```

---

### Node/Bun support and bundling

- Published as ESM and CJS with types (d.ts) and sourcemaps
- Works with Bun, Node.js 18+
- Built with `tsdown` for fast builds and clean output: [tsdown.dev](https://tsdown.dev/)

---

### Troubleshooting

- 401/403: verify `apiKey`
- Network/CORS: ensure your environment allows requests to `app.vallarismaps.com`
- GeoJSON shape: validate payloads (required properties for Feature/FeatureCollection)

---

### License

ISC

---

### Changelog (highlights)

- 1.1.0-beta.1
  - New `FeaturesClient` class (recommended)
  - `PATCH` support for partial item updates
  - Build migrated to `tsdown`; ESM/CJS + types
  - Safer publishing (`.gitignore`, `files` whitelist)
