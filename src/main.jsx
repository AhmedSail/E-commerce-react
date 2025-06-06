import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { Provider } from "react-redux";
import store from "./Redux/store.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID =
  "110759857658-lbtckqq2bemcdjm247i68jfm701dbf27.apps.googleusercontent.com";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ShopContextProvider>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </Provider>
    </ShopContextProvider>
  </BrowserRouter>
);
