import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const OurPolicy = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-around items-center gap-12 sm:gap-2 text-center py-2  my-16">
        <div>
          <img src={assets.exchange_icon} alt="" className="mx-auto my-5" />
          <p className="font-bold">Easy Exchange Policy</p>
          <p className="text-gray-500 font-semibold">
            We offer hassle free exchange policy
          </p>
        </div>
        <div>
          <img src={assets.quality_icon} alt="" className="mx-auto my-5" />
          <p className="font-bold">7 Days Return Policy</p>
          <p className="text-gray-500 font-semibold">
            We provide 7 days free return policy
          </p>
        </div>
        <div>
          <img src={assets.support_img} alt="" className="mx-auto my-5" />
          <p className="font-bold">Best customer support</p>
          <p className="text-gray-500 font-semibold">
            we provide 24/7 customer support
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
