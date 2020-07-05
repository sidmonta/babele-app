import { EffectContext, HttpServer } from '@marblejs/core'
import { getDatabaseFromContext } from './database.context'
import { mergeMap } from 'rxjs/operators'
import { of, throwError } from 'rxjs'

export type DeweyRow = {
  dewey: string
  name: string
  parent: string
  hierarchy: DeweyRow[]
  haveChildren: boolean
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
      .map((row) => ({
        dewey: row.dewey,
        name: row.name,
        parent: row.name,
        hierarchy: row.hierarchy
          ? row.hierarchy.split(',').map((hierarchy) => {
              const [dewey, parent, name] = hierarchy.split(';')
              return {
                dewey,
                parent,
                name,
              }
            })
          : [],
        haveChildren: row.haveChild > 0,
      })) as DeweyRow[]
    return of(response)
  } catch (err) {
    console.log(err)
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
