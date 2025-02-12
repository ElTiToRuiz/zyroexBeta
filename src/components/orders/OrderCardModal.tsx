import { useEffect, useState } from 'react';
import { Order, Product } from '../../utils/types';
import { useOrders } from '../../context/orderContext';
import { useSettings } from '../../context/settingContext';

export type SpecialProduct = Product & { quantity: number, stock: number };

export const OrderModal = ({ order, close, openUrgent }: { order: Order, close: () => void, openUrgent: ()=>void}) => {
    const [orderStatus, setOrderStatus] = useState(order.status);
    const [products, setProducts] = useState<SpecialProduct[]>([]); 
    const { getProductsFromOrder, saveStatusChange } = useOrders();
    const urgentAcceptStatus = ['pending', 'processing'];
    const { currencySymbol } = useSettings();
    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrderStatus(event.target.value);
    };

    useEffect(() => { 
        const fetchProducts = async () => {
            const products = await getProductsFromOrder(order);
            setProducts(products as SpecialProduct[]);
        };
        fetchProducts();
    }, [order]);

    const saveChanges = () => {
        // Save changes to the order
        saveStatusChange({order, newValue: orderStatus});
        close();
    };

    const calculateTotal = () => order.products.reduce((acc, product) => acc + (product.quantity * product.product.price), 0);
    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className={`rounded-lg shadow-xl w-full md:w-1/2 p-6 space-y-4 max-h-[90vh] overflow-y-auto ${order.urgent ? 'border-4 border-red-600 bg-red-50' : 'bg-white'}`}>
                {/* Close Button */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">{order.customerName} Order</h2>
                    {order.urgent &&  <h1 className="text-red-500 font-semibold text-4xl mr-8">URGENT</h1>}
                    <button
                        onClick={()=>close()}
                        className="text-gray-500 hover:text-gray-700 font-semibold"
                    >
                        Close
                    </button>
                </div>

                {/* Customer Info */}
                <div>
                    <p className="text-lg font-semibold">Customer Info</p>
                    <p className="text-sm text-gray-500">{order.customerEmail}</p>
                    <p className="text-sm text-gray-500">{order.customerName}</p>
                    <p className="text-sm text-gray-500">{order.customerAddress}</p>
                </div>

                

                {/* Order Summary */}
                <div className="space-y-2">
                    <p className="text-lg font-semibold">Order Summary</p>
                    <div className="flex justify-between text-sm text-gray-800">
                        <span>Order ID</span>
                        <span className="text-gray-500">#{order.id}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-800">
                        <span>Status</span>
                        <div>
                            <select
                                value={orderStatus}
                                onChange={handleStatusChange}
                                className="py-1 px-3 border rounded-md"
                            >
                                <option value=""></option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="on_hold">On Hold</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>
                    
                </div>

                {/* Product List */}
                <div className="space-y-2">
                    <p className="text-lg font-semibold">Products</p>
                    <div className='pt-1 pb-2'>
                        {
                            products.map((product: SpecialProduct) => (
                                <div key={product.id} className="flex justify-between text-sm text-gray-800">
                                    <span >
                                        {
                                            currencySymbol === '€' ? `${product.quantity} x ${product.name} - ${product.price} ${currencySymbol}` :
                                            `${product.quantity} x ${product.name} - ${currencySymbol}${product.price}`
                                        }
                                    </span>
                                    <span className='text-gray-400'> Avalaible in Stock - {product.stock} </span>
                                    <span className="text-gray-500">
                                        {
                                            currencySymbol === '€' ? `${(product.quantity * product.price).toFixed(2)} ${currencySymbol}` :
                                            `${currencySymbol}${(product.quantity * product.price).toFixed(2)}`
                                        }
                                    </span>
                                </div>
                            ))
                        } 
                    </div>
                    <div className="flex justify-between text-sm text-gray-800 pt-2 border-t-2">
                        <span className='text-3xl'>Total</span>
                        <span className="text-gray-900 text-3xl font-semibold">
                            {
                                currencySymbol === '€' ? `${calculateTotal().toFixed(2)} ${currencySymbol}` :
                                `${currencySymbol}${calculateTotal().toFixed(2)}`

                            }
                            
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center mt-4 gap-10">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg  hover:bg-blue-700"
                        onClick={saveChanges}
                    >
                        Save Changes
                    </button>
                    {
                        !order.urgent && urgentAcceptStatus.includes(orderStatus) && (
                            <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
                                onClick={openUrgent}
                            >
                                Mark as Urgent
                            </button>
                        )                
                    }
                </div>
            </div>
        </div>
    );
};

