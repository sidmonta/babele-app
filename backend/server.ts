import { bindTo, createServer } from '@marblejs/core'
import { IO } from 'fp-ts/lib/IO'
import { listener } from './http/http.listener'
import { wSocketListener } from './websocket/websocket.listener'
import { createWebSocketServer } from '@marblejs/websockets'
import { d, databaseToken } from './database/database.context'
import { c, cacheToken } from './cache/redis.context'

const server = createServer({
  port: 1337,
  hostname: 'localhost',
  listener,
  dependencies: [
    bindTo(databaseToken)(d),
    bindTo(cacheToken)(c)
  ]
})

const webSocketServer = createWebSocketServer({
  options: {
    port: 1338,
    host: 'localhost'
  },
  listener: wSocketListener
})

const main: IO<void> = async () => {
 await (await server)()
 await (await webSocketServer)()
}

main()