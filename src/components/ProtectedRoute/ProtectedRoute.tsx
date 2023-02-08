import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const isLoggedIn = localStorage.getItem("loggedIn");
  return isLoggedIn ? children : <Navigate to="/signin" replace></Navigate>;
};

export default ProtectedRoute;
