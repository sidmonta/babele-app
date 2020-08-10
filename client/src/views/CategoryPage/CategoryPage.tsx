import React from 'react'
import { useParams } from '@reach/router'
import { useDewey } from '../../context/dewey-select'
import { DeweyCategory } from '@sidmonta/babelelibrary/lib/types'
import WrapBookcase from '../../components/wrapbookcase/WrapBookcase'
import WoodBookcase from '../../components/woodbookcase/WoodBookcase'
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs'
import WrapBookList from '../../components/wrapbookslist/WrapBooksList'

type categoryParams = {
  categoryId: string
}

export default function CategoryPage({ path }: { path: string }) {
  const params: categoryParams = useParams()
  const currentDewey = params.categoryId
  const selectDewey: DeweyCategory | null = useDewey(currentDewey)

  return (
    <div className="page-container">
      <WrapBookcase deweySelect={selectDewey} />
      <Breadcrumbs dewey={selectDewey} />
      <WoodBookcase title={selectDewey?.name || ''}>
        <div className="wood-book">
          <WrapBookList deweySelect={selectDewey} />
        </div>
      </WoodBookcase>
    </div>
  )
}
