import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) {
    return children;
  }

  return role === "admin" ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/" replace />
  );
}
