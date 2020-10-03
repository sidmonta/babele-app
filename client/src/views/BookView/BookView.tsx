import React from 'react'
import { useParams } from '@reach/router'
import BookStack from '../../components/bookstack/BookStack'

export default function BookView({ path }: { path: string }) {
  const params: { bookUri: string } = useParams()
  const bookUri = decodeURIComponent(params.bookUri || '')
  console.log(bookUri)
  return (
    <div className="book-view">
      <h3>BookView: {bookUri}</h3>
      <BookStack first={bookUri} />
    </div>
  )
}
