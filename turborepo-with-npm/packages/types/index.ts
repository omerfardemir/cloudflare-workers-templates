/**
 * This types are copied from https://github.com/jahands/workers-monorepo-template/blob/main/packages/hono-helpers/src/types.ts
 * and modified to fit our needs
 */

/** Global bindings */
export type SharedHonoEnv = {
  /**
   * Name of the worker used in logging/etc.
   * Automatically pulled from package.json
   */
  NAME: string
  /**
   * Environment of the worker.
   * It will generate automatically by the monocf on deployment
   * @example "dev", "staging", "production"
   */
  ENVIRONMENT: string
  /**
   * Version of the worker.
   * It will generate automatically by the monocf on deployment
   * @example "1.0.0"
   */
  VERSION: string
  /**
   * Release version of the Worker (based on the current git commit).
   * It will generate automatically by the monocf on deployment
   * Useful for logs, Sentry, etc.
   */
  RELEASE: string
}

/** Global Hono variables */
export type SharedHonoVariables = object

/** Top-level Hono app */
export interface HonoApp {
  Variables: SharedHonoVariables
  Bindings: SharedHonoEnv
}

/** Context used for non-Hono things like Durable Objects */
export type SharedAppContext = {
  var: SharedHonoVariables
  env: SharedHonoEnv
  executionCtx: Pick<ExecutionContext, 'waitUntil'>
}

/**
 * API error response
 */
export interface ApiError {
  success: false
  error: {
    message: string
  }
}

/**
 * API success response
 */
export interface ApiSuccess<T> {
  success: true
  data: T
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> extends ApiSuccess<T> {
  meta: PaginationMeta
}

/**
 * API Response
 */
export type ApiResponse<T> = ApiError | ApiSuccess<T> | PaginatedResponse<T>
