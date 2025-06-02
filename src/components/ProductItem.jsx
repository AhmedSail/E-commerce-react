import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  return (
    <div>
      <Link to={`/product/${id}`}>
        <div className="overflow-hidden">
          <img
            src={image[0]}
            alt=""
            className="hover:scale-110 transition ease-in-out "
          />
        </div>
        <div>
          <h1 className="pt-3 pb-1 text-sm">{name}</h1>
          <span className="text-sm font-medium">
            {currency}
            {price}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
