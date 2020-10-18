import { useEffect, useState } from 'react'
import { useWebSocket } from './websocket'
import { fetchAPI } from '../services'

type NewBook = {
  uri: string
  dewey: string
  deweyLabel?: string
}

type WSNewBook = {
  bookUri: string
  dewey: string
}

const getDeweyLabel = fetchAPI('GET')

/*
const newBookContext = createContext({
  books: [] as NewBook[],
  setBook: (_: NewBook) => {},
})
export const useNewBook = () => useContext(newBookContext)
*/

export const useNewBookHook = (onNewBook: (book: NewBook, allNewBooks: NewBook[], count: number) => void) => {
  const [newBooks, setNewBook] = useState<NewBook[]>([])
  const wsClient = useWebSocket()

  useEffect(() => {
    const identify = wsClient.on('NEWBOOK', async (book: WSNewBook) => {
      const deweyLabel: string = (await getDeweyLabel(`/get-dewey/${book.dewey}/label`)).label

      const rewriteBookInfo = {
        uri: book.bookUri,
        dewey: book.dewey,
        deweyLabel,
      }

      setNewBook((old: NewBook[]) => [rewriteBookInfo, ...old])
      // Call "onNewBook" for notify new book is arrive
      onNewBook(rewriteBookInfo, newBooks, newBooks.length)
    })

    return () => wsClient.removeListener('NEWBOOK', identify)
  }, [onNewBook])

  return newBooks
}
