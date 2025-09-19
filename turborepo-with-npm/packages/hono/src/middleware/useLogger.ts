import { Context, Next, MiddlewareHandler } from 'hono'
import { HonoApp } from '@monocf/types'
import { useWorkersLogger } from 'workers-tagged-logger'

export function useLogger<T extends HonoApp>(): MiddlewareHandler {
  return async (c: Context<T>, next: Next) => {
    return useWorkersLogger(c.env.NAME, {
      url: c.req.url,
      release: c.env.RELEASE,
      environment: c.env.ENVIRONMENT,
      version: c.env.VERSION,
    })(c, next)
  }
}
