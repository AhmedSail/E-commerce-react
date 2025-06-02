import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminLeft from "./AdminLeft";
import socket from "../../socket";
import toast from "react-hot-toast";
import { ShopContext } from "../../context/ShopContext";

// مكون الإشعار المخصص للطلب الفردي
const SingleOrderToast = ({ t, notificationData }) => (
  <div
    className={`${
      t.visible ? "animate-enter" : "animate-leave"
    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  >
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={
              notificationData.imageUrl || "/path/to/default-placeholder.png"
            } // تأكد من تحديث المسار الافتراضي
            alt={notificationData.productName || "Product Image"}
          />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">
            New Order From: {notificationData.userName || "User undefined"}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Product: {notificationData.productName || "Poduct undefined"}
          </p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-gray-200">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        إغلاق
      </button>
    </div>
  </div>
);

// مكون الإشعار المخصص للطلبات المتعددة
const MultiOrderToast = ({ t, count }) => (
  <div
    className={`${
      t.visible ? "animate-enter" : "animate-leave"
    } max-w-md w-full bg-blue-100 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  >
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          {/* يمكنك وضع أيقونة مختلفة هنا للطلبات المتعددة */}
          <span className="text-xl">📦</span>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">
            طلبات جديدة متعددة!
          </p>
          <p className="mt-1 text-sm text-gray-500">
            لقد تلقيت {count} طلبات جديدة.
          </p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-gray-200">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        إغلاق
      </button>
    </div>
  </div>
);

const AdminPanel = () => {
  const { login } = useContext(ShopContext);
  useEffect(() => {
    localStorage.setItem("login", JSON.stringify(login));
  }, [login]);
  useEffect(() => {
    const handleNotification = (notification) => {
      if (notification.type === "single") {
        // عرض إشعار الطلب الفردي المخصص
        toast.custom((t) => (
          <SingleOrderToast t={t} notificationData={notification.data} />
        ));
      } else if (notification.type === "multi") {
        // عرض إشعار الطلبات المتعددة المخصص
        toast.custom((t) => (
          <MultiOrderToast t={t} count={notification.count} />
        ));
      }
    };

    socket.on("receiveNotification", handleNotification);

    return () => {
      socket.off("receiveNotification", handleNotification);
    };
  }, []);

  return (
    <div className="sm:flex items-start grid grid-cols-1">
      <AdminLeft />
      <div className="flex-grow p-6">
        {/* لا تنس إضافة <Toaster /> في مكان ما في تطبيقك الرئيسي */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
