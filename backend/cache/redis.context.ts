import { createClient, RedisClient } from 'redis'
import { createContextToken, EffectContext, HttpServer, reader } from '@marblejs/core'
import { pipe } from 'fp-ts/lib/pipeable'
import * as R from 'fp-ts/lib/Reader'
import * as O from 'fp-ts/lib/Option'
import { WebSocketClientConnection } from '@marblejs/websockets'

export const redisClient: RedisClient = createClient()

export const cacheToken = createContextToken('cache')
export const c = pipe(
  reader,
  R.map(() => redisClient)
)

export const getCacheFromContext: (ctx: EffectContext<HttpServer | WebSocketClientConnection>) => RedisClient | null = (
  ctx: EffectContext<HttpServer | WebSocketClientConnection>
) =>
  pipe(
    ctx.ask(cacheToken),
    O.getOrElse(() => null)
  )
