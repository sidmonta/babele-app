import { WsEffect } from '@marblejs/websockets'
import { act, Event, matchEvent } from '@marblejs/core'
import { map } from 'rxjs/operators'
import { pipe } from 'fp-ts/lib/pipeable'
import { reply } from '@marblejs/messaging'
import { Observable, of } from 'rxjs'
import { redisClient } from '../cache/redis.context'
import { Type } from './EffectTypes'
import { getBookListFromCache, searchFromCache } from './stream.response'

const getBookList = getBookListFromCache(redisClient)
const search = searchFromCache(redisClient)

const EffectGenerator = <A>(eventType: Type, method: (event: Event) => Observable<A>): WsEffect => (
  event$: Observable<Event>
) => {
  return event$.pipe(
    matchEvent(eventType),
    act((event: Event) => {
      return pipe(
        method(event),
        map((payload) =>
          reply(event)({
            type: eventType,
            payload,
          })
        )
      )
    })
  )
}

export const bookList$ = EffectGenerator(Type.BOOKLIST, getBookList)

export const bookData$ = EffectGenerator(Type.BOOKDATA, of)

export const label$ = EffectGenerator(Type.LABEL, of)

export const search$ = EffectGenerator<string>(Type.BOOKSEARCH, search)
