export interface ModalState {
    newCallModalOpen: boolean;
    sessionOutModalOpen: boolean;
}

export interface SearchState {
    searchValue: string;
    searchPlaceHolder: string;
}

export interface Pagination {
    paginationPageCount: number;
    paginationState: {
        pageSize: number;
        pageIndex: number;
    };
    forcePageNum: boolean;
}

export interface FilterFields {
    date: null,
    product: "" | null,
    country: "",
    status: "",
    category: ""
    platform: ""
}

export interface PageIndexState {
    index: string | null;
}

export interface OrdersState {
    amount: string;
    buyer_email: string;
    buyer_platform: string;
    category: {
        id: number | null;
        name: string;
        created_at: string;
        updated_at: string;
    }
    category_id: number | null;
    country: string;
    created_at: string;
    date: string;
    id: number | null;
    note: string | null;
    product_name: string;
    status: number | null;
    subscriber: {
        id: number | null;
        name: string;
    }
    subscriber_id: number | null;
    updated_at: string;
    whatsapp_number: string;
}