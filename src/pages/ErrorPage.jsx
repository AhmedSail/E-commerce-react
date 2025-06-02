import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShopContext } from "../context/ShopContext";

const ErrorPage = ({ errorCode = "404", errorMessage = "Page Not Found" }) => {
  const { navigate } = useContext(ShopContext);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white text-center relative">
      {/* دائرة متحركة لإضافة حركة ديناميكية */}

      {/* كود الخطأ بشكل جذاب */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="text-[10rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-400 to-red-500"
      >
        {errorCode}
      </motion.h1>

      {/* رسالة الخطأ */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        className="text-lg text-gray-300 font-semibold mt-2"
      >
        {errorMessage}
      </motion.p>

      {/* أزرار العودة */}
      <div className="mt-6 flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 text-lg font-semibold rounded-lg shadow-md transition-all cursor-pointer"
        >
          Go Home
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-6 text-lg font-semibold rounded-lg shadow-md transition-all"
        >
          Go Back
        </motion.button>
      </div>
    </div>
  );
};

export default ErrorPage;
