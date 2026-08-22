import { Loader2, SearchX, RotateCcw } from "lucide-react";
import { useGroupsContext } from "@/features/tournaments/context/TournamentGroupsContext";
import { GroupGridView } from "./groups/GroupGridView";
import { GroupDetailsView } from "./groups/GroupDetailsView";
import { GroupsGridDialogs } from "./groups/GroupsGridDialogs";

interface GroupsGridProps {
    roundId?: string;
    eventId?: string;
    search?: string;
    statusFilter?: string;
    sortBy?: string;
    onResetFilters?: () => void;
}

export const GroupsGrid = ({
    search,
    statusFilter,
    onResetFilters
}: GroupsGridProps) => {
    const {
        groups,
        isLoading,
        selectedGroupId,
        isFetching,
    } = useGroupsContext();

    if ((isLoading || isFetching) && groups.length === 0 && !selectedGroupId) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
            </div>
        );
    }

    if (!isLoading && !isFetching && groups.length === 0) {
        if (search || statusFilter) {
            return (
                <div className="flex flex-col h-64 items-center justify-center gap-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <SearchX className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold">No matches found</h3>
                        <p className="text-sm text-gray-400 max-w-xs mt-1">
                            We couldn't find any groups matching your current filters.
                        </p>
                    </div>
                    {onResetFilters && (
                        <button
                            onClick={onResetFilters}
                            className="flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors bg-purple-500/10 px-4 py-2 rounded-lg border border-purple-500/20"
                        >
                            <RotateCcw className="w-3 h-3" />
                            Clear Filters
                        </button>
                    )}
                </div>
            );
        }

        return (
            <div className="flex flex-col h-64 items-center justify-center gap-3 text-gray-500">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 opacity-20" />
                </div>
                <p className="text-sm">No groups found. Create groups to get started.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {selectedGroupId ? <GroupDetailsView /> : <GroupGridView />}
            <GroupsGridDialogs />
        </div>
    );
};
