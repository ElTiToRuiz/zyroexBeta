import { useState } from "react";
import { Shipment } from "./ShipmentContainer";
import { correctStatus } from "./ShipmentList";
import { UrgentConfirmation } from "../orders/MakeUrgent";


// Utility function to format the date as a string
const formatDate = (date: Date): string => {
  const formattedDate = new Date(date);
  return formattedDate.toLocaleDateString(); // Customize your date format as needed
};

// Function to determine the color based on shipment status
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'text-yellow-500';
    case 'processing':
      return 'text-orange-500';
    case 'in_transit':
      return 'text-blue-500';
    case 'delivered':
      return 'text-green-500';
    case 'on_hold':
      return 'text-red-500';
    case 'shipped':
      return 'text-blue-500';
    default:
      return '';
  }
};

// The ShipmentDetails component
export const ShipmentDetails = ({ shipment }: { shipment: Shipment}) => {
  const [makeAsUrgent, setMakeAsUrgent] = useState(false);
  
  const accepts = ['pending'];



  return (
    <div className={`p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg ${shipment.urgent ? ' shadow-lg shadow-red-500' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray">Shipment Details</h2>
        {shipment.urgent ? (
          <h2 className="text-red-700 text-2xl font-bold">URGENT</h2>
        ) :  !shipment.urgent && accepts.includes(shipment.shipmentStatus) && (
          <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300"
            onClick={()=>{setMakeAsUrgent(true)}} 
          >
            Mark as Urgent
          </button>
        ) }
      </div>

      <div className="space-y-4">
        {/* Shipment Information */}
        <div className="flex justify-between">
          <p className="text-lg text-gray-700 font-medium"><strong>Shipment ID:</strong> {shipment.id}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg text-gray-700 font-medium"><strong>Tracking Number:</strong> {shipment.trackingNumber}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg text-gray-700 font-medium"><strong>Order:</strong> {shipment.orderId}</p>
        </div>
        
        {/* Shipment Status */}
        <div className="flex justify-between">
          <p className="text-lg text-gray-700 font-medium">
            <span><strong>Status:</strong></span>
            <span className={`font-semibold text-lg ml-1 ${getStatusColor(shipment.shipmentStatus)}-500`}>
              {correctStatus(shipment.shipmentStatus)}
            </span>
          </p>
        </div>

        {/* Date Information */}
        <div className="flex justify-between">
          <p className="text-lg text-gray-700 font-medium"><strong>Order Date:</strong> {formatDate(shipment.orderDate)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg text-gray-700 font-medium"><strong>Estimated Delivery Date:</strong> {formatDate(shipment.previstedDeliveryDate)}</p>
        </div>

        {/* Customer Information */}
        <div className="flex justify-between">
          <p className="text-lg text-gray-700 font-medium"><strong>Customer Name:</strong> {shipment.clientName}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg text-gray-700 font-medium"><strong>Customer Email:</strong> {shipment.clientEmail}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg text-gray-700 font-medium"><strong>Customer Address:</strong> {shipment.clientAddress}</p>
        </div>

        {/* Additional Notes */}
        <div className="flex justify-between">
          <p className="text-lg text-gray-700 font-medium"><strong>Additional Notes:</strong> {shipment.additionalNotes || 'N/A'}</p>
        </div>
      </div>
      
      { makeAsUrgent && <UrgentConfirmation shipment={shipment} close={()=>setMakeAsUrgent(false)}/> }
    </div>
  );
};

