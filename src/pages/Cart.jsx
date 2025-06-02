import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../Redux/CartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cartEmpty from "../assets/frontend_assets/c60fea3ac3aab2e82c2f7ea901ef55f6.jpg";
import Modal from "../components/Modal";
import ChangeAddress from "../components/ChangeAddress";

const Cart = () => {
  const { currency, navigate, user } = useContext(ShopContext);
  const cart = useSelector(
    (state) => state.cart[user?.email] || { products: [] }
  );
  console.log("Cart for User:", cart);
  const products = cart.products;
  const totalQuantity = cart?.totalQuantity || 0;
  console.log("Total Items in Cart:", totalQuantity);
  const { delivery_fee } = useContext(ShopContext);
  const dispatch = useDispatch();
  const [address, setAddress] = useState("Main street, 0021");
  const [isModel, setIsModel] = useState(false);
  const handleDelete = (e, id, size) => {
    e.preventDefault();
    dispatch(
      removeFromCart({
        id: id,
        selectedSize: size, // ✅ تمرير الحجم الصحيح مباشرة
        userEmail: user.email,
      })
    );

    toast.success("Product Deleted Successfully");
  };

  // const cart = useSelector((state) => state.cart);

  return (
    <div className="px-4">
      <ToastContainer />
      <div className="border-t">
        <Title text1="YOUR " text2="CART" center={true} size={"text-3xl"} />

        {products.length === 0 ? (
          <div className="text-center mt-10">
            <img
              src={cartEmpty}
              alt="Empty cart"
              className="mx-auto w-full max-w-sm"
            />
            <p className="mt-5 text-gray-600 uppercase text-3xl md:text-4xl">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <div>
            {/* قائمة المنتجات */}
            <div className="p-3 mt-10 space-y-4">
              {products.map((i) => (
                <div
                  key={i.id}
                  className="flex flex-col md:flex-row justify-between items-center border p-3"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                    <img
                      src={i.image?.[0] || cartEmpty}
                      alt={i.name}
                      className="w-20 h-20 object-cover"
                    />
                    <div className="flex flex-col w-full">
                      <h1 className="font-semibold text-lg">{i.name}</h1>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <span className="text-gray-700 text-base">
                          {i.price} {currency}
                        </span>
                        <span className="bg-gray-200 py-1 px-3 text-sm">
                          {i.selectedSize}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-3 md:mt-0 gap-3">
                    <button
                      onClick={() =>
                        dispatch(
                          increaseQuantity({
                            id: i.id,
                            selectedSize: i.selectedSize,
                            userEmail: user.email, // ✅ تمرير البريد الإلكتروني
                          })
                        )
                      }
                      className="px-3 py-1 border rounded"
                    >
                      +
                    </button>
                    {i.quantity}
                    <button
                      onClick={() =>
                        dispatch(
                          decreaseQuantity({
                            id: i.id,
                            selectedSize: i.selectedSize,
                            userEmail: user.email, // ✅ تمرير البريد الإلكتروني
                          })
                        )
                      }
                      disabled={i.quantity === 1}
                      className={`px-3 py-1 border rounded ${
                        i.quantity === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      -
                    </button>
                  </div>

                  <div className="mt-3 md:mt-0 sm:ml-10">
                    <img
                      src={assets.bin_icon}
                      alt="Delete"
                      className="w-6 cursor-pointer"
                      onClick={(e) => handleDelete(e, i.id, i.selectedSize)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* قسم الإجماليات */}
            <div className="flex justify-end mt-8">
              <div className="w-full md:w-96 bg-white border p-5 shadow-lg">
                <Title text1={"CART "} text2={"TOTALS"} />

                <div className="flex justify-between items-center border-b mt-5 pb-2">
                  <h1 className="uppercase text-gray-600 text-sm">
                    Total items:
                  </h1>
                  <span className="text-[#EF4444] text-sm">
                    {cart.totalQuantity}
                  </span>
                </div>

                <div className="border-b mb-5 py-2">
                  <h1 className="text-sm">Shipping:</h1>
                  <p className="text-sm">Shipping to:</p>
                  <span className="text-gray-500 text-xs block">{address}</span>
                  <button
                    className="text-blue-400 text-xs mt-1"
                    onClick={() => setIsModel(true)}
                  >
                    Change Address
                  </button>
                </div>

                <div className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <h1 className="text-sm">Shipping Fee</h1>
                    <span className="text-[#EF4444] text-sm">
                      {delivery_fee} {currency}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <h1 className="text-sm">Subtotal Price</h1>
                    <span className="text-[#EF4444] text-sm">
                      {cart.totalPrice} {currency}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2">
                  <h1 className="text-base font-semibold">TOTAL:</h1>
                  <h1 className="text-base font-bold">
                    {cart.totalPrice + delivery_fee} {currency}
                  </h1>
                </div>

                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-[#EF4444] text-white w-full py-2 mt-4 hover:bg-white hover:text-[#EF4444] border border-[#EF4444] transition-all duration-300 font-semibold rounded"
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>

            <Modal isModel={isModel} setIsModel={setIsModel}>
              <ChangeAddress
                isModel={isModel}
                setIsModel={setIsModel}
                address={address}
                setAddress={setAddress}
              />
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
