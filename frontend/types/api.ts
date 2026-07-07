export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: "success" | "error";
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: Pagination;
}
