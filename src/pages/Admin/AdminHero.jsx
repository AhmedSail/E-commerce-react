import React, { useContext, useEffect, useState } from "react";
import MultiImageUpload from "./MultiImageUpload";
import { current } from "@reduxjs/toolkit";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { ShopContext } from "../../context/ShopContext";

const AdminHero = () => {
  const [added, setAdded] = useState(true);
  const { navigate } = useContext(ShopContext);
  const [product, setProduct] = useState({
    id: Math.random().toString(36).substring(2, 9),
    quantity: 0,
    name: "",
    description: "",
    price: 0.0,
    image: [],
    category: "Men",
    subCategory: "Topwear",
    sizes: [],
    date: current,
    bestseller: false,
  });
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", () => {
      window.history.pushState(null, null, window.location.href);
    });
  }, []);

  const sizeIndex = ["S", "M", "L", "XL", "XXL"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]:
        type === "number"
          ? Number(value)
          : type === "checkbox"
          ? checked
          : value,
    }));
  };

  const toggleClick = (size) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      sizes: prevProduct.sizes.includes(size)
        ? prevProduct.sizes.filter((s) => s !== size)
        : [...prevProduct.sizes, size],
    }));
  };

  const handleSubmit = async () => {
    if (
      !product.name.trim() ||
      !product.description.trim() ||
      product.price <= 0 ||
      !product.image ||
      product.image.length === 0 ||
      product.sizes.length === 0
    ) {
      toast.error("Please fill in all required fields correctly!");
      return;
    }

    try {
      await axios.post("https://apijson-lial.onrender.com/products", product);
      setAdded(!added);
      toast.success("Product added successfully!");
      setTimeout(() => {
        navigate("/admin/list");
      }, [1500]);
    } catch (error) {
      toast.error("Failed to add product.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <ToastContainer />
      <MultiImageUpload
        product={product}
        setProduct={setProduct}
        added={added}
        setAdded={setAdded}
      />
      <div className="mt-5">
        <h1 className="mb-3">Product Name</h1>
        <input
          type="text"
          className="w-full p-2 outline-0 border rounded-md"
          placeholder="Type Here!"
          name="name"
          onChange={handleChange}
        />
      </div>
      <div className="mt-5">
        <h1 className="mb-3">Product Description</h1>
        <textarea
          className="w-full p-2 outline-0 border resize-none h-24 rounded-md"
          placeholder="Write content Here!"
          name="description"
          onChange={handleChange}
        ></textarea>
      </div>

      {/* ✅ تحويل اختيار الفئات إلى تصميم شبكي لضبط التوزيع تلقائيًا */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div>
          <h1>Product Category</h1>
          <select
            name="category"
            className="mt-3 w-full border p-2 rounded-md"
            onChange={handleChange}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <h1>Sub Category</h1>
          <select
            name="subCategory"
            className="mt-3 w-full border p-2 rounded-md"
            onChange={handleChange}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <h1>Product Price</h1>
          <input
            type="number"
            className="mt-3 w-full border p-2 rounded-md"
            name="price"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-5">
        <h1>Product Sizes</h1>
        <div className="flex flex-wrap gap-3 mt-5">
          {sizeIndex.map((size) => (
            <span
              key={size}
              className={`bg-gray-300 px-3 py-2 rounded cursor-pointer ${
                product.sizes.includes(size) ? "bg-pink-300" : ""
              }`}
              onClick={() => toggleClick(size)}
            >
              {size}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <input type="checkbox" name="bestseller" onChange={handleChange} />
        <h1>Add to Bestseller</h1>
      </div>

      {/* ✅ زر الإضافة يكون متجاوبًا في الجوال والأجهزة الكبيرة */}
      <button
        onClick={handleSubmit}
        className="bg-black px-5 py-3 text-white font-semibold mt-5 w-full md:w-auto"
      >
        ADD PRODUCT
      </button>
    </div>
  );
};

export default AdminHero;
