import BetterSqlite3, { Database } from 'better-sqlite3'
import { resolve } from 'path'
import { createContextToken, EffectContext, HttpServer, reader } from '@marblejs/core'
import { pipe } from 'fp-ts/lib/pipeable'
import * as R from 'fp-ts/lib/Reader'
import * as O from 'fp-ts/lib/Option'

const database = new BetterSqlite3(resolve(__dirname, '../../../Training/database.db'))

export const databaseToken = createContextToken<Database>('database')
export const d = pipe(reader, R.map(() => database))

export const getDatabaseFromContext: (ctx: EffectContext<HttpServer>) => Database | null =
  (ctx: EffectContext<HttpServer>) => pipe(
      ctx.ask(databaseToken),
      O.getOrElse(() => null)
  )
