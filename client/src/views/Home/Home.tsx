import React from 'react'
import Title from '../../components/title/title'

function Home({ path }: { path: string }) {
  console.log(path)
  return (
    <div>
      <Title>Babele's Library</Title>
    </div>
  )
}

export default Home
