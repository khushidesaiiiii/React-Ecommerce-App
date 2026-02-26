import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import MainLayout from "./MainLayout";
import Sidebar from "../components/Dashboard/Sidebar";


export default function ProtectedLayout({ allowedRoles, children }) {
  const { token, role } = useSelector((state) => state.auth);

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {role !== "admin" ? <MainLayout>{children}</MainLayout> : ""}
      {role === "admin" ? (
        <div className="protected-layout">
          <Sidebar />
          <main className="protected-children">{children}</main>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
