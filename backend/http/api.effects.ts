import { r, combineRoutes, HttpRequest, EffectContext, HttpServer } from '@marblejs/core'

import { map, mapTo } from 'rxjs/operators'
import { getCategory, getDeweyElement, getDeweyLabel } from '../database/database.methods'
import { Observable, OperatorFunction } from 'rxjs'

const formatOutput = (body: unknown) => ({ body })
const mapOutput = map(formatOutput)

// @ts-ignore
const extractIdFromReqParam: OperatorFunction<unknown, string> = map((req) => req?.params?.id)

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
    return req$.pipe(extractIdFromReqParam, getCategory(ctx), mapOutput)
  })
)

const getDewey$ = r.pipe(
  r.matchPath('/get-dewey/:id'),
  r.matchType('GET'),
  r.useEffect((req$: Observable<HttpRequest>, ctx: EffectContext<HttpServer>) => {
    return req$.pipe(extractIdFromReqParam, getDeweyElement(ctx), mapOutput)
  })
)

const getDeweyLabel$ = r.pipe(
  r.matchPath('/get-dewey/:id/label'),
  r.matchType('GET'),
  r.useEffect((req$: Observable<HttpRequest>, ctx: EffectContext<HttpServer>) => {
    return req$.pipe(extractIdFromReqParam, getDeweyLabel(ctx), mapOutput)
  })
)

export const api$ = combineRoutes('/api', [base$, init$, children$, getDeweyLabel$, getDewey$])
