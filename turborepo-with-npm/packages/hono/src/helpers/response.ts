import { HonoApp } from '@monocf/types'
import { Context } from 'hono'
import { ApiResponse, PaginationMeta } from '@monocf/types'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

/**
 * Helper function to send responses with API response format
 */
export function response<H extends HonoApp, T>(
  ctx: Context<H>,
  data: T,
  code: ContentfulStatusCode = 200,
  meta?: PaginationMeta,
) {
  const c = ctx as unknown as Context<HonoApp>

  if (meta) {
    return c.json(
      {
        success: true,
        data,
        meta,
      } satisfies ApiResponse<T>,
      code,
    )
  } else {
    return c.json(
      {
        success: true,
        data,
      } satisfies ApiResponse<T>,
      code,
    )
  }
}
