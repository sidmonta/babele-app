import { WSBookList, WSBookSearch } from './EffectTypes'
import { fromPromise } from 'rxjs/internal-compatibility'
import { distinct, mergeMap, switchMap } from 'rxjs/operators'
import { from, Observable, throwError } from 'rxjs'
import { Rx } from '@sidmonta/babelelibrary'
import { allitem, smembers } from '../cache/redis.wrapper'
import { CACHE_KEY_ENDPOINT_LIST, callEndpoint } from '../search/endpoint-list'

export function getBookListFromCache(cache) {
  return ({ payload }: WSBookList) => {
    const dewey = payload.id + (payload.id.length === 1 ? '00' : '')
    try {
      return fromPromise(smembers(cache)(dewey)).pipe(mergeMap((list: string[]) => from(list)))
    } catch (err) {
      console.log(dewey, err)
      return throwError(err)
    }
  }
}

export function searchFromCache(cache) {
  return ({ payload }: WSBookSearch) => {
    const call = callEndpoint(payload.query)
    try {
      const endpoints$ = fromPromise(allitem(cache)(CACHE_KEY_ENDPOINT_LIST)) as Observable<string>
      return endpoints$.pipe(switchMap(from), mergeMap(call), distinct(), Rx.filterByPing())
    } catch (err) {
      console.error(err)
      return throwError(err)
    }
  }
}
