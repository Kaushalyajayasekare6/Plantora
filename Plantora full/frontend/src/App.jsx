import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import ContactUs from './pages/Contact/contactUs'
import ProductOverView from './pages/ProductOverView/ProductOverView'
import AdminPage from './pages/adminpage'
import HomePage from './pages/Home/HomePage'
import ProductsPage from "./pages/Products/ProductsPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";


function CheckoutPlaceholder() {
  return (
    <section className="container">
      <h1>Checkout</h1>
      <p>(Placeholder — build later)</p>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
          <Route path="/contactUs" element={<ContactUs/>} />
          <Route path="/productoverview" element={<ProductOverView/>} />
          
          <Route path="/admin/*" element={<AdminPage/>} />
          <Route path="/home" element={<HomePage/>} />
        <Route path="/products" element={<ProductsPage/>} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="/productoverview/*" element={<Navigate to="/productoverview" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
