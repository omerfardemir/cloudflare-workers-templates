import type { Context } from 'hono'
import type { HonoApp, ApiError } from '@monocf/types'

/** Handles typical notFound hooks */
export function useNotFound<T extends HonoApp>() {
  return async (ctx: Context<T>): Promise<Response> => {
    const c = ctx as unknown as Context<HonoApp>

    return c.json(notFoundResponse, 404)
  }
}

export const notFoundResponse = {
  success: false,
  error: { message: 'not found' },
} satisfies ApiError
