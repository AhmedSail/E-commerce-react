import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import LoginWithSocial from "./LoginWithSocial";
import bcrypt from "bcryptjs";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { navigate } = useContext(ShopContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من ملء جميع الحقول
    if (Object.values(formData).some((value) => value.trim() === "")) {
      toast.error(
        "Please fill in all fields before submitting your application."
      );
      return;
    }

    // التحقق من صحة البريد الإلكتروني باستخدام تعبير نمطي
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // التحقق من صحة كلمة المرور:
    // يجب أن تكون 8 أحرف على الأقل وتحتوي على رقم، وحرف كبير، وحرف صغير، ورمز خاص
    const passwordRegex =
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&?])[A-Za-z\d!@#$%^&?]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "The password must be at least 8 characters long and include a number, an uppercase letter, a lowercase letter, and a special character."
      );
      return;
    }

    try {
      // نتحقق من وجود مستخدم بنفس البريد الإلكتروني (يفترض أن تكون المصفوفة فارغة بعد عملية الحذف)
      const checkResponse = await axios.get(
        `http://localhost:3001/users?email=${formData.email}`
      );

      if (checkResponse.data.length > 0) {
        toast.error("User already exists!");
        return;
      }
      const hashedPass = await bcrypt.hash(formData.password, 10);
      const newUser = {
        ...formData,
        password: hashedPass,
      };

      // إذا لم يكن المستخدم موجوداً، نقوم بإرسال طلب POST لتسجيل المستخدم
      const response = await axios.post("http://localhost:3001/users", newUser);

      if (response.status === 201) {
        localStorage.setItem("fromRegister", "true"); // تعيين الحالة
        navigate("/login"); // توجيه المستخدم إلى صفحة تسجيل الدخول

        // إعادة تعيين حقول النموذج بعد النجاح
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      } else {
        toast.error("Registration failed.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error. Try again.");
    }
  };

  return (
    <div className="shadow-md sm:w-[600px] bg-white my-auto rounded-xl p-5 mx-auto sm:mt-20 ">
      <ToastContainer />
      <div>
        <Title text2="Register" size="text-2xl" center={true} />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.name}
            placeholder="Name"
            className="block px-2 max-sm:w-72 md:w-96 py-2 border my-5 mx-auto"
            name="name"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <input
            type="email"
            value={formData.email}
            placeholder="Email"
            className="block px-2 max-sm:w-72 md:w-96 py-2 border my-5 mx-auto"
            name="email"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <input
            type="password"
            value={formData.password}
            placeholder="Password"
            className="block px-2 max-sm:w-72 md:w-96 py-2 border mx-auto"
            name="password"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
          <div className="flex justify-center md:gap-32 max-sm:justify-around items-center max-sm:text-sm">
            <a href="#" className="text-gray-700">
              Forgot your password?
            </a>
            <Link to="/login" className="text-gray-700">
              Login Here!
            </Link>
          </div>
          <button
            type="submit"
            className="p-3 px-10 bg-black font-semibold text-white mx-auto block mt-10"
          >
            Sign up
          </button>
        </form>
        <hr className="my-5" />
        <LoginWithSocial />
      </div>
    </div>
  );
};

export default Register;
