import GroupingMembersTable from '@/components/table/grouping-members-table/grouping-members-table';
import { getGroupingMembers, searchGroupingMembers } from '@/lib/fetchers';
import { GroupingGroupMember, GroupingMember, GroupingMembersTableSearchParams } from '@/lib/types';

const pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE as string;

const AllMembersTab = async ({
    params,
    searchParams
}: {
    params: { groupingPath: string };
    searchParams: GroupingMembersTableSearchParams;
}) => {
    const groupingPath = decodeURIComponent(params.groupingPath);
    const { page, sortBy, isAscending, search } = searchParams;

    // TODO: Remove mapSortBy after GROUPINGS-1840 is complete
    const mapSortBy = (sortBy: string) => {
        switch (sortBy) {
            case 'uid':
                return 'search_string0';
            case 'uhUuid':
                return 'subjectId';
            default:
                return sortBy;
        }
    };

    const groupingMembers: GroupingGroupMember[] | GroupingMember[] = search
        ? (await searchGroupingMembers(groupingPath, search)).members
        : (await getGroupingMembers(groupingPath, page, pageSize, mapSortBy(sortBy), isAscending)).members;

    return <GroupingMembersTable groupingMembers={groupingMembers} groupingPath={groupingPath} />;
};

export default AllMembersTab;
