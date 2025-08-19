






//--------------------------------------------------------------------------------------------------------------

import React, { createContext, useContext, useState } from "react";
import plant1 from "../assets/plants/plant1.jpg";
import plant2 from "../assets/plants/plant2.jpg";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([
    { id: "p1", title: "Artificial Plants", price: 900, qty: 1, img: plant1 },
    { id: "p2", title: "Artificial Plants", price: 900, qty: 1, img: plant2 },
  ]);

  const increment = (id) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it))
    );

  // If quantity goes to 0, remove the item entirely
  const decrement = (id) =>
    setItems((prev) => {
      const next = prev
        .map((it) => (it.id === id ? { ...it, qty: it.qty - 1 } : it))
        .filter((it) => it.qty > 0);
      return next;
    });

  const remove = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  return (
    <CartContext.Provider value={{ items, increment, decrement, remove }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);




