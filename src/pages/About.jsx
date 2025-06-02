import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div>
      <div>
        <Title text1={"ABOUT"} text2={"US"} center={true} size={"text-3xl"} />
        <div className="flex flex-col md:flex-row gap-24 my-10">
          <img src={assets.about_img} alt="" className="w-96" />
          <div className="grid grid-cols-1 gap-5 max-sm:text-center md:w-[800px] text-gray-600">
            <p>
              Mero Shop was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.
            </p>
            <p>
              Since our inception, we've worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>
            <h1 className="font-bold text-black">Our Mission</h1>
            <p>
              Our mission at Mero Shop is to empower customers with choice,
              convenience, and confidence. We're dedicated to providing a
              seamless shopping experience that exceeds expectations, from
              browsing and ordering to delivery and beyond.
            </p>
          </div>
        </div>
        <div className="mb-16">
          <Title
            text1={"WHY "}
            text2={"CHOOSE US"}
            center={false}
            size={"text-xl"}
          />
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="border p-16 mt-10 flex flex-col gap-7 ">
              <h1 className="font-bold">Quality Assurance:</h1>
              <p className="text-gray-600 text-sm">
                We meticulously select and vet each product to ensure it meets
                our stringent quality standards.
              </p>
            </div>
            <div className="border p-16 mt-10 flex flex-col gap-7 ">
              <h1 className="font-bold">Convenience:</h1>
              <p className="text-gray-600 text-sm">
                With our user-friendly interface and hassle-free ordering
                process, shopping has never been easier.
              </p>
            </div>
            <div className="border p-16 mt-10 flex flex-col gap-7 ">
              <h1 className="font-bold">Exceptional Customer Service:</h1>
              <p className="text-gray-600 text-sm">
                Our team of dedicated professionals is here to assist you the
                way, ensuring your satisfaction is our top priority.
              </p>
            </div>
          </div>
        </div>
        <NewsLetterBox />
      </div>
    </div>
  );
};

export default About;
