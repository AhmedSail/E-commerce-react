import { jwtDecode } from "jwt-decode";
import React, { useContext } from "react";
import { toast } from "react-toastify"; // لا تحتاج ToastContainer هنا إذا كانت في App.jsx
import { ShopContext } from "../context/ShopContext";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login"; // استيراد المكتبة الجديدة

const LoginWithSocial = () => {
  const { navigate, setUser } = useContext(ShopContext);
  const FACEBOOK_APP_ID = "1457585152342967"; // معرف التطبيق الخاص بك

  // دالة لمعالجة نجاح تسجيل الدخول بواسطة فيسبوك (المكتبة الجديدة)
  const handleFacebookLoginSuccess = (response) => {
    // الاستجابة هنا تحتوي عادةً على accessToken. قد تحتاج لاستدعاء Graph API للحصول على بيانات المستخدم
    // مثال افتراضي لاستخدام accessToken (قد تحتاج لتثبيت axios أو استخدام fetch):
    fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${response.accessToken}`
    )
      .then((res) => res.json())
      .then((userData) => {
        console.log("Facebook User Data:", userData);
        const formattedUserData = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          picture: userData.picture?.data?.url,
          // يمكنك إضافة بيانات أخرى حسب الحاجة
        };
        // حفظ بيانات المستخدم في localStorage وتحديث الحالة
        localStorage.setItem("user", JSON.stringify(formattedUserData));
        setUser(formattedUserData);
        // تعيين علامة لتشغيل الإشعار في الصفحة الرئيسية
        localStorage.setItem("fromLogin", "true");
        console.log("تم تعيين fromLogin في localStorage (Facebook)");
        // الانتقال إلى الصفحة الرئيسية
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("Error fetching Facebook user data:", error);
        toast.error("Failed to fetch user data from Facebook.");
      });
  };

  // دالة لمعالجة فشل تسجيل الدخول بواسطة فيسبوك (المكتبة الجديدة)
  const handleFacebookLoginFailure = (error) => {
    console.error("Facebook Login Failed (New Library):", error);
    toast.error(
      `Facebook Login Failed: ${error.message || "Please try again."}`
    );
  };

  // دالة لمعالجة عند النقر على زر فيسبوك (اختياري، يمكن استخدامه لعرض مؤشر تحميل)
  const handleFacebookLoginProcessing = () => {
    console.log("Facebook Login processing...");
    // يمكنك عرض مؤشر تحميل هنا إذا أردت
  };

  return (
    <div className="flex justify-center items-center">
      <div>
        <p className="text-center text-gray-500 mb-4">Login using:</p>

        <div className="grid grid-cols-1 md:flex md:justify-center items-center gap-5">
          {/* Google Login Button */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decodedToken = jwtDecode(credentialResponse.credential);
                localStorage.setItem("user", JSON.stringify(decodedToken));
                localStorage.setItem("fromLogin", "true");
                setUser(decodedToken);
                console.log("تم تعيين fromLogin في localStorage (Google)");
                navigate("/", { replace: true });
              }}
              onError={() => toast.error("Login Failed")}
            />
          </div>

          {/* Facebook Login Button (New Library) */}
          <div className="flex justify-center">
            <FacebookLogin
              appId={FACEBOOK_APP_ID}
              onSuccess={handleFacebookLoginSuccess} // تستخدم onSuccess بدلاً من onResponse أو onLogin
              onFail={handleFacebookLoginFailure} // تستخدم onFail بدلاً من onFailure
              onProfileSuccess={(profileResponse) => {
                // هذه الدالة تُستدعى إذا نجحت المكتبة في جلب بيانات الملف الشخصي تلقائيًا
                // قد لا تحتاجها إذا كنت تفضل جلب البيانات يدويًا باستخدام accessToken كما في handleFacebookLoginSuccess
                console.log("Facebook Profile Success:", profileResponse);
              }}
              // يمكنك تخصيص شكل الزر باستخدام render prop أو className
              // render={({ onClick, logout }) => (
              //   <button onClick={onClick}>Login with Facebook</button>
              // )}
              // className="my-facebook-button-class"
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
