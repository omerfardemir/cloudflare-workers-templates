import {ZodSchema} from 'zod'
import type {ValidationTargets} from 'hono'
import {validator as zv} from 'hono-openapi/zod'
import {newHTTPException} from '../types/errors'

export const zValidator = <T extends ZodSchema, Target extends keyof ValidationTargets>(
  target: Target,
  schema: T,
) =>
  zv(target, schema, (result) => {
    if (!result.success) {
      throw newHTTPException(400, result.error.issues.map((issue) => issue.message).join(', '))
    }
  })
