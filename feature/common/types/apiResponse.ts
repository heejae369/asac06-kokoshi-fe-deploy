export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

export interface Pageable {
  page: number;
  size: number;
}

export interface Page<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  empty: boolean;
}

export interface Slice<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: true;
      unsorted: false;
      empty: false;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: true;
    unpaged: false;
  };
  number: number;
  size: number;
  numberOfElements: number;
  first: true;
  last: false;
  empty: false;
}
