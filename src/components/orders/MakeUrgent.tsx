import { useOrders } from "../../context/orderContext"
import { Order, Shipment } from "../../utils/types"

type UrgentConfirmationProp ={
    order?: Order
    shipment?: Shipment
    close: ()=>void
}


export const UrgentConfirmation = ({order, shipment, close}:UrgentConfirmationProp) => {
    
    const{makeOrderUrgent} = useOrders();

    const setUrgent = () => {
        order && makeOrderUrgent(order.id);
        shipment && makeOrderUrgent(shipment.orderId);
        close();
    }
    
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-semibold text-red-600">This action is irreversible</h2>
                <h3 className="text-2xl text-red-700 font-bold mt-2 mb-4">Are you sure you want to mark this shipment as urgent?</h3>

                <div className="flex justify-end mt-4 space-x-4">
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-300"
                        onClick={setUrgent}
                    >
                        Yes
                    </button>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-md transition-colors duration-300"
                        onClick={close}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}
  
  