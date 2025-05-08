/**
 * This helpers are copied from https://github.com/jahands/workers-monorepo-template/blob/main/packages/hono-helpers/src/helpers/request.ts
 * and modified to fit our needs
 */

import {redactUrl} from './url'

import type {Context} from 'hono'
import type {HonoApp} from '@monocf/types'

export interface LogDataRequest {
  url: string
  method: string
  path: string
  /** Hono route for the request */
  routePath: string
  /* URL search params */
  searchParams: string
  headers: string
  /** Eyeball IP address of the request */
  ip?: string
  timestamp: string
}

/**
 * Get logdata from request
 */
export function getRequestLogData<T extends HonoApp>(
  c: Context<T>,
  requestStartTimestamp: number,
): LogDataRequest {
  const redactedUrl = redactUrl(c.req.url)
  return {
    url: redactedUrl.toString(),
    method: c.req.method,
    path: c.req.path,
    routePath: c.req.routePath,
    searchParams: redactedUrl.searchParams.toString(),
    headers: JSON.stringify(Array.from(c.req.raw.headers)),
    ip:
      c.req.header('cf-connecting-ip') ||
      c.req.header('x-real-ip') ||
      c.req.header('x-forwarded-for'),
    timestamp: new Date(requestStartTimestamp).toISOString(),
  }
}
