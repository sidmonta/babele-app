import { httpListener } from '@marblejs/core'
import { logger$ } from '@marblejs/middleware-logger'
import { bodyParser$ } from '@marblejs/middleware-body'
import { cors$ } from '@marblejs/middleware-cors'
import { api$ } from './api.effects'
import { static$ } from './static.assets'

const middlewares = [
  logger$(),
  bodyParser$(),
  cors$({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 204,
    allowHeaders: '*',
    maxAge: 3600,
  })
]

const effects = [
  api$, static$
]

export const listener = httpListener({
  middlewares, effects
})