import React from 'react'
import { useParams } from '@reach/router'

import Title from '../../components/title/title'

export default function SearchResult({ path }: { path: string }) {
  const { query } = useParams()

  return (
    <div>
      <Title> {query} </Title>
    </div>
  )
}
