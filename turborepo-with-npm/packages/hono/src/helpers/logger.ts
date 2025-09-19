/**
 * This helpers are copied from https://github.com/jahands/workers-monorepo-template/blob/main/packages/hono-helpers/src/helpers/logger.ts
 * and modified to fit our needs
 */

import { WorkersLogger } from 'workers-tagged-logger'

export type LogTagHints = {
  // add common tags here so that they show up as hints
  // in `logger.setTags()` and `logger.withTags()`
  name: string
  url: string
  release: string
  environment: string
  version: string
}

export const logger = new WorkersLogger<LogTagHints>()
