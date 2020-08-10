import React, { useEffect } from 'react'
import { useWebSocket, useWSData } from '../../context/websocket'
import { DeweyCategory } from '@sidmonta/babelelibrary/build/types'
import AtomBook from '../book/AtomBook'

export default function WrapBookList({ deweySelect }: { deweySelect: DeweyCategory | null }) {
  const webSocketClient = useWebSocket()
  const deweyId = deweySelect?.dewey
  const books = useWSData<string>('BOOKLIST')

  useEffect(() => {
    if (deweyId) {
      webSocketClient.emit('BOOKLIST', {
        id: deweyId,
      })
    }
  }, [deweyId])

  return (
    <div>
      <ul>
        {books.map((b: string) => (
          <li key={b}>
            <AtomBook url={b} />
          </li>
        ))}
      </ul>
    </div>
  )
}
