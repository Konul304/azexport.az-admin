"use client";
import * as XLSX from "xlsx";
import React, { useEffect, useMemo, useState } from 'react';
import styles from "@/styles/componentStyles/OrdersPageContainer.module.scss";
import Table from './Table/Table';
import { delete_icon, download, edit, infoArrow, note, search, tableNextArrow, tablePrevArrow, toggleStatusArrow } from '@/public/icons';
import PlatformInfoModal from './PlatformInfoModal';
import DeleteModal from './Common/DeleteModal';
import AddNoteModal from './Common/AddNoteModal';
import { ColumnDef, PaginationState } from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import { FilterFields, Pagination, SearchState } from '../../(store)/storeInterface';
import ReactPaginate from 'react-paginate';
import CreateNewOrderModal from './CreateNewOrderModal';
import { getFilteredOrders, putOrder } from '../../(api)/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import store from '@/app/(store)/store';
import { setOrders } from '@/app/(store)/(slices)/ordersSlice';
import { TreeSelect } from 'antd';
import SendToManufacturerModal from './SendToManufacturerModal';


const OrdersPageContainer = () => {
    const client = useQueryClient();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [noMatchingData, setNoMatchingData] = useState<boolean>(false);
    const [openRowId, setOpenRowId] = useState<number | null>(null);
    const [selectedRow, setSelectedRow] = useState<any | null>(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
    const [openSendModal, setOpenSendModal] = useState(false);
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
    const filters = useSelector(
        (store: { filterFields: FilterFields }) => store.filterFields
    );

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

    const { data, refetch } = useQuery(
        ["filtered-orders", filters],
        async () => await getFilteredOrders(filters),
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            notifyOnChangeProps: 'all',
        }
    );

    const toggleSelectAll = (isChecked: boolean) => {
        if (isChecked) {
            const allIds = data?.data?.data?.map((row: any) => row.id) ?? [];
            setSelectedIds(allIds);
        } else {
            setSelectedIds([]);
        }
    };

    const toggleRowSelection = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const toggleStatus = async (row: any) => {
        const data = {
            status: row?.status === 0 ? 1 : 0
        }
        try {
            const res = await putOrder(row?.id, data)
            client.invalidateQueries(["filtered-orders"]);
        } catch (error: any) {
            console.log(error)
        }
    }

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

    useEffect(() => {
        if (data?.data?.data && Array.isArray(data?.data?.data)) {
            store.dispatch(setOrders(data.data?.data));
        }
    }, [data]);

    const allTableColumns: ColumnDef<any>[] = useMemo(
        () => [
            {
                accessorFn: (row: any) => row?.id,
                id: "id",
                header: (cell: any) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input type='checkbox'
                            checked={
                                data?.data?.data?.length > 0 &&
                                selectedIds.length === data?.data?.data?.length
                            }
                            onChange={(e) => toggleSelectAll(e.target.checked)} />
                        <div>Sifariş NO</div>
                    </div>
                ),
                cell: (info: any) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input type='checkbox'
                            checked={selectedIds.includes(info.getValue())}
                            onChange={() => toggleRowSelection(info.getValue())} />
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
                accessorFn: (row: any) => row?.status,
                id: "status",
                header: "Sifarişin statusu",
                cell: (info: any) =>
                    <div className={getStatusStyles(info.getValue())}>
                        {info.getValue() === 0 ?
                            <div className={styles.waiting}>Gözlənilir
                                <div onClick={() => toggleStatus(info?.row?.original)}>{toggleStatusArrow}</div>
                            </div> :
                            <div className={styles.sent}>Göndərildi
                                <div onClick={() => toggleStatus(info?.row?.original)}>{toggleStatusArrow}</div>
                            </div>}
                    </div>,
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
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={() => { setSelectedRow(info.row.original); setOpenAddNoteModal(true) }}
                                className={styles.three_dots}>
                                {note}
                            </div>
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
        [openRowId, selectedRow, data, selectedIds]
    );

    const exportToExcel = () => {
        console.log('called')
        const worksheet = XLSX.utils.json_to_sheet(data?.data?.data); // Convert data to worksheet
        const workbook = XLSX.utils.book_new(); // Create a new workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); // Append worksheet
        XLSX.writeFile(workbook, "table_data.xlsx"); // Save the file
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '42px' }}>
                <div className={styles.table_title}>Sifarişlər</div>
                <div className={styles.buttons_container}>
                    <div className={styles.download_btn} onClick={exportToExcel}>{download}İxrac et</div>
                    <div className={styles.send_btn} onClick={() => setOpenSendModal(true)}>İstehsalçıya göndər</div>
                    <div className={styles.add_new_order_btn} onClick={() => { setOpenCreateNewOrderModal(true); setModalAction('create') }}>Yeni sifariş yarat</div>
                </div>
            </div>
            {noMatchingData ? <div className={styles.noData}>Məlumat tapılmadı</div> :
                <div className={styles.table_container}>
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
                    {openDeleteModal && <DeleteModal
                        openDeleteModal={openDeleteModal}
                        setOpenDeleteModal={setOpenDeleteModal}
                        selectedRow={selectedRow} />}
                    {openAddNoteModal && <AddNoteModal
                        selectedRow={selectedRow}
                        openAddNoteModal={openAddNoteModal}
                        setOpenAddNoteModal={setOpenAddNoteModal} />}
                    <CreateNewOrderModal
                        action={modalAction}
                        openCreateNewOrderModal={openCreateNewOrderModal}
                        setOpenCreateNewOrderModal={setOpenCreateNewOrderModal}
                        selectedRow={modalAction === 'edit' ? {
                            ...selectedRow,
                            date: selectedRow?.date ? dayjs(selectedRow.date, "YYYY-MM-DD HH:mm:ss") : null,
                        } : ''} />
                    <SendToManufacturerModal
                        openSendModal={openSendModal}
                        setOpenSendModal={setOpenSendModal}
                        selectedIds={selectedIds} />
                </div>}

        </>
    )
}

export default OrdersPageContainer