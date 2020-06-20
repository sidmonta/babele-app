import { webSocketListener } from '@marblejs/websockets'
import { bookData$, bookList$, label$ } from './stream.effect'


const effects = [
 bookList$, bookData$, label$
]

const middlewares = [
]

export const wSocketListener = webSocketListener({
  effects, middlewares
})