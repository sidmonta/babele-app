import React from 'react'
import { generateColorFromString } from '@sidmonta/babelelibrary/build/tools'
import * as he from 'he'
import { useLabel } from '../../context/labeler'
import { ThemeComponentFactory } from '../../context/theme'
import { useLocation, useNavigate } from '@reach/router'

const Fallback = ({ url }: { url: string }) => (
  <div style={{ width: '150px', height: '200px', backgroundColor: generateColorFromString(url) }}>{url}</div>
)

export default function AtomBook({ url }: { url: string }) {
  const navigate = useNavigate()
  const location = useLocation()

  const label: string = useLabel(url)[0] as string
  const BookCover = ThemeComponentFactory<{ color: string }>('book/AtomBook', <Fallback url={url} />)

  const routeTo = async (url: string) => {
    await navigate(`${location.pathname}/book/${encodeURIComponent(url)}`)
  }

  return (
    <div onClick={() => routeTo(url)}>
      <BookCover color={generateColorFromString(url)}>{he.decode(label)}</BookCover>
    </div>
  )
}
