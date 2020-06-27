import React from 'react'
import BookCaseImage from './BookCaseImage'

export interface BookCaseType {
  dewey: string
  name: string
  parent: string
  hierarchy: BookCaseType[]
  haveChildren: boolean
}

export interface BookCaseProps extends BookCaseType {
  onClick: (param: BookCaseType) => void
}

export default function BookCase(props: BookCaseProps) {
  return (
    <>
      <span
        className={props.haveChildren ? 'actionable' : ''}
        onClick={() => props.haveChildren && props.onClick(props)}
      >
        <BookCaseImage label={props.name} dewey={props.dewey} />
      </span>
    </>
  )
}
