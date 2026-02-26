import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { FaUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import Button from "../../UI/Button";
import SearchBar from "../Search/SearchBar";
import CartController from "../Cart";
import { logout } from "../../store/authSlice";
import { clearCart } from "../../store/cartSlice";
import { clearWishlistLogout } from "../../store/wishlistSlice";

import "../../assets/css/components/Navbar/Navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartOpen, setCartOpen] = useState(false);

  const cartItems = useSelector((state) => state.carts.items);
  const cartCount = cartItems?.length;
  // console.log(cartItems);
  const toggleCart = () => setCartOpen(!cartOpen);

  const user = useSelector((state) => state.auth.user);

  const items = useSelector((state) => state.wishlist.items);
  const wishlistCount = items.length;

  const role = user?.role ?? "guest";
  // console.log("Navbar:", role);

  const handleLogout = () => {
    Cookies.remove("authToken");
    dispatch(clearCart());
    dispatch(clearWishlistLogout(user.id));
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          {role !== "admin" && (
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              EVARA
            </NavLink>
          )}
          {/* {role === "admin" && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            EVARA
          </NavLink>
        )} */}
        </div>
        {role !== "admin" && <SearchBar />}
        <div className="navlinks">
          {role !== "admin" && (
            <>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                About Us
              </NavLink>
              <UncontrolledDropdown inNavbar>
                <DropdownToggle nav caret>
                  Product Categories
                </DropdownToggle>
                <DropdownMenu right>
                  <NavLink
                    to="/category"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <DropdownItem> Categories </DropdownItem>
                  </NavLink>
                  <NavLink
                    to="/all-products"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <DropdownItem> All Products </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>

              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Contact Us
              </NavLink>
              {role !== "guest" && (
                <>
                  <UncontrolledDropdown inNavbar>
                    <DropdownToggle nav caret>
                      User
                    </DropdownToggle>
                    <DropdownMenu right>
                      <NavLink
                        to="/profile"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <DropdownItem>Profile</DropdownItem>
                      </NavLink>

                      <NavLink
                        to="/wishlist"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <DropdownItem>Wishlist </DropdownItem>
                      </NavLink>

                      <NavLink
                        to="/user-orders"
                        className={({ isActive }) => (isActive ? "active" : "")}
                      >
                        <DropdownItem>Orders </DropdownItem>
                      </NavLink>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  {/* <NavLink
                    to="/profile"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Profile
                  </NavLink> */}
                </>
              )}
            </>
          )}
          {/* {role === "admin" && (
          <>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Profile
            </NavLink>
            <NavLink
              to='/admin/category'
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Product Category
            </NavLink>
            <NavLink
              to='/admin/users'
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Users
            </NavLink>
          </>
        )} */}
        </div>

        <div className="auth-button">
          {role !== "admin" &&
            (!user ? (
              <NavLink to="/login">
                <Button>Login</Button>
              </NavLink>
            ) : (
              <>
                <div className="nav-cart-btn">
                  <NavLink to="/wishlist">
                    <button>
                      <div className="cart-count">{wishlistCount}</div>
                      <FaHeart />
                    </button>
                  </NavLink>
                </div>

                <CartController />
                {/* <div className="nav-cart-btn">
                  <button onClick={toggleCart}>
                    <div className="cart-count">
                      {cartCount}
                    </div>
                    <FaShoppingCart />
                  </button>
                </div> */}
                <div className="user-section">
                  {/* <img src={user.image} alt="User icon" className="usericon" /> */}
                  <Link to="profile">
                    <span className="username">
                      {user.firstname || user.username}
                    </span>
                  </Link>
                  <Button type="type" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </>
            ))}
        </div>
      </nav>
      {/* <Cart isOpen={cartOpen} toggle={toggleCart} /> */}
    </>
  );
}

export default Navbar;
