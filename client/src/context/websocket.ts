import { createContext, useContext, useEffect, useState } from 'react'
import { Tools } from '@sidmonta/babelelibrary'
const socket = new Tools.WebSocketClient({
  port: '1338',
  address: 'ws://localhost',
})

socket.onOpenConnection(() => console.log('Open connection'))
socket.onCloseConnection(() => console.log('Close connection'))

export const WebSocketContext = createContext(socket)
export const useWebSocket = () => useContext(WebSocketContext)

export function useWSData<A>(eventType: string) {
  const [elements, setElements] = useState<A[]>([])
  const webSocketClient = useWebSocket()

  useEffect(() => {
    webSocketClient.on(eventType, (elem: A) => {
      setElements((old: A[]) => [elem, ...old])
    })

    return () => webSocketClient.removeListener(eventType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return elements
}
