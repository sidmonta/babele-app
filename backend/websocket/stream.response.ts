// import Crawler from '@sidmonta/babelecrawler'
import { WSBookList } from './EffectTypes'
import { fromPromise } from 'rxjs/internal-compatibility'
import { mergeMap } from 'rxjs/operators'
import { from, throwError } from 'rxjs'
import { smembers } from '../cache/redis.wrapper'

export function getBookListFromCache(cache, { payload }: WSBookList) {
  const dewey = payload.id + (payload.id.length === 1 ? '00' : '')
  try {
    return fromPromise(smembers(cache)(dewey)).pipe(mergeMap((list: string[]) => from(list)))
  } catch (err) {
    console.log(dewey, err)
    return throwError(err)
  }
}
