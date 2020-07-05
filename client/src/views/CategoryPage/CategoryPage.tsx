import React, { useState } from 'react'
import BookcaseWrapper from '../BookcaseWrapper/BookcaseWrapper'
import { Link, useParams } from '@reach/router'
import { BookCaseType } from '../../components/bookcase/BookCase'

type categoryParams = {
  categoryId: string
}

export default function CategoryPage({ path }: { path: string }) {
  const params: categoryParams = useParams()
  const [currentDewey, setCurrentDewey] = useState<string>(params.categoryId)
  const [breadcrumbs, setBreadcrumbs] = useState(
    <span>
      <Link to="/">Home</Link>
    </span>
  )

  const printBreadcrumbs = (bc: BookCaseType) => {
    setCurrentDewey(bc.dewey)
    setBreadcrumbs(
      <span>
        {bc.hierarchy.map((bread) => bread.name).join(' > ')} <b>{bc.name}</b>
      </span>
    )
  }

  return (
    <div>
      <h1>Category page</h1>
      <BookcaseWrapper category={currentDewey} onChange={printBreadcrumbs} />
      {breadcrumbs}
    </div>
  )
}
