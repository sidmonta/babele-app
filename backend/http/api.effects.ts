import { r, combineRoutes, HttpRequest, EffectContext, HttpServer } from '@marblejs/core'

import { map, mapTo } from 'rxjs/operators'
import { getCategory, getDeweyElement } from '../database/database.methods'
import { Observable } from 'rxjs'

const formatOutput = (body) => ({ body })
const mapOutput = map(formatOutput)

const base$ = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.useEffect((req$) => req$.pipe(mapTo({ body: 'API active' })))
)

const init$ = r.pipe(
  r.matchPath('/init'),
  r.matchType('GET'),
  r.useEffect((req$, ctx) => {
    return req$.pipe(
      map(() => ''),
      getCategory(ctx),
      mapOutput
    )
  })
)

const children$ = r.pipe(
  r.matchPath('/children/:id'),
  r.matchType('GET'),
  r.useEffect((req$: Observable<HttpRequest>, ctx: EffectContext<HttpServer>) => {
    return req$.pipe(
      map((req) => {
        // @ts-ignore
        return req?.params?.id
      }),
      getCategory(ctx),
      mapOutput
    )
  })
)

const getDewey$ = r.pipe(
  r.matchPath('/get-dewey/:id'),
  r.matchType('GET'),
  r.useEffect((req$: Observable<HttpRequest>, ctx: EffectContext<HttpServer>) => {
    return req$.pipe(
      map((req) => {
        // @ts-ignore
        return req?.params?.id
      }),
      getDeweyElement(ctx),
      mapOutput
    )
  })
)

export const api$ = combineRoutes('/api', [base$, init$, children$, getDewey$])
