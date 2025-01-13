"use client";
import React, { useEffect, useMemo, useState } from 'react';
import styles from "@/styles/componentStyles/OrdersPageContainer.module.scss";
import Table from './Table/Table';
import { delete_icon, edit, infoArrow, tableNextArrow, tablePrevArrow } from '@/public/icons';
import aliexpress from "@/public/image.png";
import Image from 'next/image';
import PlatformInfoModal from './PlatformInfoModal';
import DeleteModal from './Common/DeleteModal';
import AddNoteModal from './Common/AddNoteModal';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import { Pagination, SearchState } from '../(store)/storeInterface';
import ReactPaginate from 'react-paginate';


const OrdersPageContainer = () => {
    const [openRowId, setOpenRowId] = useState<number | null>(null);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
    const [modalPosition, setModalPosition] = useState<any>();
    const [pageIndex, setPageIndex] = useState<any>(0);
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

    const getStatusStyles = (text: string) => {
        switch (text) {
            case "Gözlənilir":
                return styles.waiting;
            case "Göndərildi":
                return styles.sent;
            // case "İxrac olundu":
            //     return styles.exported;
            case "Geri qaytarıldı":
                return styles.returned;
            default:
                break;
        }
    };

    const searchValue = useSelector(
        (store: { search: SearchState }) => store.search.searchValue
    );


    const handlePageClick = ({ selected }: any) => {
        const startOfRange = selected * 10 + 1;
        const endOfRange = startOfRange + 9;
        setPaginationRange({ startOfRange, endOfRange });
        setPaginationState((current: any) => {
            return { ...current, pageIndex: +selected };
        });
    };

    useEffect(() => {
        if (setPaginationState) {
            setPaginationState((prevState: PaginationState) => ({
                ...prevState,
                pageIndex: 0, // Reset to the first page
            }));
        }
    }, [searchValue, setPaginationState]);

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
            status: "Gözlənilir", // Status
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
            status: "Gözlənilir", // Status
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
        {
            id: 109,
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
            id: 110,
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
            id: 111,
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
            id: 112,
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
            id: 113,
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
            id: 114,
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
            id: 115,
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
            id: 116,
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
            id: 117,
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
            id: 118,
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
            id: 119,
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
            id: 120,
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

    const infoData: any = {
        platform: 'Ali express',
        name: 'Ali express',
        no: '855',
        date: '28/10/2024',
        phoneNumber: '+2020 8788 677 56',
        email: 'aliexpressseller@gmail.com'
    }

    const allTableColumns: ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorFn: (row: any) => row?.id,
                id: "id",
                header: (cell: any) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input type='checkbox' />
                        <div>Sifariş NO</div>
                    </div>
                ),
                // header: "Sifariş NO",
                cell: (info: any) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input type='checkbox' />
                        {info.getValue()}
                    </div>),
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
                        <div style={{ cursor: 'pointer', marginTop: '6px' }}>
                            <div onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setOpenRowId(prevId =>
                                    prevId === info.row.original.id ? null : info.row.original.id
                                );
                                setModalPosition({ top: rect.bottom + 10, left: rect.left });
                            }}>{infoArrow}</div>
                            {openRowId === info.row.original.id && <PlatformInfoModal position={modalPosition} setOpenRowId={setOpenRowId} infoData={infoData} />
                            }
                        </div>
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
                            onClick={() => {
                                setSelectedRow(info.row.original);
                                setOpenAddNoteModal(true);
                            }}
                        >
                            {edit}
                        </div>
                        <div
                            className={styles.td_remove_button}
                            onClick={() => {
                                setSelectedRow(info.row.original);
                                setOpenDeleteModal(true);
                            }}
                        >
                            {delete_icon}
                        </div>

                    </div>
                ),
                enableResizing: false,
            },
        ],
        [openRowId]
    );

    return (
        <>
            <div className={styles.table_title}>Sifarişlər</div>
            <div className={styles.table_container}>
                <Table
                    columns={allTableColumns}
                    tableData={tableData ?? []}
                    paginationState={paginationState}
                    setPaginationState={setPaginationState}
                    setPaginationDetails={setPaginationDetails}
                // sorting={sorting}
                // setSorting={setSorting}
                // loading={isLoading}
                />
                <div className={styles.table_pagination}>
                    <div className={styles.pagination_details_txt}>
                        Axtarış nəticəsi: {tableData?.length} məlumatın{" "}
                        {paginationRange.startOfRange} - {paginationRange.endOfRange}{" "}
                        aralığı
                    </div>
                    <div className={styles.pagination}>
                        <ReactPaginate
                            pageCount={Math.ceil(tableData?.length / 10)}
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
                            pageRangeDisplayed={10}
                            marginPagesDisplayed={1}
                            containerClassName={styles.table_pagination}
                            activeClassName={styles.pagination_active_page_number}
                            pageLinkClassName={styles.pagination_page_number}
                            forcePage={forcePaginationNum === true ? 0 : undefined}
                        />
                    </div>
                </div>
                {openDeleteModal && <DeleteModal openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} />}
                {openAddNoteModal && <AddNoteModal openAddNoteModal={openAddNoteModal} setOpenAddNoteModal={setOpenAddNoteModal} />}
            </div>
        </>
    )
}

export default OrdersPageContainer