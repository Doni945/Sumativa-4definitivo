import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (producto) => {
    setCartItems((prevItems) => {
      if (prevItems.length > 0 && prevItems[0].location !== producto.location) {
        alert('No se pueden agregar productos de diferentes ubicaciones al carrito.');
        return prevItems;
      }

      const itemExists = prevItems.find((item) => item.id === producto.id);
      if (itemExists) {
        if (itemExists.quantity >= producto.availability) {
          alert('No se pueden agregar más productos de los disponibles.');
          return prevItems;
        }
        return prevItems.map((item) =>
          item.id === producto.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...producto, quantity: 1 }];
    });
  };

  const removeFromCart = (productoId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productoId));
  };

  const updateCartItemQuantity = (productoId, quantity) => {
    setCartItems((prevItems) => {
      const item = prevItems.find((item) => item.id === productoId);
      if (item) {
        if (quantity > item.availability) {
          alert('No se pueden agregar más productos de los disponibles.');
          return prevItems;
        }
        if (quantity <= 0) {
          return prevItems.filter((item) => item.id !== productoId);
        }
        return prevItems.map((item) =>
          item.id === productoId ? { ...item, quantity: parseInt(quantity, 10) } : item
        );
      }
      return prevItems;
    });
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};
