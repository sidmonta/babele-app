import { r } from '@marblejs/core'
import { map, mergeMap, switchMap } from 'rxjs/operators'
import { readFile } from '@marblejs/core/dist/+internal/files'
import { resolve } from 'path'
import { Observable, of, zip } from 'rxjs'
import { contentType } from 'mime-types'
import { extname } from 'path'
import { pipe } from 'fp-ts/lib/pipeable'

const STATIC_PATH = resolve(__dirname, '../..', 'client/build')

const extractContentType: (filename: string) => string = filename => pipe(
  extname(filename),
  f => contentType(f) || 'text/html'
)

const getStaticAssetPath = map(req => {
  // @ts-ignore
  return req?.params?.dir && req.params.dir !== 'undefined' ? req.params.dir : 'index.html'
})

const getStaticAssetBuffer$ = (path: string) => of(path).pipe(mergeMap(readFile(STATIC_PATH)), map(buffer => buffer.toString('utf8')))
const getStaticAssetContentType$ = (path: string) => of(path).pipe(map(extractContentType))

const staticAssetInfo$ = (path: string): Observable<[string, string]> => {
  return zip(
    getStaticAssetBuffer$(path),
    getStaticAssetContentType$(path)
  )
}

export const static$ = r.pipe(
  r.matchPath('/:dir*'),
  r.matchType('GET'),
  r.useEffect(req$ =>
    req$.pipe(
      getStaticAssetPath,
      switchMap(staticAssetInfo$),
      map(([body, contentType]) => ({
        body,
        headers: { 'Content-Type': contentType }
      }))
    )
  )
)
