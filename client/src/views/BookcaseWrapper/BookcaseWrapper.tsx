import React, { useEffect, useState } from 'react'
import BookCase, { BookCaseType } from '../../components/bookcase/BookCase'
import styled from 'styled-components'

const BookCasesContainer = styled.div`
  width: 100vw;
  display: flex;
  overflow-y: scroll;
`

export default function BookcaseWrapper({
  category,
  onChange,
}: {
  category?: string
  onChange?: (bc: BookCaseType) => void
}) {
  const [bookcases, setBookCase] = useState<BookCaseType[]>([])

  const fetchData = (dewey?: string) => {
    const apiUrl = dewey ? `children/${dewey}` : 'init'
    const fetchData = async () => {
      const initialBookcases = await fetch(`http://localhost:1337/api/${apiUrl}`).then((data) => data.json())
      setBookCase(initialBookcases)
    }
    fetchData().then()
  }

  useEffect(() => {
    fetchData(category)
  }, [])

  const handleClick = (bc: BookCaseType) => {
    fetchData(bc.dewey)
    if (onChange) {
      onChange(bc)
    }
  }

  const printBookCases = () => {
    return bookcases.map((bc: BookCaseType) => <BookCase key={bc.dewey} {...bc} onClick={handleClick} />)
  }

  return (
    <>
      <BookCasesContainer>{printBookCases()}</BookCasesContainer>
    </>
  )
}
