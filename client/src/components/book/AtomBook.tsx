import React from 'react'
import { generateColorFromString } from '@sidmonta/babelelibrary/build/tools'
import * as he from 'he'
import { useLabel } from '../../context/labeler'
import { ThemeComponentFactory } from '../../context/theme'

export default function AtomBook({ url }: { url: string }) {
  const label: string = useLabel(url)[0] as string
  const BookCover = ThemeComponentFactory<{ color: string }>('book/AtomBook')
  return (
    <div>
      <BookCover color={generateColorFromString(url)}>{he.decode(label)}</BookCover>
    </div>
  )
}
