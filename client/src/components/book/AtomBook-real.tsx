import styled from 'styled-components'

const BookCover = styled.div`
  background-color: ${(props) => props.color || 'red'};
  width: 100%;
  height: 30px;
`

export default BookCover
