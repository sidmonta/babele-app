import React, { useState } from 'react'
import { Link, useNavigate } from '@reach/router'
import BookcaseWrapper from '../BookcaseWrapper/BookcaseWrapper'
import { BookCaseType } from '../../components/bookcase/BookCase'

function Home({ path }: { path: string }) {
  console.log(path)
  const navigate = useNavigate()
  const printBreadcrumbs = async (bc: BookCaseType) => {
    await navigate(`/category/${bc.dewey}`)
    // console.log(bc)
    // setBreadcrumbs(
    //   <span>
    //     {bc.hierarchy.map((bread) => bread.name).join(' > ')} <b>{bc.name}</b>
    //   </span>
    // )
  }

  return (
    <div>
      <h1>HOME</h1>
      <BookcaseWrapper onChange={printBreadcrumbs} />
      {/*{breadcrumbs}*/}
      {/*<br />*/}
      {/*<Link to="category/123">Link</Link>*/}
    </div>
  )
}

export default Home
