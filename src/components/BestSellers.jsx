import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";

const BestSellers = () => {
  const { products } = useContext(ShopContext);

  const [bestProducts, SetBestProducts] = useState([]);
  useEffect(() => {
    const bestSeller = products.filter((i) => i.bestseller);
    SetBestProducts(bestSeller.slice(0, 5));
  }, []);

  return (
    <div>
      <div>
        <Title
          text1={"BEST"}
          text2={"SELLERS"}
          center={true}
          size={"text-3xl"}
        />
        <p className="text-xs sm:text-sm md:text-base text-gray-600 w-3/4 m-auto text-center my-5">
          Explore our most popular products, loved by customers for their
          quality and unique design. These top-rated items combine style and
          function, making them must-haves for any collection. Don’t miss out on
          the favorites everyone is talking about!
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestProducts.map((i, index) => (
          <ProductItem
            key={index}
            id={i.id}
            image={i.image}
            name={i.name}
            price={i.price}
          />
        ))}
      </div>
      {bestProducts.length === 0 && (
        <p className="text-center  mt-5 font-semibold">
          No best sellers available at the moment. Check back soon for updates!
          🚀
        </p>
      )}
    </div>
  );
};

export default BestSellers;
