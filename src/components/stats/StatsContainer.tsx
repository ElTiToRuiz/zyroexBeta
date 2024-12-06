import { useEffect, useState } from "react";
// import { Filters } from "./StatsFilters";
import { SummaryStats } from "./SummaryStats";
import { ChartCard } from "./ChartCard";
import { OrdersProvider, useOrders } from "../../context/orderContext";
import { topProductChartConfig } from "../../utils/charts/topProducts";
import { orderTrendsChartConfig } from "../../utils/charts/orderTrends";
import { orderStateChartConfig } from "../../utils/charts/orderState";
import { teamMembersChartConfig } from "../../utils/charts/teamMembers";
import { statsData } from "../../utils/charts/StatsData";
import { useSettings } from "../../context/settingContext";


export const Statistics = () => {
	return (
		<OrdersProvider>
			<StatisticsDashboard />
		</OrdersProvider>
	)
}


type StatsData = {
	labels: string[]
	data: number[]
}


const StatisticsDashboard = () => {
	const [totalRevenue, setTotalRevenue] = useState<number>(0);
	const [orderTrendsData, setOrderTrendsData] = useState<StatsData>({labels: [], data: []});
	const [topProducts, setTopProducts] = useState<StatsData>({labels: [], data: []});
	const [ordersState, setOrdersState] = useState<StatsData>({labels: [], data: []});
	const [teamMembers, setTeamMembers] = useState<StatsData>({labels: [], data: []});
	const {orders, getRevenue} = useOrders();
    const { getCurrencyChange } = useSettings();


	useEffect(() => {
		(async () => { 
			const data = statsData
			setOrderTrendsData({
				labels: data.totalOrdersEachWeek.labels,
				data: data.totalOrdersEachWeek.data,
			})
			setTopProducts({
				labels: data.topProducts.labels,
				data: data.topProducts.data,
			})
			setOrdersState({
				labels: data.orderStatus.labels,
				data: data.orderStatus.data,
			})
			setTeamMembers({
				labels: data.teamMembers.labels,
				data: data.teamMembers.data,
			})
		})()
	}, [])

	useEffect(() => {
		(async () => {
			const total = await getRevenue();
			setTotalRevenue(total);
		})()
	}, [orders])

	const STATSOrderTrendsData = orderTrendsChartConfig(orderTrendsData.labels, orderTrendsData.data);
	const STATSTopProducts = topProductChartConfig(topProducts.labels, topProducts.data);
	const STATSOrderState = orderStateChartConfig(ordersState.labels, ordersState.data);
	const STATSTeamMembers = teamMembersChartConfig(teamMembers.labels, teamMembers.data);
 
    const stats = [
      { label: "Total Orders", value: `${orders.length}`, color: "blue" },
      { label: "Total Revenue", value: getCurrencyChange({number: totalRevenue}), color: "green" },
      { label: "Top Product", value: `${topProducts.labels[0]}`, color: "yellow" },
    ];

    return (
		<div className="p-8 bg-gray-50 min-h-screen">
			<h1 className="text-3xl font-bold text-gray-800">Statistics Dashboard</h1>
			<p className="text-gray-600 mt-1 mb-10">Monitor key metrics and performance at a glance.</p>
			<div className="bg-yellow-100 p-4 rounded-lg mb-6">
				<h3 className="text-lg font-semibold text-yellow-800">
					Note: The data displayed is for demonstration purposes only and may not reflect actual statistics.
					<span className="block text-md text-gray-700 mt-2">
						For access to real-time data and full functionality, please <a href="mailto:ruizigor16@gmail.com" className="text-yellow-600 hover:underline">contact us</a>.
					</span>
				</h3>
			</div>
			{/* Summary Stats */}
			<SummaryStats stats={stats} />

			{/* Charts */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
				<ChartCard title="Order Trends" data={STATSOrderTrendsData} type="line" />
				<ChartCard title="Most Sales Products" data={STATSTopProducts} type="bar" />
				<ChartCard title="Team Members" data={STATSTeamMembers} type="radar" />
				<ChartCard title="Order State" data={STATSOrderState} type="doughnut" />
			</div>
		</div>
    );
};
