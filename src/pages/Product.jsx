import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import ProductCarousel from "../components/ProductCarousel";
import Title from "../components/Title";
import RelatedProducts from "../components/RelatedProducts";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, user } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [activeSize, setActiveSize] = useState(null);
  const [SizeArr, setSizeArr] = useState([]);
  const dispatch = useDispatch();
  const handleAddToCart = (e, productData) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user || !user.email) {
      toast.error("You must be logged in to add products to the cart.");
      return;
    }

    const updatedProduct = { ...productData, selectedSize: activeSize };

    dispatch(addToCart({ ...updatedProduct, userEmail: user.email }));
    toast.success("Product Added Successfully");
  };
  useEffect(() => {
    const fetchProductData = () => {
      const foundProduct = products.find((i) => i.id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setImage(foundProduct.image[0]); // ضبط الصورة الافتراضية
        setActiveSize(foundProduct.sizes[0]);
      }
    };
    fetchProductData();
  }, [products, productId]);

  return productData ? (
    <div className="border-t opacity-100 transition-all ease-in-out duration-500">
      <ToastContainer />
      <div className="mt-10 flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="max-sm:hidden flex sm:flex-col  justify-between sm:justify-normal w-40 gap-2">
            {productData.image?.map((i, index) => (
              <img
                key={index}
                src={i}
                alt=""
                className="cursor-pointer"
                onClick={() => setImage(i)}
              />
            ))}
          </div>
          <ProductCarousel productData={productData} setImage={setImage} />
        </div>
        <div>
          <img src={image} alt="" className="block w-[1000px]" />
        </div>
        <div className="flex-col space-y-9">
          <h1 className="max-sm:text-xl md:text-2xl">{productData.name}</h1>
          <div className="w-4 flex justify-start items-center gap-1">
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_icon} alt="" />
            <img src={assets.star_dull_icon} alt="" />
            <span>(122)</span>
          </div>
          <h1 className="text-3xl font-bold">
            {productData.price}
            {currency}
          </h1>
          <p className="text-gray-500 text-lg">
            A lightweight, usually knitted, pullover shirt, close-fitting and
            with a round neckline and short sleeves, worn as an undershirt or
            outer garment.
          </p>
          <h1>Select Size</h1>
          <div className="space-x-2">
            {productData.sizes.map((size, index) => (
              <span
                key={index}
                className={`bg-gray-200 py-3 px-5 cursor-pointer ${
                  activeSize === size ? "border border-orange-400" : ""
                }`}
                onClick={() => setActiveSize(size)}
              >
                {size}
              </span>
            ))}
          </div>
          <div className="re">
            <button
              className="bg-black text-white font-medium px-6 py-2 hover:bg-white hover:text-black group transition-all duration-200 hover:scale-110"
              onClick={(e) => handleAddToCart(e, productData)}
            >
              <span>Add To Cart</span>
            </button>
          </div>
          <hr className="my-10" />
          <div>
            {[
              "100% Original product.",
              "Cash on delivery is available on this product.",
              "Easy return and exchange policy within 7 days.",
            ].map((p) => (
              <h1 className="text-sm text-gray-400">{p}</h1>
            ))}
          </div>
        </div>
      </div>
      <div className="my-24">
        <div className="flex justify-start items-center">
          <h1 className="font-bold px-4 py-2 border border-gray-200">
            Description
          </h1>
          <h1 className="px-4 py-2 border border-gray-200 text-gray-600">
            Reviews (122)
          </h1>
        </div>
        <div className="border border-gray-200 p-3">
          <p className="text-gray-500 text-sm">
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer. E-commerce websites
            typically display products or services along with detailed
            descriptions, images, prices, and any available variations (e.g.,
            sizes, colors). Each product usually has its own dedicated page with
            relevant information.
          </p>
        </div>
      </div>
      <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <RelatedProducts
          category={productData.category}
          subcategory={productData.subcategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
