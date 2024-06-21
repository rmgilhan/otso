import { useState } from 'react';
import { Container } from 'react-bootstrap';
import PendingCardView from './PendingCardView';
import Swal from 'sweetalert2';


export default function PendingOrder({ pendingData }) {
    
    const [pendingDatas, setPendingDatas] = useState(pendingData);

    const cancelOrder = async (orderId, status) => {
       
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/order/updateOrderStatus`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    orderId: orderId,
                    status: status
                })
            });

            await response.json();

            if (!response.ok) {
                Swal.fire({
                    title: "Unable to Cancel Order",
                    icon: 'error'
                });
                throw new Error('Failed to update status');
            } else {
                Swal.fire({
                    title: "Order Cancelled",
                    icon: 'success',
                    text: "Your order has been cancelled"
                });

                // Refresh order data after cancelling
                setPendingDatas((prevData) =>
                    prevData.filter((order) => order._id !== orderId)
                );
            }
        } catch (error) {
            console.error('Error cancelling order:', error);
            Swal.fire({
                title: "Something went wrong",
                icon: 'error',
            });
        }
    };

    return (
        <Container>
            <PendingCardView 
                pendingDatas={pendingDatas} 
                cancelOrder={cancelOrder}
            />
        </Container>
    );
}
