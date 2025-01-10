"use client";

import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFacetedRowModel,
    getFilteredRowModel,
    getGroupedRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    GroupingState,
    useReactTable,
    ColumnOrderState,
    SortingState,
} from "@tanstack/react-table";
// import { setPaginationPageCount } from "@/app/(store)/(slices)/paginationSlice";
// import { setSearchValue } from "@/app/(store)/(slices)/searchSlice";
// import { Pagination, SearchState } from "@/app/(store)/storeInterface";
import CustomTable from "./CustomTable";
// import { useSkipper } from "./hooks";
// import DefaultColumn, { fuzzyFilter, getTableMeta } from "./tableModels";

interface PaginationState {
    pageSize: number;
    pageIndex: number;
}

export interface PaginationDetails {
    canNextPage: boolean;
    canPreviousPage: boolean;
    pageCount: number;
}

interface TableProps {
    columns: ColumnDef<any>[];
    className?: string;
    tableData: any;
    sorting?: SortingState;
    // paginationState?: PaginationState;
    // setPaginationState?: React.Dispatch<any>;
    // setPaginationDetails?: React.Dispatch<
    //     React.SetStateAction<PaginationDetails>
    // >;
    setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;
    setPageCount?: React.Dispatch<React.SetStateAction<number>>;
    loading?: boolean;
}

const Table = ({
    columns,
    className,
    tableData,
    // paginationState,
    // setPaginationState,
    // setPaginationDetails,
    sorting,
    setSorting,
    loading,
}: TableProps) => {
    const [columnsState] = React.useState(() => [...columns]);
    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
        columnsState.map((column) => column.id as string) //must start out with populated columnOrder so we can splice
    );
    // const [data, setData] = React.useState(tableData);
    const [grouping, setGrouping] = React.useState<GroupingState>([]);
    const [isSplit, setIsSplit] = React.useState(false);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    // const [globalFilter, setGlobalFilter] = React.useState('');

    //   const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
    //   const searchValue = useSelector(
    //     (store: { search: SearchState }) => store.search.searchValue
    //   );
    //   const dispatch = useDispatch();

    const table = useReactTable({
        data: tableData,
        columns,
        //@ts-ignore
        // defaultColumn: DefaultColumn,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        // onGlobalFilterChange: setSearchValue,
        enableColumnResizing: false,
        autoResetPageIndex: false,
        columnResizeMode: "onChange",
        // onPaginationChange: setPaginationState,
        onSortingChange: setSorting,
        // manualPagination: true,
        // Provide our updateData function to our table meta
        // meta: getTableMeta(setData, skipAutoResetPageIndex),
        state: {
            grouping,
            columnFilters,
            //   globalFilter: searchValue,
            columnOrder,
            // pagination: paginationState ?? undefined,
            sorting,
        },
    });

    // useEffect(() => {
    //     if (setPaginationDetails) {
    //         setPaginationDetails({
    //             canNextPage: table.getCanNextPage(),
    //             canPreviousPage: table.getCanPreviousPage(),
    //             pageCount: table.getPageCount(),
    //         });
    //     }
    // }, [setPaginationDetails, table.getState().pagination]);

    //   useEffect(() => {
    //     dispatch(
    //       setPaginationPageCount(table?.getFilteredRowModel()?.rows?.length)
    //     );
    //   }, [table?.getFilteredRowModel()?.rows?.length]);

    return (
        <CustomTable
            className={className}
            loading={loading}
            table={table}
            tableGroup={isSplit ? "center" : undefined}
        />
    );
};

export default Table;
