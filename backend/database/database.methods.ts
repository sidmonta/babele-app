import { EffectContext, HttpServer } from '@marblejs/core'
import { getDatabaseFromContext } from './database.context'
import { mergeMap } from 'rxjs/operators'
import { of, throwError } from 'rxjs'

export type DeweyRow = {
  id: string,
  name: string,
  parent: string
}

export function getCategoryRoot(ctx: EffectContext<HttpServer>) {
  const database = getDatabaseFromContext(ctx)

  return mergeMap(() => {
    try {
      return of(database.prepare('SELECT * FROM dewey d WHERE d.id LIKE ?').all('%00') as DeweyRow[])
    } catch (e) {
      throwError('Error on Database ' + e)
    }
  })
}

export function getSubCategory(ctx: EffectContext<HttpServer>) {
  const database = getDatabaseFromContext(ctx)
  return mergeMap((deweyParent: string) => {
    try {
      return of(database.prepare('SELECT * FROM dewey d WHERE d.parent LIKE ?').all(deweyParent) as DeweyRow[])
    } catch (err) {
      throwError('Error on Database ' + err)
    }
  })
}