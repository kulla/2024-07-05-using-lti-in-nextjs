import { Provider as ltijs } from 'ltijs'
import { listeners } from 'process'

ltijs.setup(
  'LTIKEY',
  { url: 'mongodb://localhost:27017/lti' },
  { cookies: { secure: false, sameSite: '' } },
)

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  context: { params: { endpoint: string } },
) {
  const { endpoint } = context.params

  const mockRequest = new ExpressRequestMock(
    new Request(request.url + '/' + endpoint, request),
  )
  const mockResponse = new ExpressResponseMock()

  await ltijs.app(mockRequest, mockResponse, () => {})

  return mockResponse.convertToResponse()
}

class ExpressRequestMock {
  private _request: Request

  constructor(request: Request) {
    this._request = request
  }

  listeners() {
    return []
  }

  resume() {}
}

class ExpressResponseMock {
  private _status: number = 200
  private _headers: Record<string, string> = {}
  private _data: BodyInit | null = null

  status(status: number) {
    this._status = status

    return this
  }

  send(data: BodyInit | null) {
    this._data = data

    return this
  }

  convertToResponse() {
    return new Response(this._data, {
      status: this._status,
      headers: this._headers,
    })
  }
}
