import { Shipment } from "./ShipmentContainer";
import { getStatusColor } from "./ShipmentDetails";

interface ShipmentListProps {
  shipments: Shipment[];
  onSelect: (id: string) => void;
}

export const correctStatus = (status: string): string => {
	switch (status) {
		case 'pending':
			return 'Pending'
		case 'processing':
			return 'Processing';
		case 'in_transit':
			return 'In Transit';
		case 'shipped':
			return 'In Transit';
		case 'delivered':
			return 'Delivered';
		case 'on_hold':
			return 'On Hold';
		case 'cancelled':
			return 'Cancelled';
		default:
			return 'Unknown';
	}
}




export const ShipmentList: React.FC<ShipmentListProps> = ({ shipments, onSelect }) => {
	return (
		<div className="overflow-x-auto mt-6">
		  <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
			<thead>
			  <tr className="bg-gray-200 text-gray-800 text-sm">
				<th className="px-6 py-3 font-semibold text-left">Shipment ID</th>
				<th className="px-6 py-3 font-semibold text-left">Order ID</th>
				<th className="px-6 py-3 font-semibold text-left">Tracking Number</th>
				<th className="px-6 py-3 font-semibold text-left">Status</th>
				<th className="px-6 py-3 font-semibold text-left">Order Date</th>
				<th className="px-6 py-3 font-semibold text-left">Estimated Delivery Date</th>
				<th className="px-6 py-3 font-semibold text-left">Client Name</th>
				<th className="px-6 py-3 font-semibold text-left">Additional Notes</th>
			  </tr>
			</thead>
			<tbody>
			  {shipments.map((shipment) => (
				<tr 
					key={shipment.id} 
					className={`border-b cursor-pointer ${shipment.urgent ? 'shadow-lg shadow-red-500 hover:bg-red-100 hover:shadow-red-700' : 'hover:bg-gray-100'}`} 
					onClick={() => onSelect(shipment.id)}
				>
					<td className="px-6 py-4 text-sm">{shipment.id}</td>
					<td className="px-6 py-4 text-sm">{shipment.orderId}</td>
					<td className="px-6 py-4 text-sm">{shipment.trackingNumber}</td>
					<td className={`px-6 py-4 text-sm font-semibold ${getStatusColor(shipment.shipmentStatus)}`}>
						{correctStatus(shipment.shipmentStatus)}
					</td>
					<td className="px-6 py-4 text-sm">{new Date(shipment.orderDate).toLocaleDateString()}</td>
					<td className="px-6 py-4 text-sm">{new Date(shipment.previstedDeliveryDate).toLocaleDateString()}</td>
					<td className="px-6 py-4 text-sm">{shipment.clientName}</td>
					<td>
						{
							shipment.urgent && 
							<h3 className="px-6 pt-2 pb-1 text-2xl font-semibold text-red-700">URGENT</h3>
						}
							<p className="px-6 pb-2 text-sm truncate">{shipment.additionalNotes || 'N/A'}</p>
					</td>
				</tr>
			  ))}
			</tbody>
		  </table>
		</div>
	  );
	};
