import { Card, Button, Modal } from 'react-bootstrap';
import { useState, useContext } from 'react';
import AddToCart from './AddToCart';
import ProductView from './ProductView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../UserContext';
import './style.css';

// Function to dynamically load the image
const getImagePath = (id) => {
  const extensions = ['jpg', 'png', 'webp'];
  for (const ext of extensions) {
    try {
      return require(`../images/${id}.${ext}`);
    } catch (e) {
      // Continue to the next extension if not found
      continue;
    }
  }
  // Fallback image if none found
  return require(`../images/fallback.jpg`);
};

export default function ProductCard({ productProp }) {
  const { user } = useContext(UserContext);
  const { _id, name, description, price } = productProp;

  const quantity = 10;
  const [addToCart, setAddToCart] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (product) => {
    setAddToCart(product);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const imagePath = getImagePath(_id);

  return (
    <>
      <Card
        id="productComponent"
        style={{
          backgroundImage: `url(${imagePath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        className="ms-5 p-1 mt-1 img-fluid bg-light fixed-dimension"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && (
          <Card.Body
            id={_id}
            style={{ backgroundColor: 'rgba(8, 8, 8, 0.7)' }}
          >
            <Card.Title className="accent card-font">{name}</Card.Title>
            <Card.Text className="text-light text-center">Price: {price} Php</Card.Text>
            <Card.Text className="text-light text-center">Quantity: {quantity}</Card.Text>
            <Button onClick={() => handleAddToCart(productProp)} className="third second ms-2">
              Add To Cart <FontAwesomeIcon icon={faShoppingCart} className="yellow-icon" />
            </Button>
          </Card.Body>
        )}
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        {user.id !== null && !user.isAdmin ? (
          <AddToCart
            addToCartProduct={addToCart}
            handleClose={handleClose}
            qtyOnHand={quantity}
            showModal={showModal}
          />
        ) : (
          <ProductView
            productview={addToCart}
            handleClose={handleClose}
            qtyOnHand={quantity}
          />
        )}
      </Modal>
    </>
  );
}
