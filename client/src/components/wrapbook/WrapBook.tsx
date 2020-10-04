import React, { useEffect } from 'react'
import { useWebSocket, useWSData } from '../../context/websocket'
import BookDataRow from '../bookdatarow/BookDataRow'

export interface WrapBookProps {
  book: string
  onClose?: (book: string) => void
}

export type Quad = {
  subject: { value: string }
  predicate: { value: string }
  object: { value: string; termType: string }
}

export default function WrapBook({ book, onClose }: WrapBookProps) {
  const webSocketClient = useWebSocket()
  const [data, setData] = useWSData<{ quad: Quad }>('BOOKDATA')

  useEffect(() => {
    if (book) {
      setData([])
      webSocketClient.emit('BOOKDATA', {
        uri: book,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book])
  return (
    <div onClick={() => onClose && onClose(book)}>
      <h4>WrapBook: {book}</h4>
      <ul>
        {data.map((d, index) => (
          <li key={index}>
            <BookDataRow data={d.quad} />
          </li>
        ))}
      </ul>
    </div>
  )
}
