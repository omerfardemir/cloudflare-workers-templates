export interface ApiError {
  success: false
  error: {
    message: string
  }
}

export interface ApiSuccess<T> {
  success: true
  data: T
}

export interface PaginationMeta {
  page: number
  size: number
  total: number
  totalPages: number
}

export interface PaginatedResponse<T> extends ApiSuccess<T> {
  meta: PaginationMeta
}

export type ApiResponse<T> = ApiError | ApiSuccess<T> | PaginatedResponse<T>
