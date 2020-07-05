export type WebSocketConfig = {
  address?: string
  port?: string
}

export type EventType = string

export type WebSocketData<P> = {
  type: EventType
  payload: P
}

export type WebSocketCallback<P> = (payload: P) => void

export default class WebSocketClient {
  private readonly address: string = 'ws://localhost'
  private readonly port: string = '80'

  private webSocket: WebSocket

  private eventsRegistry = new Map()

  constructor(opts?: WebSocketConfig) {
    this.address = opts?.address ?? this.address
    this.port = opts?.port ?? this.port

    const connectionPath = `${this.address}:${this.port}`
    this.webSocket = new WebSocket(connectionPath)

    this.webSocket.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data)
      if (!data.type || !data.payload) {
        throw Error('Data recived is invalid')
      }
      if (this.eventsRegistry.has(data.type)) {
        const callback = this.eventsRegistry.get(data.type)
        if (callback) {
          callback(data.payload)
        }
      }
    }
  }

  public on<P>(type: EventType, callback: WebSocketCallback<P>): void {
    this.eventsRegistry.set(type, callback)
  }

  public send<P>(message: WebSocketData<P>): void {
    const strMessage = JSON.stringify(message)
    this.webSocket.send(strMessage)
  }

  public emit<P>(eventType: string, payload: P) {
    const message: WebSocketData<P> = {
      type: eventType,
      payload,
    }
    this.send(message)
  }

  onOpenConnection(callback: () => void) {
    this.webSocket.onopen = callback
  }
  onCloseConnection(callback: () => void) {
    this.webSocket.onclose = callback
  }
  onError(callback: (event: Event) => void) {
    this.webSocket.onerror = callback
  }
}
