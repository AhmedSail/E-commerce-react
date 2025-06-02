import { jwtDecode } from "jwt-decode";
import React, { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import { FaFacebookF } from "react-icons/fa6";

const LoginWithSocial = () => {
  const { navigate, setLogin, setUser } = useContext(ShopContext);

  const loginWithFacebook = () => {
    FB.login(
      (response) => {
        if (response.authResponse) {
          // جلب بيانات المستخدم بعد تسجيل الدخول
          FB.api("/me", { fields: "name,email" }, (userInfo) => {
            console.log("User Info:", userInfo);

            // تخزين البيانات في localStorage
            const userData = {
              userID: response.authResponse.userID,
              name: userInfo.name,
              email: userInfo.email,
              accessToken: response.authResponse.accessToken,
            };

            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData); // ✅ تعيين بيانات المستخدم بشكل صحيح
            toast.success(`Welcome,! Login successful.`);
            localStorage.setItem("fromLogin", "true"); // Keep if needed elsewhere

            navigate("/", { replace: true });
          });
        } else {
          toast.error("Login failed!");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <div className="flex justify-center items-center">
      <ToastContainer />
      <div>
        <p className="text-center text-gray-500 mb-4">Login using:</p>

        <div className="grid grid-cols-1 md:flex md:justify-center items-center gap-5">
          {/* Google Login Button */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decodedToken = jwtDecode(credentialResponse.credential);
                console.log("Google User:", decodedToken);

                localStorage.setItem("user", JSON.stringify(decodedToken));
                setUser(decodedToken);
                toast.success("Welcome,! Login successful.");
                localStorage.setItem("fromLogin", "true"); // Keep if needed elsewhere

                navigate("/", { replace: true });
              }}
              onError={() => toast.error("Login Failed")}
            />
          </div>

          {/* Facebook Login Button */}
          <div className="flex flex-col items-center ">
            <button
              onClick={loginWithFacebook}
              className="bg-blue-600 text-white font-bold py-2 px-4 shadow-lg hover:bg-blue-700 transition flex justify-between items-center gap-5 max-sm:w-[260px]"
            >
              <p>Sign in with Facebook</p>
              <p>
                {" "}
                <FaFacebookF />
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWithSocial;
