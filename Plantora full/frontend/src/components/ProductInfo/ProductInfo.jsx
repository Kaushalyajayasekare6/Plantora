import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ProductInfo.module.css';
import plantImage from '../../assets/images/plant.png';

const ProductInfo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  // Use passed product data or default values
  const product = state?.product || {
    id: 1,
    name: "Artificial Plants",
    price: 900.00,
    rating: 5,
    description: "Jorem ipsum dolor sit amet, consectetur adipiscing elit, turp euiputtes libero et velit interdum, ac aliquet odio mattis. Claus aptent taciti sociosot od iitora torquent per convulo nostro, per inceptos himeneeps.",
    inStock: true,
    image: plantImage
  };

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Create cart item with product and quantity
    const cartItem = {
      ...product,
      quantity: quantity,
      total: (product.price * quantity).toFixed(2)
    };

    // Navigate to cart page with the item
    navigate('/cart', { 
      state: { 
        cartItems: [cartItem] 
      } 
    });
  };

  const handleBuyNow = () => {
    // Create order item
    const orderItem = {
      ...product,
      quantity: quantity,
      total: (product.price * quantity).toFixed(2)
    };

    // Navigate to checkout page with the item
    navigate('/checkout', {
      state: {
        orderItems: [orderItem]
      }
    });
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  return (
    <div className={styles.productContainer}>
      <div className={styles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.name} 
          className={styles.productImage} 
        />
      </div>
      
      <div className={styles.productDetails}>
        {/* Rating Stars */}
        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`${styles.star} ${i < product.rating ? styles.filled : ''}`}
            >
              ★
            </span>
          ))}
        </div>

        <h1 className={styles.productTitle}>{product.name}</h1>
        <div className={styles.price}>LKR {product.price.toFixed(2)}</div>
        <div className={styles.stock}>
          {product.inStock ? 'In stock' : 'Out of stock'}
        </div>
        
        <p className={styles.description}>{product.description}</p>
        
        <div className={styles.quantitySelector}>
          <label>Quantity:</label>
          <div className={styles.quantityControls}>
            <button 
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className={styles.quantityButton}
            >
              -
            </button>
            <span className={styles.quantityDisplay}>{quantity}</span>
            <button 
              onClick={increaseQuantity}
              className={styles.quantityButton}
            >
              +
            </button>
          </div>
        </div>
        
        <div className={styles.buttonGroup}>
          <button 
            className={styles.addToCart}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            Add to cart
          </button>
          <button 
            className={styles.buyNow}
            onClick={handleBuyNow}
            disabled={!product.inStock}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
