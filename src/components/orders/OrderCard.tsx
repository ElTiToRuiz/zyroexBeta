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
};

interface OrderCardProps {
    order: Order;
    type?: string;
}

export const OrderCard = ({ order, type }: OrderCardProps) => {
    const [showModal, setShowModal] = useState(false);
    const [showUrgent, setShowUrgent] = useState(false);

    return (
        <>
            <div
                className={`cursor-pointer relative flex flex-row justify-between bg-white rounded-lg shadow hover:shadow-2xl transition-shadow duration-300 ease-in-out p-5 pt-6 space-y-4 ${
                order.urgent ? 'border-l-4 border-red-500' : ''}`}
                onClick={() => setShowModal(true)}
            >
                <div>
                    {/* Encabezado con información del cliente */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800">
                            {order.customerName}
                            </h3>
                            {type !== 'hidden' && (
                            <p className="text-sm text-gray-500 truncate">
                                {order.customerEmail}
                            </p>
                            )}
                        </div>
                    </div>
                    {/* Información adicional */}
                    <div className="flex justify-between text-sm text-gray-600">
                        <div>
                            {type !== 'hidden' && <p>ID: #{order.id.slice(0, 10)}...</p>}
                            <p>
                                Placed:{' '}
                                {new Date(order.createdAt).toLocaleDateString(undefined, {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {
                    type !== 'team' && <div className='flex flex-col items-end relative'>
                        {type !== 'hidden' && (
                            <span
                                className={`absolute text-sm font-medium py-2 px-3 bottom-0 rounded-full ${getStatusBGColor(
                                    order.status
                                )} text-gray-700`}
                            >

                                {order.status.toUpperCase()}
                            </span>
                        )}
                    </div>
                }
                

                {/* Indicador "URGENT" */}
                {order.urgent && <div 
                    className={`absolute ${type !== 'team' ? "-top-3" : "bottom-4" } right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl`}>
                        URGENT
                    </div>
                }

            </div>

            {showModal  && (
                <OrderModal
                    order={order}
                    close={() => setShowModal(false)}
                    openUrgent={() => setShowUrgent(true)}
                />
            )}
            {showUrgent && (
                <UrgentConfirmation close={() => setShowUrgent(false)} order={order} />
            )}

            
        </>
    );
};
