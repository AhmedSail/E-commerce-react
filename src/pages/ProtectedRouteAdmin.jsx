import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteAdmin = () => {
  const isAdmin = JSON.parse(localStorage.getItem("admin"));
  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRouteAdmin;
