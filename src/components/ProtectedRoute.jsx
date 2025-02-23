import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  return localStorage.getItem("user") ? <Outlet /> : <Navigate to={"/home"} />;
};

export default ProtectedRoute;
