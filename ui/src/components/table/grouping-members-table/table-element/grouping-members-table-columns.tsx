import { GroupingGroupMember } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';

const GroupingMembersTableColumns: ColumnDef<GroupingGroupMember>[] = [
    {
        header: 'Name',
        accessorKey: 'name'
    },
    {
        header: 'UH Number',
        accessorKey: 'uhUuid'
    },
    {
        header: 'UH Username',
        accessorKey: 'uid'
    }
    // {
    //     header: 'Basis?',
    //     accessorKey: 'whereListed',
    //     // TODO: When fetching only the include members, whereListed does not include their listing in Basis
    //     cell: ({ row }) => <>{row.getValue('whereListed') === 'Basis & Include'}</>
    // }
];

export default GroupingMembersTableColumns;
