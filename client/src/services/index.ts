type Method = 'GET' | 'POST' | 'PUT'

type OptionFetch = {
  method: Method
  headers: Record<string, string>
  body?: string
}

export function fetchAPI(method: Method) {
  const baseURL = 'http://localhost:1337/api'
  return function (url: string, data = undefined) {
    let optRequest: OptionFetch = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (data) {
      optRequest.body = JSON.stringify(data)
    }

    return fetch(baseURL + url, optRequest).then((response: Response) => response.json())
  }
}
