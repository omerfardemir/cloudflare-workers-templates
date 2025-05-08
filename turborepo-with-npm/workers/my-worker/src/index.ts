import {Hono} from 'hono'
import {App} from './context'
import {
  useLogger,
  useDefaultCors,
  useNotFound,
  useOnError,
  response,
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
    hello: 'world',
  })
})

app.get('/error', (c) => {
  return response(c, {
    error: 'error message',
  }, 500)
})

export default app
