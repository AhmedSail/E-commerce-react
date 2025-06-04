import React, { useContext } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";

const Hero = () => {
  const { user } = useContext(ShopContext);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 border-[1px] border-[#9CA3AF]">
        <div className="my-auto max-sm:py-5">
          <div className="flex justify-center text-[#414141] items-baseline gap-2 font-semibold ">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p>OUR BESTSELLERS</p>
          </div>
          <div className="mt-5">
            <h1 className="font-thin text-center text-[#414141] font-[Playwrite] md:text-7xl text-4xl leading-relaxed">
              Latest Arrivals
            </h1>
          </div>
          <div className="flex justify-center gap-2 items-baseline mt-5">
            <p className="font-semibold text-[#414141] ">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
        <div>
          <img src={assets.hero_img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
