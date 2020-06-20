import { Quad } from "n3"
import { Event } from '@marblejs/core'

export interface WSBookList extends Event {
  type: 'BOOKLIST',
  payload: string
}

export interface WSLabel extends Event {
  type: 'LABEL',
  payload: string | string[]
}

export interface WSBookData extends Event {
  type: 'BOOKDATA',
  payload: Quad
}

export type WSTypes = WSBookList | WSLabel | WSBookData