'use client';

import {
    flexRender,
    functionalUpdate,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    Updater,
    useReactTable
} from '@tanstack/react-table';
import GroupingMembersTableColumns from './table-element/grouping-members-table-columns';
import { GroupingGroupMember, GroupingMember } from '@/lib/types';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import SortArrow from '../table-element/sort-arrow';
import PaginationBar from '../table-element/pagination-bar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import GlobalFilter from '../table-element/global-filter';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import { useQueryString } from '@/lib/hooks/use-query-string';
import { getGroupingMembersIsBasis, getGroupingMembersWhereListed, getNumberOfGroupingMembers } from '@/lib/actions';

const pageSize = parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE as string);

const GroupingMembersTable = ({
    groupingMembers,
    groupingPath,
    groupingExtension
}: {
    groupingMembers: GroupingGroupMember[] | GroupingMember[];
    groupingPath: string;
    groupingExtension?: string;
}) => {
    const router = useRouter();
    const { searchParams, createQueryString } = useQueryString();

    // Global Filter.
    const [globalFilter, setGlobalFilter] = useState(searchParams.get('search') ?? '');
    const onGlobalFilterChange = (updatedGlobalFilter: string) => {
        router.replace('?' + createQueryString(['search', updatedGlobalFilter]), { scroll: false });
    };

    // Pagination.
    const pagination: PaginationState = {
        pageIndex: Number(searchParams.get('page') ?? 1) - 1,
        pageSize
    };
    const onPaginationChange = (updater: Updater<PaginationState>) => {
        const updatedPagination = functionalUpdate(updater, pagination);
        router.replace('?' + createQueryString(['page', (updatedPagination.pageIndex + 1).toString()]), {
            scroll: false
        });
    };
    const [paginationClient, setPaginationClient] = useState({
        pageIndex: 0,
        pageSize
    });

    // Sorting.
    const sorting: SortingState = [
        { id: searchParams.get('sortBy') ?? 'name', desc: searchParams.get('isAscending') === 'false' }
    ];
    const onSortingChange = (updater: Updater<SortingState>) => {
        const updatedSorting = functionalUpdate(updater, sorting);
        const { id, desc } = updatedSorting[0];
        router.replace('?' + createQueryString(['sortBy', id], ['isAscending', String(!desc)]), { scroll: false });
    };
    const [sortingClient, setSortingClient] = useState<SortingState>([]);

    // Fetch isBasis or whereListed column.
    const uhUuids = groupingMembers.map((groupingMember) => groupingMember.uhUuid);
    const { data: groupingMembersIsBasis = groupingMembers, isPending: isBasisPending } = useQuery({
        staleTime: Infinity,
        enabled: !['basis', 'owners', undefined].includes(groupingExtension),
        queryKey: [`${groupingPath}:basis`, ...uhUuids],
        queryFn: () => getGroupingMembersIsBasis(groupingPath, uhUuids).then((res) => res.members)
    });
    const { data: groupingMembersWhereListed = groupingMembers, isPending: isWhereListedPending } = useQuery({
        enabled: !groupingExtension,
        queryKey: [groupingPath, ...uhUuids],
        queryFn: () => getGroupingMembersWhereListed(groupingPath, uhUuids).then((res) => res.members)
    });

    // Fetch number of grouping members.
    const groupPath = groupingExtension ? groupingPath + ':' + groupingExtension : groupingPath;
    const { data: count = Infinity, isPending: isCountPending } = useQuery({
        queryKey: [groupPath, 'count'],
        queryFn: () => getNumberOfGroupingMembers(groupPath)
    });

    const table = useReactTable({
        columns: GroupingMembersTableColumns(
            groupingExtension,
            !groupingExtension ? isWhereListedPending : isBasisPending
        ),
        data: !groupingExtension ? groupingMembersWhereListed : groupingMembersIsBasis,
        rowCount: globalFilter ? groupingMembers.length : count,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: globalFilter ? setPaginationClient : onPaginationChange,
        onSortingChange: globalFilter ? setSortingClient : onSortingChange,
        state: {
            pagination: globalFilter ? paginationClient : pagination,
            sorting: globalFilter ? sortingClient : sorting
        },
        manualPagination: !globalFilter,
        manualSorting: !globalFilter,
        manualFiltering: true,
        enableSortingRemoval: false
    });

    return (
        <div className="px-4 py-1">
            <div className="flex flex-col md:flex-row md:justify-between">
                <h1 className="flex font-bold text-[32px] capitalize ">
                    {groupingExtension ?? 'All Members'} {!isCountPending ? `(${count})` : <Spinner className="ml-2" />}
                </h1>
                <div className="md:w-60 lg:w-72">
                    <GlobalFilter
                        filter={globalFilter}
                        setFilter={setGlobalFilter}
                        onFilterChange={onGlobalFilterChange}
                    />
                </div>
            </div>
            <Table className="table-fixed">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    className={`
                                      ${!table.getIsAllColumnsVisible() && header.column.getIndex() > 0 ? 'w-1/3' : ''}
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
        </div>
    );
};

export default GroupingMembersTable;
