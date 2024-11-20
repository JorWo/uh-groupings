import GroupingMembersTable from '@/components/table/grouping-members-table/grouping-members-table';
import { ownedGrouping, searchGroupingMembers } from '@/lib/fetchers';
import { GroupingGroupMember, GroupingMembersTableSearchParams } from '@/lib/types';

const pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE as string;

const IncludeTab = async ({
    params,
    searchParams
}: {
    params: { groupingPath: string };
    searchParams: GroupingMembersTableSearchParams;
}) => {
    const groupPath = `${decodeURIComponent(params.groupingPath)}:include`;
    const { page, sortBy, isAscending, search } = searchParams;

    let groupingMembers: GroupingGroupMember[];
    if (search) {
        groupingMembers = (await searchGroupingMembers(groupPath, search)).members;
    } else {
        groupingMembers = (await ownedGrouping([groupPath], page, pageSize, sortBy, isAscending)).groupingInclude
            .members;
    }

    return (
        <div className="p-3">
            <h1 className="font-bold text-[32px]">Include</h1>
            <GroupingMembersTable groupingMembers={groupingMembers} />
        </div>
    );
};

export default IncludeTab;
