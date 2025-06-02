import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import Collection from "../pages/Collection";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, []);

  return (
    <div>
      <div>
        <Title
          text1={"Latest"}
          text2={"Collection"}
          center={true}
          size={"text-3xl"}
        />
        <p className="text-xs m-auto sm:text-sm md:text-base w-3/4 text-gray-500 mt-5 font-semibold text-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6 mt-10">
        {latestProducts.map((i, index) => {
          return (
            <ProductItem
              key={index}
              id={i.id}
              image={i.image}
              name={i.name}
              price={i.price}
            />
          );
        })}
      </div>
      {latestProducts.length === 0 && (
        <p className="text-center  mt-5 font-semibold ">
          No new collection available at the moment. Stay tuned for upcoming
          updates! 🚀
        </p>
      )}
      {/* <div>{products}</div> */}
    </div>
  );
};

export default LatestCollection;
