import {Hono} from 'hono'
import {App} from './context'
import {useLogger, useDefaultCors, useNotFound, useOnError} from '@monocf/hono'
import config from '#worker-config'

const app = new Hono<App>()
  .basePath(`api/${config.variables.version}`)
  .use(useLogger())
  .use(useDefaultCors())
  .onError(useOnError())
  .notFound(useNotFound())

app.get('/', (c) => {
  return c.text(`Hello Hono!`)
})

export default app
