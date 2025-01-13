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
    fields: {
        startDate: null,
        endDate: null,
        company: "",
        product: "",
        productType: "",
        country: "",
        status: "",
        amount: ""
    };
}

export interface PageIndexState {
    index: string | null;
}

export interface CallCountState {
    count: null | number;
}
