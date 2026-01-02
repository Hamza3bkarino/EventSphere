

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({ children }) {
  const isAdmin = useSelector((state) => state.admin.isAdmin);

  if (!isAdmin) {
    return <Navigate to="/logIn" replace />;
  }

  return children;
}
