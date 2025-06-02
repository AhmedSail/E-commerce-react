import React, { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster } from "react-hot-toast";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const [tempAddress, setTempAddress] = useState("Main street, 0021");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const [model, setModel] = useState("cod");

  // Initialize login state based *only* on the "admin" flag in localStorage
  const [login, setLogin] = useState(() => {
    const isAdmin = localStorage.getItem("admin");
    try {
      const isLoggedIn = isAdmin === "true";
      return isLoggedIn;
    } catch (e) {
      console.error("Error reading 'admin' flag from localStorage:", e);
      localStorage.removeItem("admin");
      return false;
    }
  });

  // Initialize page state from localStorage, defaulting to 'home'
  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    // Optional: You might want to ensure that if 'admin' isn't true,
    // the page defaults to 'home' even if 'admin' was stored previously.
    const isAdmin = localStorage.getItem("admin") === "true";
    if (isAdmin && storedPage) {
      return storedPage;
    }
    return "home";
  });

  const [userCart, setUserCart] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [orderConfirm, setOrderConfirm] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      localStorage.removeItem("currentUser");
      return null;
    }
  });

  // Fetch products on initial load
  useEffect(() => {
    axios
      .get("http://localhost:3002/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Effect to load/clear user-specific data (cart, orders) when user changes
  useEffect(() => {
    if (user && user.email) {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || {};
      const currentUserData = storedUsers[user.email];
      if (currentUserData) {
        setUserCart(currentUserData.cart || []);
        setUserOrders(currentUserData.orders || []);
      } else {
        setUserCart([]);
        setUserOrders([]);
      }
    } else {
      setUserCart([]);
      setUserOrders([]);
    }
  }, [user]);

  // Persist user object to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  // Persist page state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("currentPage", page);
  }, [page]);

  const handleSetUser = useCallback((userData) => {
    setUser(userData);
  }, []);

  // Update setLogin to also manage the 'page' state and localStorage['admin']
  const handleSetLogin = useCallback(
    (isAdmin) => {
      setLogin(isAdmin);
      if (isAdmin) {
        localStorage.setItem("admin", "true");
        setPage("admin"); // Set page to admin on login
      } else {
        localStorage.removeItem("admin");
        setPage("home"); // Reset page to home on logout
        // Also remove user data on logout
        localStorage.removeItem("currentUser");
        setUser(null);
      }
    },
    [setLogin, setPage, setUser]
  ); // Include dependencies

  // Modify the logout function in NavbarAdmin to use the new handleSetLogin
  // Instead of directly manipulating state and localStorage there, call handleSetLogin(false)

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    navigate,
    setModel,
    model,
    login, // Reflects admin login status
    setLogin: handleSetLogin, // Use the updated handler
    page, // Reflects current page context ('home', 'admin', etc.)
    setPage, // Function to update page state (also persists)
    userCart,
    setUserCart,
    userOrders,
    setUserOrders,
    user,
    setUser: handleSetUser,
    orderConfirm,
    setOrderConfirm,
    tempAddress,
    setTempAddress,
  };

  return (
    <ShopContext.Provider value={value}>
      <Toaster />
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
