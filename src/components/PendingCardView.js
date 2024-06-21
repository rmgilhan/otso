import { Container, Row, Col, Button, Form } from 'react-bootstrap';

export default function PendingCardView({pendingDatas, cancelOrder}){
	return (
		<Container className="mt-4">
		    <Row>
		        <Col md={2}></Col>
                <Col md={8}>
		            <Row className="mt-5 mb-8">
		                <Col md={2}></Col>
                        <Col md={8} className="border border-2 bg-light text-success rounded-3">
		                    <h4 className="text-center mt-4 mb-5">Order Status</h4>
		                    {pendingDatas.length > 0 ? (
		                        pendingDatas.map(item => (
		                            <Row key={item.orderedOn} className="align-items-center my-2 border-bottom ms-3">
		                                <Col md={1} x={12} className="text-center"></Col>
		                                <Col md={10} x={12}>
		                                	<p className="fw-normal"><span className="fw-bolder pe-2">Order ID:</span> {item._id}</p>
		                                	{item.productsOrdered.map((orderProduct, index) => (
		                                        <div key={`${orderProduct._id}-${index}`} className="mb-3">
		                                            <h6>{orderProduct.productId.name}</h6>
		                                            <p className="d-inline">Quantity: {orderProduct.quantity}</p>
		                                            <p className="d-inline ms-5">Price: {orderProduct.subTotal}</p>
		                                        </div>
		                                    ))}
		                                    <p className="fw-bolder">Total: {parseFloat(item.totalPrice).toLocaleString()} Php</p>
		                                    <p className="fw-normal">Order date: {new Date(item.orderedOn).toLocaleString()}</p>

		                                    <Form.Group className="d-flex align-items-end mb-3">
		                                        <Button
		                                            variant="danger"
		                                            className="me-2"
		                                            disabled={item.status === 'Cancelled'}
		                                        >
		                                            {item.status}
		                                        </Button>
		                                        {item.status !== 'Cancelled' && (
		                                            <Button
		                                                variant="success"
		                                                className="me-2 accent"
		                                                onClick={() => cancelOrder(item._id, "Cancelled")}
		                                            >
		                                                Cancel Order
		                                            </Button>
		                                        )}
		                                    </Form.Group>
		                                </Col>
		                                <Col md={1}></Col>
		                            </Row>
		                        ))
		                    ) : (
		                    <h4 className="text-center text-danger">Pending order is empty.</h4>
		                    )}
		 
		                </Col>
		                <Col md={2}></Col>
		            </Row>
		        </Col>
		        <Col md={2}></Col>
		    </Row>
		</Container>
	)
}