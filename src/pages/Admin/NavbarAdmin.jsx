import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const NavbarAdmin = () => {
  const { setLogin, navigate, setPage } = useContext(ShopContext);
  const handleLogout = (e) => {
    e.preventDefault();
    // فقط استدع الدالة من السياق، وهي ستهتم بالباقي
    setLogin(false);
    // لا حاجة لـ navigate هنا إذا كان ProtectedRouteAdmin سيعيد التوجيه تلقائياً
    // أو يمكنك إبقاء navigate إذا أردت توجيهاً فورياً
    navigate("/login", { replace: true });
  };

  return (
    <div className="border-b lg:-mx-[170px] px-0">
      <div>
        <div className="md:flex justify-between items-center w-full py-5">
          <Link className="ml-16 max-sm:text-center ">
            <h1 className="text-3xl md:text-5xl uppercase font-[Playwrite] ">
              MeroShop<span className="text-[#C586A5]">.</span>
            </h1>
            <h1 className="text-[#C586A5] text-2xl">ADMIN PANEL</h1>
          </Link>
          <button
            className="bg-gray-700 px-5 py-2 rounded-full text-white hover:text-black hover:bg-white transition-all duration-300 mr-16 max-sm:block max-sm:mx-auto max-sm:mt-5"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarAdmin;
