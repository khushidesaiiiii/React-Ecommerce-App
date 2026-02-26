import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import Button from "../../UI/Button";
import { loginUser } from "../../store/authSlice";
import { loadItems, saveUserCart } from "../../utils/cartStorage.js";
import { loadWishlist, saveWishlist } from "../../utils/wishlistStorage.js";
import { saveOrders } from "../../utils/orderStorage.js";
import { loadUserOrders } from "../../store/orderSlice.js";

import loginImg from '../../assets/images/login/login-img.jpg';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  const role = useSelector((state) => state.auth.user?.role);
  // console.log("Login page role:", role);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData));
  }

  useEffect(() => {
    if (user) {
      toast.success("Login Successful!");
    }

    if (error) {
      toast.error(error);
    }
  }, [user, error, navigate]);

  useEffect(() => {
    // console.log("UseEffect Role:", role);
    if (role) {
      navigate(role === "admin" ? "/dashboard" : "/", { replace: true });
    }
  }, [role, navigate]);

  useEffect(() => {
    if (user?.id) {
      saveUserCart(user.id, []);
      saveWishlist(user.id);
      // saveOrders(user.id);
      dispatch(loadUserOrders(user.id));
    }
  }, [user]);

  return (
    <div className="login">
      <div className="login-card">
        <div className="login-image">
          <img src={loginImg} alt="Login Image" />
        </div>
        <div className="login-content">
          <div className="login-header">
            <h2>Login</h2>
            <p>Please login with your valid credentials</p>
          </div>
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <input
                name="username"
                type="text"
                placeholder="Enter your Username"
                required
                onChange={handleChange}
                value={formData.username}
              />
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                onChange={handleChange}
                value={formData.password}
              />
              <Button type="submit">
                {" "}
                {loading ? "Logging in..." : "Submit"}{" "}
              </Button>
            </form>
          </div>
          <div className="login-footer">
            <p style={{ marginTop: "2.5rem" }}>
              New user?{" "}
              <Link to="/signup">
                <Button>Signup</Button>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
