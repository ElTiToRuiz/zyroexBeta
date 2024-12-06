import { useEffect, useState } from 'react';
import { ShipmentList } from './ShipmentList';
import { ShipmentDetails } from './ShipmentDetails';
import { socket } from '../../services/sockets/socket';
import { mainEndpoint } from '../../utils/endpoints';

export interface Shipment {
    id: string;
    orderId: string;
    trackingNumber: string;
    shipmentStatus: string;
    orderDate: Date;
    previstedDeliveryDate: Date;
    clientName: string;
    clientEmail: string;
    clientAddress: string;
    additionalNotes: string;
    urgent: boolean;
}

const fetchDelivery = async () => {
    const ENDPOINT = `${mainEndpoint}/shipments`;
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    return data;
}

const sortShipment = (data: Shipment[]): Shipment[] => {
    const statusOrder: { [key: string]: number } = {
        pending: 0,
        processing: 1,
        in_transit: 2,
        shipped: 2,
        on_hold: 3,
        delivered: 4,
        cancelled: 5,
    };

    return [...data].sort((a: Shipment, b: Shipment) => {
        if (statusOrder[a.shipmentStatus] !== statusOrder[b.shipmentStatus]) return statusOrder[a.shipmentStatus] - statusOrder[b.shipmentStatus];
        if (a.urgent !== b.urgent) return a.urgent ? -1 : 1;
        return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
    });
}

export const ShipmentsPage = () => {
    const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [shipments, setShipments] = useState<Shipment[]>([]);
    

    useEffect(() => {
        fetchDelivery()
            .then(data => setShipments(sortShipment(data)))
            .catch(error => console.error(error))
    },[]);

    const handleNewShipment = (newShipment: Shipment) => {
        setShipments(sortShipment([...shipments, newShipment])); 
    }

    const handleShipmentChange = (updatedShipment: Shipment) => {
        if (!shipments || shipments.length === 0) return setShipments([updatedShipment]);
        const shipmentIndex = shipments.findIndex(shipment => shipment.id === updatedShipment.id);
        if (shipmentIndex === -1) return;
        const updatedShipments = shipments.map((shipment, index) => index === shipmentIndex ? updatedShipment : shipment);
        setShipments(sortShipment(updatedShipments));
    };

    useEffect(() => {
        const handleNewShipmentEvent = (newShipment: Shipment) => handleNewShipment(newShipment);
        const handleShipmentChangeEvent = (updatedShipment: Shipment) => handleShipmentChange(updatedShipment);
        socket.on('new-shipment', handleNewShipmentEvent);
        socket.on('update-shipment', handleShipmentChangeEvent);
        return () => {
            socket.off('new-shipment', handleNewShipmentEvent);
            socket.off('update-shipment', handleShipmentChangeEvent);
        }
    }, [shipments]);


    // Handle selecting a shipment to view details
    const handleSelectShipment = (id: string) => {
        setSelectedShipment(id);
        setShowForm(false);
    };


    // Handle going back to the list of shipments
    const handleBackToList = () => {
        setSelectedShipment(null);
        setShowForm(false);
    };


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Shipments Management</h1>

            {/* Show the shipment list if no shipment is selected */}
            {!selectedShipment && !showForm && shipments && (
                <div>
                    <ShipmentList shipments={shipments} onSelect={handleSelectShipment}/>
                </div>
            )}

            {/* Show shipment details if a shipment is selected */}
            {selectedShipment && !showForm && (
                <div>
                    <button
                        onClick={handleBackToList}
                        className="mb-4 bg-gray-500 text-white py-2 px-4 rounded-xl"
                    >
                        Back to List
                    </button>
                    {shipments && shipments
                        .filter(shipment => shipment.id === selectedShipment)
                        .map((shipment) => (
                            <ShipmentDetails key={shipment.id} shipment={shipment} />
                    ))}
                </div>
            )}
        </div>
    );
};