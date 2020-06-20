import React, { useEffect, useState } from 'react'
import './App.css';
import WebSocketClient from './WebSocketClient'

const socket = new WebSocketClient({ port: '1338' })

socket.onOpenConnection(() => {
  socket.emit('HELLO', 'Hello')
})
type Scaffale = {
  id: string,
  name: string,
  parent: string,
  onClick: (id: string) => void
}
type Book = {
  name: string,
  dewey: string,
  id: string
}
function Scaffale(props: Scaffale) {
  return (
    <li onClick={() => props.onClick(props.id)}>{props.name} [{props.id}]</li>
  )
}

function App() {
  const [scaffali, setScaffali] = useState<Scaffale[]>([])
  const [books, setBook] = useState<Book[]>([])
  useEffect(() => {
    const fetchData = async () => {
     const initialScaffali = await fetch('http://localhost:1337/api/init').then(data => data.json())
      setScaffali(initialScaffali)
    }
    fetchData().then()
  }, [])

  socket.on<Book>('HELLO', (data: Book) => {
    console.log(data)
    // setBook([...books, data])
  })

  socket.on<Book>('RECEVE', (data: Book) => {
    console.log('RECEVE', data)
    setBook([...books, data])
  })

  const handleClick = (id: string) => {
    console.log('click', id)
    socket.emit('HELLO', {
      id
    })
    socket.emit('DELAY', id)
  }

  const printScaffali = () => scaffali.map((sc: Scaffale) => (<Scaffale key={sc.id} {...sc} onClick={handleClick} />))

  return (
    <div className="App">
      <ul>
        {printScaffali()}
      </ul>
      <div className="result">
        {books.map(book => (<p key={book.id}>{book.name}</p>))}
      </div>
    </div>
  );
}

export default App;
