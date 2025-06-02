import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";
import { assets } from "../assets/frontend_assets/assets";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [isApper, setIsApper] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [empty, setEmpty] = useState(true);
  const [sortType, setSortType] = useState("relevent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((i) => i !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggelSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((i) => i !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };
  useEffect(() => {
    if (products.length > 0) {
      setFilterProducts(products);
    }
  }, [products]);

  const applyFilter = () => {
    let productFiltered = products;

    if (showSearch && search) {
      productFiltered = productFiltered.filter((i) =>
        i.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productFiltered = productFiltered.filter((i) =>
        category.includes(i.category)
      );
    }

    if (subCategory.length > 0) {
      productFiltered = productFiltered.filter((i) =>
        subCategory.includes(i.subCategory)
      );
    }

    // التحقق من عدم وجود منتجات بعد تطبيق الفلتر
    setEmpty(productFiltered.length === 0);
    setFilterProducts(productFiltered);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts;
    switch (sortType) {
      case "low to high":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      case "high to low":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    setFilterProducts(products);
  }, []);
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 border-t">
        {/* Filter  */}
        <div>
          <div className="max-sm:flex justify-start items-center ">
            <h1 className="text-2xl font-light mt-16 uppercase mb-10">
              Filters
            </h1>
            <img
              className={`sm:hidden w-2 mb-4 ml-2 mt-10 ${
                isApper ? "rotate-90" : ""
              } cursor-pointer`}
              onClick={() => setIsApper(!isApper)}
              src={assets.dropdown_icon}
              alt=""
            />
          </div>
          <div
            className={`${
              isApper
                ? "opacity-100 translate-y-20"
                : "opacity-0 -translate-y-100"
            }transition-all duration-200`}
          >
            <div className="border py-5 px-10 pr-24  border-gray-300">
              <h1>CATEGORIES</h1>
              <div>
                <p className="flex justify-start items-center">
                  <input
                    type="checkbox"
                    name="Men"
                    value={"Men"}
                    className="mr-2"
                    onChange={toggleCategory}
                  />
                  <span className="text-gray-600">Men</span>
                </p>
                <p className="flex justify-start items-center">
                  <input
                    type="checkbox"
                    name="Women"
                    value={"Women"}
                    className="mr-2"
                    onChange={toggleCategory}
                  />
                  <span className="text-gray-600">Women</span>
                </p>
                <p className="flex justify-start items-center">
                  <input
                    type="checkbox"
                    name="Kids"
                    value={"Kids"}
                    className="mr-2"
                    onChange={toggleCategory}
                  />
                  <span className="text-gray-600">kids</span>
                </p>
              </div>
            </div>
            <div className="border py-5 px-10 pr-24  border-gray-300 mt-5">
              <h1>TYPE</h1>
              <div>
                <p className="flex justify-start items-center">
                  <input
                    type="checkbox"
                    name="Topwear"
                    value={"Topwear"}
                    className="mr-2"
                    onChange={toggelSubCategory}
                  />
                  <span className="text-gray-600">Topwear</span>
                </p>
                <p className="flex justify-start items-center">
                  <input
                    type="checkbox"
                    name="Bottomwear"
                    value={"Bottomwear"}
                    className="mr-2"
                    onChange={toggelSubCategory}
                  />
                  <span className="text-gray-600">Bottomwear</span>
                </p>
                <p className="flex justify-start items-center">
                  {" "}
                  <input
                    type="checkbox"
                    name="Winterwear"
                    value={"Winterwear"}
                    className="mr-2"
                    onChange={toggelSubCategory}
                  />
                  <span className="text-gray-600">Winterwear</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* ALL COLLECTIONS */}
        <div className={`${isApper ? "" : "-mt-72"}`}>
          <div className="md:flex justify-between items-center mt-10 max-sm:mx-auto">
            <h1 className="-mt-11 mb-9 flex text-start max-sm:ml-10">
              <Title
                text1={"ALL"}
                text2={"COLLECTIONS"}
                center={true}
                size={"text-3xl"}
              />
            </h1>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border border-gray-300 py-2 px-4 text-sm block mb-10 max-sm:w-full max-sm:mx-auto"
            >
              <option value="relevent">Sort by : Relevent</option>
              <option value="low to high">Sort by : Low to High</option>
              <option value="high to low">Sort by : High to low</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {filterProducts.map((i, index) => (
              <ProductItem
                key={index}
                id={i.id}
                image={i.image}
                name={i.name}
                price={i.price}
              />
            ))}
            {empty && (
              <div className="flex items-center justify-center mx-auto">
                <h1 className="text-center md:text-3xl text-gray-600">
                  There aren't products
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
