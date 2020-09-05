import React, { useEffect } from 'react'
import { useParams } from '@reach/router'

import WoodBookcase from '../../components/woodbookcase/WoodBookcase'
import BookList from '../../components/booklist/BookList'
import { useWebSocket, useWSData } from '../../context/websocket'

export default function SearchResult({ path }: { path: string }) {
  const { query } = useParams()
  const webSocketClient = useWebSocket()
  const [books, setBook] = useWSData<string>('BOOKSEARCH')

  useEffect(() => {
    if (query) {
      setBook([])
      webSocketClient.emit('BOOKSEARCH', { query })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])
  return (
    <div className="page-container">
      <WoodBookcase title={query || ''}>
        <div className="wood-book">
          <BookList books={books} />
        </div>
      </WoodBookcase>
    </div>
  )
}
