import { EffectContext, HttpServer } from '@marblejs/core'
import { getDatabaseFromContext } from './database.context'
import { DeweyCategory } from '@sidmonta/babelelibrary/lib/types'
import { mergeMap } from 'rxjs/operators'
import { of, throwError } from 'rxjs'

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

const getRecord = (database, deweyParent) => {
  try {
    const whereParentCondition = deweyParent ? `= '${deweyParent}'` : 'IS NULL'
    const response = database
      .prepare(
        `SELECT id as dewey, name,  parent, ( SELECT group_concat(name) FROM (
                        SELECT (d2.id || ';' || d2.parent || ';' || name) as name
                        FROM dewey d2
                        WHERE 
                          d2.id = substr(d.parent, 1, 1) || '00'
                          OR d2.id = substr(d.parent, 1, 2) || '0'
                          OR d2.id = d.parent
                      ) as pp ) as hierarchy,
                      (SELECT COUNT(1) FROM dewey d3 WHERE d3.parent = d.id) as 'haveChild'
                 FROM dewey d 
                 WHERE d.parent ${whereParentCondition}`
      )
      .all()
      .map(createDeweyCategory)
    return of(response)
  } catch (err) {
    return throwError('Error on Database ' + err)
  }
}

export function getCategoryRoot(ctx: EffectContext<HttpServer>) {
  const database = getDatabaseFromContext(ctx)
  return mergeMap(() => getRecord(database, ''))
}

export function getSubCategory(ctx: EffectContext<HttpServer>) {
  const database = getDatabaseFromContext(ctx)
  return mergeMap((deweyParent: string) => getRecord(database, deweyParent))
}
