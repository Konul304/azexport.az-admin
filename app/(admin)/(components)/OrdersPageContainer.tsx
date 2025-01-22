"use client";
import React, { useEffect, useMemo, useState } from 'react';
import styles from "@/styles/componentStyles/OrdersPageContainer.module.scss";
import Table from './Table/Table';
import { delete_icon, download, edit, infoArrow, tableNextArrow, tablePrevArrow, three_dots } from '@/public/icons';
import PlatformInfoModal from './PlatformInfoModal';
import DeleteModal from './Common/DeleteModal';
import AddNoteModal from './Common/AddNoteModal';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import { Pagination, SearchState } from '../../(store)/storeInterface';
import ReactPaginate from 'react-paginate';
import { Popover } from 'antd';
import ViewNotesModal from './Common/ViewNotesModal';
import CreateNewOrderModal from './CreateNewOrderModal';
import { getOrders } from '../../(api)/api';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';


const OrdersPageContainer = () => {
    const [openRowId, setOpenRowId] = useState<number | null>(null);
    const [selectedRow, setSelectedRow] = useState<any | null>(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
    const [openViewNotesModal, setOpenViewNotesModal] = useState(false);
    const [openCreateNewOrderModal, setOpenCreateNewOrderModal] = useState(false);
    const [modalAction, setModalAction] = useState<string>('');
    const [modalPosition, setModalPosition] = useState<any>();
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


    const { data, isLoading, isFetching, refetch } = useQuery(
        ["ordersData"],
        async () => await getOrders(),
        {
            refetchOnWindowFocus: false,
        },
    );


    useEffect(() => {
        if (setPaginationState) {
            setPaginationState((prevState: PaginationState) => ({
                ...prevState,
                pageIndex: 0, // Reset to the first page
            }));
        }
    }, [searchValue, setPaginationState]);

    const handleContent = (e: any) => (
        <div className={styles.three_dots} >
            <p className={styles.item} style={{ marginBottom: '8px', marginTop: '0px' }}
                onClick={() => {
                    setOpenViewNotesModal(true);
                    setSelectedRow(e);
                }}
            >
                Qeydlərə bax
            </p>
            <p className={styles.item} style={{ marginBottom: '0px', marginTop: '0px' }}
                onClick={() => {
                    setOpenAddNoteModal(true)
                    setSelectedRow(e);
                }}
            >
                Qeyd Yarat
            </p>
        </div>
    );

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
                cell: (info: any) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input type='checkbox' />
                        {info.getValue()}
                    </div>),
                enableResizing: false,
            },
            {
                accessorFn: (row: any) => row?.product_name,
                id: "product",
                header: "Sifariş olunan məhsul",
                cell: (info: any) => info.getValue(),
                enableResizing: false,
            },
            {
                accessorFn: (row: any) => row?.category?.name,
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
                accessorFn: (row: any) => row?.buyer_platform,
                id: "platform",
                header: "Platforma",
                cell: (info: any) =>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div>{info.getValue()}</div>
                        <div style={{ cursor: 'pointer', marginTop: '6px' }}>
                            <div onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setOpenRowId(prevId =>
                                    prevId === info.row.original.id ? null : info.row.original.id
                                );
                                setModalPosition({ top: rect.bottom + 10, left: rect.left });
                            }}>{infoArrow}</div>
                            {openRowId === info.row.original.id && <PlatformInfoModal position={modalPosition} setOpenRowId={setOpenRowId} infoData={info?.row?.original} />
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
                accessorFn: (row: any) => row?.seller_company,
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
                                setOpenCreateNewOrderModal(true);
                                setModalAction('edit')
                            }}
                        >
                            {edit}
                        </div>
                        <div>
                            <Popover
                                placement="bottomRight"
                                content={handleContent(info.row.original)}
                                arrow={false}
                                trigger="click"
                            >
                                <div style={{ cursor: 'pointer' }} className={styles.three_dots}>{three_dots}</div>
                            </Popover>
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
        [openRowId, selectedRow]
    );

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '42px' }}>
                <div className={styles.table_title}>Sifarişlər</div>
                <div className={styles.buttons_container}>
                    <div className={styles.download_btn}>{download}İxrac et</div>
                    <div className={styles.send_btn}>İstehsalçıya göndər</div>
                    <div className={styles.add_new_order_btn} onClick={() => { setOpenCreateNewOrderModal(true); setModalAction('create') }}>Yeni sifariş yarat</div>
                </div>
            </div>
            <div className={styles.table_container}>
                <Table
                    columns={allTableColumns}
                    tableData={data?.data ?? []}
                    paginationState={paginationState}
                    setPaginationState={setPaginationState}
                    setPaginationDetails={setPaginationDetails}
                // sorting={sorting}
                // setSorting={setSorting}
                // loading={isLoading}
                />
                <div className={styles.table_pagination}>
                    <div className={styles.pagination_details_txt}>
                        Axtarış nəticəsi: {data?.data?.length} məlumatın{" "}
                        {paginationRange.startOfRange} - {paginationRange.endOfRange}{" "}
                        aralığı
                    </div>
                    <div className={styles.pagination}>
                        <ReactPaginate
                            pageCount={Math.ceil(data?.data?.length / 10)}
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
                {openDeleteModal && <DeleteModal
                    openDeleteModal={openDeleteModal}
                    setOpenDeleteModal={setOpenDeleteModal}
                    selectedRow={selectedRow} />}
                {openAddNoteModal && <AddNoteModal
                    openAddNoteModal={openAddNoteModal}
                    setOpenAddNoteModal={setOpenAddNoteModal} />}
                {openViewNotesModal && <ViewNotesModal
                    openViewNotesModal={openViewNotesModal}
                    setOpenViewNotesModal={setOpenViewNotesModal} />}
                <CreateNewOrderModal
                    action={modalAction}
                    openCreateNewOrderModal={openCreateNewOrderModal}
                    setOpenCreateNewOrderModal={setOpenCreateNewOrderModal}
                    selectedRow={modalAction === 'edit' ? {
                        ...selectedRow,
                        date: selectedRow?.date ? dayjs(selectedRow.date, "YYYY-MM-DD HH:mm:ss") : null,
                    } : ''} />
            </div>
        </>
    )
}

export default OrdersPageContainer