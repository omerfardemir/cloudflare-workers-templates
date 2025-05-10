export * from './common-schemas'
export * from './api/api-response'

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
