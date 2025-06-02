import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox";

const Contact = () => {
  return (
    <div>
      <Title text1={"CONTACT "} text2={"Us"} center={true} size={"text-3xl"} />
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 my-10">
        <img src={assets.contact_img} alt="" className="w-[600px]" />
        <div className="flex flex-col gap-10 text-gray-600">
          <h1 className="font-bold text-xl">Our Store</h1>
          <div>
            <p>54709 Willms Station</p>
            <p>Suite 350, Washington, USA</p>
          </div>
          <div>
            <p>+972592855602</p>
            <p>sdew2sdew0592855602@gmail.com</p>
          </div>
          <h1 className="font-bold text-xl">Careers at Forever</h1>
          <p>Learn more about our teams and job openings.</p>
          <button className="border border-black p-5 w-[150px] hover:bg-black hover:text-white transition-all duration-300">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
