import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/productoverview/${product.id}`, { 
      state: { 
        product: {
          ...product,
          category: 'Indoor Plants', // Add additional product details
          inStock: true,
          reviews: 24,
          dimensions: '12" x 12" x 36"'
        }
      } 
    });
  };

  return (
    <div className="plant-card" onClick={handleClick}>
      <img src={product.image} alt={product.name} />
      <div className="plant-info">
        <h3>{product.name}</h3>
        <StarRating rating={product.rating} />
        <span className="price">${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ProductCard;