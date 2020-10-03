import { database } from '../database/database.context'
import { redisClient } from './redis.context'
import { CACHE_KEY_ENDPOINT_LIST, getEndpoints } from '../search/endpoint-list'

type Dewey = string
type URI = string
type CacheRecord = [URI, Dewey]

export function populateDeweyCache(): void {
  // Database -> Record<URI, Dewey>[] -> Cache
  database
    .prepare('SELECT data_id, dewey_id FROM data_x_dewey dxd')
    .all()
    .map(({ data_id, dewey_id }) => [data_id, dewey_id] as CacheRecord)
    .forEach(([key, value]) => {
      redisClient.sadd(value, key)
    })
}

export async function populateEndpointList(): Promise<void> {
  redisClient.lrange(CACHE_KEY_ENDPOINT_LIST, 0, -1, async (err, data) => {
    let endpoints: string[]
    if (err || !data) {
      endpoints = await getEndpoints()

      redisClient.del(CACHE_KEY_ENDPOINT_LIST)
      redisClient.lpush(CACHE_KEY_ENDPOINT_LIST, ...endpoints, () => {})
    } else {
      endpoints = data
    }
    return endpoints
  })
}
