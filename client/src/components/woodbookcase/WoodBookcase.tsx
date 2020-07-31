import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import Title from '../title/title'

export const WoodContainer = styled.div`
  width: 100%;
  background-color: brown;
  padding-top: 25px;
  min-height: 70vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.2fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  box-shadow: 1px -1px 4px 0px #676666;
  
  .wood-header {
    display: flex;
    align-items: center;
    justify-content: center;
}
  }
  
  .wood-main {
    margin: 0 70px;
    padding: 25px;
    overflow: auto;
    box-shadow: inset 0px 0px 20px 10px #671515;
  }
`
type WoodBookcaseProps = {
  title: string
}
export default function WoodBookcase(props: PropsWithChildren<WoodBookcaseProps>) {
  const title = props.title

  return (
    <WoodContainer>
      <div className="wood-header">
        <Title className="center-text">{title}</Title>
      </div>
      <div className="wood-main">{props.children}</div>
    </WoodContainer>
  )
}
