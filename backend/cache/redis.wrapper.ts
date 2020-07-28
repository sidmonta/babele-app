import { promisify } from 'util'
import { RedisClient } from 'redis'
// export default function promiseWrap(redisClient: RedisClient) {
//   return new Proxy(redisClient, {
//     get(target, method: keyof Commands<unknown>): Promise<string | string[]> {
//       return promisify(target[method]).bind(target)
//     },
//   })
// }

export const smembers = (cache: RedisClient) => (value: string) => promisify(cache.smembers).bind(cache)(value)
