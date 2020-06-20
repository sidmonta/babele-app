import { promisify } from 'util'
import { Commands, RedisClient } from 'redis'
import { fromPromise } from 'rxjs/internal-compatibility'

export default function wrap(redisClient: RedisClient) {
  return (method: keyof Commands<unknown>) =>
    fromPromise(promisify(redisClient[method]).bind(redisClient))
}
