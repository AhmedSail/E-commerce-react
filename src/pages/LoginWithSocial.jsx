import { jwtDecode } from "jwt-decode";
import React, { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";

const LoginWithSocial = () => {
  const { navigate, setUser } = useContext(ShopContext);
  const CLIENT_ID =
    "464556541744-po50m4a0lgrecqi5d91ecgq3ljlnnlfm.apps.googleusercontent.com";
  return (
    <div className="flex justify-center items-center">
      <ToastContainer />
      <div>
        <p className="text-center text-gray-500 mb-4">Login using:</p>

        <div className="grid grid-cols-1 md:flex md:justify-center items-center gap-5">
          {/* Google Login Button */}
          <div className="flex justify-center">
            <GoogleLogin
              clientId={CLIENT_ID}
              redirectUri="https://meroshop1.netlify.app/login"
              onSuccess={(credentialResponse) => {
                const decodedToken = jwtDecode(credentialResponse.credential);
                console.log("Google User:", decodedToken);

                localStorage.setItem("user", JSON.stringify(decodedToken));
                setUser(decodedToken);
                toast.success("Welcome,! Login successful.");
                localStorage.setItem("fromLogin", "true");

                navigate("/", { replace: true });
              }}
              onError={() => toast.error("Login Failed")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWithSocial;
