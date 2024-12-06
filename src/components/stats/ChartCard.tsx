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

const formatPercentage = (value: number, total: number) => {

    return ((value / total) * 100).toFixed(2) + '%';
};

export const ChartCard: React.FC<ChartCardProps> = ({ title, data, type} ) => {
    const renderChart = () => {
        switch (type) {
            case "line":
                return <Line data={data} options={{
                    responsive: true,
                    plugins: {
                        tooltip: {
                            enabled: true,
                            mode: "nearest",
                            intersect: false,
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            callbacks: {
                                title: (tooltipItem: any) => `Date: ${tooltipItem[0].label}`,
                                label: (tooltipItem: any) => `Value: ${tooltipItem.raw}`,
                            },
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: true,
                                color: "rgba(0, 0, 0, 0.1)",
                                lineWidth: 1,
                            },
                            ticks: {
                                font: {
                                    size: 12,
                                    family: "'Arial', sans-serif",
                                    weight: "bold",
                                },
                            },
                        },
                        y: {
                            grid: {
                                display: true,
                                color: "rgba(0, 0, 0, 0.1)",
                                lineWidth: 1,
                            },
                            ticks: {
                                font: {
                                    size: 12,
                                    family: "'Arial', sans-serif",
                                    weight: "bold",
                                },
                                maxTicksLimit: 5,
                            },
                        },
                    },
                    hover: {
                        mode: "nearest",
                        intersect: true,
                    },
                    elements: {
                        line: {
                            borderWidth: 4,
                            borderCapStyle: "round",
                        },
                        point: {
                            radius: 6,
                            hitRadius: 10,
                        },
                    },
                    animation: {
                        duration: 1200,
                        easing: "easeOutQuad",
                    },
                }}/>;
            case "bar":
                return <Bar data={data} options={{
                        responsive: true,
                        plugins: {
                            tooltip: {
                                enabled: true,
                                mode: "nearest",
                                intersect: false,
                                backgroundColor: "rgba(0, 0, 0, 0.7)",
                                callbacks: {
                                    title: (tooltipItem: any) => `Product: ${tooltipItem[0].label}`,
                                    label: (tooltipItem: any) => `Value: ${tooltipItem.raw}`,
                                },
                            },
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: true,
                                    color: "rgba(0, 0, 0, 0.1)",
                                    lineWidth: 1,
                                },
                                ticks: {
                                    font: {
                                        size: 12,
                                        family: "'Arial', sans-serif",
                                        weight: "bold",
                                    },
                                },
                            },
                            y: {
                                grid: {
                                    display: true,
                                    color: "rgba(0, 0, 0, 0.1)",
                                    lineWidth: 1,
                                },
                                ticks: {
                                    font: {
                                        size: 12,
                                        family: "'Arial', sans-serif",
                                        weight: "bold",
                                    },
                                    maxTicksLimit: 5,
                                },
                            },
                        },
                        hover: {
                            mode: "nearest",
                            intersect: true,
                        },
                        animation: {
                            duration: 1200,
                            easing: "easeOutQuad",
                        },
                    }}/>;
            case "pie":
                return <Pie data={data} />;
            case "radar":
                return <Radar data={data} options={{
                    responsive: true,
                    scales: {
                        r: {
                            beginAtZero: true,
                        }
                    }
                }}/>;                  
            case "doughnut":
                return <Doughnut data={data} options={{
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context: any) {
                                    let label = context.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed !== null) {
                                        label += context.parsed;
                                        const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
                                        label += ' (' + formatPercentage(context.parsed, sum(data.datasets[0].data)) + ')';
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }} />;
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