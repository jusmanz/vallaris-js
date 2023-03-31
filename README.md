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

## Retrieve Data Services from Vallaris

Data Services can be free or limit access to from Vallaris. All of data services such as location, events can inquiry from Vallaris. Moreover, services are compile to OGC API Standards.

```javascript
import { Initial } from "vallaris-js";

const vallaris = new Initial({
 apiKey: {{VALLARIS_API_KEY}},
 host: "https://cloud.vallarismaps.com" // default optional
})

const collection = await vallaris.features.get.collections({
  collectionId: {{VALLARIS_COLLECTION_ID}}
})

const data = await vallaris.features.get.data({
  collectionId: {{VALLARIS_COLLECTION_ID}},
  featureId: {{VALLARIS_FEATURE_ID}}
})

```

## Example Collection Return

```json
{
    "collections": [
        {
            "id": {ID},
            "title": "geoJson_input",
            "extent": {
                "spatial": {
                    "bbox": [
                        [
                            98.73183,
                            8.43718,
                            103.549,
                            16.5669
                        ]
                    ],
                    "crs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84"
                },
                "temporal": null
            },
            "itemType": "Feature",
            "crs": [
                "http://www.opengis.net/def/crs/OGC/1.3/CRS84",
                "http://www.opengis.net/def/crs/EPSG/0/4326"
            ],
            "storageCrs": "http://www.opengis.net/def/crs/OGC/1.3/CRS84",
            "storageCrsCoordinateEpoch": null,
            "public": false,
            "links": [
                {
                    "href": "{HOST}/core/api/features/1.0/collections/{ID}?api_key={API_KEY}",
                    "rel": "self",
                    "type": "application/json",
                    "title": "This document"
                },
                {
                    "href": "{HOST}/core/api/features/1.0/collections/{ID}/items?api_key={API_KEY}",
                    "rel": "items",
                    "type": "application/geo+json",
                    "title": "Access the features in this collection as GeoJSON"
                },
                {
                    "href": "{HOST}/core/api/features/1.0/collections/{ID}?api_key={API_KEY}",
                    "rel": "self",
                    "type": "application/json",
                    "title": "This document"
                },
                {
                    "href": "{HOST}/core/api/features/1.0/collections/{ID}/items?api_key={API_KEY}",
                    "rel": "items",
                    "type": "application/geo+json",
                    "title": "Access the features in this collection as GeoJSON"
                }
            ],
            "createdAt": "2021-08-18T03:49:42.398Z",
            "createdBy": "60f539a5a44d2d7219fac3e3",
            "updatedAt": "2021-10-20T11:53:50.843Z",
            "updatedBy": "60f539a5a44d2d7219fac3e3"
        }
    ],
    "links": [
        {
            "href": "{HOST}/core/api/features/1.0/collections?api_key={API_KEY}",
            "rel": "self",
            "type": "application/json",
            "title": "This document"
        },
        {
            "href": "{HOST}/core/api/features/1.0/collections?api_key={API_KEY}&itemType=Feature&limit=1&offset=1",
            "rel": "next",
            "type": "application/json"
        }
    ],
    "crs": [
        "http://www.opengis.net/def/crs/OGC/1.3/CRS84",
        "http://www.opengis.net/def/crs/EPSG/0/4326"
    ],
    "numberMatched": 21,
    "numberReturned": 1
}

```

## Example Data Return

```json
 {
    "type": "FeatureCollection",
    "features": [
        {
            "id": {FEATURE_ID},
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    99.678955078125,
                    12.993852961834985
                ]
            },
            "properties": {
                "_collectionId": {COLLECTION_ID},
                "_createdAt": "2021-08-18T09:50:36.534Z",
                "_updatedAt": "2021-08-18T09:50:36.534Z"
            }
        }
    ],
    "links": [
        {
            "href": "{HOST}/core/api/features/1.0/collections/{ID}/items?api_key={API_KEY}",
            "rel": "self",
            "type": "application/geo+json",
            "title": "This document"
        },
        {
            "href": "{HOST}/core/api/features/1.0/collections/{ID}/items?api_key={API_KEY}",
            "rel": "alternate",
            "type": "application/json",
            "title": "This document"
        },
        {
            "href": "{HOST}/core/api/features/1.0/collections/{ID}/items?api_key={API_KEY}&limit=1&offset=1",
            "rel": "next",
            "type": "application/geo+json"
        }
    ],
    "timeStamp": "2023-03-31T07:49:20.988Z",
    "numberMatched": 124,
    "numberReturned": 1
}

```

## Style Manage

```javascript
import * as vallaris from "vallaris-js";

import { group, layers } from "vallaris-js";

// Visible layers in group id airport
group.visibility({
  map: "yourMap",
  groupId: "airport",
  type: "visible",
});
//=>  visible layers by group

// Render layers with metadata key interactive
const InteractiveLayers = layers.selectWithMetadata({
  styles: "yourStyle",
  metadataKey: "interactive",
});
//=>  render list of layers with metadata key interactive
```
