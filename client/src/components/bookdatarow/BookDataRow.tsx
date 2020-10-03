import React from 'react'
import { Quad } from '../wrapbook/WrapBook'
import { useLabel } from '../../context/labeler'

export default function BookDataRow({ data }: { data: Quad }) {
  const labelPredicate: string = useLabel(data.predicate.value)[0] as string
  const labelObject: string = useLabel(data.object.value)[0] as string
  return (
    <p>
      <span>{labelPredicate}</span>: {labelObject}
    </p>
  )
}
