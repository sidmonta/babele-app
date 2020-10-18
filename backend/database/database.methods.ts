import { EffectContext, HttpServer } from '@marblejs/core'
import { getDatabaseFromContext } from './database.context'
import { DeweyCategory } from '@sidmonta/babelelibrary/lib/types'
import { map, mergeMap, tap } from 'rxjs/operators'
import { of, pipe, throwError } from 'rxjs'
import { sqlGetDeweyInfo, sqlWhereDeweyId, sqlWhereParent, sqlWhereParentNull } from './database.queries'

export type From = 'fromParent' | 'fromId'

const sqlGenerator = sqlGetDeweyInfo('d')

function formatHierarchyDewey(hierarchy) {
  return hierarchy
    ? hierarchy.split(',').map((hierarchy) => {
        const [dewey, parent, name] = hierarchy.split(';')
        return {
          dewey,
          parent,
          name,
        }
      })
    : []
}

function createDeweyCategory(row: any): DeweyCategory {
  return {
    dewey: row.dewey,
    name: row.name,
    parent: row.name,
    hierarchy: formatHierarchyDewey(row.hierarchy),
    haveChildren: row.haveChild > 0,
  }
}

const getRecord = (database, from: From) => (identity: string) => {
  try {
    let whereParentCondition
    if (from === 'fromParent') {
      whereParentCondition = identity ? sqlWhereParent(identity) : sqlWhereParentNull()
    } else {
      whereParentCondition = sqlWhereDeweyId(identity)
    }
    const response: DeweyCategory[] = database
      .prepare(sqlGenerator(whereParentCondition))
      .all()
      .map(createDeweyCategory)
    return of(response)
  } catch (err) {
    return throwError('Error on Database ' + err)
  }
}

const process = (ctx: EffectContext<HttpServer>, from: From) => {
  const database = getDatabaseFromContext(ctx)
  const get = getRecord(database, from)

  return mergeMap(get)
}

export function getCategory(ctx: EffectContext<HttpServer>) {
  return process(ctx, 'fromParent')
}

export function getDeweyElement(ctx: EffectContext<HttpServer>) {
  return process(ctx, 'fromId')
}

export function getDeweyLabel(ctx: EffectContext<HttpServer>) {
  return pipe(
    process(ctx, 'fromId'),
    map((dewey: DeweyCategory[]) => ({ label: dewey[0].name }))
  )
}
