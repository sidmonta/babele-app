import { createContext, useContext } from 'react'
import WebSocketClient from '../WebSocketClient'

const socket = new WebSocketClient({ port: '1338' })

export const WebSocketContext = createContext(socket)
export const useWebSocket = () => useContext(WebSocketContext)
