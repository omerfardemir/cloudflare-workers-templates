import {z} from 'zod'

/**
 * Zod schema for pagination
 */
export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).default(10),
})
