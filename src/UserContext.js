// UserContext.js
import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({ id: null, isAdmin: false });
  const [cartCount, setCartCount] = useState();

  const refreshCartCount = async () => {
    if (user.id && !user.isAdmin){
        try {
          const response = await fetch('https://ecom-backend-wxa3.onrender.com/b3/cart', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch cart data');
          }

          const data = await response.json();
          if (data.message === 'Your cart is empty.') {
            setCartCount(0); 
          }else{
            setCartCount(data.items.length); 
          }
          
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
    }else{
      console.log("You are not allowed to refresh Cart data.")
    }
  };

  const unsetUser = () => {
    setUser({ id: null, isAdmin: false });
    setCartCount(0);
    localStorage.clear();
  };

  useEffect(() => {
    if (user.id) {
      refreshCartCount();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, cartCount, setCartCount, refreshCartCount, unsetUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
