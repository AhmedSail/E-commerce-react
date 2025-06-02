import React, { useState } from "react";

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-10 w-10 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
);

const MultiImageUpload = ({ product, setProduct, added, setAdded }) => {
  const [images, setImages] = useState([null, null, null, null]); // Store uploaded images

  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const filePath = `/assets/${file.name}`; // ✅ Store file path in assets

      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = filePath; // ✅ Replace existing image instead of appending
        return newImages;
      });

      setProduct((prevProduct) => ({
        ...prevProduct,
        image: [
          ...images.slice(0, index),
          filePath,
          ...images.slice(index + 1),
        ], // ✅ Correctly update `image` array
      }));
    }
  };

  return (
    <div className="my-10 bg-white rounded-lg max-sm:w-[300px] md:w-[500px]">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Upload Image</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors duration-150 ease-in-out relative"
          >
            {image ? (
              <img
                src={image}
                alt={`Uploaded ${index}`}
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <>
                <UploadIcon />
                <p className="mt-2 text-sm text-gray-500">Upload</p>
              </>
            )}

            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(event) => handleImageUpload(event, index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiImageUpload;
