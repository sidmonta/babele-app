import { promisify } from 'util'
import { RedisClient } from 'redis'

export const smembers = (cache: RedisClient) => (value: string) => promisify(cache.smembers).bind(cache)(value)
