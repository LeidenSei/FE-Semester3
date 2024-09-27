export interface SearchPostParams {
    pageNumber: number;
    pageSize: number;
    keyword: string;
    status: string;
    sortBy: string;
    sortDir: string;
    postCategoryId: string,
    isPublish:string
  }
  export interface SearchCommentParams {
    pageNumber: number;
    pageSize: number;
    keyword: string;
    status: string;
    sortBy: string;
    sortDir: string;
    startDate: string,
    endDate: string,
    isActive:string
  }
