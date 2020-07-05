import { WsEffect } from '@marblejs/websockets'
import { act, Event, matchEvent } from '@marblejs/core'
import { map } from 'rxjs/operators'
import { pipe } from 'fp-ts/lib/pipeable'
import { reply } from '@marblejs/messaging'
import { Observable, of } from 'rxjs'
import { redisClient } from '../cache/redis.context'
import { Type, WSBookList } from './EffectTypes'
import { getBookListFromCache } from './stream.response'

// export const hello$: WsEffect = (event$) => {
//   return event$.pipe(
//     matchEvent('HELLO'),
//     tap(console.log),
//     map(({ payload }) => ({
//       type: 'HELLO',
//       payload,
//     }))
//   )
// }

export const bookList$: WsEffect = (event$: Observable<Event>) => {
  return event$.pipe(
    matchEvent(Type.BOOKLIST),
    act((event: WSBookList) => {
      return pipe(
        getBookListFromCache(redisClient, event), // TODO: Replace with function (event) => Observable<payload>
        map((payload) =>
          reply(event)({
            type: Type.BOOKLIST,
            payload,
          })
        )
      )
    })
  )
}

export const bookData$: WsEffect = (event$) => {
  return event$.pipe(
    matchEvent(Type.BOOKDATA),
    act((event) => {
      // const cache = getCacheFromContext(ctx)

      return pipe(
        of(1), // TODO: Replace with function (event) => Observable<payload>
        map((payload) =>
          reply(event)({
            type: Type.BOOKDATA,
            payload,
          })
        )
      )
    })
  )
}

export const label$: WsEffect = (event$) => {
  return event$.pipe(
    matchEvent('LABEL'),
    act((event) => {
      // const cache = getCacheFromContext(ctx)

      return pipe(
        of(1), // TODO: Replace with function (event) => Observable<payload
        map((payload) =>
          reply(event)({
            type: 'LABEL',
            payload,
          })
        )
      )
    })
  )
}
