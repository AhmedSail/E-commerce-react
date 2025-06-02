import React from "react";

const Modal = ({ children, isModel, setIsModel }) => {
  if (!isModel) {
    return null;
  }
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 felx items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto mt-[15%]">
        <button
          className="absolute top-4 right-4 text-gray-400 text-3xl"
          onClick={() => setIsModel(!isModel)}
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
