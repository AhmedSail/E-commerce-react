import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { GoogleLogin } from "@react-oauth/google";
import LoginWithSocial from "./LoginWithSocial";
import Swal from "sweetalert2";

const Login = () => {
  const {
    navigate,
    setLogin,
    // setPage, // No longer needed directly here for admin login
    setUser,
    // login, // No longer needed directly here
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const LoginAsAdmin = async () => {
    const { value: email } = await Swal.fire({
      title: "Input email address",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address",
    });

    // Ensure environment variables are loaded correctly
    const adminEmails = [
      import.meta.env.VITE_ADMIN_EMAIL1,
      import.meta.env.VITE_ADMIN_EMAIL2,
      import.meta.env.VITE_ADMIN_EMAIL3,
    ].filter(Boolean); // Filter out undefined/null values

    if (email && adminEmails.includes(email)) {
      if (email === "sdew2sdew0592855602@gmail.com") {
        Swal.fire(`Welcome eng.ahmed`);
      }
      if (email === "f421406448@gmail.com") {
        Swal.fire(`خير ايش بدك يا تافهة؟`);
      }
      if (email === "noornasser655@gmail.com") {
        Swal.fire(`اهلا اهلا استاذة نور`);
      }
      setLogin(true);

      // Remove direct manipulation of page state and localStorage
      // setPage("admin"); // Removed - Handled by setLogin(true) in context
      // localStorage.setItem("admin", JSON.stringify(true)); // Removed - Handled by setLogin(true) in context

      // Navigate after state update (context handles the rest)
      navigate("/admin/add", { replace: true });
    } else if (email) {
      // Only show error if email was entered
      Swal.fire(`${email} is not authorized to log in as admin`);
    } else {
      // Handle case where user cancels the Swal input
      console.log("Admin login cancelled.");
    }
  };

  // Redirect logic on component mount
  useEffect(() => {
    const isAdmin = localStorage.getItem("admin") === "true";
    const loggedInUser = localStorage.getItem("currentUser"); // Check currentUser instead of 'user'

    if (isAdmin) {
      navigate("/admin/add", { replace: true });
    } else if (loggedInUser) {
      navigate("/", { replace: true });
    }
  }, [navigate]); // Only depends on navigate

  // Removed useEffect for syncing 'login' state to localStorage['login'] as it's redundant

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value.trim() === "")) {
      toast.error("Please fill out all the fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    try {
      const response = await axios.get("http://localhost:3001/users");
      const users = response.data;

      const userItem = users.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      if (userItem) {
        // For regular user login, set user state and navigate
        // The context useEffect will handle localStorage['currentUser']
        setUser(userItem);
        // setLogin(true); // Don't set admin login state for regular users
        toast.success("Login successfully!");

        // setPage("home"); // Context handles page state on logout/default
        localStorage.setItem("fromLogin", "true"); // Keep if needed elsewhere
        navigate("/", { replace: true });
      } else {
        toast.error("Invalid email or password.");
      }
    } catch (error) {
      toast.error("Server error. Try again.");
    }
  };

  // Effect to show registration success message
  useEffect(() => {
    if (localStorage.getItem("fromRegister") === "true") {
      Swal.fire({
        title: "Registration Successful!",
        text: "You have successfully registered. Please log in to continue.",
        icon: "success",
        confirmButtonText: "OK",
      });
      localStorage.removeItem("fromRegister");
    }
  }, []);

  return (
    <div>
      <ToastContainer autoClose={3000} pauseOnHover={false} />
      <div className="shadow-md sm:w-[600px] bg-white my-auto rounded-xl p-5 mx-auto sm:mt-20 ">
        <Title text2={"Login"} size={"text-2xl"} center={true} />
        <button
          onClick={LoginAsAdmin} // Corrected function name binding
          className="border max-sm:w-72 md:w-96 py-2 bg-black text-white font-semibold uppercase mx-auto block mt-10 hover:bg-white hover:text-black transition-all duration-300"
        >
          Login As ADMIN
        </button>

        <form onSubmit={handlesubmit}>
          <input
            required
            className="block px-2 max-sm:w-72 md:w-96 py-2 border mx-auto my-5"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            name="email"
            type="email"
            placeholder="Email"
          />
          <input
            required
            className="block px-2 max-sm:w-72 md:w-96 py-2 border mx-auto"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            name="password"
            type="password"
            placeholder="Password"
          />
          <div className="flex justify-center md:gap-28 max-sm:justify-around items-center max-sm:text-sm">
            <a href="#" className="text-gray-700">
              Forgot your password?
            </a>
            <Link to={"/register"} className="text-gray-700">
              Create Account
            </Link>
          </div>
          <button
            type="submit"
            className="p-3 px-10 bg-black font-semibold text-white mx-auto block mt-10"
          >
            Sign In
          </button>
        </form>
        <hr className="my-5" />
        <LoginWithSocial />
      </div>
    </div>
  );
};

export default Login;
