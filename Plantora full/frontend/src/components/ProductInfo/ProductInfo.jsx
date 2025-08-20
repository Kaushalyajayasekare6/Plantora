import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { productAPI } from '../../services/api';
import styles from './ProductInfo.module.css';
import plantImage from '../../assets/images/plant.png';

const ProductInfo = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { productId } = useParams();
  
  // Get product from navigation state, or use productId to fetch, or use default
  const getInitialProduct = () => {
    if (state?.product) {
      return state.product;
    }
    // If we have productId but no state, we'll need to fetch the product
    // For now, return a default structure
    return {
      id: productId || 1,
      name: "Loading...",
      price: 0.00,
      rating: 5,
      description: "Loading product details...",
      inStock: true,
      image: plantImage
    };
  };

  const [productData, setProductData] = useState(getInitialProduct());
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch product if we only have productId
  React.useEffect(() => {
    if (!state?.product && productId) {
      fetchProductById(productId);
    }
  }, [productId, state]);

  const fetchProductById = async (id) => {
    setLoading(true);
    try {
      const data = await productAPI.getProductInfo(id);
      
      // Transform backend data to frontend format
      const transformedProduct = {
        ...data,
        id: data._id || data.productId,
        name: data.name,
        image: data.images && data.images.length > 0 
          ? `http://localhost:5000${data.images[0]}` 
          : plantImage,
        rating: data.rating || 4.5,
        price: data.price,
        inStock: data.isAvailable !== false,
        description: data.description || 'No description available',
        category: data.category || 'Indoor Plants'
      };
      
      setProductData(transformedProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const product = productData;

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

  // Get the image URL - handle different property names and ensure full URL
  const getImageUrl = () => {
    let imageUrl = product.image || product.img;
    
    if (!imageUrl) {
      return plantImage;
    }
    
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // If it starts with /, it's a relative path from server
    if (imageUrl.startsWith('/')) {
      return `http://localhost:5000${imageUrl}`;
    }
    
    return imageUrl;
  };

  if (loading) {
    return <div className={styles.loading}>Loading product details...</div>;
  }

  return (
    <div className={styles.productContainer}>
      <div className={styles.imageContainer}>
        <img 
          src={getImageUrl()} 
          alt={product.name} 
          className={styles.productImage}
          onError={(e) => {
            // Fallback if image fails to load
            e.target.src = plantImage;
          }}
        />
      </div>
      
      <div className={styles.productDetails}>
        {/* Rating Stars */}
        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`${styles.star} ${i < (product.rating || 5) ? styles.filled : ''}`}
            >
              ★
            </span>
          ))}
          <span className={styles.ratingText}>({product.rating || 5})</span>
        </div>

        <h1 className={styles.productTitle}>{product.name || product.title}</h1>
        
        {/* Category */}
        {product.category && (
          <div className={styles.category}>
            Category: {product.category}
          </div>
        )}
        
        <div className={styles.price}>LKR {product.price.toFixed(2)}</div>
        
        <div className={styles.stock}>
          <span className={product.inStock ? styles.inStock : styles.outOfStock}>
            {product.inStock ? '✓ In stock' : '✗ Out of stock'}
          </span>
        </div>
        
        {/* Additional product details */}
        {product.dimensions && (
          <div className={styles.dimensions}>
            <strong>Dimensions:</strong> {product.dimensions}
          </div>
        )}
        
        {product.reviews && (
          <div className={styles.reviewCount}>
            {product.reviews} customer reviews
          </div>
        )}
        
        <div className={styles.description}>
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
        
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