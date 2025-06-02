import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Register from "./pages/Register";
import ProtectedRoute from "./pages/ProtectedRoute"; // Checks for localStorage.getItem("currentUser")
import AdminPanel from "./pages/Admin/AdminPanel";
import { ShopContext } from "./context/ShopContext";
import AdminHero from "./pages/Admin/AdminHero";
import ListAdmin from "./pages/Admin/ListAdmin";
import OrderAdmin from "./pages/Admin/OrderAdmin";
import NavbarAdmin from "./pages/Admin/NavbarAdmin";
import Logout from "./pages/Logout";
import AdminUsers from "./pages/Admin/AdminUsers";
import socket from "./socket";
import ProtectedRouteAdmin from "./pages/ProtectedRouteAdmin"; // Checks for localStorage.getItem("admin") === "true"
import { MoonLoader } from "react-spinners";
import ErrorPage from "./pages/ErrorPage";
const App = () => {
  // Get admin login status (login) and the user object (user)
  // Renaming login to isAdminLoggedIn for clarity
  const { login: isAdminLoggedIn, user } = useContext(ShopContext);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500); // محاكاة التحميل لمدة 1 ثانية
  }, [location.pathname]);
  // Determine if a regular user is logged in (user object exists in context or localStorage)
  // Check localStorage as well for robustness on initial load before context updates
  const isUserLoggedIn = !!user || !!localStorage.getItem("currentUser");

  // Check admin status directly from localStorage for initial render consistency
  // This helps prevent flicker if context update is slightly delayed
  const initialIsAdmin = localStorage.getItem("admin") === "true";

  // Determine the current role based on localStorage primarily, then context
  const isAdmin = initialIsAdmin || isAdminLoggedIn;

  useEffect(() => {
    // Socket connection logic
    socket.on("connect", () => {
      console.log("✅ Connected to Socket.IO server!");
    });
    socket.on("disconnect", () => {
      console.log("❌ Disconnected from Socket.IO server!");
    });
    // Cleanup socket listeners on component unmount
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Use the combined 'isAdmin' flag to decide which major section to show */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <MoonLoader color="#C586AB" size={100} />
        </div>
      ) : isAdmin ? (
        // ***** ADMIN UI Section *****
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
          <NavbarAdmin />

          <Routes>
            <Route element={<ProtectedRouteAdmin />}>
              <Route path="/admin" element={<AdminPanel />}>
                <Route index element={<AdminHero />} />
                <Route path="*" element={<ErrorPage />} />
                <Route path="add" element={<AdminHero />} />
                <Route path="list" element={<ListAdmin />} />
                <Route path="user" element={<AdminUsers />} />
                <Route path="order-admin" element={<OrderAdmin />} />
              </Route>
            </Route>
          </Routes>
        </div>
      ) : (
        // ***** USER UI Section *****
        <div
          className={`px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex-1 ${
            isUserLoggedIn ? "" : "bg-gray-200 h-screen"
          }`}
        >
          {(isUserLoggedIn ||
            ["/login", "/register"].includes(location.pathname)) && <Navbar />}
          {(isUserLoggedIn ||
            ["/login", "/register"].includes(location.pathname)) && (
            <SearchBar />
          )}

          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<ErrorPage />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/place-order" element={<PlaceOrder />} />
              <Route path="/orders" element={<Orders />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
          </Routes>

          {(isUserLoggedIn ||
            ["/login", "/register"].includes(location.pathname)) && <Footer />}
        </div>
      )}
    </div>
  );
};

export default App;
