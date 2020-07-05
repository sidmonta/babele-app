import { database } from '../database/database.context'
import { redisClient } from './redis.context'

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
