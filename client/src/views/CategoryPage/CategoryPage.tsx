import React, { useEffect, useState } from 'react'
import { Link, useParams } from '@reach/router'
import { BookCaseType } from '../../components/bookcase/BookCase'
import { useDewey, useDeweySelect } from '../../context/dewey-select'
import Title from '../../components/title/title'
import { DeweyCategory } from '@sidmonta/babelelibrary/build/types'
import { fetchAPI } from '../../services'

type categoryParams = {
  categoryId: string
}

export default function CategoryPage({ path }: { path: string }) {
  const params: categoryParams = useParams()
  const currentDewey = params.categoryId
  const { selectDeweyCategory } = useDeweySelect()

  const selectDewey: DeweyCategory | null = useDewey(currentDewey)

  return (
    <div>
      <Title>{selectDewey?.name}</Title>
    </div>
  )
}
