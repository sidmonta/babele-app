import { r, combineRoutes, HttpRequest, EffectContext, HttpServer } from '@marblejs/core'

import { map, mapTo } from 'rxjs/operators'
import { getCategoryRoot, getSubCategory } from '../database/database.methods'
import { Observable } from 'rxjs'

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
      getCategoryRoot(ctx),
      map((rows) => ({ body: rows }))
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
      getSubCategory(ctx),
      map((rows) => ({ body: rows }))
    )
  })
)

export const api$ = combineRoutes('/api', [base$, init$, children$])
