import React, { useEffect } from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSellers from "../components/BestSellers";
import OurPolicy from "../components/OurPolicy";
import NewsLetterBox from "../components/NewsLetterBox";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  useEffect(() => {
    if (localStorage.getItem("fromLogin") === "true") {
      toast.success("Login Successfully, Welcome!");
      localStorage.removeItem("fromLogin"); // إزالة العنصر لتجنب ظهوره مجدداً عند إعادة تحميل الصفحة
    }
  }, []);

  return (
    <div>
      <ToastContainer />
      <Hero />
      <LatestCollection />
      <BestSellers />
      <OurPolicy />
      <NewsLetterBox />
    </div>
  );
};

export default Home;
