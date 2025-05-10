import {Hono} from 'hono'
import {App} from './context'
import {
  useLogger,
  useDefaultCors,
  useNotFound,
  useOnError,
  response,
  newHTTPException,
} from '@monocf/hono'
import config from '#worker-config'

const app = new Hono<App>()
  .basePath(`api/${config.variables.version}`)
  .use(useLogger())
  .use(useDefaultCors())
  .onError(useOnError())
  .notFound(useNotFound())

app.get('/', (c) => {
  return response(c, {
    hello: c.env.USER,
  })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/error', (c) => {
  throw newHTTPException(500, 'error message')
})

export default app
