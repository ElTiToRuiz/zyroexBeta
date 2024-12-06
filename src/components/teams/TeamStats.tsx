import { User } from "../../context/authContext";


export const TeamStats = ({members}: {members:User[]}) => {

    const totalMembers = members.length;

    const rolesCount = members.reduce((acc: Record<string, number>, member: User) => {
        acc[member.role] = (acc[member.role] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Team Statistics</h3>

            {/* Total Members */}
            <div className="flex justify-between items-center mb-8">
                <span className="text-gray-600">Total Members</span>
                <span className="font-semibold text-gray-900">{totalMembers}</span>
            </div>

            {/* Roles Breakdown */}
            <div className="space-y-2">
                {Object.entries(rolesCount).map(([role, count]) => (
                <div key={role} className="flex justify-between items-center">
                    <span className="text-gray-600 capitalize">{role}</span>
                    <span className="font-semibold text-gray-900">{count}</span>
                </div>
                ))}
            </div>
        
        {/* Additional Stats - Active/In-Active or others */}
        {/* Add more stats if you have other conditions, such as user activity */}
        </div>
    );
};
