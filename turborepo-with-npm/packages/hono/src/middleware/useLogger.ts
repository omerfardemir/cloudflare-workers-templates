import {Context, Next} from 'hono'
import {HonoApp} from '@monocf/types'
import {logger} from '../helpers/logger'

export const useLogger = () => {
  return async (c: Context<HonoApp>, next: Next) => {
    logger.setTags({
      url: c.req.url,
      name: c.env.NAME,
      release: c.env.SENTRY_RELEASE,
      environment: c.env.ENVIRONMENT,
      version: c.env.VERSION
    })
    return next()
  }
}
