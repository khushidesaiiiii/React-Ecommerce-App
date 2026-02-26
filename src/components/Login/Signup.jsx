import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

import { signupUser } from "../../store/authSlice";
import Button from "../../UI/Button";

import loginImage from "../../assets/images/login/login-img.jpg";

export default function Signup() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(signupUser(formData));
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      return;
    }

    if (user) {
      navigate("/login", { replace: true });
      toast.success("Signup Successful!");
    }
  }, [user, error, navigate]);

  return (
    <div className="signup">
      <div className="login-card">
        <div className="login-content">
          <div className="login-header">
            <h2> Sign up</h2>
            <p>
              Welcome to Evara, your one step shopping solution for faishon and
              lifestyle products!
            </p>
          </div>
          <div className="signup-form">
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Enter your First Name"
                name="firstname"
                type="text"
                onChange={handleChange}
                value={formData.firstname}
              />
              <input
                placeholder="Enter your Last Name"
                name="lastname"
                type="text"
                onChange={handleChange}
                value={formData.lastname}
              />
              <input
                placeholder="Enter a Username"
                name="username"
                type="text"
                onChange={handleChange}
                value={formData.username}
              />
              <input
                placeholder="Enter a password"
                name="password"
                type="text"
                onChange={handleChange}
                value={formData.password}
              />
              <Button type="submit">Signup</Button>
            </form>
          </div>
          {error && <p className="error">{error.message}</p>}
          <div className="login-footer">
            <p style={{ marginTop: "2.5rem" }}>
              Existing user?{" "}
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </p>
          </div>
        </div>
        <div className="login-image">
          <img src={loginImage} alt="Signup Img" />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
