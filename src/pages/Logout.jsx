import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";

const Logout = () => {
  const { setLogin, navigate } = useContext(ShopContext);

  useEffect(() => {
    setLogin(false);
    localStorage.setItem("login", JSON.stringify(false)); // لحفظ التغيير عند إعادة التحميل
    navigate("/login");
  }, []);

  return null;
};

export default Logout;
