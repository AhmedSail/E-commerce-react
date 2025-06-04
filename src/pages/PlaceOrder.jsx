import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeAllFromCart } from "../Redux/CartSlice";
import socket from "../socket";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const PlaceOrder = () => {
  // احصل على البيانات اللازمة من Context و Redux
  const {
    user,
    setUserOrders,
    setUserCart, // Added setUserCart for clearing context cart
    currency,
    delivery_fee,
    navigate,
    model,
    setModel,
    tempAddress, // *** Import the notification function ***
  } = useContext(ShopContext);
  const cart = useSelector(
    (state) =>
      state.cart[user?.email] || {
        products: [],
        totalQuantity: 0,
        totalPrice: 0,
      }
  );
  const dispatch = useDispatch();

  const countries = [
    "United States",
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antarctica",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegowina",
    "Botswana",
    "Brazil",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Cote d'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guadeloupe",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kuwait",
    "Kyrgyzstan",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libyan Arab Jamahiriya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Mongolia",
    "Morocco",
    "Mozambique",
    // ... (Add rest of countries if needed)
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user.email,
    street: tempAddress,
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    // *** Make function async ***
    // 1. Validate form fields
    if (Object.values(formData).some((value) => value.trim() === "")) {
      toast.error("Please fill out all the delivery information fields.");
      return;
    }

    // 2. Validate user and cart
    if (!user || !user.email) {
      toast.error("User not logged in. Please log in to place an order.");
      navigate("/login");
      return;
    }
    if (!cart || !cart.products || cart.products.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      // --- User Specific Order Saving ---
      const storedUsers = JSON.parse(localStorage.getItem("users")) || {};
      if (!storedUsers[user.email]) {
        // Initialize user data if not present
        storedUsers[user.email] = { ...user, cart: [], orders: [] };
      }
      const currentUserOrders = storedUsers[user.email].orders || [];
      const orderDate = new Date().toISOString();

      const newOrderItemsForUser = cart.products.map((item) => ({
        ...item,
        orderDate: orderDate,
        orderStatus: false,
        id: crypto.randomUUID(),
      }));
      const updatedUserOrders = [...currentUserOrders, ...newOrderItemsForUser];
      storedUsers[user.email] = {
        ...storedUsers[user.email],
        orders: updatedUserOrders,
        cart: [], // Clear user's cart in localStorage
      };
      localStorage.setItem("users", JSON.stringify(storedUsers));
      setUserOrders(updatedUserOrders); // Update context state for current user's orders
      axios.get("https://apijson-lial.onrender.com/ordersAdmin").then((res) => {
        const storedAdminOrders = res.data;

        const newOrderItemsForAdmin = newOrderItemsForUser.map((item) => ({
          ...item,
          userEmail: user.email, // Add user email for admin tracking
          deliveryInfo: { ...formData }, // Add delivery info
        }));
        const updatedAdminOrders = [
          ...storedAdminOrders,
          ...newOrderItemsForAdmin,
        ];
        newOrderItemsForAdmin.forEach(async (orderItem) => {
          try {
            await axios.post(
              "https://apijson-lial.onrender.com/ordersAdmin",
              orderItem
            );
          } catch (error) {
            console.error("Error saving order:", error);
          }
        });
        toast.success("Order added successfully!");
        localStorage.setItem(
          "adminAllOrders",
          JSON.stringify(updatedAdminOrders)
        );

        // --- Send Admin Notification --- *** NEW ***
        const firstProduct = cart.products[0];
        const notificationPayload = {
          userName: formData.firstName || user.email, // استخدام الاسم الأول أو البريد الإلكتروني
          productName: firstProduct?.name || "Multiple Items",
          address: `${formData.street}, ${formData.city}`,
          imageUrl: firstProduct?.image ? firstProduct.image[0] : undefined,
        };
        console.log("⚡ إرسال إشعار إلى السيرفر:", notificationPayload);
        socket.emit("adminNotification", notificationPayload);

        // --- Cleanup and Navigation ---
        dispatch(removeAllFromCart(user.email)); // Clear Redux cart
        setUserCart([]); // Clear context cart state
        toast.success("Order placed successfully!");
        navigate(`/orders`); // Navigate to user's orders page
      });
      // --- Admin All Orders Saving ---
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(
        "An error occurred while placing your order. Please try again."
      );
    }
  };

  return (
    <div>
      <ToastContainer autoClose={3000} />
      <div className="text-xl sm:text-2xl my-3">
        <Title text1={"DELIVERY "} text2={"INFORMATION"} center={false} />
      </div>
      <div className="flex flex-col justify-between pt-5 sm:pt-14 min-h-[80vh] sm:flex-row gap-4">
        {/* Delivery Information Form */}
        <div>
          <form
            action=""
            className="flex flex-col gap-10 w-full max-w-md mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                required
                className="border rounded outline-0 p-2 flex-1 w-full"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <input
                required
                className="border rounded outline-0 p-2 flex-1 w-full"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <input
              required
              className="border rounded outline-0 p-2 w-full"
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              disabled
            />
            <input
              required
              className="border rounded outline-0 p-2 w-full"
              type="text"
              placeholder="Street"
              name="street"
              value={tempAddress}
              onChange={handleInputChange}
              disabled
            />
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                required
                className="border rounded outline-0 p-2 flex-1 w-full"
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
              <input
                required
                className="border rounded outline-0 p-2 flex-1 w-full"
                type="text"
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <input
                required
                className="border rounded outline-0 p-2 flex-1 w-full"
                type="number"
                placeholder="ZIP Code"
                name="zip"
                value={formData.zip}
                onChange={handleInputChange}
              />
              <select
                required
                className="border p-2 rounded w-full sm:w-60 outline-0"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Country
                </option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <input
              required
              className="border rounded outline-0 p-2 w-full"
              type="text"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </form>
        </div>

        {/* Cart Totals & Payment */}
        <div className="flex justify-end min-w-80 ">
          <div className="w-full max-w-[500px]">
            <Title text1={"CART "} text2={"TOTALS"} size={"text-xl"} />
            <div className="flex justify-between items-center border-b mt-10 py-2">
              <h1 className="uppercase text-gray-600">Total item:</h1>
              <span className="text-black font-bold">
                {cart.totalQuantity || 0}
              </span>
            </div>
            <div className="border-b py-2">
              <div className="flex justify-between items-center">
                <h1>Shipping Fee</h1>
                <span className="text-black font-bold">
                  {delivery_fee}
                  {currency}
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <h1>Subtotal Price</h1>
                <span className="text-black font-bold">
                  {cart.totalPrice || 0}
                  {currency}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center py-3">
              <h1 className="font-bold">TOTAL:</h1>
              <h1 className="font-bold">
                {(cart.totalPrice || 0) + delivery_fee}
                {currency}
              </h1>
            </div>
            <div>
              <div className="text-xs mt-4">
                <Title text1={"PAYMENT "} text2={"METHOD"} size={"text-lg"} />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-5">
                {/* Payment Options */}
                <div
                  className={`border px-4 py-2 flex items-center gap-3 cursor-pointer w-full sm:w-auto ${
                    model === "stripe" ? "border-green-500" : ""
                  }`}
                  onClick={() => setModel("stripe")}
                >
                  <p
                    className={`w-4 h-4 border rounded-full ${
                      model === "stripe" ? "bg-green-400" : ""
                    }`}
                  ></p>
                  <img
                    src={assets.stripe_logo}
                    alt="Stripe Logo"
                    className="w-16"
                  />
                </div>
                <div
                  className={`border px-4 py-2 flex items-center gap-3 cursor-pointer w-full sm:w-auto ${
                    model === "razorpay" ? "border-green-500" : ""
                  }`}
                  onClick={() => setModel("razorpay")}
                >
                  <p
                    className={`w-4 h-4 border rounded-full ${
                      model === "razorpay" ? "bg-green-400" : ""
                    }`}
                  ></p>
                  <img
                    src={assets.razorpay_logo}
                    alt="Razorpay Logo"
                    className="w-16"
                  />
                </div>
                <div
                  className={`border px-3 py-2 flex items-center gap-3 cursor-pointer w-full sm:w-auto ${
                    model === "cod" ? "border-green-500" : ""
                  }`}
                  onClick={() => setModel("cod")}
                >
                  <p
                    className={`w-4 h-4 border rounded-full ${
                      model === "cod" ? "bg-green-400" : ""
                    }`}
                  ></p>
                  <h1 className="text-gray-500 uppercase text-sm font-medium">
                    Cash on delivery
                  </h1>
                </div>
              </div>
            </div>
            <button
              className="bg-black text-white w-full py-2 hover:bg-white hover:text-black border border-black transition-all duration-300 font-semibold mt-8"
              onClick={handlePlaceOrder}
              disabled={!cart || !cart.products || cart.products.length === 0} // Disable button if cart is empty
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
