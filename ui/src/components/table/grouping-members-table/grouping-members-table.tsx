'use client';

import {
    flexRender,
    functionalUpdate,
    getCoreRowModel,
    getPaginationRowModel,
    PaginationState,
    Updater,
    useReactTable
} from '@tanstack/react-table';
import GroupingMembersTableColumns from './table-element/grouping-members-table-columns';
import { GroupingGroupMember } from '@/lib/types';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import SortArrow from '../table-element/sort-arrow';
import PaginationBar from '../table-element/pagination-bar';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const pageSize = parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE as string);

const GroupingMembersTable = ({ groupingMembers }: { groupingMembers: GroupingGroupMember[] }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const pagination: PaginationState = {
        pageIndex: Number(searchParams.get('page') ?? 1) - 1,
        pageSize
    };
    const onPaginationChange = (updater: Updater<PaginationState>) => {
        const updatedPagination = functionalUpdate(updater, pagination);
        router.push(pathname + '?' + createQueryString('page', (updatedPagination.pageIndex + 1).toString()));
    };

    const table = useReactTable({
        columns: GroupingMembersTableColumns,
        data: groupingMembers,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange,
        initialState: { pagination },
        state: { pagination },
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true
    });

    return (
        <>
            <Table className="table-fixed">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className={`
                                      ${!table.getIsAllColumnsVisible() && header.column.getIndex() > 0 ? 'w-2/3' : ''}
                                      ${header.column.getIndex() > 0 ? 'hidden sm:table-cell' : 'w-2/5 md:w-1/3'}
                                    `}
                                >
                                    <div className="flex items-center">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        <SortArrow direction={header.column.getIsSorted()} />
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell
                                    key={cell.id}
                                    className={`${cell.column.getIndex() > 0 ? 'hidden sm:table-cell' : ''}`}
                                >
                                    <div className="flex items-center px-5 py-1.5 overflow-hidden whitespace-nowrap">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <PaginationBar table={table} />
        </>
    );
};

export default GroupingMembersTable;
