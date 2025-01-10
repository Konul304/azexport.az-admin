"use client";
import React, { useMemo } from 'react';
import styles from "@/styles/componentStyles/OrdersPageContainer.module.scss";
import Table from './Table/Table';
import { delete_icon, edit } from '@/public/icons';
import aliexpress from "@/public/image.png";
import Image from 'next/image';

export interface TableColumn {
    accessorFn: (row: any) => any;
    id: string;
    header: string;
    cell: (info: any) => any;
    enableResizing: boolean;
}

const OrdersPageContainer = () => {

    const getStatusStyles = (text: string) => {
        switch (text) {
            case "Gözlənilir":
                return styles.waiting;
            case "Göndərildi":
                return styles.sent;
            case "İxrac olundu":
                return styles.exported;
            case "Geri qaytarıldı":
                return styles.returned;
            default:
                break;
        }
    };

    const tableData = [
        {
            id: 101,
            product: "Apple",
            productType: "iPhone 14",
            amount: 5, // Quantity
            platform: "Amazon", // Platform
            country: "USA", // Country
            entrepreneur: "John's Electronics", // Entrepreneur
            status: "Gözlənilir", // Status
            button: null, // Placeholder for edit/delete actions
        },
        {
            id: 102,
            product: "Apple",
            productType: "iPhone 14",
            amount: 5, // Quantity
            platform: "Amazon", // Platform
            country: "USA", // Country
            entrepreneur: "John's Electronics", // Entrepreneur
            status: "Göndərildi", // Status
            button: null, // Placeholder for edit/delete actions
        },
        {
            id: 103,
            product: "Apple",
            productType: "iPhone 14",
            amount: 5, // Quantity
            platform: "Amazon", // Platform
            country: "USA", // Country
            entrepreneur: "John's Electronics", // Entrepreneur
            status: "İxrac olundu", // Status
            button: null, // Placeholder for edit/delete actions
        },
        {
            id: 104,
            product: "Apple",
            productType: "iPhone 14",
            amount: 5, // Quantity
            platform: "Amazon", // Platform
            country: "USA", // Country
            entrepreneur: "John's Electronics", // Entrepreneur
            status: "Geri qaytarıldı", // Status
            button: null, // Placeholder for edit/delete actions
        },
        {
            id: 105,
            product: "Apple",
            productType: "iPhone 14",
            amount: 5, // Quantity
            platform: "Amazon", // Platform
            country: "USA", // Country
            entrepreneur: "John's Electronics", // Entrepreneur
            status: "Gözlənilir", // Status
            button: null, // Placeholder for edit/delete actions
        },
        {
            id: 106,
            product: "Apple",
            productType: "iPhone 14",
            amount: 5, // Quantity
            platform: "Amazon", // Platform
            country: "USA", // Country
            entrepreneur: "John's Electronics", // Entrepreneur
            status: "Göndərildi", // Status
            button: null, // Placeholder for edit/delete actions
        },
        {
            id: 107,
            product: "Apple",
            productType: "iPhone 14",
            amount: 5, // Quantity
            platform: "Amazon", // Platform
            country: "USA", // Country
            entrepreneur: "John's Electronics", // Entrepreneur
            status: "İxrac olundu", // Status
            button: null, // Placeholder for edit/delete actions
        },
        {
            id: 108,
            product: "Apple",
            productType: "iPhone 14",
            amount: 5, // Quantity
            platform: "Amazon", // Platform
            country: "USA", // Country
            entrepreneur: "John's Electronics", // Entrepreneur
            status: "Geri qaytarıldı", // Status
            button: null, // Placeholder for edit/delete actions
        },
    ];

    const allTableColumns: TableColumn[] = useMemo(
        () => [
            {
                accessorFn: (row: any) => row?.id,
                id: "id",
                header: "Sifariş NO",
                cell: (info: any) => info.getValue(),
                enableResizing: false,
            },
            {
                accessorFn: (row: any) => row?.product,
                id: "product",
                header: "Sifariş olunan məhsul",
                cell: (info: any) => info.getValue(),
                enableResizing: false,
            },
            {
                accessorFn: (row: any) => row?.productType,
                id: "productType",
                header: "Sifarişin çeşidi",
                cell: (info: any) => info.getValue(),
                enableResizing: false,
            },
            {
                accessorFn: (row: any) => row?.amount,
                id: "amount",
                header: "Miqdarı",
                cell: (info: any) => info.getValue(),
                enableResizing: false,
            },
            {
                accessorFn: (row: any) => row?.platform,
                id: "platform",
                header: "Platforma",
                cell: (info: any) =>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div><Image src={aliexpress} width={15} height={15} alt='logo' style={{ marginTop: '5px' }} /></div>
                        <div>{info.getValue()}</div>
                    </div>,
                enableResizing: false,
            },
            {
                accessorFn: (row: any) => row?.country,
                id: "country",
                header: "Ölkə",
                cell: (info: any) => info.getValue(),
                enableResizing: false,
            },
            {
                accessorFn: (row: any) => row?.entrepreneur,
                id: "entrepreneur",
                header: "Sifarişin verildiyi sahibkar",
                cell: (info: any) => info.getValue(),
                enableResizing: false,
            },
            {
                accessorFn: (row: any) => row?.status,
                id: "status",
                header: "Sifarişin statusu",
                cell: (info: any) => <div className={getStatusStyles(info.getValue())}>{info.getValue()}</div>,
                enableResizing: false,
            },
            {
                accessorFn: (row: any) => row?.button,
                id: "button",
                header: "Redaktə et",
                cell: (info: any) => (
                    <div className={styles.table_buttons}>
                        <div
                            className={styles.td_edit_button}
                        //   onClick={() => {
                        //     setSelectedRow(info.row.original);
                        //     setOpenNewUpdateModal(true);
                        //     setModalAction("updateCurrentAdmin");
                        //   }}
                        >
                            {edit}
                        </div>
                        <div
                            className={styles.td_remove_button}
                        //   onClick={() => {
                        //     setSelectedRow(info.row.original);
                        //     setDeleteAction("admin");
                        //     setOpenDeleteModal(true);
                        //   }}
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

    return (
        <>
            <div className={styles.table_container}>
                <Table
                    columns={allTableColumns}
                    tableData={tableData ?? []}
                // sorting={sorting}
                // setSorting={setSorting}
                // loading={isLoading}
                />
                {/* <div className={styles.table_pagination}>
            <div className={styles.pagination_details_txt}>
              Axtarış nəticəsi: {data?.data?.length} məlumatın{" "}
              {paginationRange.startOfRange} - {paginationRange.endOfRange}{" "}
              aralığı
            </div>
            <div className={styles.pagination}>
              <ReactPaginate
                pageCount={Math.ceil(data?.data?.length / 5)}
                breakLabel={
                  <div className={`${styles.pagination_page_number}`}>...</div>
                }
                previousLabel={
                  <button
                    className={styles.pagination_button}
                    // disabled={!paginationDetails?.canPreviousPage}
                  >
                    {tablePrevArrow}
                  </button>
                }
                nextLabel={
                  <button
                    className={styles.pagination_button}
                    // disabled={!paginationDetails?.canNextPage}
                  >
                    {tableNextArrow}
                  </button>
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                containerClassName={styles.table_pagination}
                activeClassName={styles.pagination_active_page_number}
                pageLinkClassName={styles.pagination_page_number}
                forcePage={forcePaginationNum === true ? 0 : undefined}
              />
            </div>
          </div> */}
            </div>
        </>
    )
}

export default OrdersPageContainer