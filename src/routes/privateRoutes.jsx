import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const privateRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  return token ? children : <Navigate to="/login" replace />;
};

export default privateRoutes;

//cart etc
