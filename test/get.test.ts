import { describe, it, expect, beforeAll } from 'vitest'
import { FeaturesClient } from '../src/features'
import { config as globalConfig } from '../src/config/initial'

const API_KEY = process.env.VA_API_KEY || process.env.VALLARIS_API_KEY || ''
const HOST = process.env.VALLARIS_HOST || 'http://172.30.10.60:30204/'
const TEST_COLLECTION_ID = process.env.VALLARIS_TEST_COLLECTION_ID || ''

let client: FeaturesClient

beforeAll(() => {
  globalConfig.host = HOST
  globalConfig.apiKey = API_KEY
  client = new FeaturesClient()
})

describe('Features GET', () => {
  it('lists collections and logs response, then gets one collection and logs response', async () => {
    const list = await client.listCollections({ limit: 1, offset: 0 })
    // Log full response for visibility
    // eslint-disable-next-line no-console
    console.log('LIST collections:', JSON.stringify(list, null, 2))
    expect(typeof list.status).toBe('number')

    // Try to resolve a collection id
    const firstId = (list as any)?.response?.collections?.[0]?.id || TEST_COLLECTION_ID || 'buildings'

    const single = await client.getCollection(firstId as string)
    // eslint-disable-next-line no-console
    console.log('GET collection:', firstId, JSON.stringify(single, null, 2))
    expect(typeof single.status).toBe('number')
  })
}) 