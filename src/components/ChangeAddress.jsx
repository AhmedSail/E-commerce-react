import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const ChangeAddress = ({ setIsModel, setAddress, address }) => {
  const { tempAddress, setTempAddress } = useContext(ShopContext);

  const handleSaveClick = () => {
    setAddress(tempAddress); // فقط حفظ عند الضغط على "Save"
    setIsModel(false);
  };

  const handleCancelClick = () => {
    setTempAddress(address); // إعادة العنوان القديم عند الإلغاء
    setIsModel(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        type="text"
        placeholder="Enter New Address"
        className="border p-2 w-full mb-4"
        value={tempAddress}
        name="address"
        onChange={(e) => setTempAddress(e.target.value)} // تحديث `tempAddress` فقط
      />
      <div className="flex justify-end items-center">
        <button
          className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
          onClick={handleCancelClick} // ✅ يعيد القيمة القديمة عند الإلغاء
        >
          Cancel
        </button>
        <button
          className="text-white py-2 px-4 rounded bg-blue-400"
          onClick={handleSaveClick} // ✅ يحفظ القيمة فقط عند الضغط على "Save"
        >
          Save Address
        </button>
      </div>
    </div>
  );
};

export default ChangeAddress;
