import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Importing SweetAlert2 library
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { assets } from "../../assets/frontend_assets/assets";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users`);
      setUsers(response.data);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClick = async (id) => {
    // ✅ Delete confirmation using `Swal`
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/users/${id}`);
          toast.success("Users deleted successfully!");

          // ✅ Refresh the list immediately after deletion
          fetchProducts();
        } catch (error) {
          console.error(
            "Error deleting User:",
            error.response ? error.response.data : error.message
          );
          toast.error("Failed to delete user.");
        }
      }
    });
  };

  return (
    <div className="p-6 overflow-x-auto">
      <ToastContainer />
      <table className="border-collapse border border-gray-400 w-full min-w-[600px]">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="border p-2 text-center">Id</th>
            <th className="border p-2 text-center">Name</th>
            <th className="border p-2 text-center">Email</th>
            <th className="border p-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index} className="border">
              <td className="border p-2 text-center text-gray-600">
                {item.id}
              </td>
              <td className="border p-2 text-center text-gray-600">
                {item.name}
              </td>
              <td className="border p-2 text-center font-bold">{item.email}</td>
              <td className="border p-2 text-center text-gray-600">
                <button
                  className="text-white px-3 py-1"
                  onClick={() => handleClick(item.id)}
                >
                  <img src={assets.cross_icon} alt="" className="w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
