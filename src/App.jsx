import React, { useEffect } from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/index.jsx";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Contact from "./pages/Contact";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import Faq from "./pages/Faq";
import Categories from "./pages/category/Categories";
import CategoryProduct from "./pages/category/CategoryProduct";
import ProductDetails from "./pages/product/ProductDetails";
import Dashboard from "./components/Dashboard/index.jsx";

import PrivateRoutes from "./routes/privateRoutes";
import PublicRoutes from "./routes/publicRoutes";
import ProtectedRoutes from "./routes/protectedRoutes";
import MainLayout from "./routes/MainLayout";
import ProtectedLayout from "./routes/protectedLayout";

import SearchResult from "./pages/SearchResult";
import Profile from "./components/Profile/Profile";
import AdminCategories from "./pages/admin/AdminCategory/AdminCategories";
import AdminCategoryProducts from "./pages/admin/AdminCategory/AdminCategoryProducts.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminUsers from "./pages/admin/AdminUsers/AdminUsers";
import AdminAllProducts from "./pages/admin/AdminProducts/AdminAllProducts";
import "./utils/chartConfig.js";
import AdminOrders from "./pages/admin/AdminOrders/AdminOrders.jsx";
import AllProducts from "./pages/product/AllProducts.jsx";
import WishlistPage from "./pages/wishlist/index.jsx";
import Order from "./pages/order/index.jsx";
// import AuthPage from "./components/Login/AuthPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutUs />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
        <Route
          path="/faq"
          element={
            <MainLayout>
              <Faq />
            </MainLayout>
          }
        />
        <Route
          path="/category"
          element={
            <MainLayout>
              <Categories />
            </MainLayout>
          }
        />
        <Route
          path="/category/:categoryName"
          element={
            <MainLayout>
              <CategoryProduct />
            </MainLayout>
          }
        />
        <Route
          path="/all-products"
          element={
            <MainLayout>
              <AllProducts />
            </MainLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />
        <Route
          path="/search"
          element={
            <MainLayout>
              <SearchResult />
            </MainLayout>
          }
        />
        {/* <Route
          path="/auth"
          element={
            <PublicRoutes>
              <MainLayout>
                <AuthPage />
              </MainLayout>
            </PublicRoutes>
          }
          /> */}
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <MainLayout>
                <Login />
              </MainLayout>
            </PublicRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <MainLayout>
              <Signup />
            </MainLayout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedLayout allowedRoles={["admin", "user", "moderator"]}>
              <Profile />
            </ProtectedLayout>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedLayout allowedRoles={["user", "moderator"]}>
              <WishlistPage />
            </ProtectedLayout>
          }
        />
        <Route
          path="/user-orders"
          element={
            <ProtectedLayout allowedRoles={["user", "moderator"]}>
              <Order />
            </ProtectedLayout>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <AdminAllProducts />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/category"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <AdminCategories />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/admin/category/:category"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <AdminCategoryProducts />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <AdminUsers />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <AdminOrders />
            </ProtectedRoutes>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
