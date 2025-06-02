import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [location]);
  return (
    <div>
      <div
        className={` ${showSearch ? "border-y bg-gray-100/60 h-24" : "hidden"}`}
      >
        <div className="flex justify-center items-center gap-x-2 pt-7">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-full md:w-[700px] h-10 px-5 outline-none relative"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <img
              src={assets.search_icon}
              alt=""
              className="w-5 absolute top-1/4 max-sm:right-3 md:right-[calc(100%-680px)]"
            />
          </div>
          <img
            src={assets.cross_icon}
            alt=""
            className="w-3 cursor-pointer"
            onClick={() => setShowSearch(!showSearch)}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
