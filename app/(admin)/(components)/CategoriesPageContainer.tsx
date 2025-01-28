"use client";
import { delete_icon, tableNextArrow, tablePrevArrow } from '@/public/icons';
import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react'
import styles from "@/styles/componentStyles/Categories.module.scss"
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { Pagination } from '@/app/(store)/storeInterface';
import Table from './Table/Table';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/app/(api)/api';

const CategoriesPageContainer = () => {
    const [paginationDetails, setPaginationDetails] = useState<any>({});
    const [paginationState, setPaginationState] = useState({
        pageSize: 10,
        pageIndex: 0,
    });
    const forcePaginationNum = useSelector(
        (store: { pagination: Pagination }) => store.pagination.forcePageNum
    );
    const [paginationRange, setPaginationRange] = useState({
        startOfRange: 1,
        endOfRange: 10,
    });

    const { data } = useQuery(
        ["categoriesData"],
        async () => await getCategories(),
        {
            refetchOnWindowFocus: false,
        },
    );


    const allTableColumns: ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorFn: (row: any) => row?.name,
                id: "id",
                header: "Kateqoriyanın adı",
                cell: (info: any) => info.getValue(),
                enableResizing: false,
            },
            {
                accessorFn: (row: any) => row?.button,
                id: "button",
                header: "Sil",
                cell: (info: any) => (
                    <div className={styles.table_buttons}>
                        <div
                            className={styles.td_remove_button}
                        // onClick={() => {
                        //     setSelectedRow(info.row.original);
                        //     setOpenDeleteModal(true);
                        // }}
                        >
                            {delete_icon}
                        </div>
                    </div>
                ),
                enableResizing: false,
            },
        ],
        []
    );

    const handlePageClick = ({ selected }: any) => {
        const startOfRange = selected * 10 + 1;
        const endOfRange = startOfRange + 9;
        setPaginationRange({ startOfRange, endOfRange });
        setPaginationState((current: any) => {
            return { ...current, pageIndex: +selected };
        });
    };

    return (
        <>
            <div className={styles.table_container}>
                <div className={styles.categories_header}>
                    <div className={styles.title}>Kateqoriyalar</div>
                    <div className={styles.add_category_btn}>Yeni kateqoriya yarat</div>
                </div>
                <Table
                    columns={allTableColumns}
                    tableData={data?.data?.data ?? []}
                    paginationState={paginationState}
                    setPaginationState={setPaginationState}
                    setPaginationDetails={setPaginationDetails}
                // sorting={sorting}
                // setSorting={setSorting}
                // loading={isLoading}
                />
                <div className={styles.table_pagination}>
                    <div className={styles.pagination_details_txt}>
                        Axtarış nəticəsi: {data?.data?.data?.length} məlumatın{" "}
                        {paginationRange.startOfRange} - {paginationRange.endOfRange}{" "}
                        aralığı
                    </div>
                    <div className={styles.pagination}>
                        <ReactPaginate
                            pageCount={Math.ceil(data?.data?.data?.length / 10)}
                            breakLabel={
                                <div className={`${styles.pagination_page_number}`}>...</div>
                            }
                            previousLabel={
                                <button
                                    className={styles.pagination_button}
                                    disabled={!paginationDetails?.canPreviousPage}
                                >
                                    {tablePrevArrow}
                                </button>
                            }
                            nextLabel={
                                <button
                                    className={styles.pagination_button}
                                    disabled={!paginationDetails?.canNextPage}
                                >
                                    {tableNextArrow}
                                </button>
                            }
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={10}
                            marginPagesDisplayed={1}
                            containerClassName={styles.table_pagination}
                            activeClassName={styles.pagination_active_page_number}
                            pageLinkClassName={styles.pagination_page_number}
                            forcePage={forcePaginationNum === true ? 0 : undefined}
                        />
                    </div>
                </div>
                {/* {openDeleteModal && <DeleteModal
                    openDeleteModal={openDeleteModal}
                    setOpenDeleteModal={setOpenDeleteModal}
                    selectedRow={selectedRow} />} */}
            </div>
        </>
    )
}

export default CategoriesPageContainer