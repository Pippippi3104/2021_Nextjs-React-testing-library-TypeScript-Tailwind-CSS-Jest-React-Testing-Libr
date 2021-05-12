import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { SWRConfig, cache } from 'swr'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Commentpage from '../pages/comment-page'

const server = setupServer(
  rest.get(
    'https://jsonplaceholder.typicode.com/comments/',
    (req, res, ctx) => {
      const query = req.url.searchParams
      const _limit = query.get('_limit')
      if (_limit === '10') {
        return res(
          ctx.status(200),
          ctx.json([
            {
              postId: 1,
              id: 1,
              name: 'A',
              email: 'dummya@gmail.com',
              body: 'test body a',
            },
            {
              postId: 2,
              id: 2,
              name: 'B',
              email: 'dummyb@gmail.com',
              body: 'test body b',
            },
          ])
        )
      }
    }
  )
)

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
  //   cache.clear()
})
afterAll(() => server.close())

describe('Comment page with useSWR / Success+Error', () => {
  // case 001
  it('Should render the value fetched by useSWR', async () => {
    render(
      // useSWR を使うためラッピング、インターバルをセットする
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <Commentpage />
      </SWRConfig>
    )

    expect(await screen.findByText('1: test body a')).toBeInTheDocument()
    expect(screen.getByText('2: test body b')).toBeInTheDocument()
  })

  // case 002
  it('Should render Error text when fetch failed', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/comments/',
        (req, res, ctx) => {
          const query = req.url.searchParams
          const _limit = query.get('_limit')
          if (_limit === '10') {
            return res(ctx.status(400))
          }
        }
      )
    )
    render(
      // useSWR を使うためラッピング、インターバルをセットする
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <Commentpage />
      </SWRConfig>
    )

    expect(await screen.findByText('Error!')).toBeInTheDocument()
  })
})
