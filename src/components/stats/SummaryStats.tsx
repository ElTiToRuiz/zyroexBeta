import React from "react";

interface SummaryStatsProps {
  stats: { label: string; value: string | number; color?: string }[];
}

export const SummaryStats: React.FC<SummaryStatsProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
                <div key={index} className={`bg-white p-6 rounded-lg shadow border-l-4 border-${stat.color || "blue"}-500`}>
                <h3 className="text-lg font-medium text-gray-700">{stat.label}</h3>
                <p className={`text-2xl font-bold text-${stat.color || "blue"}-600`}>{stat.value }</p>
                </div>
            ))}
        </div>
    );
};
