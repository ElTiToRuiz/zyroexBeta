import { User } from "../../utils/types";
import { useEffect, useState } from "react";

interface TeamStatsProps {
    members: User[];
}

export const TeamStats = ({ members }: TeamStatsProps) => {
    const [totalMembers, setTotalMembers] = useState(0);
    const [rolesCount, setRolesCount] = useState<Record<string, number>>({});

    useEffect(() => {
        // Calculate total members
        setTotalMembers(members.length);

        // Calculate roles count
        const roles = members.reduce((acc: Record<string, number>, member: User) => {
            acc[member.role] = (acc[member.role] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        setRolesCount(roles);
    }, [members]);

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 mt-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Team Statistics</h3>

            {/* Total Members */}
            <div className="flex justify-between items-center mb-4">
                <div className="text-gray-600">Total Members</div>
                <div className="text-xl font-bold text-gray-900">{totalMembers}</div>
            </div>

            {/* Roles Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(rolesCount).map(([role, count]) => (
                    <div key={role} className="px-2 py-2 bg-gray-100 rounded-lg">
                        <div className="text-xl font-semibold text-gray-700 text-center">{role}</div>
                        <div className="text-xl font-bold text-gray-900 text-center">{count}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
