import React, { useState } from "react";
import styles from "./ProductsPage.module.css";
import ProductCard from "../../components/ProductCard";
import plantImg from "../../assets/images.png"; // sample image
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const ProductsPage = () => {
  const products = [
    { id: 1, title: "Snake Plant", price: "LKR 2500.00", category: "Natural", img: plantImg },
    { id: 2, title: "Peace Lily", price: "LKR 3000.00", category: "Natural", img: plantImg },
    { id: 3, title: "Artificial Fern", price: "LKR 1800.00", category: "Artificial", img: plantImg },
    { id: 4, title: "Artificial Bamboo", price: "LKR 2200.00", category: "Artificial", img: plantImg },
    { id: 5, title: "Aloe Vera", price: "LKR 2000.00", category: "Natural", img: plantImg },
    { id: 6, title: "Artificial Orchid", price: "LKR 2700.00", category: "Artificial", img: plantImg },
    { id: 7, title: "Money Plant", price: "LKR 1900.00", category: "Natural", img: plantImg },
    { id: 8, title: "Artificial Palm", price: "LKR 3500.00", category: "Artificial", img: plantImg },
    { id: 9, title: "Ceramic Pot", price: "LKR 1200.00", category: "Plant Accessories", img: plantImg },
    { id: 10, title: "Watering Can", price: "LKR 1500.00", category: "Plant Accessories", img: plantImg },
    { id: 11, title: "Soil Pack", price: "LKR 800.00", category: "Plant Accessories", img: plantImg },
    { id: 12, title: "Fertilizer Spray", price: "LKR 950.00", category: "Plant Accessories", img: plantImg }
  ];

  const [filter, setFilter] = useState("all");

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.category.toLowerCase() === filter.toLowerCase());

  return (
    <div className={styles.pageWrapper}>
      {/* ✅ Navbar at the top */}
      <Navbar />

      <div className={styles.productsPage}>
        <div className={styles.filterSection}>
          <select
            className={styles.filterDropdown}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Products</option>
            <option value="natural">Natural Plants</option>
            <option value="artificial">Artificial Plants</option>
            <option value="plant accessories">Plant Accessories</option>
          </select>
        </div>

        <div className={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
