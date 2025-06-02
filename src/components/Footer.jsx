import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialLinkedin } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { ShopContext } from "../context/ShopContext";

const socailIcons = [
  {
    id: 1,
    icon: <SlSocialFacebook />,
    link: "https://www.facebook.com/",
  },
  {
    id: 2,
    icon: <SlSocialInstagram />,
    link: "https://www.instagram.com/",
  },
  {
    id: 3,
    icon: <SlSocialLinkedin />,
    link: "https://x.com/",
  },
  {
    id: 4,
    icon: <SlSocialTwitter />,
    link: "https://www.linkedin.com/",
  },
];
const Footer = () => {
  const { page, setPage, login, user } = useContext(ShopContext);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const fromLogin = localStorage.getItem("fromLogin") === "true";
    setIsUserLoggedIn(!!user || fromLogin);
  }, [user]);
  return (
    <div
      className={`${page === "home" && isUserLoggedIn ? "block" : "hidden"}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 w-full pb-5 mt-16">
        {/* logo */}
        <div>
          <Link to={"/"}>
            <h1 className="text-3xl md:text-5xl uppercase font-[Playwrite] mb-5">
              MeroShop<span className="text-[#C586A5]">.</span>
            </h1>
          </Link>
          <p className="mb-5 text-gray-500 md:w-3/4">
            Trend Plus Buy is your preferred destination for online shopping
            with confidence and convenience. We offer a hassle-free exchange
            policy, a 7-day free return policy, and exceptional 24/7 customer
            support throughout the week. We are committed to providing
            high-quality products and a seamless shopping experience that meets
            all your needs. Join the Trend Plus Buy family today and discover
            the true joy of shopping
          </p>
          <div className="flex justify-start items-center gap-x-5 text-3xl">
            {socailIcons.map((i) => (
              <Link
                key={i.id}
                to={i.link}
                className="hover:scale-110 transition-all ease-in-out"
              >
                {i.icon}
              </Link>
            ))}
          </div>
        </div>
        {/* company */}
        <div className="flex-col gap-3 sm:mx-auto max-sm:mt-5">
          <h1 className="text-xl font-semibold mb-5">COMPANY</h1>
          <ul className="text-gray-500 space-y-2">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        {/* GET IN TOUCH */}
        <div className="flex-col gap-3 sm:mx-auto max-sm:mt-5">
          <h1 className="text-xl font-semibold mb-5">GET IN TOUCH</h1>
          <ul className="text-gray-500 space-y-2">
            <li>+972592855602</li>
            <li>sdew2sdew0592855602@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr className="mb-5" />
      <div>
        {/* {Copyright 2024@ greatstack.dev - All Right Reserved.} */}
        <h1 className="text-center text-gray-500 pb-5 max-sm:text-xs">
          Copyright 2025@
        </h1>
      </div>
    </div>
  );
};

export default Footer;
