import React from "react";
import { NavMenu } from "../mockData/data";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";

const Navres = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  return (
    <div
      className={`
        fixed top-0 right-0 w-full h-screen z-30 transition-all  
         ${
           isOpen
             ? "translate-x-0 opacity-100"
             : "translate-x-full opacity-0 pointer-events-none"
         }
        bg-white text-gray-600 font-semibold duration-200
      `}
    >
      <div
        className="flex justify-start items-center gap-3 px-2 py-2 cursor-pointer"
        onClick={() => setIsOpen(false)}
      >
        <img
          src={assets.dropdown_icon}
          alt="Back"
          className="rotate-180 cursor-pointer w-2"
        />
        <h1 className="text-lg">Back</h1>
      </div>

      <ul className="flex flex-col my-3">
        {NavMenu.map((i) => (
          <li
            key={i.id}
            className={`border-b-2 w-full last:border-none py-2 px-2 ${
              location.pathname === i.link ? "bg-black text-white" : ""
            }`}
          >
            <Link to={i.link}>{i.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navres;
