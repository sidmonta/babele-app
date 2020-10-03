import { Quad } from 'n3'
import { Event } from '@marblejs/core'

export enum Type {
  BOOKLIST = 'BOOKLIST',
  LABEL = 'LABEL',
  BOOKDATA = 'BOOKDATA',
  BOOKSEARCH = 'BOOKSEARCH',
  BOOKDATASERVICE = 'BOOKDATASERVICE',
  NEWBOOK = 'NEWBOOK',
}

export interface WSBookList extends Event {
  type: Type.BOOKLIST
  payload: { id: string }
}

export interface WSLabel extends Event {
  type: Type.LABEL
  payload: string | string[]
}

export interface WSBookDataIn extends Event {
  type: Type.BOOKDATA
  payload: {
    uri: string
  }
}

export interface WSBookSearch extends Event {
  type: Type.BOOKSEARCH
  payload: { query: string }
}

export interface WSBookDataOut extends Event {}

export interface WSBookData extends WSBookDataOut {
  type: Type.BOOKDATA
  payload: {
    quad: Quad
  }
}

export interface WSBookDataService extends WSBookDataOut {
  type: Type.BOOKDATASERVICE
  payload: {
    service: string
  }
}

export interface WSNewBookClassified extends WSBookDataOut {
  type: Type.NEWBOOK
  payload: {
    bookUri: string
    dewey: string
  }
}
