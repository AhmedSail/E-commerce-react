import React, { useState, useEffect, useContext } from "react";
import Title from "../../components/Title"; // Assuming you have a Title component
import { ShopContext } from "../../context/ShopContext"; // To get currency
import axios from "axios";

const OrderAdmin = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currency } = useContext(ShopContext); // Get currency symbol
  useEffect(() => {
    axios
      .get("https://apijson-lial.onrender.com/ordersAdmin")
      .then((response) => {
        setAllOrders(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching Order:", error));
  }, []);

  if (isLoading) {
    return <div className="p-10 text-center">Loading orders...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <Title text1={"ADMIN - "} text2={"ALL ORDERS"} size={"text-2xl mb-6"} />

      {allOrders.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No customer orders found.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order Date
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User Email
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Qty
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Size
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Delivery To
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Delivery Phone
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allOrders.map((i, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {new Date(i.orderDate).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {i.userEmail}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                    <img
                      src={i.image && i.image[0]}
                      alt={i.name || "Product Image"}
                      className="w-10 h-10 object-cover rounded"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }} // Hide if image fails
                    />
                    {i.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {i.quantity}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {i.selectedSize || "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {currency}
                    {i.price}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {`${i.deliveryInfo?.firstName || ""} ${
                      i.deliveryInfo?.lastName || ""
                    }`}
                    <br />
                    {`${i.deliveryInfo?.street || ""}`}
                    <br />
                    {`${i.deliveryInfo?.city || ""}, ${
                      i.deliveryInfo?.state || ""
                    } ${i.deliveryInfo?.zip || ""}`}
                    <br />
                    {`${i.deliveryInfo?.country || ""}`}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {i.deliveryInfo?.phone || "N/A"}
                  </td>
                  <td
                    className={`${
                      i.orderStatus === true ? "text-green-600" : "text-red-600"
                    } font-bold`}
                  >
                    {i.orderStatus === true ? "Received" : "Sent"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderAdmin;
