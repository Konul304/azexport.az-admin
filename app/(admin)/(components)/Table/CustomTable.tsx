"use client";

import React, { useEffect } from "react";
import {
    flexRender,
    HeaderGroup,
    Row,
    RowData,
    Table,
} from "@tanstack/react-table";
// import { defaultSort, downArrow, upArrow } from "@/public/icons";
import styles from "@/styles/componentStyles/Table.module.scss";
// import TableLoader from "./TableLoader";

type TableGroup = "center" | "left" | "right";

function getTableHeaderGroups<T extends RowData>(
    table: Table<T>,
    tg?: TableGroup
): [HeaderGroup<T>[], HeaderGroup<T>[]] {
    if (tg === "left") {
        return [table.getLeftHeaderGroups(), table.getLeftFooterGroups()];
    }

    if (tg === "right") {
        return [table.getRightHeaderGroups(), table.getRightFooterGroups()];
    }

    if (tg === "center") {
        return [table.getCenterHeaderGroups(), table.getCenterFooterGroups()];
    }

    return [table.getHeaderGroups(), table.getFooterGroups()];
}

function getRowGroup<T extends RowData>(row: Row<T>, tg?: TableGroup) {
    if (tg === "left") return row.getLeftVisibleCells();
    if (tg === "right") return row.getRightVisibleCells();
    if (tg === "center") return row.getCenterVisibleCells();
    return row.getVisibleCells();
}

type Props<T extends RowData> = {
    table: Table<T>;
    tableGroup?: TableGroup;
    className?: string;
    scrollable?: boolean;
    fetchMoreOnBottomReached?: any;
    loading?: boolean;
};

export function CustomTable<T extends RowData>({
    table,
    tableGroup,
    className,
    fetchMoreOnBottomReached,
    scrollable,
    loading,
}: Props<T>) {
    const [headerGroups, footerGroup] = getTableHeaderGroups(table, tableGroup);
    const tableContainerRef = React.useRef<HTMLDivElement>(null);





    useEffect(() => {
        if (scrollable) fetchMoreOnBottomReached(tableContainerRef.current);
    }, [fetchMoreOnBottomReached, scrollable]);

    return (
        <div
            className={`${styles.table_container} ${className}`}
            onScroll={(e) => {
                if (scrollable) fetchMoreOnBottomReached(e.target as HTMLDivElement);
            }}
        >
            <table className={styles.table}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header: any) => {
                                return (
                                    <th
                                        className="relative"
                                        key={header.id}
                                        style={{
                                            width: "fit-content",
                                        }}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <>
                                                <div className={styles.table_header}>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}{" "}
                                                    {/* <button
                                                        onClick={header.column.getToggleSortingHandler()}
                                                        className={`${styles.table_sort_btn} ${header.column.getCanSort()
                                                                ? "cursor-pointer select-none"
                                                                : ""
                                                            }`}
                                                    >
                                                        {header.column.id === "button"
                                                            ? null
                                                            : {
                                                                asc: upArrow,
                                                                desc: downArrow,
                                                            }[header.column.getIsSorted() as string] ??
                                                            defaultSort}
                                                    </button> */}
                                                </div>
                                            </>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {/* {loading ? (
            <tr className={styles.loading}>
              <td colSpan={headerGroups[0].headers.length}>
                <TableLoader />
              </td>
            </tr>
          ) : ( */}
                    {table?.getRowModel().rows.map((row: any) => (
                        <tr key={row.id}>
                            {getRowGroup(row, tableGroup).map((cell: any) => (
                                <td
                                    key={cell.id}
                                    style={{
                                        width: "fit-content",
                                    }}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {/* )} */}
                </tbody>
            </table>
        </div>
    );
}

export default CustomTable;
