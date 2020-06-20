import { WsEffect } from '@marblejs/websockets'
import { act, matchEvent } from '@marblejs/core'
import { map, tap } from 'rxjs/operators'
import { pipe } from 'fp-ts/lib/pipeable';
import { reply } from '@marblejs/messaging'
import { of } from 'rxjs'

export const hello$: WsEffect = (event$) => {
  return event$.pipe(
    matchEvent('HELLO'),
    tap(console.log),
    map(({ payload }) => ({
      type: 'HELLO', payload
    }))
  )
}

export const bookList$: WsEffect = event$ => {
  return event$.pipe(
    matchEvent('BOOKLIST'),
    act(event => {
      return pipe(
        of(1), // TODO: Replace with function (event) => Observable<payload>
        map(payload => reply(event)(
          {
            type: 'BOOKLIST',
            payload
          }
        ))
      )
    })
  )
}

export const bookData$: WsEffect = event$ => {
  return event$.pipe(
    matchEvent('BOOKDATA'),
    act(event => {
      return pipe(
        of(1), // TODO: Replace with function (event) => Observable<payload>
        map(payload => reply(event)(
          {
            type: 'BOOKDATA',
            payload
          }
        ))
      )
    })
  )
}

export const label$: WsEffect = event$ => {
  return event$.pipe(
    matchEvent('LABEL'),
    act(event => {
      return pipe(
        of(1), // TODO: Replace with function (event) => Observable<payload
        map(payload => reply(event)(
          {
            type: 'LABEL',
            payload
          }
        ))
      )
    })
  )
}