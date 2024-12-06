import { Line, Bar, Pie, Radar, Doughnut } from "react-chartjs-2";
import "chart.js"

interface ChartCardProps {
  title: string;
  data: any;
  type: string
}

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
  
  // Register all necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    RadialLinearScale, // For Radar and Doughnut charts
    PointElement,
    LineElement,
    BarElement,
    ArcElement, // For Pie and Doughnut charts
    Title,
    Tooltip,
    Legend
);


export const ChartCard: React.FC<ChartCardProps> = ({ title, data, type }) => {
    const renderChart = () => {
        switch (type) {
            case "line":
                return <Line data={data} />;
            case "bar":
                return <Bar data={data} />;
            case "pie":
                return <Pie data={data} />;
            case "radar":
                return <Radar data={data} />;
            case "doughnut":
                return <Doughnut data={data} />;
            default:
                return null;
        }
    };

    return (
        <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">{title}</h2>
            {renderChart()}
        </div>
    );
};
