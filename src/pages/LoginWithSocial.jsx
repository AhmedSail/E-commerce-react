import { jwtDecode } from "jwt-decode";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import axios from "axios"; // استيراد axios لمعالجة الطلبات

const LoginWithSocial = () => {
  const { navigate, setUser } = useContext(ShopContext);
  const FACEBOOK_APP_ID = "1457585152342967"; // معرف التطبيق الخاص بك

  // دالة التحقق من المستخدم
  const checkUserAndLogin = async (userData) => {
    try {
      // البحث عن المستخدم في قاعدة البيانات
      const response = await axios.get(
        `http://localhost:3001/users?email=${userData.email}`
      );
      const existingUser = response.data[0]; // `json-server` يرجع مصفوفة

      if (existingUser) {
        console.log("✅ المستخدم موجود، تسجيل الدخول...");
        localStorage.setItem("user", JSON.stringify(existingUser));
        setUser(existingUser);
        localStorage.setItem("fromLogin", "true");
        navigate("/", { replace: true });
      } else {
        console.log("❌ المستخدم غير موجود، إنشاء حساب جديد...");
        const newUser = {
          id: userData.id || Date.now(),
          name: userData.name,
          email: userData.email,
          picture: userData.picture || "",
        };

        await axios.post("http://localhost:3001/users", newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        localStorage.setItem("fromLogin", "true");
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("🚨 خطأ في التحقق من المستخدم:", error);
      toast.error("حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.");
    }
  };

  // تسجيل الدخول بواسطة Facebook
  const handleFacebookLoginSuccess = (response) => {
    fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${response.accessToken}`
    )
      .then((res) => res.json())
      .then((userData) => {
        console.log("📘 Facebook User Data:", userData);
        checkUserAndLogin({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          picture: userData.picture?.data?.url,
        });
      })
      .catch((error) => {
        console.error("Facebook Data Fetch Error:", error);
        toast.error("فشل في جلب بيانات المستخدم من Facebook.");
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div>
        <p className="text-center text-gray-500 mb-4">Login using:</p>

        <div className="grid grid-cols-1 md:flex md:justify-center items-center gap-5">
          {/* زر تسجيل الدخول عبر Google */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decodedToken = jwtDecode(credentialResponse.credential);
                checkUserAndLogin({
                  id: decodedToken.sub, // Google user ID
                  name: decodedToken.name,
                  email: decodedToken.email,
                  picture: decodedToken.picture,
                });
              }}
              onError={() => toast.error("فشل تسجيل الدخول عبر Google")}
            />
          </div>

          {/* زر تسجيل الدخول عبر Facebook */}
          <div className="flex justify-center">
            <FacebookLogin
              appId={FACEBOOK_APP_ID}
              onSuccess={handleFacebookLoginSuccess}
              onFail={() => toast.error("فشل تسجيل الدخول عبر Facebook")}
              style={{
                backgroundColor: "#4267B2",
                color: "#fff",
                fontSize: "16px",
                padding: "8px 21px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginWithSocial;
