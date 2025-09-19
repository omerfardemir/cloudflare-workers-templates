/**
 * This middlewares are copied from https://github.com/jahands/workers-monorepo-template/blob/main/packages/hono-helpers/src/middleware
 * and modified to fit our needs
 */
import { HTTPException } from 'hono/http-exception'

import { logger } from '../helpers/logger'

import type { Context } from 'hono'
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import type { ApiError } from '@monocf/types'
import type { HonoApp } from '@monocf/types'

/** Handles typical onError hooks */
export function useOnError<T extends HonoApp>() {
  return async (err: Error, ctx: Context<T>): Promise<Response> => {
    const c = ctx as unknown as Context<HonoApp>

    if (err instanceof HTTPException) {
      const status = err.getResponse().status as ContentfulStatusCode
      const body: ApiError = { success: false, error: { message: err.message } }
      if (status >= 500) {
        logger.error(err)
      } else if (status === 401) {
        body.error.message = 'unauthorized'
      }

      return c.json(body, status)
    }

    logger.error(err)
    return c.json(
      {
        success: false,
        error: { message: 'internal server error' },
      } satisfies ApiError,
      500,
    )
  }
}
