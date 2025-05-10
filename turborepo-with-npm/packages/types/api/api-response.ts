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
