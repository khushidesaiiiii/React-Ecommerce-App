import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { IoStorefrontSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { IoReceipt } from "react-icons/io5";

import Button from "../../UI/Button";
import { logout } from "../../store/authSlice";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    Cookies.remove("authToken");
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          EVARA
        </NavLink>
      </div>
      <div className="sidebar-links">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <MdDashboard /> Dashboard 
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaUsers /> Users
        </NavLink>
        <NavLink
          to="/admin/category"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
         <IoStorefrontSharp /> Product Category
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <RiShoppingBag4Fill /> Products
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <IoReceipt /> Orders
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaUser /> Profile
        </NavLink>
      </div>
      <hr />
      <div className="auth-button">
        {!user ? (
          <NavLink to="/login">
            <Button> Login </Button>{" "}
          </NavLink>
        ) : (
          <>
            <div className="user-section">
              {/* <img src={user.image} alt="User icon" className="usericon" /> */}
              
                <span className="username">
                  {user.firstname || user.username}
                </span>{" "}
              
              <Button type="type" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
