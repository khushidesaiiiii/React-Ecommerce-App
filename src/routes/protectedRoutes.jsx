import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar";

export default function protectedRoutes({ allowedRoles, children }) {
  const { token, role } = useSelector((state) => state.auth);

  // if (!token) {
  //    <Navigate to="/login" replace />
  // }

  if(allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="protected-layout">
      <Sidebar />
      <main className="protected-children">
        {children}
      </main>
    </div>
  );
}

//admin dashboard etc 
