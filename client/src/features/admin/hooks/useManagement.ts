import { useState } from "react";
import { useAdminEntitiesQuery } from "./useAdminQueries";
import { useUpdateEntityStatusMutation } from "./useAdminMutations";

export interface ManagementItem {
    _id: string;
    username?: string;
    teamName?: string;
    name?: string;
    avatar?: string;
    imageUrl?: string;
    isVerified?: boolean;
    isAccountVerified?: boolean;
    isBlocked?: boolean;
    [key: string]: unknown;
}

export const useManagement = (type: "User" | "Team" | "Organizer") => {
    const [search, setSearch] = useState("");
    const { data: response, isLoading } = useAdminEntitiesQuery(type, {
        page: 1,
        pageSize: 50,
        search,
        filter: "all",
    });

    const updateStatusMutation = useUpdateEntityStatusMutation();

    const updateStatus = (id: string, updates: Record<string, unknown>) => {
        updateStatusMutation.mutate({ type, id, updates });
    };

    return {
        data: (response?.data ?? []) as ManagementItem[],
        loading: isLoading,
        setSearch,
        updateStatus,
    };
};
