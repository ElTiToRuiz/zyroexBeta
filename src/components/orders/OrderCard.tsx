// import { useState } from 'react';
import { useState } from 'react';
import { OrderModal } from './OrderCardModal';
import { UrgentConfirmation } from './MakeUrgent';
import { Order } from '../../utils/types';


export const getStatusBGColor = (status: string) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-100';
        case 'processing':
            return 'bg-orange-100';
        case 'shipped':
            return 'bg-blue-100';
        case 'on_hold':
            return 'bg-red-100';
        case 'delivered':
            return 'bg-green-100';
        default:
            return 'bg-gray-100';
    }
}

export const OrderCard = ({ order, type }: { order: Order, type?: string }) => {
    const [showModal, setShowModal] = useState(false);
    const [showUrgent, setShowUrgent] = useState(false);

    return (
        <>        
            <div
                className={`cursor-pointer relative flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl max-h-[200px] transition-shadow duration-300 ease-in-out p-6 space-y-4 sm:max-h-[250px] lg:max-h-[300px] ${
                    order.urgent ? 'shadow-xl shadow-red-500' : ''
                }`}
                onClick={() => setShowModal(!showModal)}
            >
                {/* Header: Customer Information */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-semibold text-gray-900">{order.customerName}</h3>
                        <p
                            className={`${
                                type === 'hidden' ? 'text-xs' : 'text-sm'
                            } sm:overflow-x-hidden sm:w-11/12 text-gray-500`}
                        >
                            {type !== 'hidden' && order.customerEmail}
                        </p>
                    </div>
                    <div>
                        <span
                            className={`text-sm font-medium py-1 px-3 rounded-full ${type === 'hidden' ? 'hidden' : ''} ${getStatusBGColor(order.status)}`}
                        >
                            {order.status.toUpperCase()}
                        </span>
                    </div>
                </div>

                <div className="flex flex-row justify-between text-sm text-gray-600 space-y-1 pb-2 sm:space-y-0">
                    <div>
                        <p>{type !== 'hidden' && `ID: #${order.id.slice(0, 10)}...`}</p>
                        <p>Placed: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
                {order.urgent &&  (
                    <h1 className={`text-red-500 font-semibold absolute right-0 bottom-0 ${type !== 'hidden' ? 'text-2xl p-7' : 'text-md  pr-2 pb-1'}`}>URGENT</h1>
                )}
            </div>

            {showModal && <OrderModal order={order} close={() => setShowModal(false)}  openUrgent={()=>setShowUrgent(true)}/>}
            {showUrgent && <UrgentConfirmation close={() => setShowUrgent(false)} order={order}/>}
        </>
    );
};