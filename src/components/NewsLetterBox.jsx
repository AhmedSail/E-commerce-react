import React from "react";

const NewsLetterBox = () => {
  const submitHandler = (e) => {
    e.prventDefault();
  };
  return (
    <div>
      <div className="grid grid-cols-1 gap-5 p-5">
        <h1 className="text-center font-semibold text-3xl">
          Subscribe now & get 20% off
        </h1>
        <p className="text-gray-500 text-center">
          Join our exclusive community and enjoy a 20% discount on your first
          purchase! Stay updated with the latest trends, special offers, and
          exciting deals—because you deserve the best at the best price.
        </p>
        <form
          onSubmit={submitHandler}
          className="flex justify-center items-center w-full sm:w-1/2 mx-auto"
        >
          <input
            type="text"
            placeholder="Enter Your Email"
            className="border-2 w-full sm:flex-1 p-3  focus:outline-0"
          />
          <button
            type="submit"
            className="uppercase text-white font-mono text-sm bg-black px-10 py-4 hover:bg-gray-600 transition-all duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetterBox;
