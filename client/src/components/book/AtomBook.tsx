import React from 'react'
import styled from 'styled-components'
import { generateColorFromString } from '@sidmonta/babelelibrary/build/tools'
import { useLabel } from '../../context/labeler'

const BookCover = styled.div`
  background-color: ${(props) => props.color || 'red'};
  width: 25px;
  height: 30px;
`

export default function AtomBook({ url }: { url: string }) {
  const [label] = useLabel(url)
  return <BookCover color={generateColorFromString(url)}>{label}</BookCover>
}
