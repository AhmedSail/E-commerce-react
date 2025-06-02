import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavMenu } from "../mockData/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navres from "./Navres";
import { ShopContext } from "../context/ShopContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {
    showSearch,
    setShowSearch,
    page,
    user,
    setUser,
    setUserCart,
    setUserOrders,
    setPage,
  } = useContext(ShopContext);

  const cart = useSelector(
    (state) => state.cart[user?.email] || { products: [] }
  );
  const products = cart.products;

  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check if regular user is logged in:
  // Use the user object from context OR localStorage "fromLogin" flag
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const fromLogin = localStorage.getItem("fromLogin") === "true";
    setIsUserLoggedIn(!!user || fromLogin);
  }, [user]);

  // Handle logout clearing relevant user info
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    localStorage.setItem("fromLogin", "false");
    setUser(null);
    setUserCart([]);
    setUserOrders([]);
    setPage("home");
    navigate("/logout", { replace: true });
  };

  return (
    // Show entire navbar block only if user is logged in and page is home (or adjust page logic as needed)
    <div className={`${page === "home" ? "" : "hidden"}`}>
      <div className="py-5 flex str justify-between items-center">
        {/* Site logo */}
        <div>
          <Link to={"/"}>
            <h1 className="text-3xl md:text-5xl uppercase font-[Playwrite]">
              MeroShop<span className="text-[#C586A5]">.</span>
            </h1>
          </Link>
        </div>

        {/* Main nav menu - show only if user is logged in */}
        <div className={`${isUserLoggedIn ? "" : "hidden"}`}>
          <ul className="hidden sm:flex justify-center space-x-4 font-semibold text-gray-600">
            {NavMenu.map((i) => (
              <li key={i.id} className="relative">
                <Link to={i.link}>
                  {i.title}
                  <hr
                    className={`w-2/4 border-none h-[1px] bg-gray-700 mx-auto ${
                      location.pathname === i.link ? "block" : "hidden"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Icons and menu */}
        <div
          className={`${
            isUserLoggedIn
              ? "flex justify-center items-center space-x-7 "
              : "hidden"
          }`}
        >
          {/* Profile icon with dropdown */}
          <div className="relative group">
            <Link to={"/login"}>
              <img
                src={assets.profile_icon}
                alt=""
                className="w-5 cursor-pointer"
              />
            </Link>
            {isUserLoggedIn && (
              <div className="group-hover:opacity-100 transition-all duration-300 -my-36 group-hover:my-0 opacity-0 absolute right-0 pt-4">
                <div className="flex flex-col gap-3 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-md ">
                  <p className="cursor-pointer hover:text-black font-semibold">
                    My Profile
                  </p>
                  <hr />
                  <p
                    className="cursor-pointer hover:text-black font-semibold"
                    onClick={() => navigate("/orders")}
                  >
                    Orders
                  </p>
                  <hr />
                  <p
                    className="cursor-pointer hover:text-black font-semibold"
                    onClick={handleLogout}
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Search icon */}
          <Link to={"/collection"}>
            <img
              src={assets.search_icon}
              alt=""
              className="w-5 cursor-pointer"
              onClick={() => setShowSearch(!showSearch)}
            />
          </Link>

          {/* Cart icon */}
          <Link to={"/cart"} className="relative">
            <img src={assets.cart_icon} alt="" className="w-5 cursor-pointer" />
            <p className="bg-black w-4 text-white absolute text-center rounded-full bottom-[-5px] right-[-5px] leading-4">
              {products.length > 0 ? products.length : 0}
            </p>
          </Link>

          {/* Hamburger menu icon for mobile */}
          <img
            src={assets.menu_icon}
            alt=""
            className="w-5 cursor-pointer md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>

      {/* Mobile sidebar menu */}
      <Navres isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Navbar;
