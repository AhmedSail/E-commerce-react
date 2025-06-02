import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subcategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    if (products.length > 0) {
      let productCopy = products.slice();
      productCopy = productCopy.filter((i) => category === i.category);
      productCopy = productCopy.filter((i) => subcategory === i.subcategory);
      setRelatedProducts(productCopy.slice(0, 5));
    }
  }, [products]);
  return (
    <div className="my-24">
      <div>
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mt-10">
          {relatedProducts.map((i, index) => (
            <ProductItem
              key={index}
              id={i.id}
              image={i.image}
              name={i.name}
              price={i.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
