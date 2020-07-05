import { promisify } from 'util'
import { Commands, RedisClient } from 'redis'
export default function promiseWrap(redisClient: RedisClient) {
  return new Proxy(redisClient, {
    get(target, method: keyof Commands<unknown>): Promise<string | string[]> {
      return promisify(target[method]).bind(target)
    },
  })
}

export const smembers = (cache: RedisClient) => (value: string) => {
  console.log(value)
  return promisify(cache.smembers).bind(cache)(value)
}
