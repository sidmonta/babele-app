import { Quad } from 'n3'
import { Event } from '@marblejs/core'

export enum Type {
  BOOKLIST = 'BOOKLIST',
  LABEL = 'LABEL',
  BOOKDATA = 'BOOKDATA',
}

export interface WSBookList extends Event {
  type: Type.BOOKLIST
  payload: { id: string }
}

export interface WSLabel extends Event {
  type: Type.LABEL
  payload: string | string[]
}

export interface WSBookData extends Event {
  type: Type.BOOKDATA
  payload: Quad
}

export type WSTypes = WSBookList | WSLabel | WSBookData
