import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { FaOpencart } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosList } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

const AdminLeft = () => {
  const { navigate } = useContext(ShopContext);

  return (
    <div>
      <div className="sm:border-r mx-auto space-y-5 pt-5 w-72">
        <div
          className={`flex justify-start items-center gap-10 border w-3/2 p-2 sm:border-r-0 ${
            location.pathname === "/admin/add" ? "bg-[#C586A5]" : ""
          }`}
          onClick={() => navigate("/admin/add")}
        >
          <IoAddCircleOutline />
          <h1>Add Item</h1>
        </div>
        <div
          className={`flex justify-start items-center gap-10 border w-3/2 p-2 sm:border-r-0 ${
            location.pathname === "/admin/list" ? "bg-[#C586A5]" : ""
          }`}
          onClick={() => navigate("/admin/list")}
        >
          <IoIosList />
          <h1>List Item</h1>
        </div>
        <div
          className={`flex justify-start items-center gap-10 border w-3/2 p-2 sm:border-r-0 ${
            location.pathname === "/admin/user" ? "bg-[#C586A5]" : ""
          }`}
          onClick={() => navigate("/admin/user")}
        >
          <FaRegUser />
          <h1>Users</h1>
        </div>
        <div
          className={`flex justify-start items-center gap-10 border w-3/2 p-2 sm:border-r-0 ${
            location.pathname === "/admin/order-admin" ? "bg-[#C586A5]" : ""
          }`}
          onClick={() => navigate("/admin/order-admin")}
        >
          <FaOpencart />
          <h1>Orders</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminLeft;
