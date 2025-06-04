import React, { useContext, useEffect } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import Swal from "sweetalert2"; // --- استيراد SweetAlert ---
import axios from "axios";

const Orders = () => {
  // --- استيراد الدالة من الـ Context ---
  const { currency, model, userOrders, user, setUserOrders } =
    useContext(ShopContext);
  // --- دالة التعامل مع ضغط زر تأكيد الاستلام ---
  const handleConfirmDelivery = (orderId, orderName, _id) => {
    Swal.fire({
      title: `Confirm receives order`,
      html: `Have you received the product?: <strong>${
        orderName || "Product"
      }</strong>`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes! , I receive it",
      cancelButtonText: "No, Not yet",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .get("https://apijson-lial.onrender.com/ordersAdmin")
          .then((res) => {
            const orderConfirmed = res.data.find((i) => i.id === _id);
            console.log("orderConfirmed+++++++" + orderConfirmed.id);

            const status = true; // تعديل الحالة محليًا

            // إرسال التحديث إلى قاعدة البيانات
            axios
              .delete(
                `https://apijson-lial.onrender.com/ordersAdmin/${orderConfirmed.id}`
              )
              .then(() => {
                console.log("تم حذف الطلب بنجاح");

                // إنشاء الطلب الجديد بنفس البيانات مع تحديث الحالة
                const updatedOrder = {
                  ...orderConfirmed,
                  orderStatus: true,
                };

                // إرسال الطلب الجديد إلى قاعدة البيانات
                return axios.post(
                  "https://apijson-lial.onrender.com/ordersAdmin",
                  updatedOrder
                );
              })
              .then(() => console.log("تم إنشاء الطلب الجديد بالحالة المحدثة"))
              .catch((err) => console.error("خطأ أثناء العملية:", err));

            // تحديث حالة الطلبات للمستخدم
            setUserOrders((prev) =>
              prev.filter((i) => i.id !== orderConfirmed?.id)
            );

            let storedUsers = JSON.parse(localStorage.getItem("users")) || {};
            if (storedUsers[user.email]) {
              storedUsers[user.email].orders = storedUsers[
                user.email
              ].orders.filter((i) => i.id !== orderConfirmed?.id);
              localStorage.setItem("users", JSON.stringify(storedUsers));
            }
          });

        //   // تحديث أو إضافة الطلب في `adminAllOrders`
        //   axios.get("https://apijson-lial.onrender.com/ordersAdmin").then((response) => {
        //     let storedAdminOrders = response.data;

        //     storedAdminOrders = storedAdminOrders.map((order) =>
        //       order.uniqueId === uniqueId
        //         ? { ...order, orderStatus: "Received" }
        //         : order
        //     );

        //     axios.put("https://apijson-lial.onrender.com/ordersAdmin", storedAdminOrders);
        //   });

        //   setUserOrders(updatedOrders);
        //   return updatedOrders;
        // });
      }
    });
  };
  // --- قسم العرض ---
  if (!user || !userOrders || userOrders.length === 0) {
    return (
      <div className="border-t pt-10 text-center">
        <Title text1={"MY "} text2={"ORDERS"} size={"text-2xl"} />
        <p className="mt-10 text-gray-500">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="border-t pt-10">
      <Title text1={"MY "} text2={"ORDERS"} size={"text-2xl"} />
      {userOrders.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col sm:flex-row justify-between items-center border-y py-2 mt-10 gap-4"
          >
            {/* --- تفاصيل الطلب (كما كانت) --- */}
            <div className="flex justify-center items-center gap-5 flex-grow">
              <img
                src={item.image && item.image[0]}
                alt={item.name || "Order item"}
                className="w-20 h-20 object-cover"
              />
              <div className="flex-grow">
                <h1 className="font-bold">{item.name}</h1>
                <div className="flex flex-wrap justify-start items-center gap-x-4 gap-y-1 text-sm">
                  <span>
                    {currency}
                    {item.price}
                  </span>
                  <span>Quantity : {item.quantity}</span>
                  <span>Size: {item.selectedSize}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Date :{" "}
                  {item.orderDate
                    ? new Date(item.orderDate).toLocaleDateString()
                    : "N/A"}
                </div>
                <div className="text-xs text-gray-500">Payment: {model}</div>
              </div>
            </div>

            {/* --- قسم حالة الطلب وزر التأكيد --- */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10 mt-4 sm:mt-0">
              <div className="flex justify-center items-center gap-2">
                <p
                  className={`min-w-2.5 h-2.5 border rounded-full bg-green-400 `}
                ></p>
                <h1 className="text-sm">Order Placed</h1>
              </div>
              <div className="flex gap-2">
                {/* --- زر تأكيد الاستلام (تمت إعادته) --- */}
                <button
                  onClick={() =>
                    handleConfirmDelivery(item.id, item.name, item.id)
                  } // تمرير المعرف واسم المنتج
                  className="text-xs text-white bg-blue-600 p-2 border border-blue-600 rounded hover:bg-blue-700"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
