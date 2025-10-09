export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    links: {
        first: string | null;
        prev: string | null;
        next: string | null;
        last: string | null;
    };
}

export interface PaginationLinks {
    first: string | null;
    prev: string | null;
    next: string | null;
    last: string | null;
}
